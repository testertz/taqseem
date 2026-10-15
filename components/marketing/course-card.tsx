'use client';

import Link from 'next/link';
import { Star, PlayCircle, Clock, BookOpen, BadgeCheck } from 'lucide-react';
import { ArchFrame } from '@/components/brand/brand';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/lib/marketing-data';
import { cn } from '@/lib/utils';

const levelStyles: Record<string, string> = {
  Beginner: 'bg-primary/10 text-primary',
  Intermediate: 'bg-accent/15 text-accent-foreground',
  Advanced: 'bg-info/10 text-info',
};

export function CourseCard({ course, className }: { course: Course; className?: string }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg',
        className
      )}
    >
      <div className="relative">
        <ArchFrame className="aspect-[16/10] w-full bg-secondary">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </ArchFrame>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
        </div>
        <Badge className={cn('absolute start-3 top-3 border-0', levelStyles[course.level])}>
          {course.level}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium text-muted-foreground">{course.topic}</p>
        <h3 className="mb-2 line-clamp-2 font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">{course.instructor}</p>

        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="font-semibold text-foreground tabular-nums">{course.rating}</span>
            <span>({course.reviews})</span>
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {course.lessons}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.hours}h
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-lg font-semibold tabular-nums text-foreground">
              ${course.price}
            </span>
          </div>
          <Badge variant="outline" className="gap-1 border-primary/20 text-primary">
            <BadgeCheck className="h-3 w-3" /> Certificate
          </Badge>
        </div>
      </div>
    </Link>
  );
}
