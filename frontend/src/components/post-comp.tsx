import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "@/lib/config";
import { DashboardLayout } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PostComp = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const canPublish = title.trim() && content.trim() && !publishing;

  async function sendPost() {
    setPublishing(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
      );
      navigate(`/blog/${response.data.blog.id}`);
    } catch (err) {
      console.error("Failed to publish blog:", err);
      setPublishing(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-auto border-0 bg-transparent px-0 font-serif text-3xl font-semibold shadow-none focus-visible:ring-0 dark:bg-transparent md:text-4xl"
        />
        <Separator className="my-4" />
        <Textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[50vh] resize-none border-0 bg-transparent px-0 font-serif text-lg leading-8 shadow-none focus-visible:ring-0 dark:bg-transparent md:text-xl md:leading-9"
        />
      </div>

      <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between px-4 sm:px-6">
          <span className="text-sm text-muted-foreground">{words} words</span>
          <Button onClick={sendPost} disabled={!canPublish} className="cursor-pointer">
            {publishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PostComp;