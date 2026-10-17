'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courses } from '@/lib/marketing-data';
import { PlayCircle, Lock, CheckCircle2, FileText, MessageSquare, NotebookPen, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CoursePlayerPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const course = courses.find((c) => c.id === id) || courses[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [activeLesson, setActiveLesson] = useState('l1');

  const allLessons = course.sections.flatMap((s) => s.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson);
  const currentSection = course.sections.find((s) => s.lessons.some((l) => l.id === activeLesson));

  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-black shadow-soft-lg">
            {course.videoUrl ? (
              <video
                key={activeLesson}
                src={course.videoUrl}
                controls
                className="h-full w-full"
                poster={course.thumbnail}
                preload="metadata"
              >
                <track kind="captions" />
              </video>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-black">
                <div className="text-center">
                  <PlayCircle className="mx-auto h-16 w-16 text-primary-foreground/80" />
                  <p className="mt-3 text-sm text-primary-foreground/60">Video coming soon — {allLessons[currentLessonIndex]?.title}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{currentSection?.title}</p>
              <h1 className="font-display text-lg font-semibold text-foreground">{allLessons[currentLessonIndex]?.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled={currentLessonIndex === 0}
                onClick={() => { const prev = allLessons[currentLessonIndex - 1]; if (prev) setActiveLesson(prev.id); }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled={currentLessonIndex === allLessons.length - 1}
                onClick={() => { const next = allLessons[currentLessonIndex + 1]; if (next) setActiveLesson(next.id); }}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">Lesson Summary</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  In this lesson, you&apos;ll explore the fundamental concepts of Islamic finance, including the prohibition of Riba (interest), the principles of risk-sharing, and how Shariah compliance shapes financial transactions. Real-world examples from modern Islamic banks illustrate each concept.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">Auto-saved progress</span>
                  <Button size="sm" variant="outline">
                    <CheckCircle2 className="me-1.5 h-3.5 w-3.5 text-primary" /> Mark Complete
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-foreground">
                  <NotebookPen className="h-4 w-4 text-primary" /> My Notes
                </h3>
                <textarea
                  placeholder="Take notes on this lesson... (auto-saved)"
                  rows={6}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-foreground">
                  <FileText className="h-4 w-4 text-primary" /> Lesson Resources
                </h3>
                <div className="space-y-2">
                  {['Slide deck (PDF)', 'Reading list (PDF)', 'Contract templates (ZIP)'].map((res) => (
                    <div key={res} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <span className="flex items-center gap-2 text-sm text-foreground">
                        <FileText className="h-4 w-4 text-primary" /> {res}
                      </span>
                      <Button size="sm" variant="ghost">Download</Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="qa" className="mt-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-foreground">
                  <MessageSquare className="h-4 w-4 text-primary" /> Questions & Answers
                </h3>
                <textarea
                  placeholder="Ask a question about this lesson..."
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button size="sm" className="mt-2 bg-primary text-primary-foreground">Post Question</Button>
                <div className="mt-5 space-y-4">
                  {[
                    { name: 'Khalid M.', text: 'How does Murabaha differ from a conventional loan in practical terms?', replies: 2 },
                    { name: 'Maryam O.', text: 'Can you clarify the difference between Gharar and normal commercial risk?', replies: 1 },
                  ].map((q, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background p-3">
                      <p className="text-sm font-medium text-foreground">{q.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{q.text}</p>
                      <p className="mt-2 text-xs text-primary">{q.replies} replies</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <aside>
          <div className="sticky top-20 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-foreground">Curriculum</h3>
              <span className="text-xs text-muted-foreground tabular-nums">65% complete</span>
            </div>
            <Progress value={65} className="mb-4 h-1.5" />
            <div className="max-h-[60vh] space-y-1 overflow-y-auto">
              {course.sections.map((section, si) => (
                <div key={section.id}>
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{section.title}</p>
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson.id)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-start text-sm transition-colors',
                        activeLesson === lesson.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      {lesson.preview ? (
                        <PlayCircle className="h-3.5 w-3.5 shrink-0" />
                      ) : si < 1 ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                      ) : (
                        <Lock className="h-3 w-3 shrink-0" />
                      )}
                      <span className="line-clamp-1 flex-1">{lesson.title}</span>
                      <span className="text-xs tabular-nums text-muted-foreground">{lesson.duration}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
