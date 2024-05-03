import { useTheme } from "next-themes";
import { useShiki } from "../../providers";
import { Skeleton } from "@rafty/ui";

export type CodeHighlighter = { content: string; language: string };

export function CodeHighlighter({ content, language }: CodeHighlighter) {
  const highlighter = useShiki();
  const { resolvedTheme } = useTheme();

  if (!highlighter)
    return (
      <div className="h-full space-y-2 py-3">
        <Skeleton className="h-5 w-1/2 rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-5 w-1/4 rounded" />
      </div>
    );

  const html = highlighter.codeToHtml(content, {
    lang: language,
    theme:
      resolvedTheme === "light"
        ? "github-light-default"
        : "github-dark-default",
  });

  return (
    <div
      className="h-max w-max"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Need this to show the highlighting
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
