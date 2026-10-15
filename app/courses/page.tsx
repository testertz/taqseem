'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground } from '@/components/brand/brand';
import { CourseCard } from '@/components/marketing/course-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { courses } from '@/lib/marketing-data';
import { Search, SlidersHorizontal, LayoutGrid, List, Star, Clock, BookOpen, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const topics = ['Banking', 'Capital Markets', 'Takaful', 'Wealth Management', 'Compliance', 'Microfinance'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const languages = ['English'];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const toggleFilter = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearAll = () => {
    setSelectedTopics([]);
    setSelectedLevels([]);
    setMaxPrice(200);
    setSearch('');
  };

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedTopics.length && !selectedTopics.includes(c.topic)) return false;
      if (selectedLevels.length && !selectedLevels.includes(c.level)) return false;
      if (c.price > maxPrice) return false;
      return true;
    });
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, selectedTopics, selectedLevels, maxPrice, sort]);

  const activeFilterCount = selectedTopics.length + selectedLevels.length + (maxPrice < 200 ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Topic</h4>
        <div className="space-y-2.5">
          {topics.map((topic) => (
            <div key={topic} className="flex items-center gap-2.5">
              <Checkbox
                id={`topic-${topic}`}
                checked={selectedTopics.includes(topic)}
                onCheckedChange={() => toggleFilter(topic, selectedTopics, setSelectedTopics)}
              />
              <Label htmlFor={`topic-${topic}`} className="cursor-pointer text-sm text-muted-foreground">
                {topic}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Level</h4>
        <div className="space-y-2.5">
          {levels.map((level) => (
            <div key={level} className="flex items-center gap-2.5">
              <Checkbox
                id={`level-${level}`}
                checked={selectedLevels.includes(level)}
                onCheckedChange={() => toggleFilter(level, selectedLevels, setSelectedLevels)}
              />
              <Label htmlFor={`level-${level}`} className="cursor-pointer text-sm text-muted-foreground">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Max Price</h4>
        <input
          type="range"
          min={50}
          max={200}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>$50</span>
          <span className="font-semibold text-foreground tabular-nums">${maxPrice}</span>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearAll} className="w-full">
          <X className="me-1.5 h-3.5 w-3.5" />
          Clear all filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-card pt-28 pb-8 md:pt-32">
        <PatternBackground variant="grid" className="text-primary" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Course Catalog
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore {courses.length} expert-led Islamic finance courses across all levels.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Filters
              </h3>
              <FilterPanel />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="ps-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="me-1.5 h-4 w-4" />
                      Filters
                      {activeFilterCount > 0 && (
                        <Badge className="ms-1.5 h-5 min-w-5 justify-center bg-primary px-1 text-xs text-primary-foreground">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-xs overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                      <FilterPanel />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden items-center rounded-lg border border-border bg-card sm:flex">
                  <Button variant="ghost" size="icon" className={cn('h-9 w-9 rounded-e-none', view === 'grid' && 'bg-secondary')} onClick={() => setView('grid')}>
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className={cn('h-9 w-9 rounded-s-none', view === 'list' && 'bg-secondary')} onClick={() => setView('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="mb-5 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground tabular-nums">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">No courses match your filters. Try adjusting them.</p>
                <Button variant="outline" size="sm" onClick={clearAll} className="mt-4">Clear filters</Button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="group flex gap-5 overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-soft-lg"
                  >
                    <div className="relative aspect-[16/10] w-48 shrink-0 overflow-hidden bg-secondary sm:w-64">
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="flex flex-1 flex-col py-4 pe-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className="bg-primary/10 text-primary" variant="secondary">{course.level}</Badge>
                        <span className="text-xs text-muted-foreground">{course.topic}</span>
                      </div>
                      <h3 className="mb-1 font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{course.title}</h3>
                      <p className="mb-3 text-sm text-muted-foreground">{course.instructor}</p>
                      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> <span className="font-semibold text-foreground tabular-nums">{course.rating}</span> ({course.reviews})</span>
                        <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.hours}h</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-xl font-bold tabular-nums text-foreground">${course.price}</span>
                          {course.originalPrice && <span className="text-sm text-muted-foreground line-through tabular-nums">${course.originalPrice}</span>}
                        </div>
                        <Button size="sm" className="bg-primary text-primary-foreground">Enroll</Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
