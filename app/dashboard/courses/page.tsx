'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { enrolledCourses } from '@/lib/dashboard-data';
import { courses } from '@/lib/marketing-data';
import { PlayCircle, Award, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MyCoursesPage() {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filtered = enrolledCourses.filter((e) => filter === 'all' || e.status === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">My Courses</h1>
            <p className="mt-1 text-sm text-muted-foreground">{enrolledCourses.length} courses enrolled</p>
          </div>
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
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <h3 className="mb-1 line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{course.title}</h3>
                      <p className="mb-3 text-xs text-muted-foreground">{course.instructor}</p>
                    </Link>
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
      </div>
    </DashboardLayout>
  );
}
