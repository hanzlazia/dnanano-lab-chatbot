export const labKnowledge = `
CURRENT LAB PROFILE — OWNER-PROVIDED UPDATE
- The Applied DNA NanoEngineering Laboratory is at Sungkyunkwan University (SKKU), Department of Physics.
- Since 2025, the lab's active research focus is DNA data storage and AI-assisted optimization of DNA data-storage systems.
- The old public website is a historical snapshot and should not be used to describe the lab's current active projects or current team.
- Current work should be explained in two layers: a simple explanation for non-specialists first, followed by technical detail when requested.

WHAT THE LAB DOES NOW — PLAIN-LANGUAGE EXPLANATION
The lab studies how digital information such as text, images, and files can be converted into the four-letter DNA alphabet (A, C, G, and T), stored in DNA molecules, read back by sequencing, and reconstructed as the original file. The active research problem is making this process reliable and efficient: the lab works on error-correcting codes and AI-based optimization so that a file can still be recovered when the DNA synthesis, storage, sequencing, or reading process introduces errors.

DNA DATA STORAGE PIPELINE
1. A digital file is converted into binary data.
2. An encoder maps the data into DNA sequences made from A, C, G, and T.
3. Redundancy and error-correction information are added so the original data can be recovered even when some DNA reads are imperfect.
4. The designed sequences are synthesized or stored as DNA.
5. Sequencing reads the molecules back into noisy DNA strings.
6. A decoder detects and corrects errors, then reconstructs the original digital file.

ERROR CORRECTION — WHAT THE ASSISTANT MAY EXPLAIN
- DNA storage can experience substitutions (one base changes), insertions (an extra base appears), deletions (a base is missing), dropouts/erasures (a molecule or read is not recovered), and uneven read coverage.
- Error-correction codes add structured redundancy. In simple terms, redundancy acts like a recovery layer: the more carefully designed independent information the system has, the more missing or corrupted information it can tolerate, but extra redundancy also increases storage cost.
- The exact number of errors the lab can correct cannot be stated responsibly without the lab's actual code design, sequence length, redundancy rate, read depth, error model, and experimental results. Never invent a number. If asked for the exact capacity, say that the current knowledge base does not include the lab's measured value and ask the user to provide the relevant paper, code, dataset, or experiment report.
- A useful technical answer may distinguish error rate from error-correction capacity: an error rate describes how often errors occur; correction capacity describes how much corruption the chosen code and decoding pipeline can recover.

AI OPTIMIZATION — CURRENT LAB DIRECTION
The lab's AI optimization work can be explained as using machine-learning or AI methods to search for better choices in the DNA data-storage pipeline. Depending on the specific project, this may include optimizing sequence design, redundancy allocation, encoder/decoder parameters, error-pattern prediction, read selection, or decoding decisions. The assistant must label these as possible optimization targets unless the lab provides a specific method or paper; it must not claim a particular neural network, dataset, or benchmark without evidence.

CURRENT TEAM — OWNER-PROVIDED UPDATE
- Integrated students: Nam Lee Quoc; Muhammad Hanzla.
- Researchers: Anshula Tandon; Yeonju; Kim Yuen; Sarswathi.
- These names describe the current team supplied for this assistant. Do not list the previous students from the historical website as current members.

PROFESSOR AND CONTACT FROM THE PUBLIC LAB SITE
- Sung Ha Park, Department of Physics, Sungkyunkwan University.
- Address: 2066 Seobu-ro, Jangan-gu, Suwon, Gyeonggi-do 16419, Republic of Korea.
- Official lab email shown on the public site: sunghapark@skku.edu.
- Phone shown on the public site: 031-299-4544.

HISTORICAL WEBSITE CONTEXT
- Lab home: https://dnanano.skku.edu/
- Historical research page: https://dnanano.skku.edu/sub01/sub01.php
- Historical professor page: https://dnanano.skku.edu/sub02/sub01.php
- Historical publication archive: https://dnanano.skku.edu/bbs/board.php?tbl=bbs31
- The historical site describes structural DNA nanotechnology, nanomaterial-embedded DNA, DNA algorithm/computation, and DNA data storage. Present the first three as historical/background topics, not as the lab's current active focus after 2025.
- Historical publications can be discussed as prior work, but never imply that an old paper represents the current 2025-present project unless the user supplies confirmation.

FUTURE TECHNOLOGY SLOT
- The lab plans to introduce another technology, but its name and description have not yet been supplied. Do not invent it. Explain that the assistant has a reserved technology spotlight and can be updated as soon as the lab provides the technology name, purpose, workflow, and any supporting paper or image.
`;

export const currentFocus = [
  { label: "Active focus", value: "DNA data storage" },
  { label: "Optimization", value: "AI-assisted" },
  { label: "Current team", value: "6" },
];

export const currentStudents = ["Nam Lee Quoc", "Muhammad Hanzla"];
export const currentResearchers = ["Anshula Tandon", "Yeonju", "Kim Yuen", "Sarswathi"];

export const quickPrompts = [
  "What is the lab doing now?",
  "Explain DNA data storage for a beginner.",
  "How does error correction work in DNA storage?",
  "What does AI optimize in this research?",
];

export const labSources = [
  { label: "Historical lab site", url: "https://dnanano.skku.edu/" },
  { label: "Publication archive", url: "https://dnanano.skku.edu/bbs/board.php?tbl=bbs31" },
];

export const nextTechnology = {
  title: "Technology spotlight",
  status: "Ready for the next lab update",
  description: "A dedicated space for the next technology the lab introduces. Add its name, purpose, and supporting material when ready.",
};
