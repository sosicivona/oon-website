import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  multiOpen?: boolean;
}

/** Expand/collapse FAQ accordion; supports `multiOpen` to allow multiple items open simultaneously, otherwise collapses the previous item on open. */
export function Accordion({ items, multiOpen = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        if (!multiOpen) next.clear();
        next.add(i);
      }
      return next;
    });
  }

  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {items.map((item, i) => {
        const open = openIndexes.has(i);
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between text-left py-4 gap-4 transition-colors hover:opacity-80"
            >
              <span
                style={{
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  lineHeight: 1.4,
                }}
              >
                {item.question}
              </span>
              <ChevronDown
                size={15}
                style={{
                  color: "var(--muted-foreground)",
                  flexShrink: 0,
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {open && (
              <div className="pb-4 pr-8">
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.75,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
