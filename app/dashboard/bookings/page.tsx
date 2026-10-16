'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Radio, CheckCircle2, XCircle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const bookings = [
  { id: 'b1', title: 'Private session with Dr. Al-Kabir', mentor: 'Dr. Yusuf Al-Kabir', date: 'Oct 21, 2026', time: '10:00 GMT', duration: '60 min', type: 'Wealth Management', status: 'upcoming' as const, price: 120 },
  { id: 'b2', title: 'Private session with Fatima Noor', mentor: 'Fatima Noor', date: 'Oct 24, 2026', time: '09:00 GMT', duration: '60 min', type: 'Microfinance', status: 'upcoming' as const, price: 60 },
  { id: 'b3', title: 'Private session with Dr. Amina Hassan', mentor: 'Dr. Amina Hassan', date: 'Oct 5, 2026', time: '14:00 GMT', duration: '60 min', type: 'Sukuk', status: 'completed' as const, price: 95 },
  { id: 'b4', title: 'Private session with Omar Abdullatif', mentor: 'Omar Abdullatif', date: 'Sep 28, 2026', time: '13:00 GMT', duration: '60 min', type: 'Takaful', status: 'cancelled' as const, price: 75 },
];

export default function BookingsPage() {
  const upcoming = bookings.filter((b) => b.status === 'upcoming');
  const past = bookings.filter((b) => b.status !== 'upcoming');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">My Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">{upcoming.length} upcoming · {past.length} past sessions</p>
        </div>

        {upcoming.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-foreground">Upcoming</h2>
            {upcoming.map((b) => (
              <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">{b.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {b.time} · {b.duration}</span>
                      </div>
                      <Badge className="mt-2 bg-primary/10 text-primary" variant="secondary">{b.type}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel</Button>
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      <Video className="me-1.5 h-3.5 w-3.5" /> Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">Past Sessions</h2>
          {past.map((b) => (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft opacity-80">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', b.status === 'completed' ? 'bg-success/10' : 'bg-destructive/10')}>
                    {b.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{b.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {b.time}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant={b.status === 'completed' ? 'default' : 'destructive'} className="text-xs">
                        {b.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </Badge>
                      {b.status === 'completed' && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs">View recording</Button>
                      )}
                    </div>
                  </div>
                </div>
                <span className="font-display font-bold tabular-nums text-foreground">${b.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
