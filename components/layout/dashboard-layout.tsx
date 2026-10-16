'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Calendar,
  CreditCard,
  Award,
  Settings,
  Bell,
  Search,
  Globe,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
  { label: 'Live Classes', href: '/dashboard/live-classes', icon: Video },
  { label: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
  { label: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { label: 'Certificates', href: '/dashboard/certificates', icon: Award },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const mobileTabs = navItems.slice(0, 4);

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/dashboard"><Logo /></Link>
          </div>

          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses, lessons, mentors..." className="h-9 ps-9" />
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
              <Globe className="h-4 w-4 text-muted-foreground" />
            </Button>
            <ThemeToggle className="hidden sm:flex" />
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <Link href="/dashboard/settings">
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20">
                <AvatarImage src="https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={cn(
            'fixed inset-y-0 start-0 z-30 mt-14 w-60 transform border-e border-border bg-card transition-transform lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <nav className="flex h-[calc(100vh-3.5rem)] flex-col gap-1 overflow-y-auto p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {isActive && <ChevronRight className="ms-auto h-4 w-4" />}
                </Link>
              );
            })}
            <div className="mt-auto rounded-xl border border-border bg-secondary p-3">
              <p className="text-xs font-semibold text-foreground">Pro Membership</p>
              <p className="mt-1 text-xs text-muted-foreground">Renews on Nov 15, 2026</p>
              <Link href="/pricing">
                <Button variant="ghost" size="sm" className="mt-2 h-7 w-full text-xs">Manage plan</Button>
              </Link>
            </div>
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ms-60">
          <div className="mx-auto max-w-5xl px-4 py-6 pb-24 md:px-6 md:pb-8 md:py-8">
            {children}
          </div>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-lg lg:hidden">
        <div className="flex items-center justify-around">
          {mobileTabs.map((tab) => {
            const isActive = pathname === tab.href || (tab.href !== '/dashboard' && pathname.startsWith(tab.href));
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-2',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
