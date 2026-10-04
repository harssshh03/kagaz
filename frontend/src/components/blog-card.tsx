import { Link } from "react-router-dom";
import { DeleteButton } from "@/components/ui/delete-button";
import { formatDate, readingTime } from "@/lib/formatdate";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  onDelete?: (id: string) => void;
}

export default function BlogCard({ id, authorName, title, content, publishedDate, onDelete }: BlogCardProps) {
  return (
    <article className="relative">
      <Link to={`/blog/${id}`} className="block py-5 pr-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
              {authorName[0]?.toUpperCase()}
            </span>
            <span className="font-medium text-foreground">{authorName}</span>
          </span>
          <time>{formatDate(publishedDate)}</time>
          <span>{readingTime(content)} min read</span>
        </div>
        <h2 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{title}</h2>
        <p className="mt-1.5 line-clamp-2 font-serif text-base leading-7 text-muted-foreground">{content}</p>
      </Link>

      {onDelete && (
        <div className="absolute right-0 top-4 z-10">
          <DeleteButton onConfirm={() => onDelete(id)} />
        </div>
      )}
    </article>
  );
}