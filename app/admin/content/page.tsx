'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { adminBlogPosts } from '@/lib/admin-data';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, FileText, Calendar } from 'lucide-react';

const statusBadge = (status: string) => {
  if (status === 'published') return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Published</Badge>;
  if (status === 'draft') return <Badge variant="secondary">Draft</Badge>;
  return <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/10">Scheduled</Badge>;
};

export default function AdminContentPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = adminBlogPosts.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Content Management</h1>
            <p className="text-sm text-muted-foreground">{adminBlogPosts.length} posts · {adminBlogPosts.filter((p) => p.status === 'published').length} published</p>
          </div>
          <Button size="sm"><span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> New Post</span></Button>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">{adminBlogPosts.length}</p>
                <p className="text-xs text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Eye className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">{adminBlogPosts.reduce((a, p) => a + p.views, 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">{adminBlogPosts.filter((p) => p.status === 'scheduled').length}</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">{adminBlogPosts.filter((p) => p.status === 'draft').length}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 text-start">Title</th>
                  <th className="px-4 py-3 text-start">Author</th>
                  <th className="px-4 py-3 text-start">Category</th>
                  <th className="px-4 py-3 text-start">Date</th>
                  <th className="px-4 py-3 text-start">Views</th>
                  <th className="px-4 py-3 text-start">Status</th>
                  <th className="px-4 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((post) => (
                  <tr key={post.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <p className="line-clamp-1 font-medium text-foreground">{post.title}</p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{post.excerpt}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{post.author}</td>
                    <td className="px-4 py-3"><Badge variant="outline">{post.category}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{post.date}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{post.views.toLocaleString()}</td>
                    <td className="px-4 py-3">{statusBadge(post.status)}</td>
                    <td className="px-4 py-3 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="me-2 h-4 w-4" /> View Post</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="me-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><Trash2 className="me-2 h-4 w-4" /> Delete</DropdownMenuItem>
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
            {filtered.map((post) => (
              <div key={post.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-medium text-foreground">{post.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{post.author} · {post.date}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge variant="outline">{post.category}</Badge>
                      {statusBadge(post.status)}
                      <span className="text-xs text-muted-foreground">{post.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Edit className="me-2 h-4 w-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Trash2 className="me-2 h-4 w-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No posts match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
