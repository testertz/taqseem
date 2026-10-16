'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground } from '@/components/brand/brand';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, Eye, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  { id: 'b1', title: 'The Future of Islamic Fintech in Africa', author: 'Dr. Yusuf Al-Kabir', category: 'Fintech', status: 'published', date: 'Oct 12, 2026', views: 1240, excerpt: 'Exploring how mobile money and blockchain are reshaping Shariah-compliant financial services across East and West Africa.', image: 'https://images.pexels.com/photos/8069521/pexels-photo-8069521.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', readTime: '8 min read' },
  { id: 'b2', title: 'Understanding Sukuk: A Beginner\'s Guide', author: 'Dr. Amina Hassan', category: 'Capital Markets', status: 'published', date: 'Oct 08, 2026', views: 890, excerpt: 'A clear introduction to Sukuk structures, how they work, and why they matter for Islamic capital markets.', image: 'https://images.pexels.com/photos/8069753/pexels-photo-8069753.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', readTime: '10 min read' },
  { id: 'b3', title: 'Ethical Investment: Halal Portfolio Strategies', author: 'Dr. Yusuf Al-Kabir', category: 'Wealth Management', status: 'published', date: 'Oct 02, 2026', views: 670, excerpt: 'Practical strategies for building a Shariah-compliant investment portfolio with diversification.', image: 'https://images.pexels.com/photos/8121703/pexels-photo-8121703.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', readTime: '6 min read' },
  { id: 'b4', title: 'The Role of the Shariah Board', author: 'Dr. Yusuf Al-Kabir', category: 'Governance', status: 'published', date: 'Sep 28, 2026', views: 2100, excerpt: 'Understanding the critical function of Shariah boards in Islamic financial institutions.', image: 'https://images.pexels.com/photos/10347166/pexels-photo-10347166.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', readTime: '12 min read' },
  { id: 'b5', title: 'Zakat in the Digital Age: Tools and Calculators', author: 'Dr. Amina Hassan', category: 'Wealth Management', status: 'published', date: 'Sep 20, 2026', views: 1540, excerpt: 'How technology is making zakat calculation easier and more accurate for modern Muslims.', image: 'https://images.pexels.com/photos/8069521/pexels-photo-8069521.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', readTime: '7 min read' },
  { id: 'b6', title: 'Takaful vs Conventional Insurance: Key Differences', author: 'Dr. Amina Hassan', category: 'Takaful', status: 'published', date: 'Sep 14, 2026', views: 980, excerpt: 'A detailed comparison of Takaful and conventional insurance models, from risk-sharing to surplus distribution.', image: 'https://images.pexels.com/photos/8069753/pexels-photo-8069753.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', readTime: '9 min read' },
];

const categories = ['All', 'Fintech', 'Capital Markets', 'Wealth Management', 'Governance', 'Takaful'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = blogPosts.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All' && p.category !== category) return false;
    return true;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <PatternBackground variant="star" />
          <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-6 lg:py-20">
            <Badge variant="secondary" className="mb-4">Taqseem Blog</Badge>
            <h1 className="font-display text-4xl font-bold text-foreground lg:text-5xl">Insights on Islamic Finance</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Expert analysis, practical guides, and thought leadership from the world of Shariah-compliant finance.
            </p>
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
            <Link href={`/blog/${featured.id}`} className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:shadow-soft-lg">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{featured.category}</Badge>
                    <span className="text-xs text-muted-foreground">Featured</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground lg:text-3xl">{featured.title}</h2>
                  <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {featured.views.toLocaleString()}</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Filters */}
        <section className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    category === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all hover:shadow-soft-lg">
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="text-[10px]">{post.category}</Badge>
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No articles match your search.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}