interface DefinitionItem {
  term: string;
  description: string;
}

interface DefinitionListProps {
  items: DefinitionItem[];
  columns?: 1 | 2;
}

export function DefinitionList({ items, columns = 1 }: DefinitionListProps) {
  if (columns === 2) {
    return (
      <dl
        className="grid grid-cols-2 gap-x-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {items.map(({ term, description }, i) => (
          <div
            key={i}
            className="py-3"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <dt
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "var(--muted-foreground)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              {term}
            </dt>
            <dd style={{ fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.5 }}>
              {description}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl style={{ borderTop: "1px solid var(--border)" }}>
      {items.map(({ term, description }, i) => (
        <div
          key={i}
          className="py-3 flex gap-6"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <dt
            style={{
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "var(--muted-foreground)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              minWidth: "9rem",
              paddingTop: "0.15rem",
            }}
          >
            {term}
          </dt>
          <dd style={{ fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.6 }}>
            {description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
