import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  Code2, 
  Sparkles, 
  Terminal, 
  ExternalLink, 
  Mail, 
  Layers, 
  Database, 
  Cpu, 
  Copy, 
  Check, 
  ArrowUpRight,
  Move,
  RotateCcw,
  Boxes,
  Zap,
  Globe
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin);

// Tech stack data for the interactive draggable playground
const draggableTechs = [
  { name: 'React', bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/40', text: 'text-cyan-400', icon: '⚛️' },
  { name: 'TypeScript', bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/40', text: 'text-blue-400', icon: '📘' },
  { name: 'Node.js', bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/40', text: 'text-emerald-400', icon: '🟢' },
  { name: 'GSAP Animations', bg: 'from-lime-500/20 to-emerald-500/20', border: 'border-lime-500/40', text: 'text-lime-400', icon: '✨' },
  { name: 'Tailwind CSS', bg: 'from-sky-500/20 to-teal-500/20', border: 'border-sky-500/40', text: 'text-sky-400', icon: '🎨' },
  { name: 'PostgreSQL', bg: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-400/40', text: 'text-blue-300', icon: '🐘' },
  { name: 'MongoDB', bg: 'from-green-600/20 to-emerald-600/20', border: 'border-green-400/40', text: 'text-green-300', icon: '🍃' },
  { name: 'Express.js', bg: 'from-zinc-500/20 to-neutral-500/20', border: 'border-zinc-400/40', text: 'text-zinc-300', icon: '⚡' },
  { name: 'Docker', bg: 'from-sky-600/20 to-blue-700/20', border: 'border-sky-400/40', text: 'text-sky-300', icon: '🐳' },
  { name: 'Git & GitHub', bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/40', text: 'text-orange-400', icon: '🐙' },
  { name: 'REST APIs', bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/40', text: 'text-purple-400', icon: '🔌' },
  { name: 'Vite', bg: 'from-violet-500/20 to-amber-500/20', border: 'border-violet-400/40', text: 'text-violet-300', icon: '⚡' }
];

const projects = [
  {
    title: 'Interactive Portfolio Experience',
    description: 'Portafolio web con microinteracciones GSAP, soporte Draggable con físicas y estilizado con Tailwind CSS moderno.',
    tags: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Vite'],
    category: 'Frontend',
    demoUrl: '#',
    githubUrl: 'https://github.com/sbernillaanthon-2005/sbernillaanthon-2005',
    featured: true,
  },
  {
    title: 'Full Stack App & RESTful Architecture',
    description: 'Plataforma web con autenticación JWT, persistencia relacional con PostgreSQL, arquitectura multicapa y validación de esquemas.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'TypeScript', 'Docker'],
    category: 'Full Stack',
    demoUrl: '#',
    githubUrl: 'https://github.com/sbernillaanthon-2005',
    featured: true,
  },
  {
    title: 'Design System & Micro-Animations',
    description: 'Suite de componentes de interfaz de usuario con accesibilidad garantizada, variantes oscuras y fluidas animaciones de transición.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'UI/UX'],
    category: 'UI/UX',
    demoUrl: '#',
    githubUrl: 'https://github.com/sbernillaanthon-2005',
    featured: false,
  }
];

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const draggablesRef = useRef<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');

  // GSAP Typewriter & Entrance Animations
  useEffect(() => {
    const roles = [
      'Hola, soy Jesús Senmache 👋',
      'Estudiante de Ingeniería de Sistemas 💻',
      'Full Stack Developer 🚀',
      'React & TypeScript Specialist ⚡',
      'UI/UX & GSAP Animator 🎨',
      'Node.js & Backend Architect ⚙️'
    ];
    let roleIndex = 0;

    const typeRole = () => {
      if (!typewriterRef.current) return;
      const targetText = roles[roleIndex];
      gsap.to(typewriterRef.current, {
        duration: 1.2,
        text: targetText,
        ease: 'none',
        onComplete: () => {
          gsap.delayedCall(2, () => {
            gsap.to(typewriterRef.current, {
              duration: 0.6,
              text: '',
              ease: 'none',
              onComplete: () => {
                roleIndex = (roleIndex + 1) % roles.length;
                typeRole();
              }
            });
          });
        }
      });
    };

    typeRole();

    // Hero elements entrance
    const ctx = gsap.context(() => {
      gsap.from('.hero-anim', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: '#stats',
          start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.5)'
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power2.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP Draggable Interactive Sandbox
  useEffect(() => {
    if (!sandboxRef.current) return;
    
    // Cleanup previous draggables
    draggablesRef.current.forEach(d => d.kill());
    draggablesRef.current = [];

    const elements = sandboxRef.current.querySelectorAll('.drag-item');
    
    // Randomize initial scattered positions
    elements.forEach((el, index) => {
      const offsetX = (index % 4) * 20 - 30;
      const offsetY = Math.floor(index / 4) * 15 - 15;
      gsap.set(el, { x: offsetX, y: offsetY });
    });

    const instances = Draggable.create(elements, {
      type: 'x,y',
      bounds: sandboxRef.current,
      edgeResistance: 0.65,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onDragStart: function() {
        gsap.to(this.target, { scale: 1.12, zIndex: 50, duration: 0.2 });
      },
      onDragEnd: function() {
        gsap.to(this.target, { scale: 1, zIndex: 10, duration: 0.2 });
      }
    });

    draggablesRef.current = instances;

    return () => {
      instances.forEach(d => d.kill());
    };
  }, []);

  const resetDraggables = () => {
    if (!sandboxRef.current) return;
    const elements = sandboxRef.current.querySelectorAll('.drag-item');
    gsap.to(elements, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.04,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  // 3D Card Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(heroCardRef.current, {
      rotateY: x * 0.05,
      rotateX: -y * 0.05,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    if (!heroCardRef.current) return;
    gsap.to(heroCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sbernillaanthon@uss.edu.pe');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-cyan-500/20">
            AS
          </div>
          <div>
            <span className="font-bold text-white tracking-tight">Anthony Senmache</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Full Stack
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">Sobre Mí</a>
          <a href="#lab" className="hover:text-cyan-400 transition-colors">Draggable Lab</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Habilidades</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Proyectos</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contacto</a>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="https://github.com/sbernillaanthon-2005" 
            target="_blank" 
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-sm"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a 
            href="#contact"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Conectar
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main ref={heroRef} className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Disponible para nuevos proyectos & colaboraciones</span>
            </div>

            <div className="hero-anim space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hola, soy <br />
                <span className="text-gradient">Anthony Senmache</span>
              </h1>
              <div className="text-xl sm:text-2xl font-mono text-cyan-400 h-9 flex items-center">
                <span ref={typewriterRef}></span>
                <span className="animate-pulse ml-1 text-cyan-300">|</span>
              </div>
            </div>

            <p className="hero-anim text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Desarrollador Full Stack apasionado por construir arquitecturas web escalables, 
              interfaces visualmente pulidas y experiencias interactivas de alto impacto mediante 
              <span className="text-slate-200 font-medium"> React</span>, 
              <span className="text-slate-200 font-medium"> GSAP</span>, 
              <span className="text-slate-200 font-medium"> Tailwind CSS</span> y 
              <span className="text-slate-200 font-medium"> Node.js</span>.
            </p>

            <div className="hero-anim flex flex-wrap gap-4 pt-2">
              <a 
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Ver Proyectos</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a 
                href="#lab"
                className="px-6 py-3 rounded-xl glass-panel hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all flex items-center gap-2"
              >
                <Move className="w-4 h-4 text-cyan-400" />
                <span>Draggable Sandbox</span>
              </a>
            </div>

            {/* Quick stats mini-row */}
            <div className="hero-anim grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-lg">
              <div>
                <div className="text-2xl font-bold text-white font-mono">100%</div>
                <div className="text-xs text-slate-400">Pasión por el Código</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-mono">Full Stack</div>
                <div className="text-xs text-slate-400">Front & Back End</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-400 font-mono">60fps</div>
                <div className="text-xs text-slate-400">Animaciones GSAP</div>
              </div>
            </div>
          </div>

          {/* Interactive 3D Hero Card */}
          <div 
            className="lg:col-span-5 flex justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              ref={heroCardRef}
              className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 relative shadow-2xl transition-shadow hover:shadow-cyan-500/10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow border background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-3xl opacity-20 blur-xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">profile.config.ts</span>
                </div>

                <div className="space-y-3 font-mono text-xs sm:text-sm bg-black/40 p-5 rounded-2xl border border-white/5 leading-relaxed">
                  <p className="text-slate-400">
                    <span className="text-pink-400">const</span> developer = &#123;
                  </p>
                  <p className="pl-4 text-slate-300">
                    name: <span className="text-emerald-300">"Anthony Senmache"</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    role: <span className="text-cyan-300">"Full Stack Engineer"</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    university: <span className="text-amber-300">"Univ. Señor de Sipán"</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    stack: [<span className="text-cyan-300">"React"</span>, <span className="text-indigo-300">"GSAP"</span>, <span className="text-emerald-300">"Node"</span>],
                  </p>
                  <p className="pl-4 text-slate-300">
                    readyToBuild: <span className="text-blue-400">true</span>
                  </p>
                  <p className="text-slate-400">&#125;;</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Arquitectura Limpia
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Interactividad GSAP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE GSAP DRAGGABLE PLAYGROUND */}
        <section id="lab" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-2">
                <Boxes className="w-4 h-4" />
                <span>Laboratorio Interactivo GSAP Draggable</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Experimenta con la Física y Drag & Drop
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Haz clic y arrastra las tecnologías por el lienzo con física interactiva de GreenSock.
              </p>
            </div>

            <button
              onClick={resetDraggables}
              className="self-start md:self-auto px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Restablecer Posiciones</span>
            </button>
          </div>

          <div 
            ref={sandboxRef}
            className="w-full h-[380px] rounded-3xl glass-panel border border-cyan-500/20 relative p-8 overflow-hidden select-none bg-radial-glow shadow-inner"
          >
            {/* Canvas Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="absolute top-4 right-4 pointer-events-none text-xs font-mono text-slate-500 flex items-center gap-1">
              <Move className="w-3.5 h-3.5 text-cyan-500" />
              Arrastra cualquier insignia
            </div>

            <div className="flex flex-wrap gap-4 relative z-10 items-center justify-center h-full max-w-4xl mx-auto">
              {draggableTechs.map((tech) => (
                <div
                  key={tech.name}
                  className={`drag-item cursor-grab active:cursor-grabbing px-5 py-3 rounded-2xl bg-gradient-to-r ${tech.bg} border ${tech.border} backdrop-blur-md shadow-lg flex items-center gap-2.5 transition-shadow hover:shadow-cyan-500/20`}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className={`text-sm font-semibold tracking-wide ${tech.text}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS & ARCHITECTURE */}
        <section id="skills" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Stack Tecnológico de Vanguardia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Especialidades y Competencias
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Herramientas de nivel de producción aplicadas para construir software veloz, seguro y escalable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend Card */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 glass-panel-hover space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Frontend & UI/UX</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Interfaces reactivas, estilizado modular, animaciones fluidas a 60fps y accesibilidad web.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite', 'HTML5 & CSS3'].map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Card */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 glass-panel-hover space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Backend & APIs</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Servidores robustos, APIs REST estructuradas, middlewares de seguridad y persistencia en bases de datos.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL', 'REST APIs'].map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* DevOps & Tools Card */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 glass-panel-hover space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Herramientas & Flujo</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Control de versiones con Git, contenedores Docker, pruebas de endpoints con Postman y buenas prácticas.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Git & GitHub', 'Docker', 'Postman', 'VS Code', 'npm / pnpm', 'Linux CLI'].map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>Portafolio de Trabajo</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Proyectos Destacados
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 text-xs font-medium">
              {['Todos', 'Full Stack', 'Frontend', 'UI/UX'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeFilter === category 
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div 
                key={idx}
                className="project-card glass-panel rounded-3xl p-6 border border-white/5 glass-panel-hover flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        ⭐ Destacado
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Código</span>
                    </a>
                    <a
                      href={project.demoUrl}
                      className="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-cyan-500/30 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB STATS & ACTIVITY */}
        <section id="stats" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Actividad en GitHub en Tiempo Real
            </h2>
            <p className="text-slate-400 text-sm">
              Métricas sincronizadas automáticamente desde mi perfil <span className="text-cyan-400 font-mono">@sbernillaanthon-2005</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="stat-card glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=sbernillaanthon-2005&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=00f2fe&icon_color=00f2fe&text_color=94a3b8" 
                alt="GitHub Stats" 
                className="w-full max-w-md h-auto"
              />
            </div>
            <div className="stat-card glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=sbernillaanthon-2005&theme=tokyonight&hide_border=true&background=00000000&ring=00f2fe&fire=00f2fe&currStreakLabel=00f2fe" 
                alt="GitHub Streak" 
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="glass-panel rounded-3xl p-8 sm:p-14 border border-cyan-500/30 relative overflow-hidden text-center space-y-8 bg-radial-glow shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>¿Tienes un proyecto en mente?</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              ¡Construyamos algo extraordinario!
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Siempre estoy interesado en proyectos desafiantes, aplicaciones web modernas 
              y oportunidades de ingeniería de software.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a 
              href="mailto:sbernillaanthon@uss.edu.pe"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/30 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>Enviar un Correo</span>
            </a>

            <button
              onClick={copyEmail}
              className="px-6 py-3.5 rounded-2xl glass-panel hover:bg-white/10 text-white font-medium text-sm border border-white/10 flex items-center gap-2 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado con éxito!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>sbernillaanthon@uss.edu.pe</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>📍 Chiclayo, Lambayeque - Perú</span>
            <span>🎓 Universidad Señor de Sipán</span>
            <span>⚡ Especialidad en Web & GSAP</span>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-slate-500 space-y-2">
        <p>© {new Date().getFullYear()} Anthony Jesús Senmache Bernilla. Todos los derechos reservados.</p>
        <p className="font-mono text-[11px] text-slate-600">
          Diseñado con React, Vite, Tailwind CSS y animaciones interactivas GSAP.
        </p>
      </footer>
    </div>
  );
}
