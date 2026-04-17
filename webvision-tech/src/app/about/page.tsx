"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Globe, Zap, Eye,
  MessageSquare, Clock, TrendingUp, HeartHandshake, Award,
  Shield, Users, Star, BarChart3,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const C = {
  blue:        "#2563EB", 
  blueMid:     "#1D4ED8", 
  blueLight:   "#EFF6FF", 
  purple:      "#7C3AED", 
  purpleMid:   "#6D28D9",
  purpleLight: "#F5F3FF",
  red:         "#DC2626", 

  dark:        "#0F172A", 
  ink:         "#1E293B", 
  muted:       "#64748B", 
  
  gray50:      "#F8FAFC",
  gray100:     "#F1F5F9", 
  gray200:     "#E2E8F0", 
  gray400:     "#94A3B8",
  gray600:     "#475569",
  
  border:      "#E2E8F0", 
  bg:          "#F8FAFC", 
  white:       "#FFFFFF",
};

function Reveal({ children, delay = 0, className = "" }:
  { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.04, rootMargin: "0px 0px -16px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.58s ease ${delay}ms, transform 0.58s ease ${delay}ms`,
    }}>{children}</div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const dur = 1100, t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const STATS = [
  { n:200, s:"+", l:"Global Clients",     c:C.blue   },
  { n:12,  s:"+", l:"Years Experience",   c:C.purple },
  { n:98,  s:"%", l:"Client Retention",   c:C.blue   },
  { n:500, s:"+", l:"Projects Delivered", c:C.purple },
];

const TRANSPARENCY = [
  { Icon:MessageSquare, n:"01", t:"Weekly Written Updates",
    d:"Every Monday: what shipped, what's planned, and any open blockers — sent before you need to ask.",
    color:C.blue },
  { Icon:Eye, n:"02", t:"Live Project Board Access",
    d:"Permanent real-time view of every task, sprint, and bug. Always open, no meeting required.",
    color:C.purple },
  { Icon:Award, n:"03", t:"Proactive Risk Escalation",
    d:"Scope changes and risks flagged immediately — not at end-of-sprint. Early honesty prevents disasters.",
    color:C.blue },
];

const VALUES = [
  { icon:Eye,            title:"Full Transparency",        desc:"You always know where things stand — no surprises, no hidden issues.",               color:C.blue   },
  { icon:MessageSquare,  title:"Continuous Communication", desc:"We reach out proactively when something needs attention, before it becomes a problem.", color:C.purple },
  { icon:HeartHandshake, title:"Partner Mentality",        desc:"We take ownership of the outcome, not just the task list. Your success is our metric.", color:C.blue   },
  { icon:Clock,          title:"On-Time Delivery",         desc:"We plan realistically and flag scope changes early — every committed timeline is honoured.", color:C.purple },
  { icon:Zap,            title:"Engineering Integrity",    desc:"Strict standards, automated tests, documented decisions. No shortcuts, ever.",          color:C.blue   },
  { icon:TrendingUp,     title:"Continuous Improvement",   desc:"After every sprint we retrospect. We get measurably better with each engagement.",      color:C.purple },
];

const PROCESS = [
  { n:"01", t:"Discovery Call",       d:"We understand your goals and timeline — no forms, just a real conversation.",        color:C.blue,   Icon:Users         },
  { n:"02", t:"Technical Scoping",    d:"Architecture, stack, milestones and a fixed statement of work with no ambiguity.",    color:C.purple, Icon:BarChart3     },
  { n:"03", t:"Sprint-Based Build",   d:"Two-week sprints. Working demo every Friday. Real-time board access at all times.",   color:C.blue,   Icon:Zap           },
  { n:"04", t:"Weekly Status Report", d:"Written update every Monday: what shipped, what's next, blockers — before you ask.", color:C.purple, Icon:MessageSquare },
  { n:"05", t:"QA & Launch",          d:"Automated tests, load testing, and security scan before any deployment goes live.",   color:C.blue,   Icon:Shield        },
  { n:"06", t:"Post-Launch Support",  d:"Monitoring, patching, dedicated channel — we don't disappear after go-live.",        color:C.purple, Icon:Star          },
];

