'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courses, instructors } from '@/lib/marketing-data';
import { Star, Clock, BookOpen, Globe, Award, PlayCircle, CheckCircle2, ChevronLeft, FileText, Lock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const course = courses.find((c) => c.id === id) || courses[0];
  const instructor = instructors.find((i) => i.id === course.instructorId);
  const relatedCourses = courses.filter((c) => c.id !== course.id && c.topic === course.topic).slice(0, 3);
  const [activeTab, setActiveTab] = useState('overview');

  const totalPreviewLessons = course.sections.reduce((sum, s) => sum + s.previewCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-card pt-28 md:pt-32">
        <PatternBackground variant="grid" className="text-primary" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
            <div>
              <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/courses" className="flex items-center gap-1 transition-colors hover:text-primary">
                  <ChevronLeft className="h-3.5 w-3.5" /> Courses
                </Link>
                <span>/</span>
                <span className="text-foreground">{course.topic}</span>
              </nav>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/10 text-primary">{course.level}</Badge>
                <Badge variant="secondary">{course.topic}</Badge>
                <Badge variant="outline" className="gap-1">
                  <Globe className="h-3 w-3" /> {course.language}
                </Badge>
              </div>
              <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-3xl lg:text-4xl">
                {course.title}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{course.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold tabular-nums text-foreground">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviews} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" /> {Math.floor(course.reviews * 3.2).toLocaleString()} students
                </span>
                <span className="text-muted-foreground">Updated {course.lastUpdated}</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <img src={instructor?.avatar} alt={instructor?.name} className="h-8 w-8 rounded-full object-cover" />
                <span className="text-sm text-muted-foreground">Taught by <span className="font-semibold text-foreground">{course.instructor}</span></span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-border bg-background p-5 shadow-soft-lg">
                <ArchFrame className="aspect-[16/10] w-full rounded-xl bg-secondary">
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                </ArchFrame>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold tabular-nums text-foreground">${course.price}</span>
                  {course.originalPrice && <span className="text-lg text-muted-foreground line-through tabular-nums">${course.originalPrice}</span>}
                  {course.originalPrice && (
                    <Badge className="ms-1 bg-accent/15 text-accent-foreground">{Math.round((1 - course.price / course.originalPrice) * 100)}% off</Badge>
                  )}
                </div>
                <Link href={`/checkout?course=${course.id}`}>
                  <Button className="mt-4 w-full bg-primary text-primary-foreground" size="lg">Enroll Now</Button>
                </Link>
                <Button variant="outline" className="mt-2 w-full" size="lg">
                  <PlayCircle className="me-2 h-4 w-4" /> Preview ({totalPreviewLessons} free)
                </Button>
                <div className="mt-5 space-y-2.5 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-foreground">This course includes:</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PlayCircle className="h-4 w-4 text-primary" /> {course.hours} hours of video
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 text-primary" /> {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 text-primary" /> Downloadable resources
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4 text-primary" /> Certificate of completion
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" /> Lifetime access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                  <h2 className="mb-4 font-display text-xl font-semibold text-foreground">What you&apos;ll learn</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {course.whatYouLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <h2 className="mb-3 mt-8 font-display text-xl font-semibold text-foreground">Requirements</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  <h2 className="mb-3 mt-8 font-display text-xl font-semibold text-foreground">Description</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{course.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold text-foreground">Course Content</h2>
                    <span className="text-sm text-muted-foreground">{course.sections.length} sections · {course.lessons} lessons · {course.hours}h total</span>
                  </div>
                  <Accordion type="single" collapsible className="space-y-3">
                    {course.sections.map((section, i) => (
                      <AccordionItem key={section.id} value={`section-${i}`} className="rounded-xl border border-border bg-background px-5">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex flex-1 items-center justify-between pe-4 text-start">
                            <div>
                              <p className="font-display text-sm font-semibold text-foreground">{section.title}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">{section.lessonsCount} lessons · {section.duration}</p>
                            </div>
                            {section.previewCount > 0 && (
                              <Badge className="me-2 bg-primary/10 text-primary" variant="secondary">{section.previewCount} preview</Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 pt-2">
                            {section.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-secondary">
                                <div className="flex items-center gap-2.5">
                                  {lesson.preview ? (
                                    <PlayCircle className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                                  )}
                                  <span className="text-sm text-foreground">{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {lesson.preview && <Badge variant="outline" className="text-xs text-primary">Free</Badge>}
                                  <span className="text-xs tabular-nums text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                {instructor && (
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <ArchFrame className="aspect-square w-24 shrink-0 bg-secondary">
                        <img src={instructor.avatar} alt={instructor.name} className="h-full w-full object-cover" />
                      </ArchFrame>
                      <div className="flex-1">
                        <h2 className="font-display text-xl font-semibold text-foreground">{instructor.name}</h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">{instructor.title}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                          <span className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="font-semibold tabular-nums text-foreground">{instructor.rating}</span> rating
                          </span>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="h-4 w-4 text-primary" /> {instructor.students.toLocaleString()} students
                          </span>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <BookOpen className="h-4 w-4 text-primary" /> {instructor.courses} courses
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{instructor.bio}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {instructor.expertise.map((exp) => (
                            <Badge key={exp} variant="secondary">{exp}</Badge>
                          ))}
                          {instructor.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="gap-1"><Globe className="h-3 w-3" /> {lang}</Badge>
                          ))}
                        </div>
                        <Link href={`/private-sessions?mentor=${instructor.id}`}>
                          <Button variant="outline" size="sm" className="mt-5">Book a private session</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                  <div className="mb-6 flex items-center gap-6 border-b border-border pb-6">
                    <div className="text-center">
                      <p className="font-display text-4xl font-bold tabular-nums text-foreground">{course.rating}</p>
                      <div className="mt-1 flex justify-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn('h-4 w-4', i < Math.round(course.rating) ? 'fill-accent text-accent' : 'text-border')} />
                        ))}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{course.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{star}</span>
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-accent"
                              style={{ width: `${star === 5 ? 78 : star === 4 ? 18 : star === 3 ? 3 : 0.5}%` }}
                            />
                          </div>
                          <span className="w-8 text-xs tabular-nums text-muted-foreground">{star === 5 ? '78%' : star === 4 ? '18%' : star === 3 ? '3%' : '1%'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-5">
                    {course.courseReviews.map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <img src={review.avatar} alt={review.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-foreground">{review.name}</p>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="mt-1 flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                            ))}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {relatedCourses.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 font-display text-xl font-semibold text-foreground">Related courses</h2>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {relatedCourses.map((rc) => (
                    <Link key={rc.id} href={`/courses/${rc.id}`} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                        <img src={rc.thumbnail} alt={rc.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 line-clamp-2 font-display text-sm font-semibold text-foreground group-hover:text-primary">{rc.title}</h3>
                        <p className="text-xs text-muted-foreground">{rc.instructor}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-accent text-accent" /> <span className="font-semibold tabular-nums text-foreground">{rc.rating}</span></span>
                          <span className="font-display font-bold tabular-nums text-foreground">${rc.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold tabular-nums text-foreground">${course.price}</span>
              {course.originalPrice && <span className="text-sm text-muted-foreground line-through tabular-nums">${course.originalPrice}</span>}
            </div>
            <span className="text-xs text-muted-foreground">{course.hours}h · {course.lessons} lessons</span>
          </div>
          <Link href={`/checkout?course=${course.id}`}>
            <Button className="bg-primary text-primary-foreground" size="lg">Enroll Now</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
