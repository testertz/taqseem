'use client';

import { PatternBackground, OrnamentDivider } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Home, Search, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <PatternBackground variant="girih" />
      <div className="relative z-10 px-4 text-center">
        <OrnamentDivider className="mx-auto mb-8" />
        <h1 className="font-display text-7xl font-bold text-primary lg:text-9xl">404</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">Page not found</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/"><span className="flex items-center gap-1.5"><Home className="h-4 w-4" /> Back to Home</span></Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/courses"><span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Browse Courses</span></Link>
          </Button>
        </div>
        <OrnamentDivider className="mx-auto mt-8" />
      </div>
    </div>
  );
}