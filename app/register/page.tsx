'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PatternBackground, Logo, OrnamentDivider } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight, Mail, Lock, UserRound, ShieldCheck, Award, Users, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const strength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    return score;
  };
  const score = strength();
  const strengthLabel = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
  const strengthColor = ['bg-destructive', 'bg-destructive', 'bg-warning', 'bg-info', 'bg-success'][score];

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/"><Logo /></Link>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start learning Islamic finance today.</p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <UserRound className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" type="text" placeholder="Your full name" className="ps-9" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="ps-9" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  className="px-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn('h-1 flex-1 rounded-full transition-colors', i < score ? strengthColor : 'bg-border')}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Password strength: <span className="font-medium text-foreground">{strengthLabel}</span></p>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-input accent-primary" />
              <span>I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link></span>
            </label>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" size="lg">
              Create Account
              <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative flex justify-center text-xs uppercase text-muted-foreground">
              <span className="bg-background px-2">or sign up with</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <svg className="me-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" /><path fill="currentColor" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" /></svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="me-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.38 1.279-3.21.81-.96 2.157-1.64 3.248-1.69.03.13.04.28.04.67Z" /></svg>
              Apple
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <PatternBackground variant="star" className="text-primary-foreground" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="inline-block">
            <Logo className="[&_svg_rect]:fill-primary-foreground/15 [&_span]:text-primary-foreground" />
          </Link>
          <div className="max-w-md">
            <OrnamentDivider className="text-primary-foreground" />
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-primary-foreground">
              Join 25,000+ learners worldwide
            </h2>
            <p className="mt-4 text-primary-foreground/70">
              Access expert-led courses, live classes, and private mentoring — all built for Islamic finance excellence.
            </p>
            <div className="mt-10 space-y-4">
              {[
                { icon: Check, text: 'Verifiable certificates recognized by employers' },
                { icon: Check, text: 'Learn at your own pace, on any device' },
                { icon: Check, text: '14-day money-back guarantee on all courses' },
                { icon: Check, text: 'Multi-currency payment: card, PayPal, mobile money' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-primary-foreground/80">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/10">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-primary-foreground/50">© 2026 Taqseem. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
