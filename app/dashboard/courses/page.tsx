'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { enrolledCourses as initialEnrolled, type EnrolledCourse } from '@/lib/dashboard-data';
import { courses } from '@/lib/marketing-data';
import { useToast } from '@/hooks/use-toast';
import { PlayCircle, Award, CheckCircle2, Clock, BookOpen, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MyCoursesPage() {
  const { toast } = useToast();
  const [myCourses, setMyCourses] = useState<EnrolledCourse[]>(initialEnrolled);
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [dropTarget, setDropTarget] = useState<EnrolledCourse | null>(null);

  const notEnrolled = courses.filter((c) => !myCourses.some((e) => e.courseId === c.id));

  const filtered = myCourses.filter((e) => filter === 'all' || e.status === filter);

  const enroll = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    setMyCourses((prev) => [
      ...prev,
      {
        courseId,
        progress: 0,
        status: 'in-progress',
        lastLessonSection: course.sections[0]?.title || 'Getting Started',
        lastLessonTitle: course.sections[0]?.lessons[0]?.title || 'Introduction',
        lastLessonIndex: 1,
        totalLessons: course.lessons || course.sections.reduce((a, s) => a + s.lessons.length, 0),
        minutesPerWeek: 0,
      },
    ]);
    setEnrollOpen(false);
    toast({ title: 'Enrolled', description: `You are now enrolled in "${course.title}".` });
  };

  const confirmDrop = () => {
    if (!dropTarget) return;
    const course = courses.find((c) => c.id === dropTarget.courseId);
    setMyCourses((prev) => prev.filter((e) => e.courseId !== dropTarget.courseId));
    setDropTarget(null);
    toast({ title: 'Course dropped', description: `"${course?.title}" was removed from your courses.`, variant: 'destructive' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">My Courses</h1>
            <p className="mt-1 text-sm text-muted-foreground">{myCourses.length} courses enrolled</p>
          </div>
          <Button size="sm" onClick={() => setEnrollOpen(true)}><span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> Enroll in a Course</span></Button>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as 'all' | 'in-progress' | 'completed')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  filter === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <Card className="rounded-2xl shadow-soft">
            <CardContent className="p-12 text-center">
              <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">No courses in this category yet.</p>
              <Link href="/courses"><Button variant="outline" size="sm" className="mt-4">Browse courses</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((enrolled) => {
              const course = courses.find((c) => c.id === enrolled.courseId);
              if (!course) return null;
              return (
                <div
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <Link href={`/dashboard/courses/${course.id}`} className="relative">
                    <ArchFrame className="aspect-[16/10] w-full bg-secondary">
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </ArchFrame>
                    <div className="absolute end-3 top-3">
                      {enrolled.status === 'completed' ? (
                        <Badge className="gap-1 bg-success text-success-foreground">
                          <CheckCircle2 className="h-3 w-3" /> Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-primary/10 text-primary">In Progress</Badge>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/dashboard/courses/${course.id}`}>
                        <h3 className="mb-1 line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{course.title}</h3>
                        <p className="mb-3 text-xs text-muted-foreground">{course.instructor}</p>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                        aria-label={`Drop ${course.title}`}
                        onClick={() => setDropTarget(enrolled)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    {enrolled.status === 'in-progress' && (
                      <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> Next: {enrolled.lastLessonTitle}
                      </p>
                    )}
                    <div className="mt-auto">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground tabular-nums">{enrolled.progress}%</span>
                        {enrolled.status === 'completed' && (
                          <span className="flex items-center gap-1 text-xs text-success">
                            <Award className="h-3.5 w-3.5" /> Certificate earned
                          </span>
                        )}
                      </div>
                      <Progress value={enrolled.progress} className="h-1.5" />
                      {enrolled.status === 'in-progress' && (
                        <Link href={`/dashboard/courses/${course.id}?lesson=${enrolled.lastLessonIndex}`}>
                          <Button size="sm" className="mt-3 w-full bg-primary text-primary-foreground">
                            <PlayCircle className="me-1.5 h-3.5 w-3.5" /> Resume Lesson {enrolled.lastLessonIndex}
                          </Button>
                        </Link>
                      )}
                      {enrolled.status === 'completed' && (
                        <Link href="/dashboard/certificates">
                          <Button size="sm" variant="outline" className="mt-3 w-full">
                            <Award className="me-1.5 h-3.5 w-3.5 text-primary" /> View Certificate
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Enroll dialog */}
        <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enroll in a course</DialogTitle>
              <DialogDescription>Pick a course from the catalog to add it to your dashboard. Demo only — no payment is taken.</DialogDescription>
            </DialogHeader>
            <div className="max-h-72 space-y-2 overflow-y-auto py-1">
              {notEnrolled.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">You are enrolled in every course.</p>
              ) : (
                notEnrolled.map((course) => (
                  <div key={course.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={course.thumbnail} alt="" className="h-10 w-16 shrink-0 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.instructor} · ${course.price}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => enroll(course.id)}>Enroll</Button>
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEnrollOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Drop confirmation */}
        <Dialog open={!!dropTarget} onOpenChange={(open) => !open && setDropTarget(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Drop this course?</DialogTitle>
              <DialogDescription>"{dropTarget && courses.find((c) => c.id === dropTarget.courseId)?.title}" and your progress will be removed from My Courses. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDropTarget(null)}>Keep course</Button>
              <Button variant="destructive" onClick={confirmDrop}>Drop course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
