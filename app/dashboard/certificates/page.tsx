'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Award, Download, Share2, Search } from 'lucide-react';

const certificates = [
  { id: 'cert1', course: 'Fintech & Digital Islamic Banking', instructor: 'Dr. Amina Hassan', date: 'Oct 10, 2026', certId: 'TQS-CERT-2026-1042', grade: 'A' },
  { id: 'cert2', course: 'Islamic Microfinance & Development', instructor: 'Fatima Noor', date: 'Sep 15, 2026', certId: 'TQS-CERT-2026-1010', grade: 'A+' },
];

function downloadCertificate(cert: (typeof certificates)[0]) {
  const lines = [
    '══════════════════════════════════════════',
    '        TAQSEEM — CERTIFICATE OF COMPLETION',
    '══════════════════════════════════════════',
    '',
    `  Course:      ${cert.course}`,
    `  Instructor:  ${cert.instructor}`,
    `  Completed:   ${cert.date}`,
    `  Grade:       ${cert.grade}`,
    `  Cert. ID:    ${cert.certId}`,
    '',
    '  Awarded to Aisha Juma for successfully',
    '  completing all course requirements.',
    '',
    '══════════════════════════════════════════',
    '  Demo certificate generated locally.',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cert.certId}-certificate.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CertificatesPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const filtered = certificates.filter((c) =>
    c.course.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  const shareCertificate = async (cert: (typeof certificates)[0]) => {
    const link = `${window.location.origin}/dashboard/certificates?cert=${cert.certId}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({ title: 'Link copied', description: 'Share link copied to clipboard.' });
    } catch {
      toast({ title: 'Share link', description: link });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Certificates</h1>
            <p className="mt-1 text-sm text-muted-foreground">{certificates.length} certificates earned</p>
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <Card className="rounded-2xl shadow-soft">
            <CardContent className="p-12 text-center">
              <Award className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">No certificates found. Complete a course to earn one.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((cert) => (
              <Card key={cert.id} className="overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-soft-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary to-primary/70 p-6">
                  <div className="absolute inset-0 bg-pattern-overlay opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1'%3E%3Cpath d='M30 0L37 23L60 30L37 37L30 60L23 37L0 30L23 23Z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
                  <div className="relative flex h-full flex-col items-center justify-center text-center">
                    <Award className="mb-2 h-10 w-10 text-primary-foreground/80" />
                    <p className="text-xs uppercase tracking-wider text-primary-foreground/60">Certificate of Completion</p>
                    <p className="mt-2 font-display text-lg font-bold text-primary-foreground leading-tight">{cert.course}</p>
                    <p className="mt-2 text-xs text-primary-foreground/70">{cert.instructor}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-primary-foreground/15 text-primary-foreground">Grade: {cert.grade}</Badge>
                      <Badge className="bg-primary-foreground/15 text-primary-foreground">{cert.date}</Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Certificate ID: <span className="font-mono font-medium text-foreground">{cert.certId}</span></p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => downloadCertificate(cert)}>
                      <Download className="me-1.5 h-3.5 w-3.5" /> Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => shareCertificate(cert)}>
                      <Share2 className="me-1.5 h-3.5 w-3.5" /> Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
