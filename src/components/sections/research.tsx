import { FileText, Link2, Code2, BookMarked } from "lucide-react";
import { Fragment } from "react";

import { LinkButton } from "@/components/link-button";
import { Section } from "@/components/section";
import { getResearch, type Paper } from "@/lib/content";

/**
 * Renders an author list with your own name in bold. Comparison ignores case
 * and surrounding space, so "Arnav Verma" matches however it is spaced.
 */
function Authors({ authors, highlight }: { authors: string[]; highlight?: string }) {
  const target = highlight?.trim().toLowerCase();

  return (
    <p className="mt-1.5 text-[14px] leading-[1.55] text-muted-foreground">
      {authors.map((author, index) => (
        <Fragment key={`${author}-${index}`}>
          {index > 0 ? ", " : null}
          {target && author.trim().toLowerCase() === target ? (
            <span className="font-semibold text-foreground">{author}</span>
          ) : (
            author
          )}
        </Fragment>
      ))}
    </p>
  );
}

function PaperRow({ paper, highlight }: { paper: Paper; highlight?: string }) {
  const { pdf, arxiv, code, doi } = paper.links;
  const hasLinks = Boolean(pdf || arxiv || code || doi);

  return (
    <div className="py-6">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <h3 className="text-[16px] font-medium leading-[1.45] tracking-[-0.01em] text-foreground">
          {paper.title}
        </h3>

        {paper.year ? (
          <span className="shrink-0 text-[14px] tabular-nums text-muted-foreground">
            {paper.year}
          </span>
        ) : null}
      </div>

      {paper.authors.length > 0 ? (
        <Authors authors={paper.authors} highlight={highlight} />
      ) : null}

      {paper.status ? (
        <p className="mt-2.5">
          <span className="rounded-md bg-tag px-2 py-1 text-[13px] leading-[1.3] text-tag-foreground">
            {paper.status}
          </span>
        </p>
      ) : null}

      {paper.summary ? (
        <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-foreground/80">
          {paper.summary}
        </p>
      ) : null}

      {hasLinks ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {pdf ? (
            <LinkButton href={pdf}>
              <FileText data-icon="inline-start" />
              PDF
            </LinkButton>
          ) : null}
          {arxiv ? (
            <LinkButton href={arxiv}>
              <BookMarked data-icon="inline-start" />
              arXiv
            </LinkButton>
          ) : null}
          {code ? (
            <LinkButton href={code}>
              <Code2 data-icon="inline-start" />
              Code
            </LinkButton>
          ) : null}
          {doi ? (
            <LinkButton href={doi}>
              <Link2 data-icon="inline-start" />
              DOI
            </LinkButton>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function ResearchSection() {
  const research = getResearch();
  if (research.items.length === 0) return null;

  return (
    <Section id="research" heading={research.heading} blurb={research.blurb}>
      <ol className="divide-y divide-rule border-t border-rule">
        {research.items.map((paper, index) => (
          <li key={`${paper.title}-${index}`}>
            <PaperRow paper={paper} highlight={research.highlight_author} />
          </li>
        ))}
      </ol>
    </Section>
  );
}
