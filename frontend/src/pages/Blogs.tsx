import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PenSquare, Search } from "lucide-react";
import BlogCard from "@/components/blog-card";
import { DashboardLayout } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogs } from "@/hooks/useBlogs";
import { useMyBlogs } from "@/hooks/usemyblogs";

interface BlogItem {
  id: string | number;
  title: string;
  content: string;
  publishedDate: string;
  author?: { name: string };
}

function BlogList({
  blogs,
  loading = false,
  empty,
  onDelete,
}: {
  blogs: BlogItem[];
  loading?: boolean;
  empty?: React.ReactNode;
  onDelete?: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="mt-4 divide-y border-t">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2 py-5">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}

        {filtered.map((blog) => (
          <BlogCard
            key={blog.id}
            id={String(blog.id)}
            authorName={blog.author?.name || "Unknown Author"}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishedDate}
            onDelete={onDelete}
          />
        ))}
      </div>

      {!loading && blogs.length > 0 && filtered.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">No posts match your search.</p>
      )}
      {!loading && blogs.length === 0 && empty}
    </>
  );
}

function AllBlogs() {
  const { blogs } = useBlogs();
  return <BlogList blogs={blogs} />;
}

function MyBlogs() {
  const { blogs, loading, removeBlog } = useMyBlogs();
  return (
    <BlogList
      blogs={blogs}
      loading={loading}
      onDelete={removeBlog}
      empty={
        <div className="py-16 text-center">
          <p className="font-medium">You haven&apos;t published anything yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Write your first post and it will show up here.</p>
          <Button asChild className="mt-4">
            <Link to="/publish">
              <PenSquare className="size-4" />
              New post
            </Link>
          </Button>
        </div>
      }
    />
  );
}

const Blogs = () => {
  const [params] = useSearchParams();
  const mine = params.get("view") === "mine";

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{mine ? "My blogs" : "All blogs"}</h1>
        {/* key resets the search box when switching views */}
        {mine ? <MyBlogs key="mine" /> : <AllBlogs key="all" />}
      </div>
    </DashboardLayout>
  );
};

export default Blogs;