"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  BarChart3,
  Eye,
  Clock,
  LayoutGrid,
  Cpu,
  Wifi,
  Users,
  MessageSquare,
  Zap,
  DollarSign,
  Leaf,
  TrendingUp,
  Package,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  Shield,
  Target,
  CheckCircle2,
  Radio,
  Database,
  Layers,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

/* ─── Animated Section Wrapper ─── */
function AnimatedSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

/* ─── Stat Counter ─── */
function StatCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ─── Floating Particles ─── */
// Pre-computed deterministic positions to avoid hydration mismatch with Math.random()
const PARTICLE_POSITIONS = [
  { left: 17, top: 42, dur: 4.2, delay: 0.5 },
  { left: 87, top: 4, dur: 5.8, delay: 1.2 },
  { left: 65, top: 78, dur: 3.5, delay: 2.1 },
  { left: 10, top: 24, dur: 6.1, delay: 0.8 },
  { left: 70, top: 64, dur: 4.7, delay: 1.7 },
  { left: 64, top: 52, dur: 3.9, delay: 2.5 },
  { left: 91, top: 68, dur: 5.3, delay: 0.3 },
  { left: 36, top: 86, dur: 4.4, delay: 1.9 },
  { left: 96, top: 24, dur: 6.5, delay: 0.7 },
  { left: 72, top: 98, dur: 3.3, delay: 2.3 },
  { left: 30, top: 54, dur: 5.1, delay: 1.1 },
  { left: 48, top: 20, dur: 4.8, delay: 0.4 },
  { left: 82, top: 65, dur: 3.7, delay: 1.6 },
  { left: 56, top: 21, dur: 5.6, delay: 2.0 },
  { left: 2, top: 85, dur: 4.1, delay: 0.9 },
  { left: 24, top: 9, dur: 6.3, delay: 1.4 },
  { left: 47, top: 22, dur: 3.4, delay: 2.8 },
  { left: 12, top: 55, dur: 5.2, delay: 0.6 },
  { left: 98, top: 46, dur: 4.6, delay: 1.3 },
  { left: 59, top: 29, dur: 3.8, delay: 2.2 },
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-lm-blue/30"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: pos.dur,
            repeat: Infinity,
            delay: pos.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Navigation ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [
        "hero",
        "problema",
        "solucao",
        "diferencial",
        "setor",
        "hardskills",
        "softskills",
        "investimento",
        "ganhos",
        "cta",
      ];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Início" },
    { id: "problema", label: "O Problema" },
    { id: "solucao", label: "Solução" },
    { id: "diferencial", label: "Diferencial" },
    { id: "setor", label: "Setor" },
    { id: "hardskills", label: "Hard Skills" },
    { id: "softskills", label: "Soft Skills" },
    { id: "investimento", label: "Investimento" },
    { id: "ganhos", label: "Ganhos" },
    { id: "cta", label: "Invista" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-lm-dark/90 backdrop-blur-xl border-b border-lm-dark-border shadow-lg shadow-lm-blue/5"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lm-blue/20 border border-lm-blue/40 flex items-center justify-center">
              <Brain className="w-5 h-5 text-lm-blue" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Logi<span className="text-lm-blue">Mind</span>{" "}
              <span className="text-lm-gold text-sm">AI</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-lm-blue/20 text-lm-blue"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a href="#cta">
            <Button
              size="sm"
              className="bg-lm-blue hover:bg-lm-blue-light text-white font-semibold rounded-lg"
            >
              Investir Agora
            </Button>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lm-dark/80 via-lm-dark/60 to-lm-dark" />
        <div className="absolute inset-0 grid-pattern" />
      </motion.div>

      <FloatingParticles />

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mx-auto mb-8 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden glow-blue"
        >
          <img
            src="/logimind-logo.png"
            alt="LogiMind AI Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-2">
            Logi
            <span className="text-lm-blue glow-blue-text">Mind</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-lm-gold text-lg sm:text-xl font-semibold tracking-widest uppercase">
              AI
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-lm-gold to-transparent" />
          </div>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xl sm:text-2xl lg:text-3xl font-light text-muted-foreground mb-8"
        >
          Antecipando o{" "}
          <span className="text-lm-blue font-medium">Amanhã</span>,
          Organizando o{" "}
          <span className="text-lm-gold font-medium">Hoje</span>.
        </motion.p>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex items-center justify-center gap-3 text-muted-foreground"
        >
          <div className="w-px h-6 bg-lm-dark-border" />
          <span className="text-sm tracking-wide uppercase">
            Feito por Victor Silva
          </span>
          <div className="w-px h-6 bg-lm-dark-border" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-lm-blue/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2: O PROBLEMA (A DOR)
   ═══════════════════════════════════════════ */
function ProblemSection() {
  const painPoints = [
    {
      icon: AlertTriangle,
      label: "Perda de Vendas",
      desc: "Itens ausentes geram ruptura de estoque e perda direta de receita.",
    },
    {
      icon: DollarSign,
      label: "Custos Adicionais",
      desc: "Pedidos de última hora com fretes caros e compras emergenciais.",
    },
    {
      icon: BarChart3,
      label: "Problemas de Planejamento",
      desc: "Dados imprecisos comprometem toda a cadeia de decisões.",
    },
  ];

  return (
    <AnimatedSection
      id="problema"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-red-500/30 text-red-400 bg-red-500/10"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            Slide 02
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            A <span className="text-red-400">Dor</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Falta de acuracidade no estoque
          </p>
        </div>

        {/* Main stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-8 sm:p-12 rounded-2xl border border-red-500/20 bg-red-500/5 glow-blue">
            <p className="text-6xl sm:text-8xl font-extrabold text-red-400 mb-2">
              <StatCounter target={10} suffix="%" />
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
              de perda no faturamento anual de uma empresa por falta de
              acuracidade no estoque
            </p>
            <p className="text-sm text-muted-foreground/60 mt-3">
              Fonte: Pesquisa Abrappe de Perdas no Varejo Brasileiro em
              parceria com a KPMG
            </p>
          </div>
        </motion.div>

        {/* Pain points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="bg-lm-dark-card border-lm-dark-border hover:border-red-500/30 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{point.label}</h3>
                  <p className="text-muted-foreground text-sm">{point.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional data sources */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60"
        >
          <span>Dados complementares:</span>
          <Badge variant="outline" className="border-lm-dark-border">
            McKinsey & Company
          </Badge>
          <Badge variant="outline" className="border-lm-dark-border">
            Gartner Research
          </Badge>
          <Badge variant="outline" className="border-lm-dark-border">
            Abrappe / KPMG
          </Badge>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3: A SOLUÇÃO
   ═══════════════════════════════════════════ */
function SolutionSection() {
  const pillars = [
    {
      icon: TrendingUp,
      title: "Análise Preditiva de Demanda",
      desc: "Antecipa oscilações, evitando o excesso de itens parados ou a falta de produtos essenciais, ajustando o estoque automaticamente.",
      color: "blue",
    },
    {
      icon: Eye,
      title: "Monitoramento em Tempo Real",
      desc: "Identifica diferenças entre o que está registrado no sistema e o que está fisicamente na prateleira instantaneamente, eliminando o erro humano.",
      color: "gold",
    },
    {
      icon: Layers,
      title: "Automação de Inventário Cíclico",
      desc: "O sistema aprende quais categorias de produtos têm maior probabilidade de erro e prioriza a conferência dessas áreas.",
      color: "blue",
    },
  ];

  return (
    <AnimatedSection
      id="solucao"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-lm-dark via-transparent to-lm-dark" />
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-lm-blue/30 text-lm-blue bg-lm-blue/10"
          >
            <Brain className="w-3 h-3 mr-1" />
            Slide 03
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            A <span className="text-lm-blue glow-blue-text">Solução</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Implementação de um Algoritmo de IA para gestão inteligente de
            estoque
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card
                className={`bg-lm-dark-card border-lm-dark-border hover:border-${
                  pillar.color === "gold" ? "lm-gold" : "lm-blue"
                }/40 transition-all duration-500 h-full group`}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl ${
                      pillar.color === "gold"
                        ? "bg-lm-gold/10 border border-lm-gold/20"
                        : "bg-lm-blue/10 border border-lm-blue/20"
                    } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pillar.icon
                      className={`w-8 h-8 ${
                        pillar.color === "gold"
                          ? "text-lm-gold"
                          : "text-lm-blue"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      pillar.color === "gold"
                        ? "text-lm-gold"
                        : "text-lm-blue"
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Visual flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Badge className="bg-lm-blue/20 text-lm-blue border-lm-blue/30 py-1.5 px-4">
            <Database className="w-3.5 h-3.5 mr-1.5" />
            Dados Históricos
          </Badge>
          <ArrowRight className="w-4 h-4 text-lm-blue/50" />
          <Badge className="bg-lm-blue/20 text-lm-blue border-lm-blue/30 py-1.5 px-4">
            <Brain className="w-3.5 h-3.5 mr-1.5" />
            Algoritmo IA
          </Badge>
          <ArrowRight className="w-4 h-4 text-lm-gold/50" />
          <Badge className="bg-lm-gold/20 text-lm-gold border-lm-gold/30 py-1.5 px-4">
            <Target className="w-3.5 h-3.5 mr-1.5" />
            Previsão + Ação
          </Badge>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4: O DIFERENCIAL
   ═══════════════════════════════════════════ */
function DifferentialSection() {
  const features = [
    {
      icon: TrendingUp,
      title: "Análise Preditiva",
      desc: "Algoritmo de machine learning que prevê demanda com base em histórico e tendências de mercado.",
      percentage: 92,
    },
    {
      icon: Eye,
      title: "Acuracidade em Tempo Real",
      desc: "Dashboard que exibe diferenças entre estoque físico e sistema em tempo real.",
      percentage: 98,
    },
    {
      icon: Clock,
      title: "Gestão de Shelf-life",
      desc: "Controle automático de validade que evita perdas por vencimento de produtos.",
      percentage: 85,
    },
    {
      icon: LayoutGrid,
      title: "Otimização de Layout",
      desc: "Inteligência espacial para posicionamento ideal dos itens no almoxarifado.",
      percentage: 78,
    },
  ];

  return (
    <AnimatedSection
      id="diferencial"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-lm-gold/30 text-lm-gold bg-lm-gold/10"
          >
            <Zap className="w-3 h-3 mr-1" />
            Slide 04
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            O{" "}
            <span className="text-lm-gold glow-gold-text">Diferencial</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diferente das planilhas estáticas, a LogiMind AI{" "}
            <span className="text-lm-gold font-medium">
              aprende com as variações do mercado
            </span>
          </p>
        </div>

        {/* Initiative highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-6 rounded-2xl border border-lm-gold/20 bg-lm-gold/5 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-lm-gold/20 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-lm-gold" />
          </div>
          <div>
            <h4 className="font-semibold text-lm-gold mb-1">Iniciativa</h4>
            <p className="text-muted-foreground text-sm">
              Criamos um painel visual (Dashboard) que avisa em tempo real qual
              item deve ser reabastecido antes mesmo do operador perceber a
              falta.
            </p>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="bg-lm-dark-card border-lm-dark-border hover:border-lm-gold/30 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-lm-gold/10 border border-lm-gold/20 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-lm-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Eficiência
                      </span>
                      <span className="text-lm-gold font-medium">
                        {feature.percentage}%
                      </span>
                    </div>
                    <Progress
                      value={feature.percentage}
                      className="h-2 bg-lm-dark-border"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5: O SETOR IMPACTADO
   ═══════════════════════════════════════════ */
function SectorSection() {
  return (
    <AnimatedSection
      id="setor"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lm-blue/5 to-transparent" />
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-lm-blue/30 text-lm-blue bg-lm-blue/10"
          >
            <Package className="w-3 h-3 mr-1" />
            Slide 05
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            O Setor{" "}
            <span className="text-lm-blue glow-blue-text">Impactado</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Target audience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-lm-dark-card border-lm-blue/20 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-lm-blue/10 border border-lm-blue/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-lm-blue" />
                  </div>
                  <h3 className="text-xl font-bold">Público</h3>
                </div>
                <p className="text-2xl font-bold text-lm-blue mb-2">
                  Setor de Almoxarifado Central e Compras
                </p>
                <p className="text-muted-foreground">
                  Operadores de almoxarifado, compradores, gerentes de estoque e
                  equipes de logística interna.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-lm-dark-card border-lm-gold/20 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-lm-gold/10 border border-lm-gold/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-lm-gold" />
                  </div>
                  <h3 className="text-xl font-bold">Impacto</h3>
                </div>
                <p className="text-lg text-foreground mb-4">
                  Redução direta no tempo de busca de materiais e eliminação de
                  pedidos de última hora com fretes caros.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lm-gold shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Busca de materiais mais rápida
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lm-gold shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Eliminação de pedidos emergenciais
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lm-gold shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Economia em fretes e compras de urgência
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6: HARD SKILLS
   ═══════════════════════════════════════════ */
function HardSkillsSection() {
  const techs = [
    {
      icon: Radio,
      title: "Sensores RFID",
      desc: "Leitura automática e em tempo real de todos os itens do almoxarifado, eliminando contagens manuais.",
      tags: ["RFID", "IoT", "Automação"],
    },
    {
      icon: Database,
      title: "Integração via API",
      desc: "Conexão direta com o software de estoque (SAP, Totvs) para sincronização instantânea de dados.",
      tags: ["API REST", "SAP", "Totvs"],
    },
    {
      icon: Shield,
      title: "Conhecimento Técnico",
      desc: "Aplicação de normas de endereçamento, classificação ABC e análise estatística de dados industriais.",
      tags: ["ABC", "Normas", "Estatística"],
    },
  ];

  return (
    <AnimatedSection
      id="hardskills"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-lm-blue/30 text-lm-blue bg-lm-blue/10"
          >
            <Cpu className="w-3 h-3 mr-1" />
            Slide 06
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Como Funciona na{" "}
            <span className="text-lm-blue glow-blue-text">Prática</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conhecimentos técnicos e equipamentos que fazem a LogiMind AI
            funcionar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Card className="bg-lm-dark-card border-lm-dark-border hover:border-lm-blue/30 transition-all duration-500 h-full group">
                <CardContent className="p-8">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl font-extrabold text-lm-blue/20">
                      0{i + 1}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-lm-blue/10 border border-lm-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <tech.icon className="w-6 h-6 text-lm-blue" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {tech.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {tech.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-lm-blue/20 text-lm-blue/80 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl border border-lm-dark-border bg-lm-dark-card"
        >
          <p className="text-sm font-medium text-muted-foreground mb-4 text-center">
            Arquitetura do Sistema
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="px-4 py-2 rounded-lg bg-lm-blue/10 border border-lm-blue/20 text-sm font-medium text-lm-blue">
              RFID Tags
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
            <div className="px-4 py-2 rounded-lg bg-lm-blue/10 border border-lm-blue/20 text-sm font-medium text-lm-blue">
              Leitor RFID
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
            <div className="px-4 py-2 rounded-lg bg-lm-gold/10 border border-lm-gold/20 text-sm font-medium text-lm-gold">
              LogiMind AI
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
            <div className="px-4 py-2 rounded-lg bg-lm-blue/10 border border-lm-blue/20 text-sm font-medium text-lm-blue">
              API
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
            <div className="px-4 py-2 rounded-lg bg-lm-blue/10 border border-lm-blue/20 text-sm font-medium text-lm-blue">
              WMS/ERP
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7: SOFT SKILLS & EQUIPE
   ═══════════════════════════════════════════ */
function SoftSkillsSection() {
  return (
    <AnimatedSection
      id="softskills"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lm-gold/5 to-transparent" />
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-lm-gold/30 text-lm-gold bg-lm-gold/10"
          >
            <Handshake className="w-3 h-3 mr-1" />
            Slide 07
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            O Modelo de Atuação e{" "}
            <span className="text-lm-gold glow-gold-text">Equipe</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Structure */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-lm-dark-card border-lm-gold/20 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-lm-gold/10 border border-lm-gold/20 flex items-center justify-center">
                    <Layers className="w-7 h-7 text-lm-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-lm-gold/60 uppercase tracking-wider font-medium">
                      01
                    </p>
                    <h3 className="text-xl font-bold">Estrutura</h3>
                  </div>
                </div>
                <p className="text-lg text-foreground mb-4 font-medium">
                  Projeto de Intraempreendedorismo
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Foco em melhoria de processo interno. A LogiMind AI nasce
                  dentro da empresa como uma iniciativa de inovação, buscando
                  eficiência operacional sem ruptura na operação existente.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-lm-gold/5 border border-lm-gold/10">
                  <div className="flex items-center gap-2 text-lm-gold text-sm font-medium mb-2">
                    <Handshake className="w-4 h-4" />
                    Intraempreendedorismo
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Inovação de dentro para fora, com visão de dono e foco em
                    resultados mensuráveis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Communication */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-lm-dark-card border-lm-gold/20 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-lm-gold/10 border border-lm-gold/20 flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-lm-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-lm-gold/60 uppercase tracking-wider font-medium">
                      02
                    </p>
                    <h3 className="text-xl font-bold">Comunicação</h3>
                  </div>
                </div>
                <p className="text-lg text-foreground mb-4 font-medium">
                  Metodologia Ágil
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Divisão de tarefas garantindo que o Almoxarife e o TI falem a
                  mesma língua através de reuniões curtas de alinhamento
                  (daily/stand-up).
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lm-gold shrink-0" />
                    <span className="text-sm">
                      Comunicação assertiva entre equipes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lm-gold shrink-0" />
                    <span className="text-sm">
                      Reuniões curtas de alinhamento (Daily)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lm-gold shrink-0" />
                    <span className="text-sm">
                      Divisão clara de responsabilidades
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lm-gold shrink-0" />
                    <span className="text-sm">
                      Trabalho em equipe com autonomia
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8: INVESTIMENTO INICIAL
   ═══════════════════════════════════════════ */
function InvestmentSection() {
  const items = [
    {
      label: "Licença de software de IA",
      value: "R$ 2.000,00",
      period: "/mês",
      icon: Cpu,
    },
    {
      label: "Treinamento da equipe de almoxarifes",
      value: "R$ 1.500,00",
      period: "",
      icon: Users,
    },
    {
      label: "Leitores de código de barras/RFID",
      value: "R$ 3.000,00",
      period: "",
      icon: Radio,
    },
  ];

  return (
    <AnimatedSection
      id="investimento"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-lm-blue/30 text-lm-blue bg-lm-blue/10"
          >
            <DollarSign className="w-3 h-3 mr-1" />
            Slide 08
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            O Investimento{" "}
            <span className="text-lm-blue glow-blue-text">Inicial</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Orçamento enxuto para início imediato
          </p>
        </div>

        {/* Investment cards */}
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="bg-lm-dark-card border-lm-dark-border hover:border-lm-blue/30 transition-all duration-300">
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lm-blue/10 border border-lm-blue/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-lm-blue" />
                    </div>
                    <span className="text-foreground font-medium">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl font-bold text-lm-blue">
                      {item.value}
                    </span>
                    {item.period && (
                      <span className="text-sm text-muted-foreground">
                        {item.period}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-6 rounded-2xl border border-lm-gold/30 bg-lm-gold/5 text-center"
        >
          <p className="text-sm text-muted-foreground mb-2">
            Investimento Inicial Total
          </p>
          <p className="text-4xl sm:text-5xl font-extrabold text-lm-gold glow-gold-text">
            R$ 6.500,00
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            + R$ 2.000,00/mês de licença
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 9: GANHOS ESTRATÉGICOS
   ═══════════════════════════════════════════ */
function GainsSection() {
  const gains = [
    {
      icon: Shield,
      title: "Zero Desperdício",
      desc: "Redução de peças vencidas no estoque com controle automático de validade e alertas preditivos.",
      color: "blue",
      stat: "100%",
      statLabel: "peças monitoradas",
    },
    {
      icon: TrendingUp,
      title: "Produtividade",
      desc: "Economia de 5 horas semanais que eram gastas em contagens manuais, liberando a equipe para atividades estratégicas.",
      color: "gold",
      stat: "5h",
      statLabel: "economizadas/semana",
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      desc: "Menos emissão de carbono devido à otimização das rotas internas de empilhadeiras e redução de desperdícios.",
      color: "blue",
      stat: "CO₂",
      statLabel: "reduzido significativamente",
    },
  ];

  return (
    <AnimatedSection
      id="ganhos"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lm-blue/5 to-transparent" />
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-lm-gold/30 text-lm-gold bg-lm-gold/10"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Slide 09
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Os Ganhos{" "}
            <span className="text-lm-gold glow-gold-text">Estratégicos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gains.map((gain, i) => (
            <motion.div
              key={gain.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Card
                className={`bg-lm-dark-card border-lm-dark-border hover:border-${
                  gain.color === "gold" ? "lm-gold" : "lm-blue"
                }/30 transition-all duration-500 h-full text-center`}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl ${
                      gain.color === "gold"
                        ? "bg-lm-gold/10 border border-lm-gold/20"
                        : "bg-lm-blue/10 border border-lm-blue/20"
                    } flex items-center justify-center mx-auto mb-6`}
                  >
                    <gain.icon
                      className={`w-8 h-8 ${
                        gain.color === "gold" ? "text-lm-gold" : "text-lm-blue"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-4xl font-extrabold mb-1 ${
                      gain.color === "gold" ? "text-lm-gold" : "text-lm-blue"
                    }`}
                  >
                    {gain.stat}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {gain.statLabel}
                  </p>
                  <h3 className="text-xl font-bold mb-3">{gain.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {gain.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   SECTION 10: CALL TO ACTION
   ═══════════════════════════════════════════ */
function CTASection() {
  return (
    <AnimatedSection
      id="cta"
      className="relative py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <FloatingParticles />
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section header */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-lm-gold/30 text-lm-gold bg-lm-gold/10"
          >
            <Zap className="w-3 h-3 mr-1" />
            Slide 10
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            O <span className="text-lm-gold glow-gold-text">Convite</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl border border-lm-gold/30 bg-lm-gold/5 mb-8"
        >
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed mb-8">
            Não podemos mais gerir o almoxarifado do{" "}
            <span className="text-lm-blue font-bold">futuro</span> com
            ferramentas do{" "}
            <span className="text-red-400 font-bold">passado</span>. Aprovem a
            LogiMind AI e transformem{" "}
            <span className="text-lm-gold font-bold">custo em eficiência</span>{" "}
            operacional hoje mesmo!
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-lm-blue to-lm-blue-light hover:from-lm-blue-light hover:to-lm-blue text-white font-bold text-lg px-12 py-6 rounded-xl glow-blue transition-all duration-300"
            >
              <Zap className="w-5 h-5 mr-2" />
              Investir Agora na LogiMind AI
            </Button>
          </motion.div>
        </motion.div>

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-lm-dark-card border-lm-dark-border inline-block">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-lm-blue/20 border border-lm-blue/30 flex items-center justify-center">
                <span className="text-lm-blue font-bold text-lg">VS</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Victor Silva</p>
                <p className="text-sm text-muted-foreground">
                  SENAI &quot;Oscar Lúcio Baldan&quot; — Almoxarife
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-lm-dark-border bg-lm-dark py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-lm-blue" />
          <span className="text-sm text-muted-foreground">
            LogiMind AI — Antecipando o Amanhã, Organizando o Hoje.
          </span>
        </div>
        <p className="text-xs text-muted-foreground/60">
          © 2025 Victor Silva · SENAI &quot;Oscar Lúcio Baldan&quot;
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function LogiMindLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-lm-dark">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DifferentialSection />
        <SectorSection />
        <HardSkillsSection />
        <SoftSkillsSection />
        <InvestmentSection />
        <GainsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
