'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, OrnamentDivider, ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { instructors } from '@/lib/marketing-data';
import { Star, Globe, Users, BookOpen, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InstructorsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <PatternBackground variant="star" />
          <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-6 lg:py-20">
            <Badge variant="secondary" className="mb-4">Our Experts</Badge>
            <h1 className="font-display text-4xl font-bold text-foreground lg:text-5xl">Learn from practicing Islamic finance leaders</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Our instructors aren't just academics — they're Shariah board members, Sukuk structurers, and microfinance pioneers who shape the industry they teach about.
            </p>
          </div>
        </section>

        {/* Instructors grid */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {instructors.map((inst) => (
              <div key={inst.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:shadow-soft-lg">
                <div className="flex flex-col gap-6 p-6 sm:flex-row">
                  <ArchFrame className="aspect-square w-32 shrink-0 bg-secondary sm:w-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={inst.avatar} alt={inst.name} className="h-full w-full object-cover" />
                  </ArchFrame>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground">{inst.name}</h3>
                    <p className="text-sm text-primary">{inst.title}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> {inst.rating}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {inst.students.toLocaleString()} students</span>
                      <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {inst.courses} courses</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {inst.expertise.map((e) => (
                        <Badge key={e} variant="secondary" className="text-[10px]">{e}</Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Globe className="h-3.5 w-3.5" />
                      {inst.languages.join(' · ')}
                    </div>
                  </div>
                </div>
                <div className="border-t border-border px-6 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{inst.bio}</p>
                </div>
                <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-6 py-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Private session from</span>
                    <p className="font-display text-lg font-bold text-foreground">${inst.sessionPrice}<span className="text-sm font-normal text-muted-foreground">/session</span></p>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/private-sessions"><span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> Book Session</span></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-border bg-secondary/30">
          <PatternBackground variant="arabesque" />
          <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6 lg:py-20">
            <OrnamentDivider className="mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-foreground">Want to teach with us?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We're always looking for experienced Islamic finance professionals to join our faculty. If you have industry experience and a passion for teaching, we'd love to hear from you.
            </p>
            <Button className="mt-8" size="lg" asChild>
              <Link href="/contact"><span className="flex items-center gap-1.5">Apply to Teach <ArrowRight className="h-4 w-4" /></span></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
