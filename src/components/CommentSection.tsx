import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

interface CommentSectionProps {
  articleId: string;
}

export const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !commentText.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: commentText.trim(),
      timestamp: new Date().toLocaleString('de-CH'),
    };

    setComments([...comments, newComment]);
    setName("");
    setCommentText("");
    
    toast({
      title: "Kommentar gepostet",
      description: "Ihr Kommentar wurde erfolgreich veröffentlicht.",
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">
            Kommentare ({comments.length})
          </h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Comments */}
        {comments.length > 0 && (
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-accent pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">{comment.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-sm text-foreground/90">{comment.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Ihr Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-sm"
          />
          <Textarea
            placeholder="Schreiben Sie einen Kommentar..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
          />
          <Button type="submit" size="sm">
            Kommentar posten
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

