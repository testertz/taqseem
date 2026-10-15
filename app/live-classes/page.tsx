'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { liveClasses } from '@/lib/marketing-data';
import { Calendar, Clock, Users, Video, Radio, CheckCircle2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const topics = ['All', 'Capital Markets', 'Wealth Management', 'Takaful', 'Fintech', 'Microfinance', 'Compliance'];

export default function LiveClassesPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [topic, setTopic] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = liveClasses.filter((lc) => {
    if (topic !== 'All' && lc.topic !== topic) return false;
    if (search && !lc.title.toLowerCase().includes(search.toLowerCase()) && !lc.instructor.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const upcoming = filtered.filter((lc) => lc.status === 'upcoming');
  const recorded = filtered.filter((lc) => lc.status === 'recorded');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-card pt-28 pb-8 md:pt-32">
        <PatternBackground variant="grid" className="text-primary" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
          <Badge className="mb-3 gap-1.5 bg-primary/10 text-primary">
            <Radio className="h-3.5 w-3.5" /> Live & Interactive
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Live Classes
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Join scheduled, instructor-led sessions in real time. All times shown in your local time zone. Recordings included with Pro membership.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  topic === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search classes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-lg border border-input bg-background ps-9 pe-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="hidden items-center rounded-lg border border-border bg-card sm:flex">
              <button onClick={() => setView('list')} className={cn('rounded-s-lg px-3 py-2 text-sm font-medium', view === 'list' ? 'bg-secondary text-foreground' : 'text-muted-foreground')}>
                List
              </button>
              <button onClick={() => setView('calendar')} className={cn('rounded-e-lg px-3 py-2 text-sm font-medium', view === 'calendar' ? 'bg-secondary text-foreground' : 'text-muted-foreground')}>
                Calendar
              </button>
            </div>
          </div>
        </div>

        {view === 'list' ? (
          <>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Upcoming Sessions</h2>
            {upcoming.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">No upcoming sessions match your filters.</div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {upcoming.map((lc) => (
                  <div key={lc.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:shadow-soft-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge className="bg-primary/10 text-primary">{lc.topic}</Badge>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" /> {lc.date}
                      </span>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{lc.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{lc.description}</p>
                    <div className="flex items-center gap-3 border-t border-border pt-4">
                      <img src={lc.instructorAvatar} alt={lc.instructor} className="h-8 w-8 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{lc.instructor}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {lc.duration}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {lc.seatsLeft} seats left</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-lg font-bold tabular-nums text-foreground">${lc.price}</span>
                      <Button size="sm" className="bg-primary text-primary-foreground" disabled={lc.seatsLeft === 0}>
                        {lc.seatsLeft === 0 ? 'Sold out' : 'Enroll'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {recorded.length > 0 && (
              <>
                <h2 className="mb-4 mt-10 font-display text-lg font-semibold text-foreground">Recorded Sessions</h2>
                <div className="grid gap-5 md:grid-cols-2">
                  {recorded.map((lc) => (
                    <div key={lc.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <div className="mb-3 flex items-center justify-between">
                        <Badge variant="secondary">Recorded</Badge>
                        <span className="text-xs text-muted-foreground">{lc.date}</span>
                      </div>
                      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{lc.title}</h3>
                      <p className="mb-4 flex-1 text-sm text-muted-foreground">{lc.description}</p>
                      <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Video className="h-4 w-4 text-primary" /> Recording available
                        </div>
                        <Button size="sm" variant="outline">
                          <CheckCircle2 className="me-1.5 h-3.5 w-3.5 text-primary" /> Watch
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted-foreground">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="pb-2">{day}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                const dayNum = i + 1;
                const dayClasses = liveClasses.filter((lc) => {
                  const dayMatch = lc.date.includes(`Oct ${dayNum}`);
                  return dayMatch;
                });
                return (
                  <div
                    key={i}
                    className={cn(
                      'min-h-20 rounded-lg border p-1.5 text-start',
                      dayClasses.length > 0 ? 'border-primary/20 bg-primary/5' : 'border-border bg-background'
                    )}
                  >
                    <span className="text-xs font-semibold text-muted-foreground">{dayNum}</span>
                    {dayClasses.map((lc) => (
                      <div key={lc.id} className="mt-1 rounded bg-primary/10 p-1 text-xs text-primary">
                        <p className="truncate font-medium">{lc.title}</p>
                        <p className="text-muted-foreground">{lc.date.split('·')[1]}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
