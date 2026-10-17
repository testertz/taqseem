'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PatternBackground, OrnamentDivider } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Eye, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts: Record<string, { title: string; author: string; category: string; date: string; views: number; readTime: string; image: string; excerpt: string; content: string[] }> = {
  b1: {
    title: 'The Future of Islamic Fintech in Africa',
    author: 'Dr. Yusuf Al-Kabir',
    category: 'Fintech',
    date: 'Oct 12, 2026',
    views: 1240,
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/8069521/pexels-photo-8069521.jpeg?auto=compress&cs=tinysrgb&h=500&w=900',
    excerpt: 'Exploring how mobile money and blockchain are reshaping Shariah-compliant financial services across East and West Africa.',
    content: [
      'Africa is home to one of the fastest-growing Islamic finance markets in the world. With a Muslim population of over 500 million, the continent represents a massive opportunity for Shariah-compliant financial services — but the traditional banking model has struggled to reach many communities.',
      'Enter fintech. Mobile money platforms like M-Pesa in Kenya and Tanzania have already transformed how millions of people access financial services. Now, a new wave of Islamic fintech startups is building on this infrastructure to offer Shariah-compliant products: from Qard Hasan microloans to digital Sukuk investment platforms.',
      'In East Africa, mobile money penetration exceeds 70% in several countries. This existing infrastructure makes it possible to distribute Islamic financial products at a fraction of the cost of traditional banking. Startups like Lendo and Wahd are already using mobile-first approaches to offer Shariah-compliant financing to small businesses.',
      'Blockchain technology is also opening new possibilities. Tokenized Sukuk could dramatically reduce issuance costs, making it feasible to structure smaller offerings that serve local communities. The Islamic Development Bank has already piloted blockchain-based Sukuk on the J.P. Morgan Onyx network.',
      'Regulatory frameworks are evolving to keep pace. The Islamic Financial Services Board (IFSB) has published guidance on digital Islamic finance, and several African regulators — including Kenya and Nigeria — are updating their rules to accommodate fintech innovation while maintaining Shariah compliance.',
      'The next five years will be transformative. As smartphone penetration continues to rise and mobile money infrastructure matures, Islamic fintech in Africa is poised to bring Shariah-compliant financial services to millions who have been excluded from the formal financial system.',
    ],
  },
};

const relatedPosts = [
  { id: 'b4', title: 'The Role of the Shariah Board', category: 'Governance', date: 'Sep 28, 2026', image: 'https://images.pexels.com/photos/10347166/pexels-photo-10347166.jpeg?auto=compress&cs=tinysrgb&h=300&w=500' },
  { id: 'b5', title: 'Zakat in the Digital Age', category: 'Wealth Management', date: 'Sep 20, 2026', image: 'https://images.pexels.com/photos/8069521/pexels-photo-8069521.jpeg?auto=compress&cs=tinysrgb&h=300&w=500' },
  { id: 'b6', title: 'Takaful vs Conventional Insurance', category: 'Takaful', date: 'Sep 14, 2026', image: 'https://images.pexels.com/photos/8069753/pexels-photo-8069753.jpeg?auto=compress&cs=tinysrgb&h=300&w=500' },
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = blogPosts[id] || blogPosts.b1;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <PatternBackground variant="star" />
          <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 lg:py-16">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-xs text-muted-foreground">{post.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground lg:text-4xl">{post.title}</h1>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {post.views.toLocaleString()} views</span>
            </div>
          </div>
        </section>

        {/* Featured image */}
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-soft-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Article content */}
        <article className="mx-auto max-w-3xl px-4 py-8 lg:px-6">
          <OrnamentDivider className="mb-8" />
          <div className="space-y-6">
            {post.content.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">{para}</p>
            ))}
          </div>
          <OrnamentDivider className="mt-8" />

          {/* Author card */}
          <div className="mt-8 flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <span className="font-display text-lg font-bold text-primary">{post.author.charAt(0)}</span>
            </div>
            <div>
              <p className="font-display text-base font-semibold text-foreground">{post.author}</p>
              <p className="text-sm text-muted-foreground">Islamic Finance Expert & Taqseem Instructor</p>
            </div>
          </div>
        </article>

        {/* Related posts */}
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
            <h2 className="mb-8 font-display text-2xl font-bold text-foreground">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.id}`} className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all hover:shadow-soft-lg">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rp.image} alt={rp.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="text-[10px]">{rp.category}</Badge>
                    <h3 className="mt-2 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">{rp.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{rp.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}