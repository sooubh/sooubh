import React, { Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Cpu,
  GraduationCap,
  Layers,
  Megaphone,
  PlayCircle,
  Sparkles,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import { Starfield } from '../three/Starfield';
import { Planet } from '../three/Planet';
import { geminiContent } from '../../lib/geminiContent';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const isExternalLink = (href: string) => /^(https?:|mailto:)/.test(href);

const GeminiHeroScene: React.FC = () => (
  <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true }} dpr={[1, 2]}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 6, 6]} intensity={1.1} color="#4285F4" />
      <pointLight position={[-6, -3, 4]} intensity={0.8} color="#34A853" />
      <Starfield />
      <Planet position={[-2.2, 0.2, 0]} color="#4285F4" label="Labs" onClick={() => undefined} scale={0.85} />
      <Planet position={[2.1, -0.6, 0.4]} color="#FBBC05" label="Demos" onClick={() => undefined} scale={0.7} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Suspense>
  </Canvas>
);

export const GeminiAmbassador: React.FC = () => {
  const hasHeroVideo = Boolean(geminiContent.video.embedUrl || geminiContent.video.fileUrl);
  const videoShowcases = geminiContent.video.showcases ?? [];
  const heroHighlights = geminiContent.hero.highlights.slice(0, 2);
  const heroStats = [
    { label: 'Prompt Labs', value: 'Weekly', icon: Cpu },
    { label: 'Builder Demos', value: 'Live', icon: Zap },
    { label: 'Campus Reach', value: 'Community', icon: Layers },
  ];
  const latestUpdate = geminiContent.updates.items[0];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Google Gemini Campus Ambassador | Sourabh Singh';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0b0f14] text-white font-geminiBody selection:bg-gemini-cobalt selection:text-white overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(800px 500px at 10% 0%, rgba(66,133,244,0.18), transparent 60%), radial-gradient(700px 400px at 90% 10%, rgba(52,168,83,0.16), transparent 55%), radial-gradient(600px 400px at 50% 80%, rgba(251,188,5,0.12), transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" aria-hidden="true" />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12">
        <Link to="/" className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <img
              src="/assets/geminiLogo/GoogleStudentAmbassadorLogo.png"
              alt="Google logo"
              className="h-5 w-auto object-contain"
              loading="lazy"
            />
            <span className="h-5 w-px bg-white/20" />
            <img
              src="/assets/geminiLogo/Google Gemini Logo on White.png"
              alt="Google Gemini logo"
              className="h-6 w-auto object-contain"
              loading="lazy"
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-geminiDisplay text-sm uppercase tracking-[0.3em] text-white/70">
              Gemini Campus Ambassador
            </p>
            <p className="text-xs text-white/50">Sourabh Singh</p>
          </div>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/services"
            className="px-4 py-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition"
          >
            AI Services
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full bg-white text-[#0b0f14] hover:bg-white/90 transition flex items-center gap-2"
          >
            Contact
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <section className="relative z-10 px-6 pb-16 pt-6 md:px-12 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <motion.div {...fadeUp} className="space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/70">
              <Sparkles className="h-4 w-4 text-gemini-cobalt" />
              Gemini Campus Ambassador
              <span className="h-3 w-px bg-white/20" />
              <span className="text-white/50">GOOGLE • GEMINI</span>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                <span>Power Box</span>
                <span className="text-gemini-cobalt">System Online</span>
              </div>
              <p className="mt-3 text-sm text-white/70">{geminiContent.hero.badge}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                      <Icon className="h-4 w-4 text-gemini-cobalt" />
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">{stat.label}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{stat.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-geminiDisplay text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                {geminiContent.hero.title}
              </h1>
              <p className="text-base md:text-lg text-white/70 max-w-xl">
                {geminiContent.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {heroHighlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
                  {item}
                </span>
              ))}
            </div>

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
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 hover:text-white hover:border-white/40 transition"
              >
                {geminiContent.hero.cta.secondary.label}
              </Link>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="space-y-4">
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-3 shadow-[0_40px_120px_rgba(15,23,42,0.7)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(66,133,244,0.2),transparent_55%)]" />
              <div className="relative h-[360px] rounded-[30px] border border-white/10 bg-[#0b1019]">
                <GeminiHeroScene />
                <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
                  3D Gemini Field
                </div>
                <div className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white/70">
                  Starfield + orbital labs
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/50">
                  <span>Ambassador</span>
                  <BadgeCheck className="h-4 w-4 text-gemini-cobalt" />
                </div>
                <p className="mt-3 text-sm text-white/70">Gemini demos, campus workshops, builder support.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/50">
                  <span>Latest Drop</span>
                  <Video className="h-4 w-4 text-gemini-mint" />
                </div>
                <p className="mt-3 text-sm text-white/70">{latestUpdate?.title ?? 'Gemini showcase update'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-12 md:px-12 md:pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_0.7fr] items-center">
          <motion.div {...fadeUp} className="rounded-[36px] border border-white/10 bg-white/5 p-5 md:p-7 shadow-[0_40px_120px_rgba(10,12,20,0.7)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Hero Video</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">{geminiContent.video.title}</h3>
                <p className="mt-2 text-sm text-white/60 max-w-lg">{geminiContent.video.subtitle}</p>
              </div>
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
                <Video className="w-4 h-4 text-gemini-cobalt" />
                Fast load
              </span>
            </div>

            <div className="mt-6 relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              {hasHeroVideo ? (
                geminiContent.video.embedUrl ? (
                  <iframe
                    className="h-full w-full"
                    src={geminiContent.video.embedUrl}
                    title={geminiContent.video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={geminiContent.video.poster}
                  >
                    <source src={geminiContent.video.fileUrl ?? ''} type={geminiContent.video.fileType} />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center px-6">
                  <PlayCircle className="h-12 w-12 text-gemini-cobalt" />
                  <p className="text-sm text-white/60">{geminiContent.video.caption}</p>
                  <Link
                    to={geminiContent.video.cta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-gemini-cobalt px-5 py-2 text-xs font-semibold text-white hover:bg-gemini-cobalt/90 transition"
                  >
                    {geminiContent.video.cta.label}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Video Mode</p>
              <p className="mt-3 text-sm text-white/70">Autoplay loop preview for quick Gemini walkthroughs.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
                <span className="rounded-full border border-white/10 px-3 py-1">Muted</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Fast load</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Mobile safe</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Featured</p>
              <p className="mt-3 text-sm text-white/70">Demos, labs, and campus sessions curated weekly.</p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gemini-cobalt"
              >
                Request the full reel
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-8 md:px-12 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Task Tracks</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.tasks.title}</h2>
            <p className="text-white/60 max-w-2xl">{geminiContent.tasks.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {geminiContent.tasks.items.map((task, index) => {
              const statusStyles: Record<string, string> = {
                Mandatory: 'border-gemini-cobalt/40 bg-gemini-cobalt/15 text-gemini-cobalt',
                Booster: 'border-gemini-sun/40 bg-gemini-sun/15 text-gemini-sun',
                'Coming Soon': 'border-gemini-ember/40 bg-gemini-ember/15 text-gemini-ember',
              };
              const isComingSoon = task.status === 'Coming Soon';
              return (
                <motion.div
                  key={task.title}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_45px_rgba(10,12,20,0.35)] flex flex-col"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                    <span className={`rounded-full border px-3 py-1 font-semibold ${statusStyles[task.status] || 'border-white/10 bg-white/5 text-white/70'}`}>
                      {task.status}
                    </span>
                    <span>Monthly</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{task.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{task.description}</p>
                  <div className="mt-6">
                    {isComingSoon ? (
                      <span className="inline-flex items-center justify-center rounded-full border border-gemini-ember/40 bg-gemini-ember/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gemini-ember">
                        {task.cta.label}
                      </span>
                    ) : (
                      <Link
                        to={task.cta.href ?? '/contact'}
                        className="inline-flex items-center justify-center rounded-full bg-gemini-cobalt px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(66,133,244,0.35)] hover:bg-gemini-cobalt/90 transition"
                      >
                        {task.cta.label}
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-8 md:px-12 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Metrics</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.metrics.title}</h2>
            <p className="text-white/60 max-w-2xl">{geminiContent.metrics.subtitle}</p>
          </motion.div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {geminiContent.metrics.items.map((item, index) => {
              const icons = [Users, Megaphone, Sparkles];
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={item.label}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_45px_rgba(10,12,20,0.35)]"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>{item.label}</span>
                    <Icon className="h-4 w-4 text-gemini-cobalt" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-white/60">{item.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Proof</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.proof.title}</h2>
            <p className="text-white/60 max-w-2xl">{geminiContent.proof.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {geminiContent.proof.items.map((item, index) => {
              const icons = [BadgeCheck, Users, Megaphone, Sparkles];
              const Icon = icons[index % icons.length];
              const isExternal = item.link ? isExternalLink(item.link.href) : false;
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(10,12,20,0.35)]"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-gemini-cobalt" />
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">{item.detail}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{item.description}</p>
                  {item.link ? (
                    <a
                      href={item.link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gemini-cobalt hover:text-white transition"
                    >
                      {item.link.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Showcase</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.video.title}</h2>
            <p className="text-white/60">{geminiContent.video.subtitle}</p>
          </motion.div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videoShowcases.map((video, index) => {
              const isExternal = isExternalLink(video.href);
              const cardBody = (
                <>
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    <img
                      src={video.thumbnail}
                      alt={`${video.title} thumbnail`}
                      className="h-28 w-full object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-100"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
                      {video.type}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
                    <span>{video.duration}</span>
                    <span className="text-gemini-cobalt">Watch</span>
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-white">{video.title}</h4>
                  <p className="mt-2 text-xs text-white/60">{video.description}</p>
                </>
              );
              return (
                <motion.div key={video.title} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.05 }}>
                  {isExternal ? (
                    <a
                      href={video.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-gemini-cobalt/40 hover:bg-white/10"
                    >
                      {cardBody}
                    </a>
                  ) : (
                    <Link
                      to={video.href}
                      className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-gemini-cobalt/40 hover:bg-white/10"
                    >
                      {cardBody}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Initiatives</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.initiatives.title}</h2>
            <p className="text-white/60 max-w-2xl">{geminiContent.initiatives.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {geminiContent.initiatives.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                  <span>{item.timeframe}</span>
                  <Calendar className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
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
                {item.outcome ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/70">
                    {item.outcome}
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div {...fadeUp} className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Updates</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.updates.title}</h2>
            <p className="text-white/60">{geminiContent.updates.subtitle}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-gemini-mint" />
              Each update is backed by a demo, a workshop, or a community touchpoint.
            </div>
          </motion.div>
          <div className="space-y-4">
            {geminiContent.updates.items.map((item, index) => {
              const statusStyles: Record<string, string> = {
                Published: 'bg-gemini-mint/15 text-gemini-mint',
                Scheduled: 'bg-gemini-cobalt/10 text-gemini-cobalt',
                Planned: 'bg-gemini-sun/20 text-gemini-sun',
              };
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>{item.date}</span>
                    <span className={`rounded-full px-3 py-1 font-semibold ${statusStyles[item.status] || 'bg-white/10 text-white/70'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{item.description}</p>
                  {item.notes ? (
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-white/50">
                      {item.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Highlights</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.highlights.title}</h2>
            <p className="text-white/60 max-w-2xl">{geminiContent.highlights.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {geminiContent.highlights.items.map((item, index) => {
              const highlightStatusStyles: Record<string, string> = {
                Published: 'bg-gemini-mint/15 text-gemini-mint',
                Scheduled: 'bg-gemini-cobalt/10 text-gemini-cobalt',
                Planned: 'bg-gemini-sun/20 text-gemini-sun',
              };
              const isExternal = item.link ? isExternalLink(item.link.href) : false;
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(10,12,20,0.35)]"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>{item.date}</span>
                    <span className={`rounded-full px-3 py-1 font-semibold ${highlightStatusStyles[item.status] || 'bg-white/10 text-white/70'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{item.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">{item.source}</p>
                  {item.link ? (
                    <a
                      href={item.link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gemini-cobalt hover:text-white transition"
                    >
                      {item.link.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Assets</p>
            <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.logos.title}</h2>
            <p className="text-white/60 max-w-2xl">{geminiContent.logos.subtitle}</p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {geminiContent.logos.items.map((logo) => (
              <div
                key={logo.src}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 flex items-center justify-center min-h-[160px]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-white/5 text-white px-8 py-12 md:px-12 md:py-14 shadow-[0_30px_80px_rgba(10,12,20,0.6)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Next Steps</p>
              <h2 className="font-geminiDisplay text-3xl md:text-4xl text-white">{geminiContent.cta.title}</h2>
              <p className="text-white/60">{geminiContent.cta.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={geminiContent.cta.primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b0f14] hover:bg-white/90 transition"
              >
                {geminiContent.cta.primary.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={geminiContent.cta.secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white hover:border-white/60 transition"
              >
                {geminiContent.cta.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 pb-10 md:px-12">
        <div className="mx-auto max-w-6xl flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-white/50">
          <span>Gemini Ambassador Portfolio</span>
          <span>Copyright {new Date().getFullYear()} Sourabh Singh</span>
        </div>
      </footer>
    </main>
  );
};
