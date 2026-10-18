'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminBookings, type AdminBooking } from '@/lib/admin-data';
import { useToast } from '@/hooks/use-toast';
import { Search, CalendarDays, Clock, Video, X, CheckCircle2, Plus, Trash2 } from 'lucide-react';

const statusBadge = (status: string) => {
  if (status === 'upcoming') return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">Upcoming</Badge>;
  if (status === 'completed') return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Completed</Badge>;
  return <Badge variant="destructive">Cancelled</Badge>;
};

const emptyForm = { student: '', mentor: 'Dr. Yusuf Al-Kabir', topic: '', date: '', time: '', duration: '60 min', price: '' };

export default function AdminBookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<AdminBooking[]>(adminBookings);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<AdminBooking | null>(null);

  const filtered = bookings.filter((b) => {
    if (search && !b.student.toLowerCase().includes(search.toLowerCase()) && !b.mentor.toLowerCase().includes(search.toLowerCase()) && !b.topic.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    return true;
  });

  const upcoming = filtered.filter((b) => b.status === 'upcoming');
  const past = filtered.filter((b) => b.status !== 'upcoming');

  const nextBookingId = () => {
    const nums = bookings.map((b) => parseInt(b.id.replace(/\D/g, ''), 10)).filter((n) => !isNaN(n));
    return `BK-${(nums.length ? Math.max(...nums) : 100) + 1}`;
  };

  const addBooking = () => {
    const price = parseFloat(form.price);
    if (!form.student.trim() || !form.topic.trim() || !form.date || !form.time || isNaN(price) || price <= 0) {
      toast({ title: 'Check your details', description: 'Student, topic, date, time, and a positive price are required.', variant: 'destructive' });
      return;
    }
    const newBooking: AdminBooking = {
      id: nextBookingId(),
      student: form.student.trim(),
      studentEmail: 'student@email.com',
      mentor: form.mentor,
      topic: form.topic.trim(),
      date: new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: form.time,
      duration: form.duration,
      price,
      status: 'upcoming',
    };
    setBookings((prev) => [newBooking, ...prev]);
    setForm(emptyForm);
    setAddOpen(false);
    toast({ title: 'Booking created', description: `${newBooking.student} with ${newBooking.mentor} on ${newBooking.date}.` });
  };

  const setStatus = (b: AdminBooking, status: AdminBooking['status']) => {
    setBookings((prev) => prev.map((x) => (x.id === b.id ? { ...x, status } : x)));
    if (status === 'cancelled') toast({ title: 'Booking cancelled', description: `${b.id} — ${b.topic}`, variant: 'destructive' });
    else toast({ title: 'Booking marked completed', description: `${b.id} — ${b.topic}` });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setBookings((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    toast({ title: 'Booking deleted', description: `${deleteTarget.id} was removed.`, variant: 'destructive' });
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Bookings</h1>
            <p className="text-sm text-muted-foreground">{upcoming.length} upcoming · {past.length} past</p>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}><span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> New Booking</span></Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by student, mentor, or topic..." value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Upcoming bookings */}
        {upcoming.length > 0 && (
          <div>
            <h2 className="mb-3 font-display text-base font-semibold text-foreground">Upcoming Sessions</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {upcoming.map((booking) => (
                <div key={booking.id} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{booking.id}</p>
                      <p className="mt-0.5 font-medium text-foreground">{booking.topic}</p>
                    </div>
                    {statusBadge(booking.status)}
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-medium text-foreground">{booking.student}</span>
                      <span>→</span>
                      <span className="font-medium text-foreground">{booking.mentor}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {booking.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {booking.time}</span>
                      <span>{booking.duration}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="font-semibold tabular-nums text-foreground">${booking.price}</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => setStatus(booking, 'cancelled')}>
                        <span className="flex items-center gap-1"><X className="h-3.5 w-3.5" /> Cancel</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setStatus(booking, 'completed')}>
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Complete</span>
                      </Button>
                      <Button size="sm">
                        <span className="flex items-center gap-1"><Video className="h-3.5 w-3.5" /> Join</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past bookings */}
        {past.length > 0 && (
          <div>
            <h2 className="mb-3 font-display text-base font-semibold text-foreground">Past Sessions</h2>
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-secondary/40">
                    <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <th className="px-4 py-3 text-start">ID</th>
                      <th className="px-4 py-3 text-start">Student</th>
                      <th className="px-4 py-3 text-start">Mentor</th>
                      <th className="px-4 py-3 text-start">Topic</th>
                      <th className="px-4 py-3 text-start">Date</th>
                      <th className="px-4 py-3 text-start">Amount</th>
                      <th className="px-4 py-3 text-start">Status</th>
                      <th className="px-4 py-3 text-end"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {past.map((booking) => (
                      <tr key={booking.id} className="transition-colors hover:bg-secondary/30">
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{booking.id}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{booking.student}</td>
                        <td className="px-4 py-3 text-muted-foreground">{booking.mentor}</td>
                        <td className="px-4 py-3 text-muted-foreground">{booking.topic}</td>
                        <td className="px-4 py-3 text-muted-foreground">{booking.date}</td>
                        <td className="px-4 py-3 font-medium tabular-nums text-foreground">${booking.price}</td>
                        <td className="px-4 py-3">{statusBadge(booking.status)}</td>
                        <td className="px-4 py-3 text-end">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" aria-label={`Delete ${booking.id}`} onClick={() => setDeleteTarget(booking)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="divide-y divide-border md:hidden">
                {past.map((booking) => (
                  <div key={booking.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{booking.id}</p>
                        <p className="text-sm font-medium text-foreground">{booking.topic}</p>
                        <p className="text-xs text-muted-foreground">{booking.student} → {booking.mentor}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{booking.date} · ${booking.price}</p>
                      </div>
                      {statusBadge(booking.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No bookings match your filters.</p>
          </div>
        )}

        {/* Add booking dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New booking</DialogTitle>
              <DialogDescription>Schedule a private session. It starts as upcoming.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-booking-student">Student name</Label>
                  <Input id="new-booking-student" placeholder="e.g. Maryam Omar" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Mentor</Label>
                  <Select value={form.mentor} onValueChange={(v) => setForm({ ...form, mentor: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Yusuf Al-Kabir">Dr. Yusuf Al-Kabir</SelectItem>
                      <SelectItem value="Dr. Amina Hassan">Dr. Amina Hassan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-booking-topic">Topic</Label>
                <Input id="new-booking-topic" placeholder="e.g. Sukuk Structures Review" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="new-booking-date">Date</Label>
                  <Input id="new-booking-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-booking-time">Time</Label>
                  <Input id="new-booking-time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-booking-price">Price (USD)</Label>
                  <Input id="new-booking-price" type="number" min="0" placeholder="150" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select value={form.duration} onValueChange={(v) => setForm({ ...form, duration: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 min">30 min</SelectItem>
                    <SelectItem value="45 min">45 min</SelectItem>
                    <SelectItem value="60 min">60 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={addBooking}>Create booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete this booking?</DialogTitle>
              <DialogDescription>{deleteTarget?.id} — {deleteTarget?.topic} ({deleteTarget?.student}) will be permanently removed. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>Keep booking</Button>
              <Button variant="destructive" onClick={confirmDelete}><Trash2 className="me-1.5 h-3.5 w-3.5" /> Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
