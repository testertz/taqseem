'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, OrnamentDivider } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@taqseem.com', href: 'mailto:hello@taqseem.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 010-2030', href: 'tel:+15550102030' },
    { icon: MapPin, label: 'Office', value: 'Dubai International Financial Centre, UAE', href: null },
    { icon: MessageCircle, label: 'Live Chat', value: 'Available 9am–6pm GMT', href: null },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <PatternBackground variant="star" />
          <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-6 lg:py-20">
            <h1 className="font-display text-4xl font-bold text-foreground lg:text-5xl">Get in Touch</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Questions about courses, partnerships, or technical issues? We're here to help. Reach out and we'll respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact info cards */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-soft-lg">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{info.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{info.value}</p>
                  </div>
                </div>
              );
              return info.href ? (
                <a key={info.label} href={info.href} className="block">{content}</a>
              ) : (
                <div key={info.label}>{content}</div>
              );
            })}
          </div>
        </section>

        {/* Contact form */}
        <section className="mx-auto max-w-4xl px-4 pb-16 lg:px-6 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:p-8">
                <h2 className="font-display text-xl font-bold text-foreground">Send us a message</h2>
                <p className="mt-1 text-sm text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>

                {submitted ? (
                  <div className="mt-8 flex flex-col items-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Message sent!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Thank you for reaching out. We'll respond within 24 hours.</p>
                    <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Send another message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Your name" className="mt-1.5" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" required />
                      </div>
                    </div>
                    <div>
                      <Label>Subject</Label>
                      <Select defaultValue="general">
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="courses">Course Question</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="teaching">Apply to Teach</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="How can we help you?" rows={5} className="mt-1.5" required />
                    </div>
                    <Button type="submit" className="w-full">
                      <span className="flex items-center gap-2"><Send className="h-4 w-4" /> Send Message</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* FAQ sidebar */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                <h3 className="font-display text-base font-semibold text-foreground">Common Questions</h3>
                <div className="mt-4 space-y-4">
                  {[
                    { q: 'How do I enroll in a course?', a: 'Browse our course catalog, select a course, and follow the checkout process. You\'ll get instant access after payment.' },
                    { q: 'Can I get a refund?', a: 'Yes, we offer a 14-day money-back guarantee on all individual course purchases, no questions asked.' },
                    { q: 'Do you offer group discounts?', a: 'For teams of 10+ learners, we offer custom pricing. Contact us about your group needs.' },
                    { q: 'How do live classes work?', a: 'Live classes are scheduled sessions held via our integrated video platform. You join from your dashboard.' },
                  ].map((faq, i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-medium text-foreground">{faq.q}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <OrnamentDivider className="mt-6" />
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Still have questions? <a href="mailto:hello@taqseem.com" className="font-medium text-primary hover:underline">Email us</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}