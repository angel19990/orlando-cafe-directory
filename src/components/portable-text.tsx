import { PortableText as PortableTextComponent } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground">
      <PortableTextComponent value={value} />
    </div>
  );
}
