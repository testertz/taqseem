'use client';

import { useState, use } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { adminCourses } from '@/lib/admin-data';
import { courses } from '@/lib/marketing-data';
import { Plus, Trash2, GripVertical, Video, FileText, HelpCircle, Save, Eye, ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';

export default function CourseEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const existingCourse = courses.find((c) => c.id === id);
  const [title, setTitle] = useState(existingCourse?.title || '');
  const [description, setDescription] = useState(existingCourse?.description || '');
  const [level, setLevel] = useState<string>(existingCourse?.level || 'Beginner');
  const [price, setPrice] = useState(existingCourse?.price?.toString() || '');
  const [topic, setTopic] = useState(existingCourse?.topic || 'Banking');
  const [language, setLanguage] = useState(existingCourse?.language || 'English');
  const [instructor, setInstructor] = useState(existingCourse?.instructor || 'Dr. Yusuf Al-Kabir');
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>(existingCourse?.whatYouLearn || ['']);
  const [requirements, setRequirements] = useState<string[]>(existingCourse?.requirements || ['']);
  const [sections, setSections] = useState(existingCourse?.sections || [{ id: 's1', title: 'New Section', lessonsCount: 0, duration: '0m', previewCount: 0, lessons: [] }]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/courses"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Course Builder</h1>
              <p className="text-sm text-muted-foreground">{existingCourse ? `Editing: ${existingCourse.title}` : 'Create a new course'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/courses/${id}`}><span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> Preview</span></Link>
            </Button>
            <Button size="sm"><span className="flex items-center gap-1.5"><Save className="h-4 w-4" /> Save Changes</span></Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main editor */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic info */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Foundations of Islamic Banking" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course description..." rows={4} className="mt-1.5" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Level</Label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Topic</Label>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Banking">Banking</SelectItem>
                        <SelectItem value="Capital Markets">Capital Markets</SelectItem>
                        <SelectItem value="Takaful">Takaful</SelectItem>
                        <SelectItem value="Wealth Management">Wealth Management</SelectItem>
                        <SelectItem value="Ethics & Aqeedah">Ethics & Aqeedah</SelectItem>
                        <SelectItem value="Fintech">Fintech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price (USD)</Label>
                    <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="89" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Arabic">Arabic</SelectItem>
                        <SelectItem value="Swahili">Swahili</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Instructor</Label>
                    <Select value={instructor} onValueChange={setInstructor}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Yusuf Al-Kabir">Dr. Yusuf Al-Kabir</SelectItem>
                        <SelectItem value="Dr. Amina Hassan">Dr. Amina Hassan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail upload */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Course Thumbnail</h3>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-24 w-40 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/40">
                  {existingCourse ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={existingCourse.thumbnail} alt="" className="h-full w-full rounded-lg object-cover" />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm"><span className="flex items-center gap-1.5"><Upload className="h-4 w-4" /> Upload Image</span></Button>
                  <p className="mt-2 text-xs text-muted-foreground">Recommended: 1280×720px, max 2MB, JPG/PNG</p>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-foreground">What You'll Learn</h3>
                <Button variant="outline" size="sm" onClick={() => setWhatYouLearn([...whatYouLearn, ''])}>
                  <span className="flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Add</span>
                </Button>
              </div>
              <div className="space-y-2">
                {whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const next = [...whatYouLearn];
                        next[i] = e.target.value;
                        setWhatYouLearn(next);
                      }}
                      placeholder="Learning outcome..."
                    />
                    <Button variant="ghost" size="icon" onClick={() => setWhatYouLearn(whatYouLearn.filter((_, idx) => idx !== i))}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-foreground">Requirements</h3>
                <Button variant="outline" size="sm" onClick={() => setRequirements([...requirements, ''])}>
                  <span className="flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Add</span>
                </Button>
              </div>
              <div className="space-y-2">
                {requirements.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const next = [...requirements];
                        next[i] = e.target.value;
                        setRequirements(next);
                      }}
                      placeholder="Prerequisite or requirement..."
                    />
                    <Button variant="ghost" size="icon" onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum builder */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">Curriculum</h3>
                  <p className="text-xs text-muted-foreground">{sections.length} sections · {sections.reduce((a, s) => a + s.lessons.length, 0)} lessons</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSections([...sections, { id: `s${Date.now()}`, title: 'New Section', lessonsCount: 0, duration: '0m', previewCount: 0, lessons: [] }])}>
                  <span className="flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Add Section</span>
                </Button>
              </div>
              <Accordion type="single" collapsible className="space-y-2">
                {sections.map((section, si) => (
                  <AccordionItem key={section.id} value={section.id} className="rounded-lg border border-border bg-background px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{section.title}</span>
                        <Badge variant="secondary" className="text-[10px]">{section.lessons.length} lessons</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 py-2">
                        {section.lessons.map((lesson, li) => (
                          <div key={lesson.id} className="flex items-center gap-2 rounded-lg border border-border bg-card p-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10">
                              <Video className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="flex-1 text-sm text-foreground">{lesson.title}</span>
                            <span className="text-xs tabular-nums text-muted-foreground">{lesson.duration}</span>
                            {lesson.preview && <Badge className="text-[10px]">Free Preview</Badge>}
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Trash2 className="h-3 w-3 text-muted-foreground" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex gap-2 pt-1">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <span className="flex items-center gap-1"><Video className="h-3.5 w-3.5" /> Video Lesson</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Reading</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            <span className="flex items-center gap-1"><HelpCircle className="h-3.5 w-3.5" /> Quiz</span>
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="sticky top-20 space-y-4">
              {/* Publish card */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-3 font-display text-base font-semibold text-foreground">Publish</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Visibility</span>
                    <span className="font-medium text-foreground">Private</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium text-foreground">{existingCourse?.lastUpdated || '—'}</span>
                  </div>
                </div>
                <Button className="mt-4 w-full">Publish Course</Button>
              </div>

              {/* Stats card */}
              {existingCourse && (
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <h3 className="mb-3 font-display text-base font-semibold text-foreground">Performance</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Enrollments</span>
                      <span className="font-semibold tabular-nums text-foreground">{adminCourses.find((c) => c.id === id)?.enrollments.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-semibold tabular-nums text-foreground">${adminCourses.find((c) => c.id === id)?.revenue.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-semibold tabular-nums text-foreground">{existingCourse.rating} ({existingCourse.reviews})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
