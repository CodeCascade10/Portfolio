"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  Download,
  Microscope,
  Trophy,
  BookOpen,
  Briefcase,
  Menu,
  X,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import aiInterviewImage from "@/imagaes/Ai_Interview.png";
import aiSoftwareImage from "@/imagaes/Ai_Software.png";
import codeRagImage from "@/imagaes/Code_Rag.png";
import passportImage from "@/imagaes/passport.png";
import sansadImage from "@/imagaes/Sansad.png";

/* ----------------------------------------------------------------------- */
/*  DATA                                                                    */
/* ----------------------------------------------------------------------- */

const socialLinks = [
  { label: "GitHub", href: "https://github.com/CodeCascade10", icon: GitBranch, accent: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kausik-naskar-60b88b294/", icon: Globe2, accent: false },
  { label: "Kaggle", href: "https://www.kaggle.com/kausiknaskar10", icon: Terminal, accent: false },
  { label: "Codolio", href: "https://codolio.com/profile/Knaskar10", icon: ArrowUpRight, accent: true },
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: 4, label: "Featured Projects", decimals: 0 },
  { value: 2, label: "Research Papers", decimals: 0 },
  { value: 2, label: "Hackathon Wins", decimals: 0, suffix: "+" },
  { value: 1, label: "IEEE Submission", decimals: 0 },
];

const skillGroups = [
  {
    title: "Applied AI",
    items: ["Deep learning", "Computer vision", "LLM systems", "RAG pipelines"],
  },
  {
    title: "Software Engineering",
    items: ["Backend architecture", "REST APIs", "Scalable services", "Reliability engineering"],
  },
  {
    title: "Data & Infrastructure",
    items: ["SQL & NoSQL", "Vector search", "Docker", "Cloud deployment"],
  },
  {
    title: "Core Languages",
    items: ["Python", "Java", "C++", "JavaScript / TypeScript"],
  },
];

const projects = [
  {
    title: "Code RAG Assistant",
    link: "https://code-rag-assistant-hpa58k4ywcy27ehhxhqggx.streamlit.app/",
    description:
      "Retrieval-augmented generation system for natural-language querying over entire code repositories, using embeddings and a vector store for grounded retrieval.",
    tech: ["Python", "LangChain", "OpenAI API", "Vector DB", "Streamlit"],
    category: "AI",
    image: codeRagImage,
  },
  {
    title: "AI Interview System",
    link: "https://ai-interview-jade-phi.vercel.app/",
    description:
      "Full-stack interview preparation platform with AI-driven performance analysis, structured feedback loops, authentication, and session persistence.",
    tech: ["React", "Node.js", "PostgreSQL", "JWT"],
    category: "Full Stack",
    image: aiInterviewImage,
  },
  {
    title: "Software Engineering Team AI",
    link: "https://software-engineering-team-ai.vercel.app/login",
    description:
      "Collaboration platform for engineering teams with AI-assisted project management, task tracking, secure auth, and workflow automation.",
    tech: ["React.js", "Node.js", "PostgreSQL", "REST APIs"],
    category: "Full Stack",
    image: aiSoftwareImage,
  },
  {
    title: "Sansad Attendance Dashboard",
    link: "https://sansadattendance.streamlit.app/",
    description:
      "Analytics dashboard that ingests parliamentary attendance records and surfaces participation trends through structured data pipelines.",
    tech: ["Python", "Streamlit", "APIs", "Data Analytics"],
    category: "Data",
    image: sansadImage,
  },
];

const research = [
  {
    title: "AI-Driven Crop Disease Prediction and Management System",
    link: "https://drive.google.com/file/d/1c-IEGKeb8NKf6PpLeK9Op3uMhS3DoCsg/view",
    status: "Submitted to IEEE · 2025",
    description:
      "A ResNet50-based deep learning framework for crop disease classification, reaching 97.18% accuracy through targeted preprocessing and model tuning.",
    metric: "97.18%",
    metricLabel: "accuracy",
  },
  {
    title: "Vision Transformer-Based Explainable Framework for Lung Cancer Detection",
    link: "https://drive.google.com/file/d/1okmBh_gJKTS4YohVbkuhLiDAOb6dI7f0/view",
    status: "Under review · SIGNASS 2026",
    description:
      "An explainable ViT-based medical imaging framework for lung cancer detection, achieving 99.3% classification accuracy with interpretable attention maps.",
    metric: "99.3%",
    metricLabel: "accuracy",
  },
];

