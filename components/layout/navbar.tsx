'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, ChevronDown, PlayCircle, Calendar, UserRound, BookOpen, LayoutGrid, Sparkles } from 'lucide-react';
import { Logo } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const megaMenu = [
  {
    title: 'Courses',
    icon: BookOpen,
    href: '/courses',
    items: [
      { title: 'Islamic Banking', desc: 'Foundations & advanced practice', href: '/courses?topic=banking' },
      { title: 'Sukuk & Capital Markets', desc: 'Structuring and analysis', href: '/courses?topic=sukuk' },
      { title: 'Takaful', desc: 'Shariah-compliant insurance', href: '/courses?topic=takaful' },
      { title: 'Compliance & Governance', desc: 'Regulatory frameworks', href: '/courses?topic=compliance' },
    ],
  },
  {
    title: 'Live Classes',
    icon: Calendar,
    href: '/live-classes',
    items: [
      { title: 'Upcoming Sessions', desc: 'Join live, instructor-led classes', href: '/live-classes' },
      { title: 'Recordings', desc: 'Catch up on past sessions', href: '/live-classes?tab=recordings' },
    ],
  },
  {
    title: 'Private Sessions',
    icon: UserRound,
    href: '/private-sessions',
    items: [
      { title: 'Find a Mentor', desc: 'Browse expert instructors', href: '/private-sessions' },
      { title: 'How It Works', desc: 'Book and pay per session', href: '/private-sessions?tab=how' },
    ],
  },
];

const navLinks = [
  { title: 'About', href: '/about' },
  { title: 'Pricing', href: '/pricing' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-6 lg:h-18">
        <Link href="/" className="flex items-center gap-2" aria-label="Taqseem home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {megaMenu.map((menu) => (
                <NavigationMenuItem key={menu.title}>
                  <NavigationMenuTrigger className="bg-transparent font-medium text-foreground hover:bg-secondary/60 hover:text-primary data-[state=open]:bg-secondary/60">
                    {menu.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[420px] gap-2 p-4">
                      {menu.items.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block rounded-xl border border-transparent p-3 transition-all hover:border-border hover:bg-secondary/50"
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                  <menu.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <Link
                    href={link.href}
                    className="inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Globe className="me-1.5 h-4 w-4" />
            EN
            <ChevronDown className="ms-0.5 h-3 w-3" />
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/courses">
            <Button size="sm" className="bg-primary text-primary-foreground shadow-soft hover:bg-primary/90">
              Enroll Now
            </Button>
          </Link>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs overflow-y-auto p-0">
              <div className="flex items-center justify-between border-b border-border p-4">
                <Logo />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <div className="flex flex-col gap-1 p-4">
                {megaMenu.map((menu) => (
                  <div key={menu.title} className="mb-2">
                    <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {menu.title}
                    </p>
                    {menu.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/courses">
                    <Button className="w-full bg-primary text-primary-foreground">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
