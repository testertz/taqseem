'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { instructors, mentorAvailability } from '@/lib/marketing-data';
import { Star, Globe, Users, Clock, CheckCircle2, Calendar, ArrowRight, Video, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PrivateSessionsPage() {
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);

  const selectedMentor = instructors.find((i) => i.id === selectedMentorId);
  const availability = selectedMentorId ? mentorAvailability[selectedMentorId] || [] : [];

  const handleBooking = () => {
    setBooked(true);
  };

  const resetBooking = () => {
    setBooked(false);
    setSelectedMentorId(null);
    setSelectedDay(null);
    setSelectedSlot(null);
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-card pt-28 pb-8 md:pt-32">
        <PatternBackground variant="girih" className="text-primary" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
          <Badge className="mb-3 gap-1.5 bg-accent/15 text-accent-foreground">
            <MessageSquare className="h-3.5 w-3.5" /> 1-to-1 Mentoring
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Private Sessions
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Book a private session with an expert mentor. Get personalized guidance on Islamic finance topics, tailored to your goals and schedule.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        {!selectedMentor ? (
          <>
            <h2 className="mb-5 font-display text-xl font-semibold text-foreground">Choose your mentor</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {instructors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <div className="flex items-start gap-4">
                    <ArchFrame className="aspect-square w-20 shrink-0 bg-secondary">
                      <img src={mentor.avatar} alt={mentor.name} className="h-full w-full object-cover" />
                    </ArchFrame>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground">{mentor.name}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{mentor.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> <span className="font-semibold tabular-nums text-foreground">{mentor.rating}</span></span>
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {mentor.students.toLocaleString()} students</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-display text-xl font-bold tabular-nums text-foreground">${mentor.sessionPrice}</p>
                      <p className="text-xs text-muted-foreground">per session</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{mentor.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mentor.expertise.map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">{exp}</Badge>
                    ))}
                    {mentor.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="gap-1 text-xs"><Globe className="h-3 w-3" /> {lang}</Badge>
                    ))}
                  </div>
                  <Button
                    className="mt-5 bg-primary text-primary-foreground"
                    onClick={() => setSelectedMentorId(mentor.id)}
                  >
                    Book a Session
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : booked ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-soft-lg">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Session Booked!</h2>
            <p className="mt-2 text-muted-foreground">
              Your private session with {selectedMentor?.name} on {selectedDay} at {selectedSlot} GMT has been confirmed.
              You&apos;ll receive a confirmation email with the video link shortly.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-secondary p-4 text-start">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mentor</span>
                <span className="font-semibold text-foreground">{selectedMentor?.name}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-semibold text-foreground">{selectedDay} · {selectedSlot} GMT</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold text-foreground">60 minutes</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-display font-bold tabular-nums text-foreground">${selectedMentor?.sessionPrice}</span>
              </div>
            </div>
            <Button variant="outline" className="mt-6" onClick={resetBooking}>
              Book Another Session
            </Button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => { setSelectedMentorId(null); setSelectedDay(null); setSelectedSlot(null); }}
              className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to mentors
            </button>

            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <div className="mb-6 flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <ArchFrame className="aspect-square w-16 shrink-0 bg-secondary">
                    <img src={selectedMentor?.avatar} alt={selectedMentor?.name} className="h-full w-full object-cover" />
                  </ArchFrame>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">{selectedMentor?.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedMentor?.title}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> <span className="font-semibold tabular-nums text-foreground">{selectedMentor?.rating}</span></span>
                      <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> {selectedMentor?.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Calendar className="h-5 w-5 text-primary" /> Select a date & time
                  </h3>
                  <p className="mb-4 text-xs text-muted-foreground">All times shown in GMT. Your local time will be displayed on confirmation.</p>
                  <div className="space-y-4">
                    {availability.map((day) => (
                      <div key={day.day}>
                        <p className="mb-2 text-sm font-semibold text-foreground">{day.day}</p>
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((slot) => {
                            const isSelected = selectedDay === day.day && selectedSlot === slot;
                            return (
                              <button
                                key={`${day.day}-${slot}`}
                                onClick={() => { setSelectedDay(day.day); setSelectedSlot(slot); }}
                                className={cn(
                                  'rounded-lg border px-3 py-2 text-sm font-medium tabular-nums transition-all',
                                  isSelected
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary'
                                )}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    <Label htmlFor="notes" className="mb-2 block">
                      Notes for your mentor <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Share what you'd like to focus on in this session..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-soft-lg">
                  <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mentor</span>
                      <span className="font-medium text-foreground">{selectedMentor?.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Session type</span>
                      <span className="font-medium text-foreground">Private 1-on-1</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground">60 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground">{selectedDay || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-foreground">{selectedSlot ? `${selectedSlot} GMT` : '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
                      <Video className="h-4 w-4 text-primary" /> Video link provided after booking
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-display text-2xl font-bold tabular-nums text-foreground">${selectedMentor?.sessionPrice}</span>
                  </div>
                  <Button
                    className="mt-5 w-full bg-primary text-primary-foreground"
                    disabled={!selectedDay || !selectedSlot}
                    onClick={handleBooking}
                  >
                    Confirm & Pay
                  </Button>
                  {!selectedDay || !selectedSlot ? (
                    <p className="mt-2 text-center text-xs text-muted-foreground">Select a date and time to continue</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