const timeline = [
  {
    title: "B.Tech, Computer Science",
    meta: "Narula Institute of Technology",
    year: "2023 — 2037",
    icon: BookOpen,
  },
  {
    title: "IEEE Research Author",
    meta: "Two papers — published & under review",
    year: "2025",
    icon: Microscope,
  },
  {
    title: "Hackathon Winner",
    meta: "Hack-O-NIT and Smart Bengal Hackathon",
    year: "2025",
    icon: Trophy,
  },
  {
    title: "Backend & Data Systems",
    meta: "Production-grade APIs, RAG pipelines, dashboards",
    year: "2024 — Present",
    icon: Briefcase,
  },
];

const achievements: Array<{ value: number; label: string; suffix?: string }> = [
  { value: 1, label: "Hack-O-NIT 2025 Winner" },
  { value: 8, label: "Smart Bengal Hackathon — Top 8" },
  { value: 4, label: "Featured Projects" },
  { value: 2, label: "Research Publications" },
];

/* ----------------------------------------------------------------------- */
/*  UTILITIES                                                               */
/* ----------------------------------------------------------------------- */

function useCountUp(target: number, decimals = 0, active = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame: number;
    let start: number | null = null;
    const duration = 1400;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);
  return value.toFixed(decimals);
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ----------------------------------------------------------------------- */
/*  NEURAL NETWORK CANVAS (hero signature element)                         */
/* ----------------------------------------------------------------------- */

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number; layer: number };
    let nodes: Node[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 26 : width < 1024 ? 40 : 56;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 1,
        layer: i % 3,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    let raf: number;
    const maxDist = 140;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = n.x - mouseRef.current.x;
        const dy = n.y - mouseRef.current.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 110) {
          const force = (110 - distToMouse) / 110;
          n.x += (dx / (distToMouse || 1)) * force * 0.6;
          n.y += (dy / (distToMouse || 1)) * force * 0.6;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.5;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(124,58,237,${opacity})`);
            grad.addColorStop(1, `rgba(34,211,238,${opacity * 0.8})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        const color = n.layer === 0 ? "124,58,237" : n.layer === 1 ? "34,211,238" : "167,139,250";
        glow.addColorStop(0, `rgba(${color},0.9)`);
        glow.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color},1)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

/* ----------------------------------------------------------------------- */
/*  MAGNETIC BUTTON                                                         */
/* ----------------------------------------------------------------------- */

