'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Download, CreditCard, CheckCircle2, Clock, XCircle } from 'lucide-react';

const orders = [
  { id: 'TQS-2026-1042', date: 'Oct 15, 2026', item: 'Foundations of Islamic Banking', amount: 89, method: 'Visa •••• 4242', status: 'paid' },
  { id: 'TQS-2026-1038', date: 'Oct 12, 2026', item: 'Pro Membership — Monthly', amount: 29, method: 'PayPal', status: 'paid' },
  { id: 'TQS-2026-1031', date: 'Oct 05, 2026', item: 'Private session — Dr. Amina Hassan', amount: 95, method: 'Visa •••• 4242', status: 'paid' },
  { id: 'TQS-2026-1025', date: 'Sep 28, 2026', item: 'Private session — Omar Abdullatif', amount: 75, method: 'M-Pesa', status: 'refunded' },
  { id: 'TQS-2026-1019', date: 'Sep 12, 2026', item: 'Pro Membership — Monthly', amount: 29, method: 'PayPal', status: 'paid' },
  { id: 'TQS-2026-1010', date: 'Aug 28, 2026', item: 'Islamic Microfinance & Development', amount: 69, method: 'Visa •••• 4242', status: 'paid' },
];

const statusConfig = {
  paid: { label: 'Paid', icon: CheckCircle2, className: 'bg-success/10 text-success' },
  pending: { label: 'Pending', icon: Clock, className: 'bg-warning/10 text-warning' },
  refunded: { label: 'Refunded', icon: XCircle, className: 'bg-destructive/10 text-destructive' },
};

export default function PaymentsPage() {
  const totalSpent = orders.filter((o) => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Payments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Order history, invoices, and payment methods.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Total spent', value: `$${totalSpent}`, icon: CreditCard },
            { label: 'Orders', value: String(orders.length), icon: Download },
            { label: 'Active subscription', value: 'Pro', icon: CheckCircle2 },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold tabular-nums text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-soft">
          <div className="border-b border-border p-5">
            <h2 className="font-display text-lg font-semibold text-foreground">Order History</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="tabular-nums">Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const cfg = statusConfig[order.status as keyof typeof statusConfig];
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                      <TableCell className="text-sm font-medium text-foreground">{order.item}</TableCell>
                      <TableCell className="font-display font-semibold tabular-nums">${order.amount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{order.method}</TableCell>
                      <TableCell>
                        <Badge className={cfg.className} variant="secondary">
                          <cfg.icon className="me-1 h-3 w-3" /> {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-end">
                        <Button variant="ghost" size="sm">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Payment Methods</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Visa •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 08/28</p>
                </div>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">PayPal</p>
                  <p className="text-xs text-muted-foreground">you@example.com</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
            </div>
            <Button variant="outline" className="w-full">Add payment method</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
