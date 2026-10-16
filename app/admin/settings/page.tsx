'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Upload } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your platform configuration</p>
          </div>
          <Button size="sm"><span className="flex items-center gap-1.5"><Save className="h-4 w-4" /> Save Changes</span></Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general" className="mt-4">
            <div className="max-w-2xl space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Platform Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="site-name">Platform Name</Label>
                    <Input id="site-name" defaultValue="Taqseem" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="site-desc">Tagline</Label>
                    <Input id="site-desc" defaultValue="Premium Islamic Finance Education" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" type="email" defaultValue="support@taqseem.com" className="mt-1.5" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Default Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="kes">KES (KSh)</SelectItem>
                          <SelectItem value="aed">AED (د.إ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="eat">East Africa Time (UTC+3)</SelectItem>
                        <SelectItem value="gst">Gulf Standard Time (UTC+4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Features</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Course Enrollment', desc: 'Allow students to enroll in courses', on: true },
                    { label: 'Live Classes', desc: 'Enable live class scheduling and streaming', on: true },
                    { label: 'Private Sessions', desc: 'Enable 1-on-1 mentor bookings', on: true },
                    { label: 'Certificates', desc: 'Auto-issue certificates on course completion', on: true },
                    { label: 'Discussion Forums', desc: 'Enable course Q&A and discussion boards', on: false },
                    { label: 'New User Registration', desc: 'Allow public sign-ups', on: true },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{f.label}</p>
                        <p className="text-xs text-muted-foreground">{f.desc}</p>
                      </div>
                      <Switch defaultChecked={f.on} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Branding */}
          <TabsContent value="branding" className="mt-4">
            <div className="max-w-2xl space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Brand Assets</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Logo</Label>
                    <div className="mt-1.5 flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-secondary">
                        <span className="font-display text-lg font-bold text-primary">T</span>
                      </div>
                      <Button variant="outline" size="sm"><span className="flex items-center gap-1.5"><Upload className="h-4 w-4" /> Upload Logo</span></Button>
                    </div>
                  </div>
                  <div>
                    <Label>Favicon</Label>
                    <div className="mt-1.5 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                        <span className="font-display text-sm font-bold text-primary">T</span>
                      </div>
                      <Button variant="outline" size="sm"><span className="flex items-center gap-1.5"><Upload className="h-4 w-4" /> Upload Favicon</span></Button>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Primary Color</Label>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-primary" />
                        <Input defaultValue="#10B981" />
                      </div>
                    </div>
                    <div>
                      <Label>Accent Color</Label>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-accent" />
                        <Input defaultValue="#C9A24B" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Payments */}
          <TabsContent value="payments" className="mt-4">
            <div className="max-w-2xl space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Payment Gateways</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Stripe', desc: 'Accept credit/debit cards globally', on: true },
                    { name: 'PayPal', desc: 'PayPal checkout integration', on: true },
                    { name: 'M-Pesa', desc: 'Mobile money for East Africa', on: true },
                    { name: 'Flutterwave', desc: 'African payment gateway', on: false },
                  ].map((g) => (
                    <div key={g.name} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{g.name}</p>
                        <p className="text-xs text-muted-foreground">{g.desc}</p>
                      </div>
                      <Switch defaultChecked={g.on} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Tax Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto-collect tax</p>
                      <p className="text-xs text-muted-foreground">Calculate VAT/sales tax at checkout</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" defaultValue="0" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Email */}
          <TabsContent value="email" className="mt-4">
            <div className="max-w-2xl space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Email Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" defaultValue="smtp.taqseem.com" className="mt-1.5" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="smtp-port">Port</Label>
                      <Input id="smtp-port" type="number" defaultValue="587" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Encryption</Label>
                      <Select defaultValue="tls">
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smtp-user">Username</Label>
                    <Input id="smtp-user" defaultValue="noreply@taqseem.com" className="mt-1.5" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Enrollment Confirmation', desc: 'Sent when a student enrolls', on: true },
                    { label: 'Payment Receipt', desc: 'Sent after successful payment', on: true },
                    { label: 'Course Completion', desc: 'Sent when a course is finished', on: true },
                    { label: 'Booking Reminder', desc: 'Reminder before scheduled session', on: true },
                    { label: 'Weekly Digest', desc: 'Summary of platform activity', on: false },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{n.label}</p>
                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                      </div>
                      <Switch defaultChecked={n.on} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="mt-4">
            <div className="max-w-2xl space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-display text-base font-semibold text-foreground">Third-Party Integrations</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Zoom', desc: 'Video conferencing for live classes', connected: true },
                    { name: 'Google Analytics', desc: 'Track website analytics', connected: true },
                    { name: 'Mailchimp', desc: 'Email marketing campaigns', connected: false },
                    { name: 'Vimeo', desc: 'Video hosting for course content', connected: true },
                    { name: 'Intercom', desc: 'Customer support chat', connected: false },
                  ].map((i) => (
                    <div key={i.name} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{i.name}</p>
                        <p className="text-xs text-muted-foreground">{i.desc}</p>
                      </div>
                      <Button variant={i.connected ? 'outline' : 'default'} size="sm">
                        {i.connected ? 'Connected' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
