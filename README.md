# DNA Nano Lab · Data Storage Assistant

A current-focus knowledge assistant for the Applied DNA NanoEngineering Laboratory at Sungkyunkwan University.

## Current scope

The assistant is grounded in the lab update supplied for this project:

- **Active focus since 2025:** DNA data storage and AI-assisted optimization
- **Integrated students:** Nam Lee Quoc, Muhammad Hanzla
- **Researchers:** Anshula Tandon, Yeonju, Kim Yuen, Sarswathi
- **Historical website:** `https://dnanano.skku.edu/`

The knowledge base intentionally avoids inventing an exact error-correction capacity. For a measured number, add the lab's real code design, sequence length, redundancy, read depth, error model, and experiment results to `server/labKnowledge.ts`.

## Run locally

1. Install Node.js 22+ and pnpm (`npm install -g pnpm`).
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a file named `.env` in the project root with your own free Gemini API key:

   ```bash
   GEMINI_API_KEY=your-key-here
   ```

   Get a free key (no credit card needed) at https://aistudio.google.com/apikey

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the URL printed in the terminal (usually `http://localhost:3000`).

6. Run checks (optional):

   ```bash
   pnpm check
   pnpm test
   pnpm build
   ```

## Main files

- `client/src/pages/Home.tsx` — professional public interface and chatbot
- `client/src/index.css` — typography and visual theme
- `server/labKnowledge.ts` — current lab facts, DNA-storage explanations, team, prompts, and future technology slot
- `server/routers.ts` — grounded chat procedure using Google's free `gemini-2.5-flash` model
- `server/labKnowledge.test.ts` — tests for the current-focus knowledge base

## Adding the next technology

Update the `nextTechnology` object in `server/labKnowledge.ts`, then add the same information to the `labKnowledge` text block. Include:

1. Technology name
2. What problem it solves
3. How it fits the DNA-storage pipeline
4. A short beginner explanation
5. Technical details or a paper link
6. Any numbers that have been measured by the lab

## Deploying so the chatbot works online

This app has two parts: a website (frontend) and a small server (backend) that
talks to Google's Gemini API. Because of the server, it needs a host that can
run Node.js — a static host like plain GitHub Pages cannot run it by itself.

A simple free option is **Render** (render.com):

1. Push this project to a GitHub repository.
2. On Render, create a new "Web Service" and connect your GitHub repository.
3. Build command: `pnpm install && pnpm build`
4. Start command: `pnpm start`
5. Add an environment variable: `GEMINI_API_KEY` = your key.
6. Deploy. Render gives you a permanent URL — that's the working chatbot link.

Do not commit API keys, `.env` files, `dist/`, or `node_modules/` — these are
already excluded via `.gitignore`.
