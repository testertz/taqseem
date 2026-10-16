'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, Eye, ArrowLeft, Upload, Video, FileText, HelpCircle, X, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NewCoursePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [price, setPrice] = useState('');
  const [topic, setTopic] = useState('Banking');
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>(['']);
  const [requirements, setRequirements] = useState<string[]>(['']);

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
              <h1 className="font-display text-2xl font-bold text-foreground">New Course</h1>
              <p className="text-sm text-muted-foreground">Create a new course from scratch</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Save as Draft</Button>
            <Button size="sm"><span className="flex items-center gap-1.5"><Save className="h-4 w-4" /> Publish</span></Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main editor */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Foundations of Islamic Banking" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What will students learn in this course?" rows={4} className="mt-1.5" />
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
                    <Label>Instructor</Label>
                    <Select defaultValue="i1">
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="i1">Dr. Yusuf Al-Kabir</SelectItem>
                        <SelectItem value="i2">Dr. Amina Hassan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Course Thumbnail</h3>
              <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/40">
                <div className="text-center">
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">1280×720px, max 2MB</p>
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
                    <Input value={item} onChange={(e) => { const next = [...whatYouLearn]; next[i] = e.target.value; setWhatYouLearn(next); }} placeholder="Learning outcome..." />
                    <Button variant="ghost" size="icon" onClick={() => setWhatYouLearn(whatYouLearn.filter((_, idx) => idx !== i))}><X className="h-4 w-4" /></Button>
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
                    <Input value={item} onChange={(e) => { const next = [...requirements]; next[i] = e.target.value; setRequirements(next); }} placeholder="Prerequisite or requirement..." />
                    <Button variant="ghost" size="icon" onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))}><X className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum placeholder */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">Curriculum</h3>
                  <p className="text-xs text-muted-foreground">Add sections and lessons to build your course</p>
                </div>
                <Button variant="outline" size="sm"><span className="flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Add Section</span></Button>
              </div>
              <div className="rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 text-center">
                <p className="text-sm text-muted-foreground">No sections yet. Click "Add Section" to start building your curriculum.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-20 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-3 font-display text-base font-semibold text-foreground">Publish</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-foreground">Not saved</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Visibility</span>
                    <span className="font-medium text-foreground">Private</span>
                  </div>
                </div>
                <Button className="mt-4 w-full">Publish Course</Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
