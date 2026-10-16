'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PatternBackground, ArchFrame } from '@/components/brand/brand';
import { ProgressRing } from '@/components/brand/dashboard-extensions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, Calendar, Video, Award, TrendingUp, Flame, ArrowRight, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Aisha Juma</h1>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2">
              <Flame className="h-5 w-5 text-warning" />
              <div>
                <p className="font-display text-lg font-bold tabular-nums text-foreground">12</p>
                <p className="text-xs text-muted-foreground">day streak</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Courses in progress', value: '3', icon: PlayCircle },
            { label: 'Hours learned', value: '47.5', icon: Clock },
            { label: 'Certificates earned', value: '2', icon: Award },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold tabular-nums text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">Continue learning</h2>
            <Link href="/dashboard/courses">
              <Button variant="ghost" size="sm" className="text-primary">View all <ArrowRight className="ms-1 h-3.5 w-3.5" /></Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: 'Foundations of Islamic Banking & Finance', instructor: 'Dr. Yusuf Al-Kabir', progress: 65, thumbnail: 'https://images.pexels.com/photos/13431445/pexels-photo-13431445.jpeg?auto=compress&cs=tinysrgb&h=200&w=300', lesson: 'Lesson 22 of 48', href: '/dashboard/courses/c1' },
              { title: 'Sukuk: Islamic Capital Market Instruments', instructor: 'Dr. Amina Hassan', progress: 30, thumbnail: 'https://images.pexels.com/photos/19989050/pexels-photo-19989050.jpeg?auto=compress&cs=tinysrgb&h=200&w=300', lesson: 'Lesson 11 of 36', href: '/dashboard/courses/c2' },
            ].map((course) => (
              <Link key={course.title} href={course.href} className="group flex gap-4 rounded-xl border border-border bg-background p-3 transition-all hover:border-primary/30 hover:shadow-soft">
                <ArchFrame className="aspect-[16/10] w-28 shrink-0 bg-secondary">
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                </ArchFrame>
                <div className="flex flex-1 flex-col">
                  <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">{course.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{course.instructor}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{course.lesson}</p>
                  <div className="mt-auto">
                    <Progress value={course.progress} className="h-1.5" />
                    <p className="mt-1 text-xs font-medium text-primary tabular-nums">{course.progress}% complete</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Video className="h-5 w-5 text-primary" /> Upcoming Live Classes
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Zakat Calculation Workshop', date: 'Oct 20 · 16:00 GMT', instructor: 'Dr. Yusuf Al-Kabir' },
                { title: 'Takaful Product Design Lab', date: 'Oct 22 · 13:00 GMT', instructor: 'Omar Abdullatif' },
              ].map((lc) => (
                <div key={lc.title} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{lc.title}</p>
                    <p className="text-xs text-muted-foreground">{lc.date} · {lc.instructor}</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0">Join</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Calendar className="h-5 w-5 text-primary" /> Upcoming Bookings
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Private session with Dr. Al-Kabir', date: 'Oct 21 · 10:00 GMT', type: 'Wealth Management' },
                { title: 'Private session with Fatima Noor', date: 'Oct 24 · 09:00 GMT', type: 'Microfinance' },
              ].map((booking) => (
                <div key={booking.title} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <ArchFrame className="h-10 w-10 shrink-0 bg-secondary">
                    <div className="flex h-full w-full items-center justify-center bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                  </ArchFrame>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{booking.title}</p>
                    <p className="text-xs text-muted-foreground">{booking.date}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">{booking.type}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" /> Recommended for you
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Takaful: Shariah-Compliant Insurance', instructor: 'Omar Abdullatif', price: 99, thumbnail: 'https://images.pexels.com/photos/8566288/pexels-photo-8566288.jpeg?auto=compress&cs=tinysrgb&h=200&w=300', id: 'c3' },
              { title: 'Islamic Wealth Management', instructor: 'Dr. Yusuf Al-Kabir', price: 149, thumbnail: 'https://images.pexels.com/photos/4056856/pexels-photo-4056856.jpeg?auto=compress&cs=tinysrgb&h=200&w=300', id: 'c4' },
              { title: 'Shariah Governance & Compliance', instructor: 'Dr. Amina Hassan', price: 159, thumbnail: 'https://images.pexels.com/photos/10885433/pexels-photo-10885433.jpeg?auto=compress&cs=tinysrgb&h=200&w=300', id: 'c5' },
            ].map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="group overflow-hidden rounded-xl border border-border bg-background transition-all hover:shadow-soft">
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">{course.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{course.instructor}</p>
                  <p className="mt-2 font-display font-bold tabular-nums text-foreground">${course.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