const OFFICES = [
  { city:"Lahore", flag:"🇵🇰", detail:"Headquarters — Engineering Hub", img:"https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=600&auto=format" },
  { city:"London", flag:"🇬🇧", detail:"Client Services & Partnerships", img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format" },
  { city:"Dubai",  flag:"🇦🇪", detail:"MENA Regional Office",           img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format" },
];

const PRINCIPLES = [
  { t:"Client First, Always",           d:"Every decision evaluated against one question: is this the best outcome for the client?" },
  { t:"Honesty Over Comfort",           d:"We deliver difficult news early. We never say what clients want to hear if it conflicts with what they need." },
  { t:"Accountability Without Excuses", d:"When something goes wrong we own it, fix it, and document how to prevent recurrence." },
  { t:"Respect for Everyone's Time",    d:"We come prepared, meet deadlines, and respond within one business day. No ghosting." },
  { t:"Quality is Non-Negotiable",      d:"We do not ship work we would be embarrassed by. Every deliverable goes through peer review." },
  { t:"Confidentiality by Default",     d:"NDA terms are a baseline, not a ceiling, for how we protect your data and business." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily:"'Manrope',sans-serif", color:C.dark }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { font-family: 'Manrope', sans-serif; }

        @keyframes blob-float {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(10px,-8px) scale(1.02); }
          70%     { transform: translate(-6px,10px) scale(.98); }
        }
        @keyframes ping-dot {
          75%,100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes orbit-spin { to { transform: rotate(360deg); } }
        @keyframes float-card {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-6px); }
        }

        .blob-float { animation: blob-float 10s ease-in-out infinite; }
        .ping-dot   { animation: ping-dot 1.6s cubic-bezier(0,0,.2,1) infinite; }
        .gs-img { filter: grayscale(80%) brightness(.88); transition: filter .5s ease; }
        .gs-img:hover { filter: grayscale(0%) brightness(1); }

        /* ── HERO STATS ── */
        .s1-card {
          position: relative; border-radius: 1rem; overflow: hidden;
          transition: transform .3s ease, box-shadow .3s ease; cursor: default;
        }
        .s1-card:hover { transform: translateY(-6px) perspective(500px) rotateX(2deg); box-shadow: 0 24px 56px rgba(0,0,0,.16); }
        .s1-card::after { content:''; position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: rgba(255,255,255,.2); clip-path: polygon(100% 0, 0 0, 100% 100%); }
        .s1-reflect { height: 8px; background: rgba(255,255,255,.12); width: 100%; }

        /* ══════════════════════════════════════════
           SECTION 3 — TRANSPARENCY
           TALL TOWER CARDS arranged as a triptych:
           left card rotates -2deg (leans right),
           centre card stands upright + elevated (Vision Blue fill),
           right card rotates +2deg (leans left).
           Each casts a bold directional shadow.
        ══════════════════════════════════════════ */
        .tower-outer {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          align-items: center;
          position: relative;
          padding: 0 0 16px;
        }
        .tower-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 2.75rem 2rem 2.25rem;
          min-height: 420px;
          border-radius: 1.5rem;
          background: white;
          border: 1px solid ${C.border};
          transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease;
          z-index: 2;
          overflow: hidden;
        }
        .tower-card-left {
          transform: rotate(-2deg) translateX(18px) translateY(8px);
          box-shadow: -10px 24px 56px rgba(37,99,235,.14), 0 4px 12px rgba(0,0,0,.05);
          border-bottom: 4px solid ${C.blue};
          z-index: 2;
        }
        .tower-card-left:hover {
          transform: rotate(0deg) translateX(0) translateY(-4px);
          box-shadow: -4px 32px 72px rgba(37,99,235,.2), 0 8px 24px rgba(0,0,0,.08);
          z-index: 20;
        }
        .tower-card-center {
          background: ${C.blue};
          border-color: transparent;
          box-shadow: 0 32px 80px rgba(37,99,235,.45), 0 10px 36px rgba(37,99,235,.25);
          transform: scale(1.06) translateY(-12px);
          z-index: 10;
        }
        .tower-card-center:hover {
          transform: scale(1.08) translateY(-18px);
          box-shadow: 0 44px 88px rgba(37,99,235,.52);
        }
        .tower-card-right {
          transform: rotate(2deg) translateX(-18px) translateY(8px);
          box-shadow: 10px 24px 56px rgba(109,40,217,.14), 0 4px 12px rgba(0,0,0,.05);
          border-bottom: 4px solid ${C.purple};
          z-index: 2;
        }
        .tower-card-right:hover {
          transform: rotate(0deg) translateX(0) translateY(-4px);
          box-shadow: 4px 32px 72px rgba(109,40,217,.2), 0 8px 24px rgba(0,0,0,.08);
          z-index: 20;
        }
        /* Giant faded number at card bottom */
        .tower-num {
          position: absolute;
          bottom: -10px; right: 12px;
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -6px;
          pointer-events: none;
          user-select: none;
        }

        /* ══════════════════════════════════════════
           SECTION 4 — VALUES
           Deep navy background.
           3-D SQUARE CARDS — each card is a solid
           dark surface panel with a strong, hard
           offset shadow in brand colour (blue cards
           shadow right, purple cards shadow left),
           creating a tangible raised-block illusion.
        ══════════════════════════════════════════ */
        .vals-bg {
          background: #0b1221;
          position: relative;
          overflow: hidden;
        }
        .vals-bg::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }
        /* Subtle blue glow top-left */
        .vals-bg::after {
          content: '';
          position: absolute;
          top: -120px; left: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .vals-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          position: relative;
          z-index: 2;
        }
        .val-card {
          background: #121c2e;
          border-radius: 1.25rem;
          padding: 2rem 1.75rem;
          position: relative;
          overflow: hidden;
          transition: transform .28s ease;
          cursor: default;
          border: 1px solid rgba(255,255,255,.06);
        }
        /* Hard offset shadow = raised block illusion */
        .val-blue  { box-shadow:  7px 7px 0 0 ${C.blue},   9px 9px 0 0 rgba(37,99,235,.18); }
        .val-purp  { box-shadow: -7px 7px 0 0 ${C.purple}, -9px 9px 0 0 rgba(109,40,217,.18); }
        .val-blue:hover  { transform: translate(-3px,-4px); box-shadow:  10px 11px 0 0 ${C.blue},   12px 13px 0 0 rgba(37,99,235,.2); }
        .val-purp:hover  { transform: translate(3px,-4px);  box-shadow: -10px 11px 0 0 ${C.purple}, -12px 13px 0 0 rgba(109,40,217,.2); }
        /* Diagonal colour slash top-right */
        .val-card::after {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 56px; height: 56px;
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          opacity: .15;
        }
        .val-blue::after  { background: ${C.blue}; }
        .val-purp::after  { background: ${C.purple}; }
        .val-icon-box {
          width: 46px; height: 46px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
        }
        .val-footer {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-top: 1.5rem; padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,.06);
        }
        .val-big-num {
          font-size: 2.5rem; font-weight: 800;
          line-height: 1; letter-spacing: -2px;
        }

        /* ══════════════════════════════════════════
           SECTION 7 — PRINCIPLES (Our Code)
           Light blue-purple gradient bg.
           Square cards with:
           • Coloured filled top block (icon inside)
           • White body with title + description
           • Bold hard-offset shadow same direction
             as Values section for visual consistency
        ══════════════════════════════════════════ */
        .prins-bg {
          background: linear-gradient(140deg, #eef2ff 0%, #f5f3ff 50%, #f0f9ff 100%);
          position: relative; overflow: hidden;
        }
        .prins-bg::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(37,99,235,.055) 1px, transparent 1px);
          background-size: 26px 26px;
          pointer-events: none;
        }
        .prins-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          position: relative; z-index: 2;
        }
        .prin-card {
          background: white;
          border-radius: 1.25rem;
          overflow: hidden;
          transition: transform .28s ease, box-shadow .28s ease;
          cursor: default;
        }
        .prin-blue   { border: 1.5px solid rgba(37,99,235,.12);  box-shadow:  7px 7px 0 0 ${C.blue}; }
        .prin-purple { border: 1.5px solid rgba(109,40,217,.12); box-shadow: -7px 7px 0 0 ${C.purple}; }
        .prin-blue:hover   { transform: translate(-3px,-3px); box-shadow:  10px 10px 0 0 ${C.blue}; }
        .prin-purple:hover { transform: translate(3px,-3px);  box-shadow: -10px 10px 0 0 ${C.purple}; }
        /* Coloured top block */
        .prin-top {
          height: 90px;
          display: flex; align-items: flex-end;
          padding: 0 1.5rem 1rem;
          position: relative; overflow: hidden;
        }
        .prin-top-circle {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,.22);
          border: 2px solid rgba(255,255,255,.35);
          display: flex; align-items: center; justify-content: center;
        }
        /* Big number watermark in top block */
        .prin-top-num {
          position: absolute; right: 14px; bottom: 4px;
          font-size: 4rem; font-weight: 800; line-height: 1;
          letter-spacing: -3px; color: rgba(255,255,255,.14);
          pointer-events: none; user-select: none;
        }
        .prin-body { padding: 1.25rem 1.5rem 1.5rem; }

        /* Process cycle */
        .cycle-wrap { position:relative; width:600px; height:600px; margin:0 auto; }
        .cycle-connector { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:360px; height:360px; border-radius:50%; border:2px dashed rgba(37,99,235,.2); pointer-events:none; z-index:1; }
        .cycle-center { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:10; }
        .cycle-node { position:absolute; width:160px; text-align:center; z-index:5; }
        .cycle-icon { width:70px; height:70px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 8px; border:3px solid white; box-shadow:0 8px 28px rgba(0,0,0,.14); position:relative; transition:transform .3s ease,box-shadow .3s ease; cursor:default; }
        .cycle-icon:hover { transform:scale(1.12); box-shadow:0 14px 40px rgba(0,0,0,.2); }
        .cycle-ring { position:absolute; inset:-9px; border-radius:50%; border:2px dashed rgba(37,99,235,.18); animation:orbit-spin 18s linear infinite; }

        /* Office cards */
        .s6-card { display:flex; flex-direction:column; border-radius:1.25rem; overflow:hidden; background:rgba(241,245,249,.7); border:1px solid rgba(226,232,240,.9); box-shadow:0 2px 16px rgba(0,0,0,.06); transition:transform .3s ease,box-shadow .3s ease; }
        .s6-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(0,0,0,.12); }
        .s6-card-active { background:${C.blue}!important; box-shadow:0 20px 50px rgba(37,99,235,.38)!important; border-color:transparent!important; transform:translateY(-6px); }

        .btn-cta { background:linear-gradient(135deg,${C.blue},${C.purple}); background-size:200%; transition:background-position .45s,box-shadow .28s,transform .18s; }
        .btn-cta:hover { background-position:right; box-shadow:0 10px 28px rgba(37,99,235,.32); transform:translateY(-1px); }

        @media (max-width:900px) {
          .tower-outer { grid-template-columns:1fr; gap:2rem; }
          .tower-card-left,.tower-card-right { transform:none; }
          .tower-card-center { transform:none; }
          .vals-grid { grid-template-columns:1fr 1fr; }
          .prins-grid { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:600px) {
          .vals-grid,.prins-grid { grid-template-columns:1fr; }
          .val-purp  { box-shadow: 7px 7px 0 0 ${C.purple}; }
          .val-purp:hover { transform:translate(-3px,-4px); box-shadow:10px 11px 0 0 ${C.purple}; }
          .prin-purple { box-shadow:7px 7px 0 0 ${C.purple}; }
          .prin-purple:hover { transform:translate(-3px,-3px); box-shadow:10px 10px 0 0 ${C.purple}; }
        }
      `}</style>

      <Navbar />

      /* ─── Standardized Color Object ─── */


{/* ════ 1. ABOUT HERO (Fixed Build Error: Infographic Connect Style) ════ */}
<section aria-label="About Hero"
  style={{ background: C.bg, paddingTop: 140, paddingBottom: 160 }}
  className="relative overflow-hidden">
  
  <div className="container mx-auto px-6 md:px-16 relative z-10">
    <div className="text-center mb-20">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(37,99,235,.09)", color: C.blue, border: `1px solid rgba(37,99,235,.2)` }}>
        Growth Story
      </div>
      <h1 className="font-extrabold tracking-tighter text-gray-900 mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        Our Technical <span style={{ color: C.blue }}>Milestones</span>
      </h1>
      <p className="max-w-2xl mx-auto text-gray-500 text-lg font-light">
        A Lahore-based engineering powerhouse scaling digital frontiers with global partners.
      </p>
    </div>

    <div className="relative">
      {/* --- Horizontal Bridge Line (Matches your reference image) --- */}
      <div className="hidden lg:block absolute bottom-[-50px] left-[12.5%] right-[12.5%] h-0.5" 
           style={{ background: C.gray200 }} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {[
          { n: 200, s: "+", l: "Global Clients", d: "Delivering excellence across 15+ countries.", c: C.blue, i: "🌐" },
          { n: 12, s: "+", l: "Years Exp", d: "A decade of deep-tech engineering rigor.", c: "#2DD4BF", i: "⏳" },
          { n: 98, s: "%", l: "Retention", d: "Trusted by long-term strategic partners.", c: "#F43F5E", i: "🛡️" },
          { n: 500, s: "+", l: "Projects", d: "Shipped enterprise-grade MENN solutions.", c: "#F59E0B", i: "🚀" }
        ].map((s, i) => (
          <div key={i} className="relative group">
            <div className="bg-white rounded-[1.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full transition-all hover:-translate-y-2 duration-500">
              
              {/* --- Colored Header --- */}
              <div className="p-6 text-white" style={{ background: s.c }}>
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Pillar 0{i+1}</h4>
                <p className="text-xs leading-relaxed font-light line-clamp-3">{s.d}</p>
              </div>

              {/* --- White Body --- */}
              <div className="p-8 pt-10 bg-white flex flex-col items-start relative flex-grow">
                <div className="absolute top-[-25px] right-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl border border-gray-50">
                  {s.i}
                </div>

                <div className="text-4xl font-black tracking-tighter mb-1 opacity-10" style={{ color: C.dark }}>
                  0{i+1}
                </div>
                
                <p className="text-3xl font-extrabold tracking-tighter mb-1" style={{ color: s.c }}>
                   {s.n}{s.s}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {s.l}
                </p>
              </div>

              {/* --- The "Tab" Connector at bottom of card --- */}
              <div 
                className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-b-lg"
                style={{ background: s.c }} 
              />
            </div>

            {/* --- Vertical Connector Line --- */}
            <div className="hidden lg:block absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-0.5 h-[50px]"
                 style={{ background: C.gray200 }} />
            
            {/* --- Circle dot at the bottom endpoint --- */}
            <div className="hidden lg:block absolute bottom-[-56px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm" 
                 style={{ background: s.c }} />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ══ 2. MISSION & VISION ══ */}
      <section aria-label="Mission and Vision" className="py-20 md:py-28 bg-white" style={{ borderBottom:`1px solid ${C.border}` }}>
        <div className="container mx-auto px-6 md:px-16">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[.32em] mb-3" style={{ color:C.blue }}>Who We Are</p>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)",color:C.dark }}>Our Mission &amp; Vision</h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              { color:C.blue,   Icon:Zap,   label:"Our Mission", num:"01", body:"To deliver software that solves real business problems — on time, within scope, built to last. We partner at every stage of the product lifecycle, ensuring every solution creates measurable impact." },
              { color:C.purple, Icon:Globe, label:"Our Vision",  num:"02", body:"To be the most trusted technology partner for ambitious businesses worldwide — recognised not just for what we build, but for how we build it. Engineering excellence and transparency as non-negotiable standards." },
            ].map((card, i) => (
              <Reveal key={i} delay={i*90}>
                <div className="s1-card" style={{ background:card.color }}>
                  <div className="absolute top-3 right-4 font-extrabold text-sm z-20" style={{ color:"rgba(255,255,255,.4)" }} aria-hidden="true">{card.num}</div>
                  <div className="p-10 relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background:"rgba(255,255,255,.18)" }}>
                      <card.Icon size={22} className="text-white" aria-hidden="true" />
                    </div>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background:"rgba(255,255,255,.18)",color:"rgba(255,255,255,.9)" }}>{card.label}</span>
                    <div style={{ height:2,width:40,background:"rgba(255,255,255,.4)",borderRadius:4,marginBottom:16 }} />
                    <p className="text-sm leading-relaxed" style={{ color:"rgba(255,255,255,.75)" }}>{card.body}</p>
                  </div>
                  <div className="s1-reflect" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. TRANSPARENCY — TALL TOWER CARDS FACING EACH OTHER ══ */}
      <section aria-label="Transparency Promise" className="py-20 md:py-28" style={{ background:C.bg,borderBottom:`1px solid ${C.border}` }}>
        <div className="container mx-auto px-6 md:px-16">
          <Reveal className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.32em] mb-3" style={{ color:C.blue }}>Our Promise</p>
                <h2 className="font-extrabold tracking-tight" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)",color:C.dark }}>
                  We don't hide things<br />from our clients.
                </h2>
              </div>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color:C.muted }}>
                From day one you are looped into every decision, every blocker, every risk — in writing, before you ask.
              </p>
            </div>
          </Reveal>

          {/* TOWER TRIPTYCH */}
          <div className="tower-outer">
            {TRANSPARENCY.map((item, i) => {
              const isCenter = i === 1;
              const cls = i === 0 ? "tower-card tower-card-left"
                        : i === 2 ? "tower-card tower-card-right"
                        : "tower-card tower-card-center";
              return (
                <Reveal key={i} delay={i*80}>
                  <div className={cls}>
                    {/* Large icon */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: isCenter ? "rgba(255,255,255,.2)" : `${item.color}12` }}>
                      <item.Icon size={30} style={{ color: isCenter ? "white" : item.color }} aria-hidden="true" />
                    </div>
                    {/* Step label */}
                    <span className="text-xs font-bold uppercase tracking-[.28em] mb-3 block"
                      style={{ color: isCenter ? "rgba(255,255,255,.6)" : item.color }}>
                      Step {item.n}
                    </span>
                    {/* Title */}
                    <h3 style={{ fontSize:"1.15rem", fontWeight:800, lineHeight:1.25, marginBottom:"1rem",
                      color: isCenter ? "white" : C.dark }}>
                      {item.t}
                    </h3>
                    {/* Accent bar */}
                    <div style={{ height:3, width:44, borderRadius:2, marginBottom:"1.25rem",
                      background: isCenter ? "rgba(255,255,255,.4)" : item.color }} />
                    {/* Description */}
                    <p className="text-sm leading-relaxed"
                      style={{ color: isCenter ? "rgba(255,255,255,.7)" : C.muted }}>
                      {item.d}
                    </p>
                    <div style={{ flex:1 }} />
                    {/* Bottom pill badge */}
                    <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                      style={{
                        background: isCenter ? "rgba(255,255,255,.16)" : `${item.color}10`,
                        border: `1px solid ${isCenter ? "rgba(255,255,255,.22)" : `${item.color}25`}`,
                        fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em",
                        color: isCenter ? "rgba(255,255,255,.9)" : item.color,
                      }}>
                      <item.Icon size={11} aria-hidden="true" /> Always active
                    </div>
                    {/* Giant watermark number */}
                    <span className="tower-num"
                      style={{ color: isCenter ? "rgba(255,255,255,.06)" : `${item.color}0c` }}
                      aria-hidden="true">{item.n}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={280} className="mt-16">
            <blockquote className="flex items-center gap-4 p-5 rounded-xl bg-white"
              style={{ border:`1.5px solid rgba(37,99,235,.18)`, borderLeft:`4px solid ${C.blue}` }}>
              <Award size={18} style={{ color:C.blue,flexShrink:0 }} aria-hidden="true" />
              <p className="font-semibold text-sm" style={{ color:C.dark }}>
                "Transparency is not a feature we offer — it is the way we operate."
                <span className="font-normal ml-2" style={{ color:C.muted }}>— WebVision Founding Principle</span>
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ══ 4. VALUES — 3-D SQUARE CARDS ON DEEP NAVY ══ */}
      <section aria-label="Our Values" className="vals-bg py-24 md:py-32" style={{ borderBottom:`1px solid rgba(255,255,255,.05)` }}>
        <div className="container mx-auto px-6 md:px-16">
          <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.32em] mb-3" style={{ color:"rgba(99,149,255,.9)" }}>What We Stand For</p>
              <h2 className="font-extrabold tracking-tight" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)",color:"white" }}>
                Values that drive<br />every project.
              </h2>
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color:"rgba(255,255,255,.38)" }}>
              Six principles we hold ourselves to on every engagement, without exception.
            </p>
          </Reveal>

          <div className="vals-grid">
            {VALUES.map((v, i) => {
              const isBlue = i % 2 === 0;
              const color  = isBlue ? C.blue : C.purple;
              const cls    = `val-card ${isBlue ? "val-blue" : "val-purp"}`;
              return (
                <Reveal key={i} delay={i*55}>
                  <div className={cls}>
                    <div className="val-icon-box" style={{ background:`${color}22` }}>
                      <v.icon size={22} style={{ color }} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontSize:"0.92rem", fontWeight:700, marginBottom:"0.6rem", color:"white" }}>{v.title}</h3>
                    <p style={{ fontSize:"0.83rem", lineHeight:1.65, color:"rgba(255,255,255,.44)" }}>{v.desc}</p>
                    <div className="val-footer">
                      <span className="val-big-num" style={{ color:`${color}22` }} aria-hidden="true">
                        {String(i+1).padStart(2,"0")}
                      </span>
                      <div style={{ width:36,height:36,borderRadius:9, background:`${color}22`,
                        border:`1px solid ${color}35`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <v.icon size={15} style={{ color }} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 5. PROCESS ══ */}
      <section aria-label="Delivery Process" className="py-20 md:py-28" style={{ background:C.bg,borderBottom:`1px solid ${C.border}` }}>
        <div className="container mx-auto px-6 md:px-16">
          <Reveal className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[.32em] mb-3" style={{ color:C.blue }}>How We Work</p>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)",color:C.dark }}>Our delivery process.</h2>
          </Reveal>
          <Reveal delay={60} className="hidden lg:block">
            <div className="cycle-wrap">
              <div className="cycle-connector" aria-hidden="true" />
              <div className="cycle-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`,boxShadow:`0 8px 24px rgba(37,99,235,.35)` }}>
                  <Zap size={26} className="text-white" aria-hidden="true" />
                </div>
                <p className="font-extrabold text-sm" style={{ color:C.dark }}>Our Process</p>
                <p className="text-xs mt-0.5" style={{ color:C.muted }}>6-Step Delivery</p>
              </div>
              {PROCESS.map((p, i) => {
                const angle = (i * 60) - 90;
                const rad = angle * Math.PI / 180;
                const R = 228, cx = 300, cy = 300;
                const x = cx + R * Math.cos(rad) - 80;
                const y = cy + R * Math.sin(rad) - 65;
                return (
                  <div key={i} className="cycle-node" style={{ left:x, top:y }}>
                    <div className="cycle-icon" style={{ background:p.color }}>
                      <div className="cycle-ring" style={{ borderColor:`${p.color}35` }} aria-hidden="true" />
                      <p.Icon size={26} className="text-white relative z-10" aria-hidden="true" />
                    </div>
                    <p className="font-bold text-xs mt-1" style={{ color:p.color }}>{p.n}</p>
                    <p className="font-bold text-xs mt-0.5" style={{ color:C.dark }}>{p.t}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color:C.muted }}>{p.d}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROCESS.map((p, i) => (
              <Reveal key={i} delay={i*50}>
                <div className="bg-white p-6 rounded-2xl" style={{ border:`1.5px solid ${C.border}` }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ background:p.color }}>
                    <p.Icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color:p.color }}>{p.n}</span>
                  <h3 className="font-bold text-sm mt-1 mb-2" style={{ color:C.dark }}>{p.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color:C.muted }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. GLOBAL PRESENCE ══ */}
      <section aria-label="Global Presence" className="py-20 md:py-28 bg-white" style={{ borderBottom:`1px solid ${C.border}` }}>
        <div className="container mx-auto px-6 md:px-16">
          <Reveal className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.32em] mb-3" style={{ color:C.blue }}>Global Presence</p>
              <h2 className="font-extrabold tracking-tight mb-3" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)",color:C.dark }}>
                Built in Lahore.<br />Trusted worldwide.
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color:C.muted }}>
                With offices on three continents, we serve ambitious companies across fintech, e-commerce, enterprise software, and beyond.
              </p>
            </div>
            <div role="list" className="flex flex-wrap gap-2 max-w-xs">
              {["🇺🇸 US","🇬🇧 UK","🇩🇪 Germany","🇦🇺 AU","🇨🇦 Canada","🇸🇦 KSA","🇳🇱 NL","🇸🇬 SG"].map((c,i) => (
                <span key={i} role="listitem" className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white"
                  style={{ border:`1px solid ${C.border}`,color:C.muted }}>{c}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OFFICES.map((o, i) => {
                const isActive = i === 2;
                return (
                  <div key={i} className={`s6-card ${isActive ? "s6-card-active" : ""}`}>
                    <div className="relative overflow-hidden" style={{ height:200 }}>
                      <img src={o.img} alt={`${o.city} office`} width={600} height={400} loading="lazy" decoding="async"
                        className="gs-img w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,.52) 0%,transparent 55%)" }} />
                      <div className="absolute bottom-4 left-4">
                        <p className="font-extrabold text-xl text-white">{o.city}</p>
                        <p className="text-xs mt-0.5 font-bold" style={{ color:"rgba(255,255,255,.7)" }}>{o.flag}</p>
                      </div>
                    </div>
                    <div className={`px-5 py-4 flex items-center justify-between ${isActive?"bg-transparent":"bg-white"}`}>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color:isActive?"rgba(255,255,255,.8)":C.muted }}>{o.detail}</p>
                      <div className="w-2 h-2 rounded-full" style={{ background:isActive?"rgba(255,255,255,.6)":C.blue }} aria-hidden="true" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 7. PRINCIPLES — SQUARE CARDS WITH COLOURED TOP BLOCK + OFFSET SHADOW ══ */}
      <section aria-label="Business Principles" className="prins-bg py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-16">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.32em] mb-3" style={{ color:C.blue }}>Our Code</p>
              <h2 className="font-extrabold tracking-tight" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)",color:C.dark }}>How we conduct ourselves.</h2>
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color:C.muted }}>
              Operational standards every team member is held to on every project.
            </p>
          </Reveal>

          <div className="prins-grid">
            {PRINCIPLES.map((p, i) => {
              const isBlue = i % 2 === 0;
              const color  = isBlue ? C.blue : C.purple;
              const cls    = `prin-card ${isBlue ? "prin-blue" : "prin-purple"}`;
              return (
                <Reveal key={i} delay={i*55}>
                  <div className={cls}>
                    {/* Coloured top block with icon + watermark number */}
                    <div className="prin-top" style={{ background:color }}>
                      <div className="prin-top-circle">
                        <CheckCircle2 size={20} className="text-white" aria-hidden="true" />
                      </div>
                      <span className="prin-top-num" aria-hidden="true">{String(i+1).padStart(2,"0")}</span>
                    </div>
                    {/* White body */}
                    <div className="prin-body">
                      <span style={{ fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",
                        letterSpacing:".22em",color,display:"block",marginBottom:"0.5rem" }}>
                        Principle {String(i+1).padStart(2,"0")}
                      </span>
                      <h3 style={{ fontSize:"0.95rem",fontWeight:800,lineHeight:1.3,marginBottom:"0.625rem",color:C.dark }}>
                        {p.t}
                      </h3>
                      <p style={{ fontSize:"0.82rem",lineHeight:1.65,color:C.muted }}>{p.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 8. CTA ══ */}
      <section aria-label="Call to Action" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <Reveal>
            <div className="relative rounded-[1.75rem] p-12 md:p-20 text-center overflow-hidden"
              style={{ background:`linear-gradient(135deg,${C.blue} 0%,${C.purple} 100%)` }}>
              <div aria-hidden="true" className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
              <div aria-hidden="true" className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
              <p className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-2 rounded-full"
                style={{ background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.9)" }}>
                Let's Work Together
              </p>
              <h2 className="font-extrabold text-white tracking-tight mb-3" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>
                Ready to build something great?
              </h2>
              <p className="text-white/65 text-sm leading-relaxed mb-9 max-w-sm mx-auto">
                Start with an honest conversation. No commitment, no sales pressure — just clarity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact"
                  className="group flex items-center gap-3 px-10 py-3.5 bg-white rounded-full font-bold text-sm shadow-lg transition-all hover:shadow-xl hover:gap-4"
                  style={{ color:C.blue }}>
                  Start a Project <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/services"
                  className="flex items-center gap-3 px-10 py-3.5 rounded-full font-bold text-sm border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all">
                  View Services
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}