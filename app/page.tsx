'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, OrnamentDivider, ArchFrame, Logo } from '@/components/brand/brand';
import { CourseCard } from '@/components/marketing/course-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCountUp } from '@/hooks/use-count-up';
import {
  PlayCircle,
  Calendar,
  UserRound,
  ArrowRight,
  Star,
  Globe,
  Award,
  Users,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Clock,
  Sparkles,
  TrendingUp,
  BookOpen,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { courses, instructors, testimonials, pricingPlans, faqs, stats } from '@/lib/marketing-data';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

function StatItem({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-3xl font-bold tabular-nums text-foreground md:text-4xl lg:text-5xl">
        {count.toLocaleString()}{suffix}
      </span>
      <p className="mt-1 text-xs text-muted-foreground md:text-sm">{label}</p>
    </div>
  );
}

const learningPaths = [
  { step: '01', title: 'Beginner', desc: 'Foundations of Islamic finance principles', icon: BookOpen, color: 'text-primary' },
  { step: '02', title: 'Intermediate', desc: 'Banking, Sukuk, and Takaful in practice', icon: TrendingUp, color: 'text-info' },
  { step: '03', title: 'Advanced', desc: 'Governance, structuring, and wealth management', icon: Award, color: 'text-accent' },
  { step: '04', title: 'Professional', desc: 'Certified expertise and career advancement', icon: GraduationCap, color: 'text-primary' },
];

const howItWorks = [
  { icon: BookOpen, title: 'Choose', desc: 'Browse courses, live classes, or private mentors that match your goals.' },
  { icon: CreditCard, title: 'Pay', desc: 'Secure payment with card, PayPal, or mobile money in your currency.' },
  { icon: PlayCircle, title: 'Learn', desc: 'Watch videos, join live sessions, and practice with real-world case studies.' },
  { icon: Award, title: 'Certify', desc: 'Complete assessments and earn a verifiable certificate recognized by employers.' },
];

import Link from 'next/link';

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const amount = 320;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36 lg:pt-40">
        <PatternBackground variant="star" className="text-primary" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start">
              <Badge className="mb-5 gap-1.5 border-primary/20 bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Islamic Finance, Mastered
              </Badge>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
                Learn Shariah-compliant finance from world-class experts
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Master Islamic banking, Sukuk, Takaful, and wealth management through
                video courses, live classes, and private mentoring — designed for
                learners across 34 countries.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/courses">
                  <Button size="lg" className="w-full bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 sm:w-auto">
                    Browse Courses
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/private-sessions">
                  <Button size="lg" variant="outline" className="w-full border-border sm:w-auto">
                    <UserRound className="me-2 h-4 w-4" />
                    Book a Session
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-primary" /> Verifiable certificates
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" /> 34 countries
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary" /> Live classes weekly
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <ArchFrame className="aspect-[4/5] w-full bg-secondary shadow-soft-lg lg:aspect-[5/6]">
                  <img
                    src="https://images.pexels.com/photos/16588790/pexels-photo-16588790.jpeg?auto=compress&cs=tinysrgb&h=800&w=600"
                    alt="Islamic architecture arch"
                    className="h-full w-full object-cover"
                  />
                </ArchFrame>
                <div className="absolute -start-2 top-1/4 hidden animate-float rounded-2xl border border-border bg-card p-4 shadow-soft-lg md:block">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-bold tabular-nums text-foreground">25,000+</p>
                      <p className="text-xs text-muted-foreground">Learners worldwide</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -end-2 bottom-1/4 hidden animate-float rounded-2xl border border-border bg-card p-4 shadow-soft-lg md:block" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15">
                      <Award className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-bold tabular-nums text-foreground">9,800+</p>
                      <p className="text-xs text-muted-foreground">Certificates issued</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-border bg-card py-12 md:py-16">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-4 md:px-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>
      </section>

      {/* Learn your way */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Learn your way
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Three flexible formats designed for every learning style and schedule.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: PlayCircle, title: 'Video Courses', desc: 'Self-paced, expert-led courses with quizzes, resources, and certificates.', cta: 'Browse courses', href: '/courses' },
              { icon: Calendar, title: 'Live Classes', desc: 'Join scheduled, instructor-led sessions with recordings for later review.', cta: 'View schedule', href: '/live-classes' },
              { icon: UserRound, title: 'Private Sessions', desc: 'Book 1-to-1 mentoring with experts, tailored to your goals and schedule.', cta: 'Find a mentor', href: '/private-sessions' },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <card.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{card.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2.5">
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="bg-card py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Featured courses
              </h2>
              <p className="mt-3 text-muted-foreground">Start with our most popular Islamic finance courses.</p>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="outline" size="icon" onClick={() => scrollCarousel('left')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => scrollCarousel('right')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} className="w-[280px] shrink-0 md:w-[300px]" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                View all courses
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <PatternBackground variant="arabesque" className="text-primary" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mb-10 text-center">
            <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent-foreground">Your journey</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              From beginner to professional
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              A clear path that takes you from first principles to certified expertise.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {learningPaths.map((path, i) => (
              <div key={path.step} className="relative">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10', path.color)}>
                      <path.icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-2xl font-bold text-border tabular-nums">{path.step}</span>
                  </div>
                  <h3 className="mb-1.5 font-display text-lg font-semibold text-foreground">{path.title}</h3>
                  <p className="text-sm text-muted-foreground">{path.desc}</p>
                </div>
                {i < learningPaths.length - 1 && (
                  <div className="absolute -end-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-5 w-5 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="bg-card py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Learn from industry experts
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Our instructors are practicing Shariah board members, bankers, and scholars.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((inst) => (
              <div key={inst.id} className="group rounded-2xl border border-border bg-background p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <ArchFrame className="mx-auto aspect-square w-28 bg-secondary">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </ArchFrame>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{inst.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{inst.title}</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="font-semibold tabular-nums text-foreground">{inst.rating}</span>
                  <span className="text-muted-foreground">· {inst.students.toLocaleString()} students</span>
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {inst.expertise.slice(0, 2).map((exp) => (
                    <Badge key={exp} variant="secondary" className="text-xs">{exp}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Four simple steps from enrollment to certification.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-soft">
                  <step.icon className="h-7 w-7 text-primary" />
                  <span className="absolute -top-2 -end-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mx-auto max-w-[200px] text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-card py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Pay per course, subscribe for unlimited access, or book expert mentoring.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg',
                  plan.highlighted
                    ? 'border-primary shadow-soft-lg ring-1 ring-primary/20'
                    : 'border-border shadow-soft'
                )}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 start-1/2 -translate-x-1/2 gap-1 bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </Badge>
                )}
                <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold tabular-nums text-foreground">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">/ {plan.period}</span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/courses" className="mt-7">
                  <Button
                    className={cn('w-full', plan.highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '')}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <PatternBackground variant="girih" className="text-primary" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Trusted by learners worldwide
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              From Dubai to Dar es Salaam, learners advance their careers with Taqseem.
            </p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-soft-lg md:p-12">
              <Quote className="mb-4 h-8 w-8 text-primary/30" />
              <p className="font-display text-lg leading-relaxed text-foreground md:text-xl">
                {testimonials[testimonialIndex].text}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonials[testimonialIndex].avatar}
                  alt={testimonials[testimonialIndex].name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonials[testimonialIndex].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[testimonialIndex].role} · {testimonials[testimonialIndex].country}
                  </p>
                </div>
                <div className="ms-auto flex gap-0.5">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="outline" size="icon" onClick={prevTestimonial}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      i === testimonialIndex ? 'w-6 bg-primary' : 'w-2 bg-border'
                    )}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextTestimonial}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-card px-5 shadow-soft [&[data-state=open]]:border-primary/30"
              >
                <AccordionTrigger className="text-start font-display text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <PatternBackground variant="star" className="text-primary-foreground" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/85" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <div className="mb-6 flex justify-center">
            <Logo showText={false} className="scale-125 [&_svg_rect]:fill-primary-foreground/15" />
          </div>
          <OrnamentDivider className="text-primary-foreground" />
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground text-balance md:text-5xl">
            Start your Islamic finance journey today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80 md:text-lg">
            Join 25,000+ learners advancing their careers with Shariah-compliant
            finance expertise. Your first course is just a click away.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/courses">
              <Button size="lg" variant="secondary" className="w-full bg-background text-foreground shadow-soft-lg hover:bg-background/90 sm:w-auto">
                Browse Courses
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> 14-day money-back guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> No prior experience needed
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


