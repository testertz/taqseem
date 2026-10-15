import Link from 'next/link';
import { Logo, OrnamentDivider, PatternBackground } from '@/components/brand/brand';
import { Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = [
  {
    title: 'Learn',
    links: [
      { label: 'All Courses', href: '/courses' },
      { label: 'Live Classes', href: '/live-classes' },
      { label: 'Private Sessions', href: '/private-sessions' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Instructors', href: '/instructors' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <PatternBackground variant="girih" className="text-primary" />
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-5 lg:py-20">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Taqseem is a premium learning platform for Islamic finance. We help
              learners across 34 countries master Shariah-compliant banking,
              Takaful, Sukuk, and wealth management.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:hello@taqseem.com" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4 text-primary" /> hello@taqseem.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Dubai, UAE — Dar es Salaam, TZ
              </span>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <OrnamentDivider />

        <div className="flex flex-col items-center justify-between gap-4 pb-8 pt-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Taqseem. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button className="transition-colors hover:text-primary">English</button>
            <span className="text-border">|</span>
            <button className="transition-colors hover:text-primary">Swahili</button>
            <span className="text-border">|</span>
            <button className="transition-colors hover:text-primary">العربية</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