function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const motionProps = {
    animate: { x: pos.x, y: pos.y },
    transition: { type: "spring" as const, stiffness: 300, damping: 18, mass: 0.4 },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

/* ----------------------------------------------------------------------- */
/*  SECTION HEADER                                                          */
/* ----------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.35em] text-violet-300/70 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-6 bg-gradient-to-r from-violet-500 to-cyan-400" />
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  GLASS PANEL WRAPPER                                                     */
/* ----------------------------------------------------------------------- */

function GlassPanel({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl ${
        glow ? "shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)]" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  MAIN PORTFOLIO                                                          */
/* ----------------------------------------------------------------------- */

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const visibleProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const statsInView = useInView<HTMLDivElement>();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05050a] font-sans text-slate-200 antialiased">
      <style>{`
        @keyframes grid-pan { from { background-position: 0 0; } to { background-position: 64px 64px; } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .bg-grid {
          background-image:
            linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px);
          background-size: 64px 64px;
          animation: grid-pan 12s linear infinite;
        }
        .text-gradient {
          background: linear-gradient(90deg, #fff 10%, #c4b5fd 50%, #67e8f9 90%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .shimmer-border {
          background: linear-gradient(120deg, rgba(124,58,237,0.6), rgba(34,211,238,0.5), rgba(124,58,237,0.6));
          background-size: 200% 100%;
          animation: shimmer 6s linear infinite;
        }
        ::selection { background: rgba(124,58,237,0.4); color: #fff; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          .bg-grid { animation: none; }
          * { scroll-behavior: auto !important; }
        }
      `}</style>

      {/* ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-40" />
      <div className="pointer-events-none fixed -left-40 top-[-10%] z-0 h-[36rem] w-[36rem] rounded-full bg-violet-700/20 blur-[140px]" />
      <div className="pointer-events-none fixed right-[-10%] top-[20%] z-0 h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05050a_85%)]" />

      {/* ---------------------------------------------------------------- */}
      {/* NAV                                                               */}
      {/* ---------------------------------------------------------------- */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "border-white/10 bg-black/60 shadow-[0_8px_32px_-8px_rgba(124,58,237,0.25)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          <a href="#hero" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wide text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-xs text-black">
              KN
            </span>
            <span className="hidden sm:inline">Kausik Naskar</span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-violet-400 after:to-cyan-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-medium text-black shadow-[0_0_20px_-4px_rgba(124,58,237,0.7)] transition hover:shadow-[0_0_28px_-2px_rgba(124,58,237,0.9)]"
            >
              Let&apos;s talk <ArrowRight size={14} />
            </MagneticButton>
          </div>

          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="rounded-lg border border-white/10 p-2 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col p-4 text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="hero"
        ref={heroRef}
        className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-28 sm:px-6"
      >
        <div className="absolute inset-0 -z-10 opacity-70">
          <NeuralCanvas />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-violet-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to AI/ML & research roles
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.03 }}
            className="mb-7 overflow-hidden rounded-full border border-white/15 bg-white/10 p-1 shadow-[0_0_60px_-15px_rgba(124,58,237,0.8)]"
          >
            <Image
              src={passportImage}
              alt="Kausik Naskar"
              width={128}
              height={128}
              priority
              className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-6xl lg:text-7xl"
          >
            Kausik Naskar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            AI/ML Engineer building research-grade models and production systems —
            <span className="text-white"> deep learning, RAG pipelines, and scalable backends.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-4 max-w-xl text-sm text-slate-500 sm:text-base"
          >
            Computer Science undergraduate · Published IEEE researcher · Building AI systems and scalable backends
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_-8px_rgba(124,58,237,0.8)] transition hover:shadow-[0_0_55px_-5px_rgba(34,211,238,0.7)]"
            >
              Explore Projects
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-violet-400/40 hover:bg-white/10"
            >
              <Download size={16} /> Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex items-center gap-3"
          >
            {socialLinks.map(({ label, href, icon: Icon, accent }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`group relative rounded-full border p-3 text-slate-300 transition hover:-translate-y-1 hover:text-white hover:shadow-[0_0_24px_-6px_rgba(124,58,237,0.7)] ${accent ? "border-amber-400/30 bg-amber-500/10 text-amber-200 hover:border-amber-400/50" : "border-white/10 bg-white/[0.03] hover:border-violet-400/40"}`}
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
          style={{ animation: "float-slow 2.4s ease-in-out infinite" }}
        >
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 p-1">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* STATS STRIP                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section ref={statsInView.ref} className="relative z-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => {
            const count = useCountUp(stat.value, stat.decimals ?? 0, statsInView.inView);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center backdrop-blur-xl"
              >
                <p className="font-mono text-2xl font-semibold text-white sm:text-3xl">
                  {count}
                  {stat.suffix ?? ""}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500 sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* ABOUT                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <SectionHeader eyebrow="About" title="The person behind the models" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassPanel className="p-8 sm:p-10">
              <p className="text-base leading-8 text-slate-300 sm:text-lg">
                I'm a Computer Science undergraduate at{" "}
                <span className="text-white">Narula Institute of Technology</span>, focused on
                AI/ML research, backend systems, and data engineering. My work sits at the
                intersection of research rigor and product thinking — I build systems that hold
                up in production, not just in notebooks.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-400">
                Two of my research papers are in the IEEE pipeline, I've shipped several
                full-stack and ML-driven projects end-to-end, and I keep my engineering
                focused on building production-ready AI, backend, and data systems.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "B.Tech Computer Science",
                  "Narula Institute of Technology",
                  "IEEE Research Author",
                  "Hackathon Winner ×2",
                  "4 flagship projects shipped",
                  "Open to AI/ML & full-stack roles",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassPanel glow className="h-full p-8 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/70">Focus areas</p>
              <div className="mt-5 space-y-4">
                {[
                  { label: "AI / ML Research", desc: "Deep learning, ViT, applied research" },
                  { label: "Backend Engineering", desc: "Scalable APIs & data systems" },
                  { label: "RAG & LLM Tooling", desc: "Embeddings, vector search, agents" },
                  { label: "Cloud & DevOps", desc: "AWS basics, Docker, deployment" },
                ].map((item) => (
                  <div key={item.label} className="group flex items-start gap-3 rounded-xl border border-white/[0.05] bg-black/20 p-4 transition hover:border-violet-400/30">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SKILLS                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader eyebrow="Skills" title="Professional toolkit" />
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Focused on building reliable AI systems and production-ready software with strong engineering discipline.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => {
            const { ref, inView } = useInView<HTMLDivElement>();
            return (
              <motion.div
                key={group.title}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: gi * 0.06 }}
              >
                <GlassPanel className="h-full p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300/80">
                    {group.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PROJECTS                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Featured work" title="Selected projects" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition ${
                  filter === category
                    ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-black"
                    : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-2xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.4)]"
              >
                <div className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                  background: "radial-gradient(400px circle at var(--x,50%) var(--y,0%), rgba(124,58,237,0.12), transparent 60%)"
                }} />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-cyan-300">
                    {project.category}
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-slate-400 transition group-hover:text-white"
                  >
                    Visit <ArrowUpRight size={13} />
                  </a>
                </div>
                <div className="relative mt-5 overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-black/20">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="relative mt-4 text-xl font-semibold text-white">{project.title}</h3>
                <p className="relative mt-3 text-sm leading-7 text-slate-400">{project.description}</p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/[0.08] px-3 py-1 text-[11px] text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* RESEARCH                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="research" className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader eyebrow="Research" title="Published & submitted work" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {research.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <GlassPanel glow className="h-full p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-violet-300">
                    <Microscope size={14} /> {item.status}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-gradient">{item.metric}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">{item.metricLabel}</p>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:gap-3"
                >
                  Read paper <ArrowRight size={14} />
                </a>
              </GlassPanel>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* EXPERIENCE                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section id="experience" className="relative z-10 mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <SectionHeader eyebrow="Experience" title="Timeline" />
        <div className="relative mt-10 space-y-5">
          <div className="absolute left-[22px] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-violet-500/50 via-cyan-400/30 to-transparent sm:left-[26px]" />
          {timeline.map(({ title, meta, year, icon: Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex gap-5 pl-0"
            >
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-black text-violet-300 shadow-[0_0_20px_-4px_rgba(124,58,237,0.7)] sm:h-13 sm:w-13">
                <Icon size={18} />
              </div>
              <GlassPanel className="flex-1 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium text-white">{title}</h3>
                  <span className="font-mono text-xs text-slate-500">{year}</span>
                </div>
                <p className="mt-1.5 text-sm text-slate-400">{meta}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* ACHIEVEMENTS                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader eyebrow="Achievements" title="Milestones" />
        <AchievementGrid />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* GITHUB ACTIVITY                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <SectionHeader eyebrow="Open source" title="GitHub activity" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <GlassPanel glow className="p-7 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-black">
                  <GitBranch size={18} />
                </div>
                <div>
                  <p className="font-medium text-white">@CodeCascade10</p>
                  <p className="text-xs text-slate-500">Live contribution graph</p>
                </div>
              </div>
              <a
                href="https://github.com/CodeCascade10"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
              >
                View profile <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 p-2">
              <img
                src="https://ghchart.rshah.org/7c3aed/CodeCascade10"
                alt="GitHub contribution graph for CodeCascade10"
                className="w-full opacity-90"
                loading="lazy"
              />
            </div>
          </GlassPanel>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CONTACT                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader eyebrow="Contact" title="Let's build something extraordinary" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassPanel className="h-full p-8">
              <p className="text-slate-400">
                Open to opportunities in AI research, backend engineering, and data systems.
                Reach out — I usually reply within a day.
              </p>
              <div className="mt-7 space-y-4">
                <a
                  href="mailto:kausiknaskar10@gmail.com"
                  className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-violet-300">
                    <Mail size={16} />
                  </span>
                  kausiknaskar10@gmail.com
                </a>
                <a
                  href="tel:+919331519440"
                  className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-cyan-300">
                    <Phone size={16} />
                  </span>
                  +91 93315 19440
                </a>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-violet-300">
                    <MapPin size={16} />
                  </span>
                  Kolkata, West Bengal, India
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="rounded-full border border-white/10 bg-white/[0.03] p-2.5 text-slate-300 transition hover:-translate-y-0.5 hover:border-violet-400/40 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassPanel glow className="h-full p-8">
              <ContactForm />
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center text-xs text-slate-500">
        © 2026 Kausik Naskar. Built with intent — AI/ML engineering & research.
      </footer>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  ACHIEVEMENT GRID (isolated for hook-in-loop safety)                     */
/* ----------------------------------------------------------------------- */

function AchievementCard({ item, index }: { item: (typeof achievements)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const count = useCountUp(item.value, 0, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GlassPanel className="p-6 text-center">
        <p className="font-mono text-3xl font-semibold text-gradient">
          {count}
          {item.suffix ?? ""}
        </p>
        <p className="mt-2 text-sm text-slate-400">{item.label}</p>
      </GlassPanel>
    </motion.div>
  );
}

function AchievementGrid() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {achievements.map((item, index) => (
        <AchievementCard key={item.label} item={item} index={index} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  CONTACT FORM                                                            */
/* ----------------------------------------------------------------------- */

function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-400">
          Name
          <input
            required
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/30"
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-400">
          Email
          <input
            required
            type="email"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/30"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="mt-4 flex flex-col gap-2 text-sm text-slate-400">
        Message
        <textarea
          required
          rows={5}
          className="resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/30"
          placeholder="Tell me about your project or opportunity"
        />
      </label>
      <button
        type="submit"
        className="mt-5 inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_-6px_rgba(124,58,237,0.8)] transition hover:scale-[1.03] hover:shadow-[0_0_32px_-2px_rgba(34,211,238,0.7)]"
      >
        {sent ? "Sent ✓" : "Send message"}
        {!sent && <Send size={15} />}
      </button>
    </form>
  );
}