'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminBlogPosts, type AdminBlogPost } from '@/lib/admin-data';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, FileText, Calendar, Send } from 'lucide-react';

const statusBadge = (status: string) => {
  if (status === 'published') return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Published</Badge>;
  if (status === 'draft') return <Badge variant="secondary">Draft</Badge>;
  return <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/10">Scheduled</Badge>;
};

const emptyForm = { title: '', author: 'Dr. Yusuf Al-Kabir', category: 'Fintech', excerpt: '', status: 'draft' as AdminBlogPost['status'] };

export default function AdminContentPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<AdminBlogPost[]>(adminBlogPosts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editTarget, setEditTarget] = useState<AdminBlogPost | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<AdminBlogPost | null>(null);

  const filtered = posts.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  const today = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const addPost = () => {
    if (!form.title.trim() || !form.excerpt.trim()) {
      toast({ title: 'Missing details', description: 'Title and excerpt are required.', variant: 'destructive' });
      return;
    }
    const newPost: AdminBlogPost = {
      id: `b${Date.now()}`,
      title: form.title.trim(),
      author: form.author,
      category: form.category,
      status: form.status,
      date: today(),
      views: 0,
      excerpt: form.excerpt.trim(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setForm(emptyForm);
    setAddOpen(false);
    toast({ title: form.status === 'published' ? 'Post published' : 'Post saved', description: `"${newPost.title}" was ${form.status === 'published' ? 'published' : 'saved as ' + form.status}.` });
  };

  const openEdit = (p: AdminBlogPost) => {
    setEditTarget(p);
    setEditForm({ title: p.title, author: p.author, category: p.category, excerpt: p.excerpt, status: p.status });
  };

  const saveEdit = () => {
    if (!editTarget) return;
    if (!editForm.title.trim() || !editForm.excerpt.trim()) {
      toast({ title: 'Missing details', description: 'Title and excerpt are required.', variant: 'destructive' });
      return;
    }
    setPosts((prev) => prev.map((p) => (p.id === editTarget.id ? { ...p, title: editForm.title.trim(), author: editForm.author, category: editForm.category, excerpt: editForm.excerpt.trim(), status: editForm.status } : p)));
    toast({ title: 'Post updated', description: `"${editForm.title.trim()}" was saved.` });
    setEditTarget(null);
  };

  const setStatus = (p: AdminBlogPost, status: AdminBlogPost['status']) => {
    setPosts((prev) => prev.map((x) => (x.id === p.id ? { ...x, status } : x)));
    toast({ title: status === 'published' ? 'Post published' : status === 'draft' ? 'Moved to drafts' : 'Post scheduled', description: p.title });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast({ title: 'Post deleted', description: `"${deleteTarget.title}" was removed.`, variant: 'destructive' });
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Content Management</h1>
            <p className="text-sm text-muted-foreground">{posts.length} posts · {posts.filter((p) => p.status === 'published').length} published</p>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}><span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> New Post</span></Button>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">{posts.length}</p>
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
                <p className="text-xl font-bold tabular-nums text-foreground">{posts.reduce((a, p) => a + p.views, 0).toLocaleString()}</p>
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
                <p className="text-xl font-bold tabular-nums text-foreground">{posts.filter((p) => p.status === 'scheduled').length}</p>
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
                <p className="text-xl font-bold tabular-nums text-foreground">{posts.filter((p) => p.status === 'draft').length}</p>
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
                          <DropdownMenuItem onClick={() => openEdit(post)}><Edit className="me-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          {post.status !== 'published' && (
                            <DropdownMenuItem onClick={() => setStatus(post, 'published')}><Send className="me-2 h-4 w-4" /> Publish</DropdownMenuItem>
                          )}
                          {post.status === 'published' && (
                            <DropdownMenuItem onClick={() => setStatus(post, 'draft')}><FileText className="me-2 h-4 w-4" /> Unpublish</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(post)}><Trash2 className="me-2 h-4 w-4" /> Delete</DropdownMenuItem>
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
                      <DropdownMenuItem onClick={() => openEdit(post)}><Edit className="me-2 h-4 w-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(post)}><Trash2 className="me-2 h-4 w-4" /> Delete</DropdownMenuItem>
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

        {/* Post form dialog (create + edit) */}
        <Dialog open={addOpen || !!editTarget} onOpenChange={(open) => { if (!open) { setAddOpen(false); setEditTarget(null); } }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editTarget ? 'Edit post' : 'New post'}</DialogTitle>
              <DialogDescription>{editTarget ? `Update "${editTarget.title}".` : 'Create a blog post. Save as draft or publish immediately.'}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input id="post-title" placeholder="e.g. Understanding Sukuk" value={editTarget ? editForm.title : form.title} onChange={(e) => (editTarget ? setEditForm({ ...editForm, title: e.target.value }) : setForm({ ...form, title: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-excerpt">Excerpt</Label>
                <Textarea id="post-excerpt" rows={3} placeholder="Short summary shown in listings..." value={editTarget ? editForm.excerpt : form.excerpt} onChange={(e) => (editTarget ? setEditForm({ ...editForm, excerpt: e.target.value }) : setForm({ ...form, excerpt: e.target.value }))} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Select value={editTarget ? editForm.author : form.author} onValueChange={(v) => (editTarget ? setEditForm({ ...editForm, author: v }) : setForm({ ...form, author: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Yusuf Al-Kabir">Dr. Yusuf Al-Kabir</SelectItem>
                      <SelectItem value="Dr. Amina Hassan">Dr. Amina Hassan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-category">Category</Label>
                  <Input id="post-category" value={editTarget ? editForm.category : form.category} onChange={(e) => (editTarget ? setEditForm({ ...editForm, category: e.target.value }) : setForm({ ...form, category: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editTarget ? editForm.status : form.status} onValueChange={(v) => (editTarget ? setEditForm({ ...editForm, status: v as AdminBlogPost['status'] }) : setForm({ ...form, status: v as AdminBlogPost['status'] }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setAddOpen(false); setEditTarget(null); }}>Cancel</Button>
              <Button onClick={editTarget ? saveEdit : addPost}>{editTarget ? 'Save changes' : 'Create post'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete this post?</DialogTitle>
              <DialogDescription>"{deleteTarget?.title}" will be permanently removed. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>Keep post</Button>
              <Button variant="destructive" onClick={confirmDelete}><Trash2 className="me-1.5 h-3.5 w-3.5" /> Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
