"use client";

import { useState } from "react";

interface BlogTagFilterProps {
  tags: string[];
}

export default function BlogTagFilter({ tags }: BlogTagFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    const next = active === tag ? null : tag;
    setActive(next);

    const grid = document.getElementById("blog-grid");
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-tags]");
    cards.forEach((card) => {
      if (!next) {
        card.style.display = "";
      } else {
        const cardTags: string[] = JSON.parse(card.dataset.tags ?? "[]");
        card.style.display = cardTags.includes(next) ? "" : "none";
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => handleTagClick("")}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
          active === null
            ? "bg-primary text-white border-primary"
            : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            active === tag
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
