import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

/**
 * Thin z-index wrapper for inner pages.
 * The aurora gradient wash is applied globally via body { background-image: var(--aurora-wash) }
 * in theme.css — no per-page gradient divs needed.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {children}
    </div>
  );
}
