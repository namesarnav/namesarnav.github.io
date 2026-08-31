import { Section } from "@/components/section";
import { getSkills, SKILL_LEVELS, type SkillLevel } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Green reads as strongest, blue as middling, grey as new — the legend says so out loud. */
const LEVEL_STYLES: Record<SkillLevel, string> = {
  proficient: "bg-level-proficient text-level-proficient-foreground",
  working: "bg-level-working text-level-working-foreground",
  beginner: "bg-level-beginner text-level-beginner-foreground",
};

const LEVEL_SWATCHES: Record<SkillLevel, string> = {
  proficient: "bg-level-proficient-foreground",
  working: "bg-level-working-foreground",
  beginner: "bg-level-beginner-foreground",
};

export function SkillsSection() {
  const skills = getSkills();
  const groups = skills.groups.filter((group) => group.items.length > 0);
  if (groups.length === 0) return null;

  const legend = SKILL_LEVELS.flatMap((level) => {
    const label = skills.legend[level];
    return label ? [{ level, label }] : [];
  });

  return (
    <Section id="skills" heading={skills.heading} blurb={skills.blurb} actions={skills.actions}>
      {legend.length > 0 ? (
        <ul className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {legend.map(({ level, label }) => (
            <li key={level} className="flex items-center gap-2">
              <span
                aria-hidden
                className={cn("size-2 rounded-full", LEVEL_SWATCHES[level])}
              />
              <span className="text-[13px] text-muted-foreground">{label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="divide-y divide-rule border-t border-rule">
        {groups.map((group) => (
          <div
            key={group.name}
            className="flex flex-col gap-3 py-6 sm:flex-row sm:gap-8"
          >
              <h3 className="shrink-0 pt-1 text-[14px] font-medium text-muted-foreground sm:w-[150px]">
                {group.name}
              </h3>

              {/*
                items-start matters: this list is a flex item in the row, so it
                stretches to the label's height when the label wraps to two
                lines — and would stretch the pills with it.
              */}
              <ul className="flex flex-wrap items-start gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={cn(
                      "rounded-md px-2 py-1 text-[13px] leading-[1.3]",
                      LEVEL_STYLES[item.level],
                    )}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
