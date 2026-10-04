import { Reactions } from "@/components/reaction";
import { Separator } from "@/components/ui/separator";
import { formatDate, readingTime } from "@/lib/formatdate";

interface Blog {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  author?: { name: string };
}

export default function UserBlogs({ blog }: { blog: Blog }) {
  const name = blog.author?.name || "Unknown Author";

  return (
    <article>
      <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{blog.title}</h1>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-secondary font-medium text-secondary-foreground">
          {name[0]?.toUpperCase()}
        </div>
        <div className="text-sm">
          <p className="font-medium">{name}</p>
          <p className="flex gap-3 text-muted-foreground">
            <time>{formatDate(blog.publishedDate)}</time>
            <span>{readingTime(blog.content)} min read</span>
          </p>
        </div>
      </div>

      <div className="mt-8 whitespace-pre-wrap font-serif text-lg leading-8 sm:text-xl sm:leading-9">{blog.content}</div>

      <Separator className="my-8" />
      <Reactions blogId={blog.id} />
    </article>
  );
}