'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  adminStats,
  revenueData,
  topicDistribution,
  adminOrders,
  adminEnrollments,
  adminUsers,
} from '@/lib/admin-data';
import { useToast } from '@/hooks/use-toast';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  BookOpen,
  Users,
  CreditCard,
  GraduationCap,
  Download,
  AlertTriangle,
  XCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

function StatCard({ stat, icon: Icon }: { stat: typeof adminStats[0]; icon: typeof BookOpen }) {
  const formatted = stat.format === 'currency'
    ? `$${stat.value.toLocaleString()}`
    : stat.format === 'percent'
    ? `${stat.value}%`
    : stat.value.toLocaleString();

  return (
    <Card className="rounded-xl shadow-soft">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold ${stat.change >= 0 ? 'text-success' : 'text-error'}`}>
            {stat.change >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {Math.abs(stat.change)}%
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold font-display tabular-nums text-foreground">{formatted}</p>
        <p className="text-sm text-muted-foreground">{stat.label}</p>
      </CardContent>
    </Card>
  );
}

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [range, setRange] = useState<'7m' | 'year'>('7m');

  const chartData = range === '7m' ? revenueData : yearData;
  const maxTopic = Math.max(...topicDistribution.map((t) => t.count));

  const attentionItems = [
    ...adminOrders.filter((o) => o.status === 'refunded' || o.status === 'failed').map((o) => ({
      id: o.id,
      icon: o.status === 'failed' ? XCircle : Clock,
      title: `${o.status === 'failed' ? 'Failed payment' : 'Refund pending'} — ${o.user}`,
      detail: `${o.item} · $${o.amount} · ${o.date}`,
      href: '/admin/orders',
    })),
    ...adminEnrollments.filter((e) => e.status === 'not-started').map((e) => ({
      id: e.id,
      icon: AlertTriangle,
      title: `${e.user} hasn't started ${e.course}`,
      detail: `Enrolled ${e.enrolledDate} · 0% progress`,
      href: '/admin/users',
    })),
    ...adminUsers.filter((u) => u.status === 'pending').map((u) => ({
      id: u.id,
      icon: AlertTriangle,
      title: `${u.name} awaits approval`,
      detail: `Joined ${u.joinedDate} · ${u.country}`,
      href: '/admin/users',
    })),
  ];

  const exportReport = () => {
    downloadCsv('taqseem-orders.csv', [
      ['Order ID', 'Student', 'Email', 'Item', 'Amount', 'Method', 'Status', 'Date'],
      ...adminOrders.map((o) => [o.id, o.user, o.userEmail, o.item, o.amount, o.method, o.status, o.date]),
    ]);
    setTimeout(() => {
      downloadCsv('taqseem-enrollments.csv', [
        ['Enrollment ID', 'Student', 'Course', 'Progress %', 'Enrolled', 'Status', 'Certificate'],
        ...adminEnrollments.map((e) => [e.id, e.user, e.course, e.progress, e.enrolledDate, e.status, e.certificate ? 'Yes' : 'No']),
      ]);
    }, 400);
    toast({ title: 'Report exported', description: 'Orders and enrollments downloaded as CSV files.' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back. Here's what's happening at Taqseem today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportReport}>
              <Download className="me-1.5 h-3.5 w-3.5" /> Export Report
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/courses/new">
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> New Course</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard stat={adminStats[0]} icon={CreditCard} />
          <StatCard stat={adminStats[1]} icon={Users} />
          <StatCard stat={adminStats[2]} icon={BookOpen} />
          <StatCard stat={adminStats[3]} icon={GraduationCap} />
        </div>

        {/* Charts row */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Revenue chart */}
          <Card className="rounded-xl shadow-soft lg:col-span-2">
            <CardHeader className="flex-col gap-3 space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="font-display text-base font-semibold">Revenue Overview</CardTitle>
                <p className="text-xs text-muted-foreground">Monthly revenue and enrollments</p>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
                {[
                  { id: '7m' as const, label: 'Last 7 months' },
                  { id: 'year' as const, label: 'This year' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setRange(opt.id)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      range === opt.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="h-56 pl-0 pr-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="rev" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v >= 1000 ? `${v / 1000}k` : v}`} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value: number | string, name: string) =>
                      name === 'Revenue' ? [`$${Number(value).toLocaleString()}`, 'Revenue'] : [value, 'Enrollments']
                    }
                  />
                  <Bar yAxisId="rev" dataKey="revenue" name="Revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="rev" dataKey="enrollments" name="Enrollments" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Topic distribution */}
          <Card className="rounded-xl shadow-soft">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-base font-semibold">Enrollments by Topic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topicDistribution.map((t) => (
                <div key={t.topic}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{t.topic}</span>
                    <span className="tabular-nums text-muted-foreground">{t.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(t.count / maxTopic) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Needs attention */}
        <Card className="rounded-xl border-warning/30 shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 font-display text-base font-semibold">
              <AlertTriangle className="h-4 w-4 text-warning" /> Needs Attention
              <Badge variant="secondary" className="bg-warning/10 text-warning">{attentionItems.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
            {attentionItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:border-warning/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                  <item.icon className="h-4 w-4 text-warning" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </Link>
            ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent orders + enrollments */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Recent orders */}
          <Card className="rounded-xl shadow-soft">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="font-display text-base font-semibold">Recent Orders</CardTitle>
              <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {adminOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{order.item}</p>
                    <p className="text-xs text-muted-foreground">{order.user} · {order.date}</p>
                  </div>
                  <div className="text-end">
                    <p className="text-sm font-semibold tabular-nums text-foreground">${order.amount}</p>
                    <Badge variant={order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'destructive'} className="mt-0.5 text-[10px]">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent enrollments */}
          <Card className="rounded-xl shadow-soft">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="font-display text-base font-semibold">Recent Enrollments</CardTitle>
              <Link href="/admin/users" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {adminEnrollments.slice(0, 5).map((enr) => {
                const user = adminUsers.find((u) => u.name === enr.user);
                return (
                  <div key={enr.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={enr.user} />
                      <AvatarFallback>{enr.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{enr.user}</p>
                      <p className="truncate text-xs text-muted-foreground">{enr.course}</p>
                    </div>
                    <div className="text-end">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-16 rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${enr.progress}%` }} />
                        </div>
                        <span className="text-xs tabular-nums text-muted-foreground">{enr.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

const yearData = [
  { month: 'Jan', revenue: 3100, enrollments: 120 },
  { month: 'Feb', revenue: 3600, enrollments: 145 },
  { month: 'Mar', revenue: 3400, enrollments: 130 },
  { month: 'Apr', revenue: 4200, enrollments: 180 },
  { month: 'May', revenue: 5100, enrollments: 210 },
  { month: 'Jun', revenue: 4800, enrollments: 195 },
  { month: 'Jul', revenue: 6200, enrollments: 240 },
  { month: 'Aug', revenue: 7100, enrollments: 280 },
  { month: 'Sep', revenue: 8500, enrollments: 320 },
  { month: 'Oct', revenue: 9200, enrollments: 360 },
];
