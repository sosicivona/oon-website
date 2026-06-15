import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Chevron-separated breadcrumb trail; intermediate items with `onClick` are rendered as buttons, the last item is a non-interactive span. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight size={11} style={{ color: "var(--muted-foreground)" }} />
            )}
            {item.onClick && !isLast ? (
              <button
                onClick={item.onClick}
                className="transition-colors hover:opacity-70"
                style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
              >
                {item.label}
              </button>
            ) : (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: isLast ? "var(--foreground)" : "var(--muted-foreground)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
