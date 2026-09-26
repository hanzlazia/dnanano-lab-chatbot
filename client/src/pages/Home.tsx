import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, BrainCircuit, CheckCircle2, ChevronRight, CircleHelp, Database, ExternalLink, FlaskConical, Layers3, Send, Sparkles, Users, WandSparkles } from "lucide-react";
import { Streamdown } from "streamdown";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { currentFocus, currentResearchers, currentStudents, labSources, nextTechnology, quickPrompts } from "../../../server/labKnowledge";

type Message = { role: "user" | "assistant"; content: string };
const HERO_IMAGE = "/images/dna-data-storage-hero.jpg";

const welcome: Message = {
  role: "assistant",
  content: "The lab’s current work is DNA data storage and AI-assisted optimization. Ask me for a simple summary, a technical explanation, or the current team.",
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [draft, setDraft] = useState("");
  const chat = trpc.lab.chat.useMutation();
  const conversation = useMemo(() => messages.slice(-8), [messages]);

  async function sendMessage(text = draft) {
    const content = text.trim();
    if (!content || chat.isPending) return;
    const next = [...messages, { role: "user", content } as Message];
    setMessages(next);
    setDraft("");
    try {
      const result = await chat.mutateAsync({ messages: next.slice(-8) });
      setMessages(current => [...current, { role: "assistant", content: result.answer }]);
    } catch {
      setMessages(current => [...current, { role: "assistant", content: "The assistant is temporarily unavailable. Please try again or contact sunghapark@skku.edu." }]);
    }
  }

  return (
    <main className="min-h-screen bg-[#081316] text-[#f0f7f5]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#081316]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#b8f0d8] text-[#10201d]"><FlaskConical size={18} /></span><span className="text-sm font-semibold tracking-[0.12em] text-[#d8ebe5]">DNA NANO LAB</span></a>
          <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.16em] text-[#8da7a1] md:flex"><a href="#focus" className="transition hover:text-white">Current focus</a><a href="#team" className="transition hover:text-white">Team</a><a href="#how" className="transition hover:text-white">How it works</a></nav>
          <a href="https://dnanano.skku.edu/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#aee2ca] hover:text-white">Legacy site <ExternalLink size={13} /></a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_5%,rgba(41,184,143,0.18),transparent_35%),linear-gradient(115deg,#081316_0%,#0b2023_47%,#0a1417_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-40 mix-blend-screen lg:block" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 lg:grid-cols-[1.04fr_.96fr] lg:px-10 lg:pb-24 lg:pt-24">
          <div className="max-w-2xl self-center">
            <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8fe7c1]"><Sparkles size={15} /> Applied DNA NanoEngineering Laboratory</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-7xl">Turning digital information into <span className="text-[#a5edce]">recoverable DNA.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#b5c9c5]">Since 2025, the lab has focused on DNA data storage and AI-assisted optimization — designing better ways to encode, read, and recover digital files from DNA.</p>
            <div className="mt-8 flex flex-wrap gap-3">{currentFocus.map(item => <div key={item.label} className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-[#cfe1dc]"><span className="mr-2 font-semibold text-white">{item.value}</span>{item.label}</div>)}</div>
            <div className="mt-8 flex flex-wrap items-center gap-4"><a href="#assistant" className="inline-flex items-center gap-2 rounded-xl bg-[#b8f0d8] px-5 py-3 text-sm font-semibold text-[#11231e] transition hover:bg-white">Ask the assistant <ArrowUpRight size={16} /></a><a href="#how" className="inline-flex items-center gap-2 text-sm text-[#a9c7bf] hover:text-white">See the process <ChevronRight size={16} /></a></div>
          </div>
          <div id="assistant" className="rounded-[1.75rem] border border-[#a5edce]/25 bg-[#0d2527]/85 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9be8c5]">Lab assistant</p><p className="mt-1 text-sm text-[#93aca6]">Short answers first. Detail when you ask.</p></div><div className="rounded-xl bg-[#b8f0d8]/10 p-2.5 text-[#b8f0d8]"><BrainCircuit size={18} /></div></div>
            <div className="mt-5 min-h-[300px] space-y-3 overflow-y-auto pr-1">{conversation.map((message, index) => <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-10 rounded-2xl rounded-br-md bg-[#247b62] px-4 py-3 text-sm leading-6 text-white" : "mr-5 rounded-2xl rounded-bl-md bg-white/[0.075] px-4 py-3 text-sm leading-6 text-[#d9e9e4]"}><Streamdown>{message.content}</Streamdown></div>)}{chat.isPending && <div className="mr-14 rounded-2xl rounded-bl-md bg-white/[0.075] px-4 py-3 text-sm text-[#a2beb6]">Preparing a direct answer…</div>}</div>
            <div className="mt-5 flex items-end gap-2 rounded-2xl border border-white/10 bg-[#07191c] p-2 focus-within:border-[#a5edce]/65"><textarea value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(); } }} placeholder="Try: What is the lab doing now?" rows={2} className="min-h-[54px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-[#6d8880]" /><Button onClick={() => void sendMessage()} disabled={!draft.trim() || chat.isPending} className="h-11 w-11 rounded-xl bg-[#b8f0d8] p-0 text-[#10251f] hover:bg-white" aria-label="Send message"><Send size={17} /></Button></div>
          </div>
        </div>
      </section>

      <section id="focus" className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start"><div><p className="eyebrow">Current research</p><h2 className="section-title">A focused lab for reliable molecular storage.</h2><p className="mt-5 max-w-md leading-7 text-[#9fb8b1]">The public website is old. This current view keeps the explanation centered on the work the lab is doing now.</p></div><div className="grid gap-4 sm:grid-cols-2"><FocusCard icon={<Database size={20} />} number="01" title="DNA data storage" text="Encode digital files into DNA, sequence them back, and reconstruct the original information." /><FocusCard icon={<WandSparkles size={20} />} number="02" title="AI optimization" text="Use AI-assisted methods to search for better sequence, redundancy, and decoding choices." /><FocusCard icon={<CircleHelp size={20} />} number="03" title="Error correction" text="Study how redundancy can recover information affected by substitutions, insertions, deletions, or missing reads." /><FocusCard icon={<Layers3 size={20} />} number="04" title={nextTechnology.title} text={nextTechnology.description} /></div></div>
      </section>

      <section id="how" className="border-y border-white/10 bg-[#0b1c1e]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24"><div className="max-w-2xl"><p className="eyebrow">The idea in plain language</p><h2 className="section-title">From file to DNA — then back again.</h2><p className="mt-5 leading-7 text-[#9fb8b1]">The assistant can explain each step for a general audience or go deeper into coding, sequencing noise, and recovery limits.</p></div><div className="mt-12 grid gap-3 md:grid-cols-5">{[{ n: "01", title: "Encode", text: "File becomes a DNA sequence." }, { n: "02", title: "Protect", text: "Redundancy adds recovery information." }, { n: "03", title: "Store", text: "The designed molecules hold the data." }, { n: "04", title: "Read", text: "Sequencing returns noisy reads." }, { n: "05", title: "Recover", text: "Decoding reconstructs the file." }].map(step => <div key={step.n} className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-5"><span className="text-xs font-semibold tracking-[0.2em] text-[#8fe7c1]">{step.n}</span><h3 className="mt-8 font-display text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#9fb8b1]">{step.text}</p></div>)}</div></div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">Current team</p><h2 className="section-title">The people behind the work.</h2><p className="mt-5 max-w-md leading-7 text-[#9fb8b1]">Current roster supplied for this assistant. Previous students from the historical website are intentionally not shown as current members.</p></div><div className="grid gap-4 sm:grid-cols-2"><TeamGroup title="Integrated students" icon={<Users size={18} />} names={currentStudents} /><TeamGroup title="Researchers" icon={<CheckCircle2 size={18} />} names={currentResearchers} /></div></div><div className="mt-12 rounded-3xl border border-[#a5edce]/15 bg-[#102626] p-6 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="eyebrow">{nextTechnology.status}</p><h3 className="mt-2 font-display text-2xl font-semibold">Ready for your next technology.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#a9c1ba]">{nextTechnology.description}</p></div><a href="mailto:sunghapark@skku.edu" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-[#d7ebe4] hover:border-[#a5edce]/50 hover:text-white">Contact the lab <ArrowUpRight size={16} /></a></div></div></section>

      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-7 text-sm text-[#809a93] sm:flex-row sm:items-center lg:px-10"><p>SKKU Applied DNA NanoEngineering Laboratory · current focus updated for 2025-present</p><div className="flex flex-wrap gap-4">{labSources.map(source => <a key={source.label} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#9fe7c5] hover:text-white">{source.label}<ExternalLink size={13} /></a>)}</div></div></footer>
    </main>
  );
}

function FocusCard({ icon, number, title, text }: { icon: React.ReactNode; number: string; title: string; text: string }) {
  return <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-[#a5edce]/30"><div className="flex items-center justify-between"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#b8f0d8]/10 text-[#a5edce]">{icon}</div><span className="text-xs font-semibold tracking-[0.2em] text-[#718b84]">{number}</span></div><h3 className="mt-7 font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#9fb8b1]">{text}</p></article>;
}

function TeamGroup({ title, icon, names }: { title: string; icon: React.ReactNode; names: string[] }) {
  return <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"><div className="flex items-center gap-2 text-[#a5edce]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#b8f0d8]/10">{icon}</span><h3 className="font-display text-lg font-semibold text-white">{title}</h3></div><div className="mt-6 space-y-3">{names.map(name => <div key={name} className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm text-[#c4d7d1]"><span className="h-1.5 w-1.5 rounded-full bg-[#a5edce]" />{name}</div>)}</div></article>;
}
