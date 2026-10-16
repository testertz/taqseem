'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminBookings } from '@/lib/admin-data';
import { Search, CalendarDays, Clock, Video, X, CheckCircle2 } from 'lucide-react';

const statusBadge = (status: string) => {
  if (status === 'upcoming') return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">Upcoming</Badge>;
  if (status === 'completed') return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Completed</Badge>;
  return <Badge variant="destructive">Cancelled</Badge>;
};

export default function AdminBookingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = adminBookings.filter((b) => {
    if (search && !b.student.toLowerCase().includes(search.toLowerCase()) && !b.mentor.toLowerCase().includes(search.toLowerCase()) && !b.topic.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    return true;
  });

  const upcoming = filtered.filter((b) => b.status === 'upcoming');
  const past = filtered.filter((b) => b.status !== 'upcoming');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Bookings</h1>
            <p className="text-sm text-muted-foreground">{upcoming.length} upcoming · {past.length} past</p>
          </div>
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
                      <Button variant="outline" size="sm" className="text-destructive">
                        <span className="flex items-center gap-1"><X className="h-3.5 w-3.5" /> Cancel</span>
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
      </div>
    </AdminLayout>
  );
}
