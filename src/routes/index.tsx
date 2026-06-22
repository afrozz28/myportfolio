import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "motion/react";
import {
  Github, Linkedin, Mail, MapPin, Phone, ArrowUpRight, Download,
  Code2, Database, Wrench, Layers, Cpu, GraduationCap, Briefcase,
  ExternalLink, Send, ArrowUp, Sparkles, Award, CheckCircle2,
} from "lucide-react";
import portrait from "@/assets/afroz-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Afroz Mujawar — Java Full Stack Developer" },
      { name: "description", content: "Portfolio of Afroz Mujawar, Java Full Stack Developer from Ichalkaranji building scalable backend systems with Spring Boot, React, PostgreSQL & MongoDB." },
      { property: "og:title", content: "Afroz Mujawar — Java Full Stack Developer" },
      { property: "og:description", content: "Spring Boot · React · PostgreSQL · MongoDB · JWT · OAuth2" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const ROLES = ["Java Developer", "Spring Boot Developer", "Full Stack Developer", "Problem Solver"];

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => {
      setShowTop(window.scrollY > 600);
      const sections = NAV.map(n => document.getElementById(n.id));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= y) { setActive(NAV[i].id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-accent z-[100]"
      />
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald/10 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <Navbar active={active} />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Certifications />
      <GitHubSection />
      <Achievements />
      <Contact />
      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 size-12 rounded-full bg-gradient-accent text-primary-foreground grid place-items-center glow transition-all duration-300 ${showTop ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}`}
      >
        <ArrowUp className="size-5" />
      </button>
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="glass-strong mx-auto max-w-6xl rounded-2xl px-5 py-3 flex items-center justify-between shadow-card">
        <button onClick={() => go("home")} className="flex items-center gap-2 group">
          <span className="size-9 rounded-xl bg-gradient-accent grid place-items-center font-display font-bold text-primary-foreground glow">A</span>
          <span className="font-display font-semibold text-foreground hidden sm:block">Afroz Mujawar<span className="text-accent"></span></span>
        </button>
        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map(n => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${active === n.id ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span layoutId="navdot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-accent" />
                )}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => go("contact")} className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-accent text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity glow">
          Let's Talk <ArrowUpRight className="size-4" />
        </button>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden size-9 grid place-items-center rounded-lg glass">
          <div className="space-y-1">
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mx-auto max-w-6xl mt-2 glass-strong rounded-2xl p-3 grid grid-cols-2 gap-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)} className={`text-left px-3 py-2 rounded-lg text-sm ${active === n.id ? "bg-primary/20 text-accent" : "text-muted-foreground"}`}>
              {n.label}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1500);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDeleting(false); setRoleIdx((roleIdx + 1) % ROLES.length); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <section id="home" className="relative pt-32 pb-20 px-4 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <span className="size-2 rounded-full bg-emerald animate-pulse-glow" />
            <span className="text-sm font-medium text-accent">Available for new opportunities</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5">
            Hi, I'm <span className="text-gradient">Afroz Mujawar</span>
            <br />
            <span className="text-foreground/90 text-3xl sm:text-4xl lg:text-5xl">a </span>
            <span className="text-accent text-3xl sm:text-4xl lg:text-5xl font-mono">{text}</span>
            <span className="blink text-accent text-3xl sm:text-4xl lg:text-5xl">|</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Building scalable backend systems and modern web applications with{" "}
            <span className="text-foreground font-medium">Java, Spring Boot, React,</span> and Cloud Technologies.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 bg-gradient-accent text-primary-foreground px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition glow">
              View Projects <ArrowUpRight className="size-4" />
            </a>
            <a href="/resume.pdf" download className="inline-flex items-center gap-2 glass-strong text-foreground px-5 py-3 rounded-xl font-semibold hover:bg-primary/10 transition">
              <Download className="size-4" /> Download Resume
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-foreground border border-border hover:border-accent transition">
              <Mail className="size-4" /> Contact Me
            </a>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/afrozz28", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/afrozz28/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:afrozmujawar194@gmail.com", label: "Email" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="size-11 grid place-items-center rounded-xl glass hover:bg-primary/20 hover:text-accent hover:-translate-y-0.5 transition-all">
                <s.icon className="size-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative mx-auto">
          <div className="absolute -inset-6 bg-gradient-accent rounded-full opacity-30 blur-3xl animate-blob" />
          <div className="relative size-[280px] sm:size-[340px] lg:size-[400px] rounded-full p-1 bg-gradient-accent glow animate-float">
            <div className="size-full rounded-full overflow-hidden bg-card">
              <img src={portrait} alt="Afroz Mujawar" width={400} height={400} className="size-full object-cover" />
            </div>
          </div>
          {/* Floating tech badges */}
          {[
            { label: "Java", className: "top-2 -left-2 bg-gradient-accent" },
            { label: "Spring", className: "top-1/3 -right-6 bg-gradient-emerald" },
            { label: "React", className: "bottom-8 -left-6 glass-strong" },
            { label: "Docker", className: "-bottom-2 right-8 glass-strong" },
          ].map((b, i) => (
            <div key={b.label} className={`absolute ${b.className} px-3 py-1.5 rounded-full text-xs font-semibold text-primary-foreground shadow-card animate-float`} style={{ animationDelay: `${i * 0.6}s` }}>
              {b.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Reveal helper ---------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <Reveal>
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1 mb-4">
          <Sparkles className="size-3.5 text-accent" />
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">{kicker}</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">{title}</h2>
        {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </Reveal>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const stats = [
    { value: "10+", label: "Projects Built" },
    { value: "8th", label: "Semester B.Tech" },
    { value: "2026", label: "Graduating" },
    { value: "∞", label: "DSA Problems" },
  ];
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker="About Me" title="Crafting backends with intention" subtitle="A final-year CSE student passionate about engineering reliable software." />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <Reveal>
            <div className="glass-strong rounded-3xl p-8 shadow-card">
              <div className="size-14 rounded-2xl bg-gradient-accent grid place-items-center mb-5 glow">
                <Code2 className="size-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">Java Full Stack Developer</h3>
              <p className="text-muted-foreground text-sm mb-6">Ichalkaranji, Kolhapur · India</p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map(s => (
                  <div key={s.label} className="rounded-2xl glass p-4 text-center">
                    <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I am <span className="text-foreground font-semibold">Afroz Mujawar</span>, a final-year B.Tech Computer Science Engineering student at Padmabhooshan Vasantraodada Patil Institute of Technology (PVPIT).
              </p>
              <p>
                I am passionate about building scalable backend systems using <span className="text-accent">Java</span> and <span className="text-accent">Spring Boot</span>. I enjoy developing REST APIs, implementing authentication systems, designing databases, and solving real-world software problems.
              </p>
              <p>
                My experience includes developing full-stack applications, implementing <span className="text-foreground">JWT Authentication</span>, <span className="text-foreground">OAuth2 login systems</span>, database management, and cloud deployment. I continuously improve my skills through hands-on projects and DSA practice.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Clean Code", "REST APIs", "Microservices", "Cloud Native", "DSA", "Open Source"].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full glass text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
const SKILL_GROUPS = [
  { title: "Backend Development", icon: Cpu, items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "JWT", "OAuth2", "Maven"] },
  { title: "Frontend Development", icon: Layers, items: ["React.js", "Vite", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"] },
  { title: "Databases", icon: Database, items: ["PostgreSQL", "MongoDB", "MySQL", "pgAdmin"] },
  { title: "Tools & Platforms", icon: Wrench, items: ["Git", "GitHub", "Postman", "IntelliJ IDEA", "VS Code", "Docker"] },
  { title: "Core CS", icon: Code2, items: ["DSA", "OOP", "DBMS", "Operating Systems", "Software Engineering"] },
];

function Skills() {
  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker="Tech Stack" title="Skills & Toolbelt" subtitle="The technologies I use to design, build, and ship software." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.07}>
              <div className="group relative glass-strong rounded-3xl p-6 h-full shadow-card hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-accent/10 pointer-events-none" />
                <div className="size-12 rounded-2xl bg-gradient-accent grid place-items-center mb-4 group-hover:glow transition-shadow">
                  <g.icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-4">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-secondary/60 border border-border text-xs font-medium hover:bg-primary/20 hover:text-accent hover:border-accent/50 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */
function Education() {
  const items = [
    {
      title: "Bachelor of Technology — Computer Science & Engineering",
      org: "Padmabhooshan Vasantraodada Patil Institute of Technology (PVPIT)",
      meta: "Sangli, Maharashtra · 8th Semester · Graduating 2026",
      desc: "Specializing in software engineering, databases, and full-stack development.",
    },
    {
      title: "Higher Secondary Education (HSC)",
      org: "DKASC College, Ichalkaranji",
      meta: "Science Stream",
      desc: "Foundation in mathematics, physics and computer fundamentals.",
    },
  ];
  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader kicker="Education" title="Academic Journey" />
        <div className="relative pl-8 sm:pl-12">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-primary to-emerald" />
          {items.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative mb-8">
                <div className="absolute -left-[26px] sm:-left-[34px] top-6 size-4 rounded-full bg-gradient-accent ring-4 ring-background glow" />
                <div className="glass-strong rounded-2xl p-6 shadow-card">
                  <div className="flex items-center gap-2 text-accent text-xs font-semibold mb-2">
                    <GraduationCap className="size-4" />
                    {e.meta}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{e.org}</p>
                  <p className="text-sm text-foreground/80">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
const EXPERIENCES = [
  {
    role: "Java Backend Developer Intern",
    org: "Tech Yantra Solutions Pvt. Ltd.",
    period: "Mar 2026 – Present",
    kind: "Internship",
    mode: "On-site",
    current: true,
    points: [
      "Developing RESTful APIs using Java and Spring Boot.",
      "Working with PostgreSQL / MySQL databases and backend business logic.",
      "Implementing authentication and authorization using Spring Security and JWT.",
      "Collaborating with developers on enterprise application development and debugging.",
      "Participating in API testing, deployment, and performance optimization.",
      "Using Git and GitHub for version control and team collaboration.",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "MySQL", "REST APIs", "Git"],
  },
  {
    role: "Java Development Intern",
    org: "CodSoft",
    period: "2024",
    kind: "Internship",
    mode: "Remote",
    current: false,
    points: [
      "Developed an ATM Simulator System using Java with OOP principles.",
      "Implemented user authentication and transaction processing modules.",
      "Built robust console-based applications following software best practices.",
      "Strengthened problem-solving and software engineering fundamentals.",
    ],
    tech: ["Java", "OOP", "Authentication", "Console Apps"],
  },
] as const;

function Experience() {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader kicker="Experience" title="Where I've Worked" />
        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.1}>
              <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-card relative overflow-hidden">
                <div className="absolute -top-20 -right-20 size-64 rounded-full bg-gradient-accent opacity-20 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold mb-2">
                        <Briefcase className="size-4" /> {exp.kind}
                        {exp.current && (
                          <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-emerald/15 text-emerald border border-emerald/30">
                            <span className="size-1.5 rounded-full bg-emerald animate-pulse" /> Current
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-2xl font-bold">{exp.role}</h3>
                      <p className="text-muted-foreground">{exp.org} · <span className="text-foreground/70">{exp.period}</span></p>
                    </div>
                    <span className="glass px-3 py-1 rounded-full text-xs font-medium">{exp.mode}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/85 mt-4">
                    {exp.points.map(t => (
                      <li key={t} className="flex gap-2"><CheckCircle2 className="size-4 text-emerald shrink-0 mt-0.5" />{t}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.tech.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-primary/15 text-accent text-xs font-semibold border border-accent/30">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
const PROJECTS = [
  {
    name: "EcoTrack",
    tagline: "Carbon Footprint Emission Monitoring",
    desc: "Smart environmental platform that analyzes bills via OCR and computes carbon emissions with AI-powered sustainability tips.",
    features: ["OCR bill scanning", "Carbon engine", "Global dashboard", "AI recommendations"],
    tech: ["Spring Boot", "React", "PostgreSQL", "JWT", "OAuth2", "Tailwind"],
    href: "https://github.com/afrozz28",
    live: null,
    accent: "from-emerald to-accent",
  },
  {
    name: "JournalApp",
    tagline: "Personal Journal + Sentiment Analysis",
    desc: "Secure journaling platform with sentiment analysis, JWT authentication, Swagger docs and Docker deployment.",
    features: ["JWT Security", "Sentiment AI", "Swagger Docs", "Dockerized"],
    tech: ["Java", "Spring Boot", "MongoDB", "JWT", "Docker"],
    href: "https://github.com/afrozz28/JournalApp",
    live: "https://journalapp-gipi.onrender.com/swagger-ui/index.html",
    accent: "from-primary to-accent",
  },
  {
    name: "Construction Material Request",
    tagline: "Enterprise Workflow Backend",
    desc: "Backend system that streamlines construction material requests with approval workflows and role-based access control.",
    features: ["Role-based access", "Approval workflow", "REST APIs", "Validation"],
    tech: ["Java", "Spring Boot", "Spring Security", "REST", "Maven"],
    href: "https://github.com/afrozz28/Construction-Material-Request-Backend",
    live: null,
    accent: "from-accent to-primary",
  },
  {
    name: "ATM Simulator System",
    tagline: "Banking Operations Simulation",
    desc: "Java-based banking simulation enabling deposit, withdrawal, balance inquiry and secure login authentication.",
    features: ["Login auth", "Deposits", "Withdrawals", "Transactions"],
    tech: ["Java", "OOP", "Collections"],
    href: "https://github.com/afrozz28/ATM-simulated-system",
    live: null,
    accent: "from-primary to-emerald",
  },
];

function Projects() {
  const [filter, setFilter] = useState("All");
  const allTech = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tech)))].slice(0, 9);
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tech.includes(filter));

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker="Featured Work" title="Selected Projects" subtitle="A look at the systems I've architected, shipped and open-sourced." />
        <Reveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allTech.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${filter === t ? "bg-gradient-accent text-primary-foreground border-transparent glow" : "glass border-border text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="group relative glass-strong rounded-3xl p-7 h-full shadow-card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                <div className={`absolute -top-24 -right-24 size-56 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-3xl group-hover:opacity-40 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                      <p className="text-sm text-accent font-medium">{p.tagline}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={p.href} target="_blank" rel="noreferrer" aria-label="GitHub" className="size-9 grid place-items-center rounded-xl glass hover:bg-primary/20 hover:text-accent transition">
                        <Github className="size-4" />
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live" className="size-9 grid place-items-center rounded-xl glass hover:bg-primary/20 hover:text-accent transition">
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-5">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-foreground/80">
                        <span className="size-1.5 rounded-full bg-accent" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-secondary/60 border border-border text-[11px] font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */
function Certifications() {
  const certs = [
    { title: "Java Development Internship", issuer: "CodSoft", icon: Award },
    { title: "Java Programming Certification", issuer: "Self-paced", icon: Code2 },
    { title: "Spring Boot Learning Certificate", issuer: "Online Course", icon: Layers },
    { title: "DSA Achievements", issuer: "Practice Platforms", icon: Cpu },
  ];
  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker="Credentials" title="Certifications & Achievements" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="glass-strong rounded-3xl p-6 h-full text-center shadow-card hover:-translate-y-1 hover:glow transition-all">
                <div className="size-14 mx-auto rounded-2xl bg-gradient-accent grid place-items-center mb-4 glow">
                  <c.icon className="size-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GITHUB ---------------- */
function GitHubSection() {
  return (
    <section id="github" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker="Open Source" title="GitHub Presence" subtitle="@afrozz28 — where I build, learn and share in public." />
        <Reveal>
          <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-card">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Repositories", value: "20+" },
                { label: "Languages", value: "Java · JS" },
                { label: "Focus", value: "Backend · Full Stack" },
              ].map(s => (
                <div key={s.label} className="glass rounded-2xl p-5 text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{s.label}</div>
                  <div className="font-display text-xl font-bold text-gradient">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden glass p-3 mb-5">
              <img
                src="https://ghchart.rshah.org/3b82f6/afrozz28"
                alt="GitHub contributions of afrozz28"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <a href="https://github.com/afrozz28" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-accent text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition glow">
                <Github className="size-4" /> Visit GitHub Profile
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- ACHIEVEMENTS ---------------- */
function Achievements() {
  const items = [
    "Built multiple Java Full Stack projects from scratch",
    "Designed secure authentication systems using JWT & OAuth2",
    "Created enterprise-grade backend applications",
    "Consistent DSA practice and problem solving",
    "Published projects and source code on GitHub",
    "Developed OCR-based environmental monitoring solutions",
  ];
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader kicker="Milestones" title="Achievements" />
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((t, i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="glass rounded-2xl p-5 flex gap-3 items-start hover:bg-primary/10 transition">
                <div className="size-9 rounded-xl bg-gradient-emerald grid place-items-center shrink-0">
                  <CheckCircle2 className="size-5 text-primary-foreground" />
                </div>
                <p className="text-sm text-foreground/90 pt-1">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !form.message) { setStatus("error"); return; }
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    const subject = encodeURIComponent(form.subject || "Portfolio enquiry");
    window.location.href = `mailto:afrozmujawar194@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  const info = [
    { icon: Mail, label: "Email", value: "afrozmujawar194@gmail.com", href: "mailto:afrozmujawar194@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 72489 24842", href: "tel:+917248924842" },
    { icon: MapPin, label: "Location", value: "Deccan, Pune, MH", href: "#" },
    { icon: Github, label: "GitHub", value: "github.com/afrozz28", href: "https://github.com/afrozz28" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/afrozz28", href: "https://www.linkedin.com/in/afrozz28/" },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker="Get In Touch" title="Let's build something great" subtitle="Have a project, role, or idea? My inbox is always open." />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <Reveal>
            <div className="glass-strong rounded-3xl p-7 shadow-card h-full">
              <h3 className="font-display text-xl font-semibold mb-5">Contact Information</h3>
              <ul className="space-y-3">
                {info.map(i => (
                  <li key={i.label}>
                    <a href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-primary/15 transition group">
                      <div className="size-10 rounded-xl bg-gradient-accent grid place-items-center shrink-0">
                        <i.icon className="size-5 text-primary-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">{i.label}</div>
                        <div className="text-sm font-medium truncate group-hover:text-accent transition-colors">{i.value}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="glass-strong rounded-3xl p-7 shadow-card space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your Name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Jane Doe" />
                <Field label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="jane@company.com" />
              </div>
              <Field label="Subject" value={form.subject} onChange={v => setForm({ ...form, subject: v })} placeholder="Project enquiry" />
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-widest">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={1000}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition resize-none"
                />
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gradient-accent text-primary-foreground px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition glow">
                <Send className="size-4" /> Send Message
              </button>
              {status === "sent" && <p className="text-emerald text-sm">✓ Opening your email client...</p>}
              {status === "error" && <p className="text-destructive text-sm">Please fill in name, valid email and message.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={200}
        className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="px-4 pb-8 pt-10">
      <div className="max-w-6xl mx-auto glass-strong rounded-3xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
        <div className="flex items-center gap-2">
          <span className="size-8 rounded-lg bg-gradient-accent grid place-items-center font-display font-bold text-primary-foreground text-sm">A</span>
          <span className="font-display font-semibold">Afroz Mujawar</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Afroz Mujawar · Crafted with Java, React & ☕</p>
        <div className="flex gap-2">
          <a href="https://github.com/afrozz28" target="_blank" rel="noreferrer" aria-label="GitHub" className="size-9 grid place-items-center rounded-lg glass hover:text-accent transition"><Github className="size-4" /></a>
          <a href="https://www.linkedin.com/in/afrozz28/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="size-9 grid place-items-center rounded-lg glass hover:text-accent transition"><Linkedin className="size-4" /></a>
          <a href="mailto:afrozmujawar194@gmail.com" aria-label="Email" className="size-9 grid place-items-center rounded-lg glass hover:text-accent transition"><Mail className="size-4" /></a>
        </div>
      </div>
    </footer>
  );
}
