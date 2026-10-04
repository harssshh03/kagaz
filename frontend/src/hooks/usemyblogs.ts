import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export interface MyBlog {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  author?: { name: string };
}

// NOTE: change these to match your backend.
// GET  -> { blogs: MyBlog[] } for the logged-in user
// DELETE -> deletes the logged-in user's blog by id
const MY_BLOGS_URL = `${BACKEND_URL}/api/v1/blog/me`;
const blogUrl = (id: string) => `${BACKEND_URL}/api/v1/blog/${id}`;

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export function useMyBlogs() {
  const [blogs, setBlogs] = useState<MyBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(MY_BLOGS_URL, { headers: authHeaders() })
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error("Failed to load your blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const removeBlog = useCallback(async (id: string) => {
    try {
      await axios.delete(blogUrl(id), { headers: authHeaders() });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  }, []);

  return { blogs, loading, removeBlog };
}