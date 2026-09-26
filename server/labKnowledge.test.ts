import { describe, expect, it } from "vitest";
import { currentFocus, currentResearchers, currentStudents, labKnowledge, labSources, quickPrompts } from "./labKnowledge";

describe("current lab knowledge base", () => {
  it("prioritizes DNA data storage and AI-assisted optimization", () => {
    expect(labKnowledge).toContain("Since 2025, the lab's active research focus is DNA data storage");
    expect(labKnowledge).toContain("AI-assisted optimization");
    expect(currentFocus).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: "Active focus", value: "DNA data storage" }),
      expect.objectContaining({ label: "Optimization", value: "AI-assisted" }),
    ]));
  });

  it("contains the current owner-provided roster and avoids inventing error capacity", () => {
    expect(currentStudents).toEqual(["Nam Lee Quoc", "Muhammad Hanzla"]);
    expect(currentResearchers).toEqual(["Anshula Tandon", "Yeonju", "Kim Yuen", "Sarswathi"]);
    expect(labKnowledge).toContain("The exact number of errors the lab can correct cannot be stated responsibly");
  });

  it("includes the historical source links and beginner prompts", () => {
    expect(labSources).toHaveLength(2);
    expect(labSources.every(source => source.url.startsWith("https://dnanano.skku.edu/"))).toBe(true);
    expect(quickPrompts).toEqual(expect.arrayContaining([
      "What is the lab doing now?",
      "Explain DNA data storage for a beginner.",
    ]));
  });
});
