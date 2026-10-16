'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { adminUsers } from '@/lib/admin-data';
import { Search, Plus, MoreHorizontal, Mail, Ban, Trash2, Eye, UserCheck, Users as UsersIcon } from 'lucide-react';

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

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = adminUsers.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    return true;
  });

  const totalStudents = adminUsers.filter((u) => u.role === 'student').length;
  const totalInstructors = adminUsers.filter((u) => u.role === 'instructor').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Users</h1>
            <p className="text-sm text-muted-foreground">{adminUsers.length} total · {totalStudents} students · {totalInstructors} instructors</p>
          </div>
          <Button size="sm"><span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> Add User</span></Button>
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
              <p className="text-xl font-bold tabular-nums text-foreground">{adminUsers.filter((u) => u.status === 'active').length}</p>
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
                          <DropdownMenuItem><Eye className="me-2 h-4 w-4" /> View Profile</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="me-2 h-4 w-4" /> Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'suspended' ? (
                            <DropdownMenuItem><UserCheck className="me-2 h-4 w-4" /> Reactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem><Ban className="me-2 h-4 w-4" /> Suspend</DropdownMenuItem>
                          )}
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
      </div>
    </AdminLayout>
  );
}
