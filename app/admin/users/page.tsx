'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminUsers, type AdminUser } from '@/lib/admin-data';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, MoreHorizontal, Mail, Ban, Trash2, Eye, UserCheck, Users as UsersIcon, Pencil } from 'lucide-react';

const roleBadge = (role: string) => {
  if (role === 'admin') return <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/10">Admin</Badge>;
  if (role === 'instructor') return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">Instructor</Badge>;
  return <Badge variant="secondary">Student</Badge>;
};

const statusBadge = (status: string) => {
  if (status === 'active') return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10">Active</Badge>;
  if (status === 'pending') return <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/10">Pending</Badge>;
  return <Badge variant="destructive">Suspended</Badge>;
};

const emptyForm = { name: '', email: '', role: 'student' as AdminUser['role'], country: '' };

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>(adminUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const filtered = users.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    return true;
  });

  const totalStudents = users.filter((u) => u.role === 'student').length;
  const totalInstructors = users.filter((u) => u.role === 'instructor').length;

  const addUser = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: 'Missing details', description: 'Name and email are required.', variant: 'destructive' });
      return;
    }
    if (users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase())) {
      toast({ title: 'Email already exists', description: 'A user with that email is already registered.', variant: 'destructive' });
      return;
    }
    const newUser: AdminUser = {
      id: `u${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
      role: form.role,
      status: 'pending',
      joinedDate: 'Oct 2026',
      country: form.country.trim() || '—',
      coursesEnrolled: 0,
      coursesCompleted: 0,
      totalSpent: 0,
      lastActive: 'Just now',
    };
    setUsers((prev) => [newUser, ...prev]);
    setForm(emptyForm);
    setAddOpen(false);
    toast({ title: 'User added', description: `${newUser.name} was created with pending status.` });
  };

  const openEdit = (u: AdminUser) => {
    setEditTarget(u);
    setEditForm({ name: u.name, email: u.email, role: u.role, country: u.country });
  };

  const saveEdit = () => {
    if (!editTarget) return;
    if (!editForm.name.trim() || !editForm.email.trim()) {
      toast({ title: 'Missing details', description: 'Name and email are required.', variant: 'destructive' });
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === editTarget.id ? { ...u, name: editForm.name.trim(), email: editForm.email.trim(), role: editForm.role, country: editForm.country.trim() || u.country } : u)));
    toast({ title: 'User updated', description: `${editForm.name.trim()}'s details were saved.` });
    setEditTarget(null);
  };

  const toggleStatus = (u: AdminUser) => {
    const next: AdminUser['status'] = u.status === 'suspended' ? 'active' : 'suspended';
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: next } : x)));
    toast({ title: next === 'suspended' ? 'User suspended' : 'User reactivated', description: u.name });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    toast({ title: 'User deleted', description: `${deleteTarget.name} was removed.`, variant: 'destructive' });
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Users</h1>
            <p className="text-sm text-muted-foreground">{users.length} total · {totalStudents} students · {totalInstructors} instructors</p>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}><span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> Add User</span></Button>
        </div>

        {/* Stat mini-cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <UsersIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums text-foreground">{totalStudents}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <UserCheck className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums text-foreground">{totalInstructors}</p>
              <p className="text-xs text-muted-foreground">Instructors</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <UserCheck className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums text-foreground">{users.filter((u) => u.status === 'active').length}</p>
              <p className="text-xs text-muted-foreground">Active Now</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9" />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 text-start">User</th>
                  <th className="px-4 py-3 text-start">Role</th>
                  <th className="px-4 py-3 text-start">Status</th>
                  <th className="px-4 py-3 text-start">Country</th>
                  <th className="px-4 py-3 text-start">Courses</th>
                  <th className="px-4 py-3 text-start">Spent</th>
                  <th className="px-4 py-3 text-start">Joined</th>
                  <th className="px-4 py-3 text-start">Last Active</th>
                  <th className="px-4 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{roleBadge(user.role)}</td>
                    <td className="px-4 py-3">{statusBadge(user.status)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.country}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{user.coursesEnrolled}</td>
                    <td className="px-4 py-3 font-medium tabular-nums text-foreground">${user.totalSpent}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joinedDate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.lastActive}</td>
                    <td className="px-4 py-3 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(user)}><Pencil className="me-2 h-4 w-4" /> Edit User</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="me-2 h-4 w-4" /> Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'suspended' ? (
                            <DropdownMenuItem onClick={() => toggleStatus(user)}><UserCheck className="me-2 h-4 w-4" /> Reactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => toggleStatus(user)}><Ban className="me-2 h-4 w-4" /> Suspend</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(user)}><Trash2 className="me-2 h-4 w-4" /> Delete</DropdownMenuItem>
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
            {filtered.map((user) => (
              <div key={user.id} className="flex items-start gap-3 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-foreground">{user.name}</p>
                    {roleBadge(user.role)}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                    {statusBadge(user.status)}
                    <span>· {user.country}</span>
                    <span>· ${user.totalSpent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No users match your filters.</p>
            </div>
          )}
        </div>

        {/* Add user dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add user</DialogTitle>
              <DialogDescription>Create a new account. The user starts as pending until activated.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="space-y-2">
                <Label htmlFor="new-user-name">Full name</Label>
                <Input id="new-user-name" placeholder="e.g. Amina Said" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-user-email">Email</Label>
                <Input id="new-user-email" type="email" placeholder="name@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as AdminUser['role'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-user-country">Country</Label>
                  <Input id="new-user-country" placeholder="e.g. Tanzania" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={addUser}>Add user</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit user dialog */}
        <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit user</DialogTitle>
              <DialogDescription>Update {editTarget?.name}&apos;s account details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="space-y-2">
                <Label htmlFor="edit-user-name">Full name</Label>
                <Input id="edit-user-name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-user-email">Email</Label>
                <Input id="edit-user-email" type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={editForm.role} onValueChange={(v) => setEditForm({ ...editForm, role: v as AdminUser['role'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-user-country">Country</Label>
                  <Input id="edit-user-country" value={editForm.country} onChange={(e) => setEditForm({ ...editForm, country: e.target.value })} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditTarget(null)}>Cancel</Button>
              <Button onClick={saveEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete this user?</DialogTitle>
              <DialogDescription>{deleteTarget?.name} ({deleteTarget?.email}) will be permanently removed. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>Keep user</Button>
              <Button variant="destructive" onClick={confirmDelete}><Trash2 className="me-1.5 h-3.5 w-3.5" /> Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
