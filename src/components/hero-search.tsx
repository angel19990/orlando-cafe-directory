"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/?q=${encodeURIComponent(q)}#directory` : "/#directory");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex w-full max-w-lg items-center rounded-full border border-border bg-white shadow-sm"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search cafes, neighborhoods..."
        className="flex-1 rounded-l-full bg-transparent px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="mr-1.5 flex items-center gap-2 rounded-full bg-[#252525] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333]"
      >
        <Search className="size-4" />
        Search
      </button>
    </form>
  );
}
