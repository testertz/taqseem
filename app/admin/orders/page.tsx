'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminOrders, adminStats, type AdminOrder } from '@/lib/admin-data';
import { useToast } from '@/hooks/use-toast';
import { Search, Download, MoreHorizontal, Eye, RefreshCw, FileText, CreditCard, TrendingUp, DollarSign, ShoppingBag, Plus, Pencil, Trash2 } from 'lucide-react';

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

const emptyForm = { user: '', userEmail: '', item: '', amount: '', method: 'card' as AdminOrder['method'] };

export default function AdminOrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<AdminOrder[]>(adminOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editTarget, setEditTarget] = useState<AdminOrder | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<AdminOrder | null>(null);

  const filtered = orders.filter((o) => {
    if (search && !o.user.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.item.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    return true;
  });

  const totalRevenue = orders.filter((o) => o.status === 'completed').reduce((a, o) => a + o.amount, 0);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const completedCount = orders.filter((o) => o.status === 'completed').length;

  const nextOrderId = () => {
    const nums = orders.map((o) => parseInt(o.id.replace(/\D/g, ''), 10)).filter((n) => !isNaN(n));
    return `ORD-${(nums.length ? Math.max(...nums) : 2400) + 1}`;
  };

  const addOrder = () => {
    const amount = parseFloat(form.amount);
    if (!form.user.trim() || !form.item.trim() || isNaN(amount) || amount <= 0) {
      toast({ title: 'Check your details', description: 'Customer, item, and a positive amount are required.', variant: 'destructive' });
      return;
    }
    const newOrder: AdminOrder = {
      id: nextOrderId(),
      user: form.user.trim(),
      userEmail: form.userEmail.trim() || 'unknown@email.com',
      item: form.item.trim(),
      amount,
      currency: 'USD',
      method: form.method,
      status: 'pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      invoice: `INV-${nextOrderId().replace('ORD-', '')}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setForm(emptyForm);
    setAddOpen(false);
    toast({ title: 'Order created', description: `${newOrder.id} for ${newOrder.user} — ${newOrder.item}.` });
  };

  const openEdit = (o: AdminOrder) => {
    setEditTarget(o);
    setEditForm({ user: o.user, userEmail: o.userEmail, item: o.item, amount: String(o.amount), method: o.method });
  };

  const saveEdit = () => {
    if (!editTarget) return;
    const amount = parseFloat(editForm.amount);
    if (!editForm.user.trim() || !editForm.item.trim() || isNaN(amount) || amount <= 0) {
      toast({ title: 'Check your details', description: 'Customer, item, and a positive amount are required.', variant: 'destructive' });
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === editTarget.id ? { ...o, user: editForm.user.trim(), userEmail: editForm.userEmail.trim() || o.userEmail, item: editForm.item.trim(), amount, method: editForm.method } : o)));
    toast({ title: 'Order updated', description: `${editTarget.id} was saved.` });
    setEditTarget(null);
  };

  const setStatus = (o: AdminOrder, status: AdminOrder['status']) => {
    setOrders((prev) => prev.map((x) => (x.id === o.id ? { ...x, status } : x)));
    const labels: Record<AdminOrder['status'], string> = { completed: 'marked completed', pending: 'reopened as pending', refunded: 'refunded', failed: 'marked failed' };
    toast({ title: `Order ${labels[status]}`, description: `${o.id} — ${o.item}` });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    toast({ title: 'Order deleted', description: `${deleteTarget.id} was removed.`, variant: 'destructive' });
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Orders & Payments</h1>
            <p className="text-sm text-muted-foreground">{orders.length} orders · {completedCount} completed · {pendingCount} pending</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><span className="flex items-center gap-1.5"><Download className="h-4 w-4" /> Export CSV</span></Button>
            <Button size="sm" onClick={() => setAddOpen(true)}><span className="flex items-center gap-1.5"><Plus className="h-4 w-4" /> New Order</span></Button>
          </div>
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
                          <DropdownMenuItem onClick={() => openEdit(order)}><Pencil className="me-2 h-4 w-4" /> Edit Order</DropdownMenuItem>
                          {order.status !== 'completed' && (
                            <DropdownMenuItem onClick={() => setStatus(order, 'completed')}><FileText className="me-2 h-4 w-4" /> Mark Completed</DropdownMenuItem>
                          )}
                          {order.status !== 'refunded' && (
                            <DropdownMenuItem onClick={() => setStatus(order, 'refunded')}><RefreshCw className="me-2 h-4 w-4" /> Refund Order</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(order)}><Trash2 className="me-2 h-4 w-4" /> Delete</DropdownMenuItem>
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

        {/* Add order dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New order</DialogTitle>
              <DialogDescription>Manually record an order. It starts as pending.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-order-user">Customer name</Label>
                  <Input id="new-order-user" placeholder="e.g. Aisha Johari" value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-order-email">Email</Label>
                  <Input id="new-order-email" type="email" placeholder="name@email.com" value={form.userEmail} onChange={(e) => setForm({ ...form, userEmail: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-order-item">Item</Label>
                <Input id="new-order-item" placeholder="e.g. Foundations of Islamic Banking" value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-order-amount">Amount (USD)</Label>
                  <Input id="new-order-amount" type="number" min="0" step="0.01" placeholder="89.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Payment method</Label>
                  <Select value={form.method} onValueChange={(v) => setForm({ ...form, method: v as AdminOrder['method'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="mobile-money">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={addOrder}>Create order</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit order dialog */}
        <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit order {editTarget?.id}</DialogTitle>
              <DialogDescription>Update the customer, item, or amount.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-order-user">Customer name</Label>
                  <Input id="edit-order-user" value={editForm.user} onChange={(e) => setEditForm({ ...editForm, user: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-order-email">Email</Label>
                  <Input id="edit-order-email" type="email" value={editForm.userEmail} onChange={(e) => setEditForm({ ...editForm, userEmail: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order-item">Item</Label>
                <Input id="edit-order-item" value={editForm.item} onChange={(e) => setEditForm({ ...editForm, item: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-order-amount">Amount (USD)</Label>
                  <Input id="edit-order-amount" type="number" min="0" step="0.01" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Payment method</Label>
                  <Select value={editForm.method} onValueChange={(v) => setEditForm({ ...editForm, method: v as AdminOrder['method'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="mobile-money">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
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
              <DialogTitle>Delete this order?</DialogTitle>
              <DialogDescription>{deleteTarget?.id} — {deleteTarget?.item} (${deleteTarget?.amount}) will be permanently removed. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>Keep order</Button>
              <Button variant="destructive" onClick={confirmDelete}><Trash2 className="me-1.5 h-3.5 w-3.5" /> Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
