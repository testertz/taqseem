'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminCourses, deleteCourse, duplicateCourse } from '@/lib/course-store';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Copy, Filter, Star } from 'lucide-react';
import Link from 'next/link';

const statusBadge = (status: string) => {
  if (status === 'published') return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Published</Badge>;
  return <Badge variant="secondary">Draft</Badge>;
};

export default function AdminCoursesPage() {
  const { toast } = useToast();
  const coursesList = useAdminCourses();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const topics = Array.from(new Set(coursesList.map((c) => c.topic)));

  const filtered = coursesList.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (topicFilter !== 'all' && c.topic !== topicFilter) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Courses</h1>
            <p className="text-sm text-muted-foreground">{coursesList.length} courses · {coursesList.filter((c) => c.status === 'published').length} published</p>
          </div>
          <Button size="sm" asChild>
            <Link href="/admin/courses/new">
              <span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> New Course</span>
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr className="text-start text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 text-start">Course</th>
                  <th className="px-4 py-3 text-start">Instructor</th>
                  <th className="px-4 py-3 text-start">Topic</th>
                  <th className="px-4 py-3 text-start">Level</th>
                  <th className="px-4 py-3 text-start">Price</th>
                  <th className="px-4 py-3 text-start">Enrollments</th>
                  <th className="px-4 py-3 text-start">Revenue</th>
                  <th className="px-4 py-3 text-start">Status</th>
                  <th className="px-4 py-3 text-start">Rating</th>
                  <th className="px-4 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((course) => (
                  <tr key={course.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={course.thumbnail} alt="" className="h-full w-full object-cover" />
                        </div>
                        <span className="line-clamp-1 font-medium text-foreground">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{course.instructor}</td>
                    <td className="px-4 py-3 text-muted-foreground">{course.topic}</td>
                    <td className="px-4 py-3 text-muted-foreground">{course.level}</td>
                    <td className="px-4 py-3 font-medium tabular-nums text-foreground">${course.price}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{course.enrollments.toLocaleString()}</td>
                    <td className="px-4 py-3 font-medium tabular-nums text-foreground">${course.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3">{statusBadge(course.status)}</td>
                    <td className="px-4 py-3">
                      {course.rating > 0 ? (
                        <span className="flex items-center gap-1 tabular-nums text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          {course.rating}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/courses/${course.id}`}><Eye className="me-2 h-4 w-4" /> View</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}`}><Edit className="me-2 h-4 w-4" /> Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const copy = duplicateCourse(course.id);
                              if (copy) toast({ title: 'Course duplicated', description: `"${copy.title}" was created as a draft.` });
                            }}
                          ><Copy className="me-2 h-4 w-4" /> Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(course)}><Trash2 className="me-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-border md:hidden">
            {filtered.map((course) => (
              <div key={course.id} className="flex items-start gap-3 p-4">
                <div className="h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.thumbnail} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-medium text-foreground">{course.title}</p>
                  <p className="text-xs text-muted-foreground">{course.instructor}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    {statusBadge(course.status)}
                    <span className="text-xs tabular-nums text-muted-foreground">${course.price}</span>
                    <span className="text-xs text-muted-foreground">· {course.enrollments} students</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild><Link href={`/admin/courses/${course.id}`}><Edit className="me-2 h-4 w-4" /> Edit</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href={`/courses/${course.id}`}><Eye className="me-2 h-4 w-4" /> View</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Filter className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No courses match your filters.</p>
            </div>
          )}
        </div>

        {/* Delete confirmation */}
        <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete this course?</DialogTitle>
              <DialogDescription>"{deleteTarget?.title}" and its enrollments will be permanently removed. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>Keep course</Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (!deleteTarget) return;
                  deleteCourse(deleteTarget.id);
                  toast({ title: 'Course deleted', description: `"${deleteTarget.title}" was removed.`, variant: 'destructive' });
                  setDeleteTarget(null);
                }}
              >
                <Trash2 className="me-1.5 h-3.5 w-3.5" /> Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
