import { useParams } from "react-router-dom";
import UserBlogs from "@/components/user-blogs";
import { DashboardLayout } from "@/components/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlog } from "@/hooks/useBlogs";

const Blog = () => {
  const { id } = useParams();
  const { blog } = useBlog({ id: id || "" });

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        {blog ? (
          <UserBlogs blog={blog} />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Blog;