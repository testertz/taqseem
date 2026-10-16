'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PatternBackground, Logo, OrnamentDivider } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight, Mail, Lock, UserRound, ShieldCheck, Award, Users } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
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
              Continue your Islamic finance journey
            </h2>
            <p className="mt-4 text-primary-foreground/70">
              Access your courses, live classes, bookings, and certificates — all in one place.
            </p>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Award className="h-4 w-4" />
                </div>
                <span className="text-sm">9,800+ certificates issued</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Users className="h-4 w-4" />
                </div>
                <span className="text-sm">25,000+ learners across 34 countries</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-sm">Expert instructors from leading institutions</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/50">© 2026 Taqseem. All rights reserved.</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/"><Logo /></Link>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access your dashboard.</p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="ps-9" required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="px-9"
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
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" size="lg">
              Sign In
              <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative flex justify-center text-xs uppercase text-muted-foreground">
              <span className="bg-background px-2">or continue with</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <svg className="me-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" /><path fill="currentColor" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" /></svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="me-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.38 1.279-3.21.81-.96 2.157-1.64 3.248-1.69.03.13.04.28.04.67Zm.99 17.18c-.03-.07-.463-1.38-1.47-2.67-.96-1.2-2.05-1.66-2.97-1.66-.68 0-1.1.31-1.27.43-.42.3-1.27.95-1.27 2.6 0 1.27.45 2.27.85 2.9-.85.27-2.07.7-3.42 1.42C4.47 22.3 2.5 24.37 2.5 27c0 .35.05.7.14 1.04.36 1.36 1.45 2.18 2.58 2.18.9 0 1.62-.43 2.27-.9.62-.45 1.18-.94 1.72-1.28.54-.34 1.02-.5 1.54-.5.62 0 1.1.2 1.66.5.56.3 1.1.74 1.72 1.28.65.47 1.37.9 2.27.9 1.13 0 2.22-.82 2.58-2.18.09-.34.14-.69.14-1.04 0-2.63-1.97-4.7-4.47-5.97-1.35-.72-2.57-1.15-3.42-1.42.4-.63.85-1.63.85-2.9 0-1.65-.85-2.3-1.27-2.6-.17-.12-.59-.43-1.27-.43-.92 0-2.01.46-2.97 1.66-1.007 1.29-1.44 2.6-1.47 2.67Z" /></svg>
              Apple
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
