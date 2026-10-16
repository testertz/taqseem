'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { adminOrders, adminStats } from '@/lib/admin-data';
import { Search, Download, MoreHorizontal, Eye, RefreshCw, FileText, CreditCard, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

const statusBadge = (status: string) => {
  const map: Record<string, 'default' | 'secondary' | 'destructive'> = {
    completed: 'default',
    pending: 'secondary',
    refunded: 'secondary',
    failed: 'destructive',
  };
  return <Badge variant={map[status] || 'secondary'}>{status}</Badge>;
};

const methodLabel = (method: string) => {
  const map: Record<string, string> = { 'card': 'Card', 'paypal': 'PayPal', 'mobile-money': 'Mobile Money' };
  return map[method] || method;
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = adminOrders.filter((o) => {
    if (search && !o.user.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.item.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    return true;
  });

  const totalRevenue = adminOrders.filter((o) => o.status === 'completed').reduce((a, o) => a + o.amount, 0);
  const pendingCount = adminOrders.filter((o) => o.status === 'pending').length;
  const completedCount = adminOrders.filter((o) => o.status === 'completed').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Orders & Payments</h1>
            <p className="text-sm text-muted-foreground">{adminOrders.length} orders · {completedCount} completed · {pendingCount} pending</p>
          </div>
          <Button variant="outline" size="sm"><span className="flex items-center gap-1.5"><Download className="h-4 w-4" /> Export CSV</span></Button>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-foreground">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <ShoppingBag className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-foreground">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed Orders</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by order ID, user, or item..." value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 text-start">Order ID</th>
                  <th className="px-4 py-3 text-start">Customer</th>
                  <th className="px-4 py-3 text-start">Item</th>
                  <th className="px-4 py-3 text-start">Amount</th>
                  <th className="px-4 py-3 text-start">Method</th>
                  <th className="px-4 py-3 text-start">Date</th>
                  <th className="px-4 py-3 text-start">Status</th>
                  <th className="px-4 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{order.user}</p>
                      <p className="text-xs text-muted-foreground">{order.userEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{order.item}</td>
                    <td className="px-4 py-3 font-semibold tabular-nums text-foreground">${order.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{methodLabel(order.method)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3">{statusBadge(order.status)}</td>
                    <td className="px-4 py-3 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="me-2 h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem><FileText className="me-2 h-4 w-4" /> Download Invoice</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><RefreshCw className="me-2 h-4 w-4" /> Refund Order</DropdownMenuItem>
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
            {filtered.map((order) => (
              <div key={order.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-xs font-medium text-foreground">{order.id}</p>
                    <p className="text-sm font-medium text-foreground">{order.user}</p>
                    <p className="text-xs text-muted-foreground">{order.item}</p>
                  </div>
                  <div className="text-end">
                    <p className="font-semibold tabular-nums text-foreground">${order.amount}</p>
                    {statusBadge(order.status)}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{methodLabel(order.method)}</span>
                  <span>· {order.date}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No orders match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
