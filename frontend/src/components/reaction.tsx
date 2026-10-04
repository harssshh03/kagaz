import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import { EmojiReaction } from "@/components/ui/emoji-reaction";
import { useReactions } from "@/hooks/user-reaction";
import { cn } from "@/lib/utils";

const EMOJIS = ["red-heart", "thumbs-up", "clapping-hands", "fire", "face-with-tears-of-joy"];

export function Reactions({ blogId }: { blogId: string }) {
  const { counts, mine, react } = useReactions(blogId);
  const shown = Object.entries(counts).filter(([, n]) => n > 0);

  return (
    <EmojiProvider data={emojiData}>
      <div className="flex flex-wrap items-center gap-2">
        <EmojiReaction emojis={EMOJIS} emojiData={emojiData} onReact={react} />
        {shown.map(([name, n]) => (
          <span
            key={name}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm",
              name === mine && "border-foreground/40 bg-foreground/10",
            )}
          >
            <Emoji name={name} width={16} />
            {n}
          </span>
        ))}
      </div>
    </EmojiProvider>
  );
}