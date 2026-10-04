import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export interface MyBlog {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  author?: { name: string };
}

// NOTE: change this endpoint to whatever returns the logged-in user's blogs in your backend.
// Expected response shape: { blogs: MyBlog[] }
const MY_BLOGS_URL = `${BACKEND_URL}/api/v1/blog/me`;

export function useMyBlogs() {
  const [blogs, setBlogs] = useState<MyBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(MY_BLOGS_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error("Failed to load your blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
}