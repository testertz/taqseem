'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, OrnamentDivider, ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stats, testimonials } from '@/lib/marketing-data';
import { useCountUp } from '@/hooks/use-count-up';
import { Target, Heart, Globe, BookOpen, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-bold tabular-nums text-foreground">
        <span ref={ref}>{count.toLocaleString()}{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const values = [
    { icon: Target, title: 'Authenticity', desc: 'Every course is reviewed by a Shariah board member. We never compromise on accuracy or scholarly rigor.' },
    { icon: Heart, title: 'Accessibility', desc: 'Premium Islamic finance education should be available to everyone, everywhere — from Dubai to Dar es Salaam.' },
    { icon: Globe, title: 'Global Reach', desc: 'We serve learners in 34 countries across the GCC, Africa, Europe, and Southeast Asia with localized content.' },
    { icon: BookOpen, title: 'Practical Learning', desc: 'Theory is paired with real-world case studies from working Islamic banks, so you can apply what you learn.' },
    { icon: Award, title: 'Verifiable Excellence', desc: 'Our certificates are recognized by employers across the Islamic finance industry worldwide.' },
    { icon: Users, title: 'Community First', desc: 'Learning is not solitary. Our live classes, mentorship, and discussions connect you with peers and experts.' },
  ];

  const milestones = [
    { year: '2024', title: 'The Idea', desc: 'Founded by a group of Islamic finance professionals who saw a gap in accessible, high-quality Shariah-compliant finance education.' },
    { year: '2025', title: 'Launch', desc: 'Released our first six courses with three expert instructors. Reached 5,000 learners in the first three months.' },
    { year: '2026', title: 'Growth', desc: 'Expanded to 25,000+ learners across 34 countries. Added live classes, private mentorship, and a mobile-optimized platform.' },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <PatternBackground variant="star" />
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4">Our Story</Badge>
                <h1 className="font-display text-4xl font-bold leading-tight text-foreground lg:text-5xl">
                  Bridging centuries of Islamic scholarship with modern financial practice
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Taqseem was born from a simple observation: millions of Muslims worldwide want to understand Islamic finance, but quality education is locked behind expensive certifications or scattered across outdated resources. We're changing that.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/courses"><span className="flex items-center gap-1.5">Explore Courses <ArrowRight className="h-4 w-4" /></span></Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <ArchFrame className="aspect-[4/3] w-full bg-secondary shadow-soft-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.pexels.com/photos/8121703/pexels-photo-8121703.jpeg?auto=compress&cs=tinysrgb&h=600&w=800" alt="Islamic finance professionals collaborating" className="h-full w-full object-cover" />
                </ArchFrame>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-12 lg:grid-cols-4 lg:px-6">
            {stats.map((s) => (
              <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="text-center">
            <OrnamentDivider className="mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              To democratize Islamic finance education by making it accessible, practical, and engaging for every Muslim — whether you're a banking professional in Riyadh, an entrepreneur in Lagos, or a student in Kuala Lumpur. We believe that understanding halal finance is not a luxury reserved for certified experts, but essential knowledge for every Muslim who participates in the modern economy.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground">What We Stand For</h2>
              <p className="mt-2 text-muted-foreground">The principles that guide everything we build</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="rounded-xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-soft-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">Our Journey</h2>
            <p className="mt-2 text-muted-foreground">From an idea to a global platform</p>
          </div>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                    <span className="font-display text-sm font-bold">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground">Learners Like You</h2>
              <p className="mt-2 text-muted-foreground">Stories from our global community</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary">
          <PatternBackground variant="girih" />
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6 lg:py-24">
            <h2 className="font-display text-3xl font-bold text-primary-foreground">Join 25,000+ learners worldwide</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">Start your Islamic finance journey today. No prior knowledge needed.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
