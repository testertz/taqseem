'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, OrnamentDivider } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { pricingPlans, faqs } from '@/lib/marketing-data';
import { CheckCircle2, Sparkles, ShieldCheck, CreditCard, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-card pt-28 pb-8 md:pt-32">
        <PatternBackground variant="arabesque" className="text-primary" />
        <div className="relative mx-auto max-w-[1280px] px-4 text-center md:px-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Pricing that fits your journey
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Pay per course, subscribe for unlimited access, or book expert mentoring. No hidden fees.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg',
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

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 14-day money-back guarantee</span>
            <span className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-primary" /> Card, PayPal & mobile money</span>
            <span className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> Multi-currency support</span>
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <OrnamentDivider />
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Pricing FAQ
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-background px-5 shadow-soft [&[data-state=open]]:border-primary/30"
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

      <Footer />
    </div>
  );
}
