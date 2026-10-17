'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { studentOrders, type StudentOrder } from '@/lib/dashboard-data';
import { useToast } from '@/hooks/use-toast';
import { Download, CreditCard, CheckCircle2, Clock, XCircle, Plus, Trash2 } from 'lucide-react';

const statusConfig = {
  paid: { label: 'Paid', icon: CheckCircle2, className: 'bg-success/10 text-success' },
  pending: { label: 'Pending', icon: Clock, className: 'bg-warning/10 text-warning' },
  refunded: { label: 'Refunded', icon: XCircle, className: 'bg-destructive/10 text-destructive' },
};

type PaymentMethod = { id: string; label: string; detail: string; isDefault: boolean };

function downloadInvoice(order: StudentOrder) {
  const lines = [
    'TAQSEEM — INVOICE',
    '='.repeat(40),
    `Invoice:    ${order.id}`,
    `Date:       ${order.date}`,
    '',
    `Item:       ${order.item}`,
    `Amount:     $${order.amount}.00 USD`,
    `Method:     ${order.method}`,
    `Status:     ${order.status === 'paid' ? 'PAID' : order.status.toUpperCase()}`,
    '',
    '-'.repeat(40),
    'Thank you for learning with Taqseem.',
    'This is a demo invoice generated locally.',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${order.id}-invoice.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function PaymentsPage() {
  const { toast } = useToast();
  const [orders] = useState<StudentOrder[]>(studentOrders);
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: 'm1', label: 'Visa •••• 4242', detail: 'Expires 08/28', isDefault: true },
    { id: 'm2', label: 'PayPal', detail: 'you@example.com', isDefault: false },
  ]);
  const [addOpen, setAddOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [removeTarget, setRemoveTarget] = useState<PaymentMethod | null>(null);

  const totalSpent = orders.filter((o) => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0);

  const addMethod = () => {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 12 || !/^\d{2}\/\d{2}$/.test(expiry)) {
      toast({ title: 'Check your details', description: 'Enter a valid card number and expiry (MM/YY).', variant: 'destructive' });
      return;
    }
    const last4 = digits.slice(-4);
    setMethods((prev) => [...prev, { id: `m${Date.now()}`, label: `Card •••• ${last4}`, detail: `Expires ${expiry}`, isDefault: false }]);
    setCardNumber('');
    setExpiry('');
    setAddOpen(false);
    toast({ title: 'Payment method added', description: `Card ending in ${last4} saved (demo).` });
  };

  const removeMethod = (m: PaymentMethod) => {
    setMethods((prev) => prev.filter((x) => x.id !== m.id));
    setRemoveTarget(null);
    toast({ title: 'Payment method removed', description: m.label });
  };

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
            <Card key={stat.label} className="rounded-xl shadow-soft">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold tabular-nums text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-2xl shadow-soft">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-display text-lg font-semibold">Order History</CardTitle>
          </CardHeader>
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
                  const cfg = statusConfig[order.status];
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
                        <Button variant="ghost" size="sm" onClick={() => downloadInvoice(order)} aria-label={`Download invoice ${order.id}`}>
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="rounded-2xl shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg font-semibold">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {methods.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.detail}</p>
                  </div>
                </div>
                {m.isDefault ? (
                  <Badge variant="secondary">Default</Badge>
                ) : (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setRemoveTarget(m)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => setAddOpen(true)}>
              <Plus className="me-1.5 h-4 w-4" /> Add payment method
            </Button>
          </CardContent>
        </Card>

        {/* Add payment method dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add payment method</DialogTitle>
              <DialogDescription>Demo only — nothing is charged or stored on a server.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Expiry (MM/YY)</Label>
                <Input
                  id="card-expiry"
                  placeholder="08/28"
                  inputMode="numeric"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={addMethod} className="bg-primary text-primary-foreground">Save card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove confirmation */}
        <Dialog open={!!removeTarget} onOpenChange={(open) => !open && setRemoveTarget(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Remove payment method?</DialogTitle>
              <DialogDescription>{removeTarget?.label} will be removed from your account.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRemoveTarget(null)}>Keep it</Button>
              <Button variant="destructive" onClick={() => removeTarget && removeMethod(removeTarget)}>
                <Trash2 className="me-1.5 h-3.5 w-3.5" /> Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
