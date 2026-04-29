import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  GraduationCap,
  Megaphone,
  PlayCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import { geminiContent } from '../../lib/geminiContent';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export const GeminiAmbassador: React.FC = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Gemini Ambassador | Sourabh Singh';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-gemini-aurora text-gemini-ink font-geminiBody selection:bg-gemini-cobalt selection:text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-gemini-grid bg-[size:48px_48px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gemini-cobalt/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-gemini-mint/15 blur-[120px]" aria-hidden="true" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          to="/"
          className="font-geminiDisplay text-sm uppercase tracking-[0.3em] text-gemini-ink/70 hover:text-gemini-ink transition"
        >
          Sourabh Singh
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/services"
            className="px-4 py-2 rounded-full border border-gemini-ink/10 text-gemini-ink/70 hover:text-gemini-ink hover:border-gemini-ink/30 transition"
          >
            AI Services
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full bg-gemini-ink text-gemini-paper hover:bg-gemini-ink/90 transition flex items-center gap-2"
          >
            Contact
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <section className="relative z-10 px-6 pb-16 pt-6 md:px-12 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div {...fadeUp} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gemini-ink/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-gemini-ink/70">
              <Sparkles className="h-4 w-4 text-gemini-cobalt" />
              {geminiContent.hero.badge}
            </div>
            <div className="space-y-4">
              <h1 className="font-geminiDisplay text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gemini-ink">
                {geminiContent.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-gemini-dusk max-w-xl">
                {geminiContent.hero.subtitle}
              </p>
            </div>
            <ul className="space-y-3 text-gemini-dusk">
              {geminiContent.hero.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gemini-cobalt" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                to={geminiContent.hero.cta.primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-gemini-cobalt px-6 py-3 text-white text-sm font-semibold shadow-[0_18px_45px_rgba(45,91,255,0.35)] hover:translate-y-[-2px] transition"
              >
                {geminiContent.hero.cta.primary.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to={geminiContent.hero.cta.secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-gemini-ink/15 px-6 py-3 text-sm font-semibold text-gemini-ink/70 hover:text-gemini-ink hover:border-gemini-ink/40 transition"
              >
                {geminiContent.hero.cta.secondary.label}
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[32px] border border-gemini-ink/10 bg-white/80 p-8 shadow-[0_30px_80px_rgba(26,28,43,0.15)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-gemini-ink/50">Ambassador Snapshot</span>
              <span className="text-xs text-gemini-ink/60 font-geminiMono">2026</span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-gemini-ink/10 bg-gemini-paper px-5 py-4">
                <p className="text-sm text-gemini-ink/60">Focus</p>
                <p className="text-lg font-semibold">Gemini demos, campus workshops, builder support</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gemini-ink/10 bg-white px-5 py-4">
                  <p className="text-xs uppercase text-gemini-ink/50">Coverage</p>
                  <p className="text-base font-semibold">Student communities</p>
                </div>
                <div className="rounded-2xl border border-gemini-ink/10 bg-white px-5 py-4">
                  <p className="text-xs uppercase text-gemini-ink/50">Mode</p>
                  <p className="text-base font-semibold">Hands-on AI labs</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gemini-cobalt/20 bg-gemini-cobalt/10 px-4 py-3 text-sm text-gemini-dusk">
              <BadgeCheck className="h-5 w-5 text-gemini-cobalt" />
              Gemini ambassador updates and proof are curated below.
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-gemini-ink/50">Proof</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl">{geminiContent.proof.title}</h2>
            <p className="text-gemini-dusk max-w-2xl">{geminiContent.proof.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {geminiContent.proof.items.map((item, index) => {
              const icons = [BadgeCheck, Users, Megaphone, Sparkles];
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-3xl border border-gemini-ink/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(26,28,43,0.08)]"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-gemini-cobalt" />
                    <span className="text-xs uppercase tracking-[0.2em] text-gemini-ink/50">{item.detail}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gemini-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-gemini-dusk">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div {...fadeUp} className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gemini-ink/50">Showcase</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl">{geminiContent.video.title}</h2>
            <p className="text-gemini-dusk">{geminiContent.video.subtitle}</p>
            <div className="rounded-2xl border border-gemini-ink/10 bg-white/70 px-4 py-3 text-sm text-gemini-dusk">
              {geminiContent.video.caption}
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[28px] border border-gemini-ink/10 bg-white/90 p-4 shadow-[0_28px_70px_rgba(26,28,43,0.12)]"
          >
            {geminiContent.video.embedUrl ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl">
                <iframe
                  className="h-full w-full"
                  src={geminiContent.video.embedUrl}
                  title="Gemini showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : geminiContent.video.fileUrl ? (
              <video
                className="aspect-video w-full rounded-2xl bg-gemini-ink/5"
                controls
                poster={geminiContent.video.poster}
              >
                <source src={geminiContent.video.fileUrl} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="aspect-video w-full rounded-2xl border border-dashed border-gemini-ink/20 bg-gemini-paper flex flex-col items-center justify-center text-center p-6">
                <PlayCircle className="h-12 w-12 text-gemini-cobalt" />
                <p className="mt-4 text-sm text-gemini-dusk">
                  Add your showcase video link to enable the embed.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-gemini-ink/50">Initiatives</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl">{geminiContent.initiatives.title}</h2>
            <p className="text-gemini-dusk max-w-2xl">{geminiContent.initiatives.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {geminiContent.initiatives.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="rounded-3xl border border-gemini-ink/10 bg-white/80 p-6"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gemini-ink/50">
                  <span>{item.timeframe}</span>
                  <Calendar className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gemini-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-gemini-dusk">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gemini-cobalt/10 px-3 py-1 text-xs font-semibold text-gemini-cobalt"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div {...fadeUp} className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gemini-ink/50">Updates</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl">{geminiContent.updates.title}</h2>
            <p className="text-gemini-dusk">{geminiContent.updates.subtitle}</p>
            <div className="mt-6 rounded-2xl border border-gemini-ink/10 bg-white/80 p-5 text-sm text-gemini-dusk flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-gemini-mint" />
              Each update is backed by a demo, a workshop, or a community touchpoint.
            </div>
          </motion.div>
          <div className="space-y-4">
            {geminiContent.updates.items.map((item, index) => {
              const statusStyles: Record<string, string> = {
                Published: 'bg-gemini-mint/15 text-gemini-mint',
                Scheduled: 'bg-gemini-cobalt/10 text-gemini-cobalt',
                Planned: 'bg-gemini-sun/20 text-gemini-dusk',
              };
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-3xl border border-gemini-ink/10 bg-white/90 p-6"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-gemini-ink/50">
                    <span>{item.date}</span>
                    <span className={`rounded-full px-3 py-1 font-semibold ${statusStyles[item.status] || 'bg-gemini-ink/10 text-gemini-ink'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-gemini-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-gemini-dusk">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-gemini-ink/50">Assets</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl">{geminiContent.logos.title}</h2>
            <p className="text-gemini-dusk max-w-2xl">{geminiContent.logos.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {geminiContent.logos.items.map((logo) => (
              <div
                key={logo.src}
                className="rounded-3xl border border-gemini-ink/10 bg-white/90 p-6 flex items-center justify-center min-h-[160px]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 w-auto object-contain mix-blend-multiply"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-gemini-ink/10 bg-gemini-ink text-gemini-paper px-8 py-12 md:px-12 md:py-14 shadow-[0_30px_80px_rgba(26,28,43,0.35)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-gemini-paper/60">Next Steps</p>
              <h2 className="font-geminiDisplay text-3xl md:text-4xl">{geminiContent.cta.title}</h2>
              <p className="text-gemini-paper/70">{geminiContent.cta.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={geminiContent.cta.primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-gemini-paper px-6 py-3 text-sm font-semibold text-gemini-ink hover:bg-white transition"
              >
                {geminiContent.cta.primary.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={geminiContent.cta.secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-gemini-paper/30 px-6 py-3 text-sm font-semibold text-gemini-paper/80 hover:text-gemini-paper hover:border-gemini-paper/60 transition"
              >
                {geminiContent.cta.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 pb-10 md:px-12">
        <div className="mx-auto max-w-6xl flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-gemini-ink/50">
          <span>Gemini Ambassador Portfolio</span>
          <span>Copyright {new Date().getFullYear()} Sourabh Singh</span>
        </div>
      </footer>
    </main>
  );
};
