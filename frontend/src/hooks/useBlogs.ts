import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/config";

interface BlogsType {
  content: string;
  title: string;
  id: number;
  publishedDate: string;
  author: {
    name: string;
  };
}

interface BlogType {
  content: string;
  title: string;
  id: number;
  publishedDate: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogsType[]>([]);

  async function fetchBlogs() {
    try {
      const url = `${BACKEND_URL}/api/v1/blog/bulk`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBlogs(response.data.blogs);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<BlogType>();

  async function fetchBlog() {
    try {
      const url = `${BACKEND_URL}/api/v1/blog/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBlog(response.data.blog);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return {
    blog,
  };
};
