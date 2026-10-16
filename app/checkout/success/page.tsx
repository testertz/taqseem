'use client';

import Link from 'next/link';
import { PatternBackground, Logo, OrnamentDivider } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Award, PlayCircle, Download } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <PatternBackground variant="star" className="text-primary" />
      <div className="relative w-full max-w-md text-center">
        <Link href="/" className="mb-8 inline-block">
          <Logo />
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft-lg md:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Payment Successful!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your enrollment is confirmed. You now have lifetime access to this course, including all video lessons, resources, and a verifiable certificate upon completion.
          </p>

          <OrnamentDivider className="my-6" />

          <div className="space-y-3 text-start">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <PlayCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Foundations of Islamic Banking</p>
                <p className="text-xs text-muted-foreground">48 lessons · 12 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15">
                <Award className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Certificate included</p>
                <p className="text-xs text-muted-foreground">Earn it by completing all lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10">
                <Download className="h-4 w-4 text-info" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Receipt sent to your email</p>
                <p className="text-xs text-muted-foreground">Order #TQS-2026-1042</p>
              </div>
            </div>
          </div>

          <Link href="/dashboard/courses/c1">
            <Button className="mt-6 w-full bg-primary text-primary-foreground" size="lg">
              Start Learning
              <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="ghost" className="mt-2 w-full">Browse more courses</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
