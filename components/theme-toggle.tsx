'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('h-9 w-9 transition-colors', className)}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {mounted ? (
        <>
          <Sun className={cn('h-4 w-4 transition-all', isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0')} />
          <Moon className={cn('absolute h-4 w-4 transition-all', isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100')} />
        </>
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
