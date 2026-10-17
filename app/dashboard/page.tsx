'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  studentProfile,
  weeklyActivity,
  enrolledCourses,
  liveClasses,
  studentBookings,
  achievements,
  formatCountdown,
} from '@/lib/dashboard-data';
import { courses } from '@/lib/marketing-data';
import { useToast } from '@/hooks/use-toast';
import {
  PlayCircle,
  Calendar,
  Video,
  Award,
  Flame,
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

const achievementIcons = {
  award: Award,
  flame: Flame,
  clock: Clock,
  star: Star,
};

export default function DashboardOverview() {
  const { toast } = useToast();
  const now = new Date();

  const primary = enrolledCourses[0];
  const primaryCourse = courses.find((c) => c.id === primary.courseId);
  const weeklyMinutes = weeklyActivity.reduce((s, d) => s + d.minutes, 0);
  const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes), 1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <Card className="rounded-2xl shadow-soft">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="flex items-center gap-4">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="h-14 w-14 rounded-full border-2 border-primary/20 object-cover"
              />
              <div>
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {studentProfile.name}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
                <Flame className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-display text-lg font-bold tabular-nums text-foreground">
                    {studentProfile.streakDays}
                  </p>
                  <p className="text-xs text-muted-foreground">day streak</p>
                </div>
              </div>
              <div className="hidden items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2 sm:flex">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-display text-lg font-bold tabular-nums text-foreground">
                    {studentProfile.daysThisWeek}/{studentProfile.weeklyGoalDays}
                  </p>
                  <p className="text-xs text-muted-foreground">weekly goal</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pick up where you left off hero */}
        {primaryCourse && (
          <Link
            href={`/dashboard/courses/${primaryCourse.id}`}
            className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:border-primary/40 hover:shadow-soft-lg"
          >
            <div className="flex flex-col md:flex-row">
              <ArchFrame className="aspect-[16/9] w-full shrink-0 bg-secondary md:aspect-auto md:w-72">
                <img
                  src={primaryCourse.thumbnail}
                  alt={primaryCourse.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </ArchFrame>
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary">
                    <PlayCircle className="me-1 h-3 w-3" /> Continue learning
                  </Badge>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {primary.progress}% complete
                  </span>
                </div>
                <h2 className="mt-2 font-display text-xl font-bold text-foreground group-hover:text-primary">
                  {primaryCourse.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Next up · {primary.lastLessonTitle}
                </p>
                <Progress value={primary.progress} className="mt-4 h-1.5" />
                <div className="mt-4 flex items-center gap-2">
                  <Button size="sm" className="pointer-events-none bg-primary text-primary-foreground">
                    Resume Lesson {primary.lastLessonIndex}
                    <ArrowRight className="ms-1.5 h-3.5 w-3.5" />
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {primary.totalLessons - primary.lastLessonIndex} lessons left
                  </span>
                </div>
              </CardContent>
            </div>
          </Link>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Courses in progress', value: String(enrolledCourses.filter((c) => c.status === 'in-progress').length), icon: PlayCircle },
            { label: 'Hours learned', value: String(studentProfile.hoursLearned), icon: Clock },
            { label: 'Certificates earned', value: '2', icon: Award },
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

        {/* Weekly activity chart */}
        <Card className="rounded-2xl shadow-soft">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="font-display text-lg font-semibold">This week&apos;s activity</CardTitle>
            <Badge variant="secondary">{weeklyMinutes} minutes total</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex h-36 items-end gap-2 sm:gap-3">
              {weeklyActivity.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className={d.minutes > 0 ? 'text-[10px] font-medium text-muted-foreground tabular-nums' : 'text-[10px] text-transparent'}>
                    {d.minutes > 0 ? `${d.minutes}m` : ''}
                  </span>
                  <div className="flex h-24 w-full items-end justify-center">
                    <div
                      className="w-full max-w-[36px] rounded-t-md bg-primary/80 transition-all duration-500 hover:bg-primary"
                      style={{ height: `${Math.max((d.minutes / maxMinutes) * 96, 4)}px` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="rounded-2xl shadow-soft">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="font-display text-lg font-semibold">Achievements</CardTitle>
            <Link href="/dashboard/certificates" className="text-xs font-medium text-primary hover:underline">
              View certificates
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {achievements.map((a) => {
                const Icon = achievementIcons[a.icon];
                return (
                  <div
                    key={a.id}
                    className={`rounded-xl border p-4 text-center transition-all ${
                      a.unlocked
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border bg-secondary/50 opacity-60'
                    }`}
                  >
                    <div
                      className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${
                        a.unlocked ? 'bg-primary/15' : 'bg-muted'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${a.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                    {a.unlocked && (
                      <CheckCircle2 className="mx-auto mt-2 h-4 w-4 text-success" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Live classes + bookings */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display text-lg font-semibold">
                <Video className="h-5 w-5 text-primary" /> Upcoming Live Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {liveClasses.map((lc, idx) => {
                const countdown = formatCountdown(lc.date, now);
                const isLive = countdown === 'Live now';
                return (
                  <div key={lc.id}>
                    {idx > 0 && <Separator className="mb-3" />}
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{lc.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {countdown} · {lc.instructor}
                        </p>
                      </div>
                      {isLive ? (
                        <Button
                          size="sm"
                          className="shrink-0 bg-primary text-primary-foreground"
                          onClick={() => toast({ title: 'Joined the class', description: lc.title })}
                        >
                          Join
                        </Button>
                      ) : (
                        <Badge variant="secondary" className="shrink-0 whitespace-nowrap">
                          {countdown}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-soft">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display text-lg font-semibold">
                <Calendar className="h-5 w-5 text-primary" /> Upcoming Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studentBookings.filter((b) => b.status === 'upcoming').slice(0, 2).map((booking) => (
                <div key={booking.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <ArchFrame className="h-10 w-10 shrink-0 bg-secondary">
                    <div className="flex h-full w-full items-center justify-center bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                  </ArchFrame>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{booking.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(booking.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {booking.time}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">{booking.type}</Badge>
                </div>
              ))}
              <Link
                href="/dashboard/bookings"
                className="flex items-center justify-center gap-1 rounded-xl border border-dashed border-border p-3 text-xs font-medium text-primary transition-colors hover:bg-secondary"
              >
                Manage bookings <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
