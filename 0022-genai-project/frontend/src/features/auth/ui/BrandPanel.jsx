import { ArrowUpRight, Sparkles } from "lucide-react";

const models = ["Gemini", "OpenAI", "Claude"];

export function BrandPanel() {
  return (
    <section className="relative hidden min-h-[680px] overflow-hidden rounded-[28px] bg-[#162b25] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
      <div className="brand-glow pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-[#70ad86]/25 blur-3xl" />
      <div className="brand-glow pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#c4ab70]/15 blur-3xl" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
          <Sparkles size={19} strokeWidth={1.8} />
        </div>
        <span className="text-[19px] font-semibold tracking-[-0.04em]">downbot</span>
      </div>

      <div className="relative z-10 max-w-[500px]">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs text-white/75">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a7d6b7]" />
          A clearer way to think with AI
        </div>
        <h1 className="max-w-[470px] text-[42px] font-medium leading-[1.12] tracking-[-0.055em] xl:text-[52px]">
          Good ideas start with a little{" "}
          <span className="font-serif italic text-[#b8d5be]">space.</span>
        </h1>
        <p className="mt-6 max-w-[390px] text-[15px] leading-7 text-white/65">
          One calm place for your conversations with the AI tools you already
          love.
        </p>

        <div className="mt-10 flex items-center gap-2.5">
          {models.map((model) => (
            <span
              key={model}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[11px] tracking-wide text-white/80"
            >
              {model}
            </span>
          ))}
          <span className="ml-1 text-[11px] text-white/45">and more</span>
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-5 text-xs text-white/45">
        <span>Your thoughts, all in one place.</span>
        <ArrowUpRight size={16} />
      </div>
    </section>
  );
}
