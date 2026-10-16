'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { adminStats, revenueData, topicDistribution, adminOrders, adminEnrollments } from '@/lib/admin-data';
import { TrendingUp, TrendingDown, ArrowUpRight, BookOpen, Users, CreditCard, GraduationCap, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

function StatCard({ stat, icon: Icon }: { stat: typeof adminStats[0]; icon: typeof BookOpen }) {
  const formatted = stat.format === 'currency'
    ? `$${stat.value.toLocaleString()}`
    : stat.format === 'percent'
    ? `${stat.value}%`
    : stat.value.toLocaleString();

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
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
    </div>
  );
}

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

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
            <Button variant="outline" size="sm">Export Report</Button>
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
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">Revenue Overview</h3>
                <p className="text-xs text-muted-foreground">Monthly revenue and enrollments</p>
              </div>
              <Badge variant="secondary">Last 7 months</Badge>
            </div>
            <div className="flex h-48 items-end gap-2">
              {revenueData.map((d) => (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-col items-center gap-1">
                    <div
                      className="w-full max-w-[32px] rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                      style={{ height: `${(d.revenue / maxRevenue) * 160}px` }}
                    />
                    <div
                      className="w-full max-w-[32px] rounded-b-md bg-accent/60 transition-all hover:bg-accent"
                      style={{ height: `${(d.enrollments / 360) * 40}px` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Enrollments</span>
            </div>
          </div>

          {/* Topic distribution */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h3 className="mb-4 font-display text-base font-semibold text-foreground">Enrollments by Topic</h3>
            <div className="space-y-3">
              {topicDistribution.map((t) => (
                <div key={t.topic}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{t.topic}</span>
                    <span className="tabular-nums text-muted-foreground">{t.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${t.percentage * 3}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent orders + enrollments */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Recent orders */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-foreground">Recent Orders</h3>
              <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
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
            </div>
          </div>

          {/* Recent enrollments */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-foreground">Recent Enrollments</h3>
              <Link href="/admin/users" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {adminEnrollments.slice(0, 5).map((enr) => (
                <div key={enr.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=80&w=80" />
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
