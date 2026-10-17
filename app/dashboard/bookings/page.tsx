'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { studentBookings, type StudentBooking } from '@/lib/dashboard-data';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

function formatBookingDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<StudentBooking[]>(studentBookings);
  const [rescheduleTarget, setRescheduleTarget] = useState<StudentBooking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);
  const [cancelTarget, setCancelTarget] = useState<StudentBooking | null>(null);
  const [joinedBooking, setJoinedBooking] = useState<StudentBooking | null>(null);

  const upcoming = bookings.filter((b) => b.status === 'upcoming');
  const past = bookings.filter((b) => b.status !== 'upcoming');

  const confirmReschedule = () => {
    if (!rescheduleTarget || !rescheduleDate) return;
    const formatted = rescheduleDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setBookings((prev) =>
      prev.map((b) => (b.id === rescheduleTarget.id ? { ...b, date: rescheduleDate.toISOString().slice(0, 10) } : b))
    );
    setRescheduleTarget(null);
    setRescheduleDate(undefined);
    toast({ title: 'Booking rescheduled', description: `${rescheduleTarget.title} moved to ${formatted}` });
  };

  const confirmCancel = () => {
    if (!cancelTarget) return;
    setBookings((prev) => prev.map((b) => (b.id === cancelTarget.id ? { ...b, status: 'cancelled' } : b)));
    toast({ title: 'Booking cancelled', description: `${cancelTarget.title} has been cancelled.`, variant: 'destructive' });
    setCancelTarget(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">My Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">{upcoming.length} upcoming · {past.length} past sessions</p>
        </div>

        {upcoming.length > 0 ? (
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-foreground">Upcoming</h2>
            {upcoming.map((b) => (
              <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">{b.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {formatBookingDate(b.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {b.time} · {b.duration}</span>
                      </div>
                      <Badge className="mt-2 bg-primary/10 text-primary" variant="secondary">{b.type}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setRescheduleTarget(b); setRescheduleDate(new Date(b.date + 'T00:00:00')); }}>
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setCancelTarget(b)}>
                      Cancel
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => setJoinedBooking(b)}>
                      <Video className="me-1.5 h-3.5 w-3.5" /> Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Video className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">No upcoming sessions. Book a private session with an instructor.</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <a href="/private-sessions">Book a session</a>
            </Button>
          </div>
        )}

        {past.length > 0 && (
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
                        <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {formatBookingDate(b.date)}</span>
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
        )}

        {/* Reschedule dialog */}
        <Dialog open={!!rescheduleTarget} onOpenChange={(open) => !open && setRescheduleTarget(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reschedule session</DialogTitle>
              <DialogDescription>
                Pick a new date for {rescheduleTarget?.title}. The time stays at {rescheduleTarget?.time}.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-2">
              <Calendar mode="single" selected={rescheduleDate} onSelect={setRescheduleDate} disabled={{ before: new Date() }} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRescheduleTarget(null)}>Keep current date</Button>
              <Button onClick={confirmReschedule} disabled={!rescheduleDate} className="bg-primary text-primary-foreground">
                Confirm new date
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel confirmation dialog */}
        <Dialog open={!!cancelTarget} onOpenChange={(open) => !open && setCancelTarget(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cancel this session?</DialogTitle>
              <DialogDescription>
                {cancelTarget?.title} on {cancelTarget && formatBookingDate(cancelTarget.date)} will be cancelled. This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelTarget(null)}>Keep booking</Button>
              <Button variant="destructive" onClick={confirmCancel}>Yes, cancel it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Demo session room */}
        <Dialog open={!!joinedBooking} onOpenChange={(open) => !open && setJoinedBooking(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{joinedBooking?.title}</DialogTitle>
              <DialogDescription>Session room — demo</DialogDescription>
            </DialogHeader>
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-black">
              <div className="text-center">
                <Video className="mx-auto h-12 w-12 text-primary-foreground/80" />
                <p className="mt-2 text-sm text-primary-foreground/70">Waiting for {joinedBooking?.mentor} to start…</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs font-semibold text-muted-foreground">Chat</p>
              <div className="mt-2 space-y-1.5">
                <p className="text-sm text-foreground"><span className="font-medium">{joinedBooking?.mentor}:</span> As-salamu alaykum, ready when you are.</p>
                <p className="text-sm text-foreground"><span className="font-medium">You:</span> Wa alaykum as-salam, joining now.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setJoinedBooking(null)}>Leave session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
