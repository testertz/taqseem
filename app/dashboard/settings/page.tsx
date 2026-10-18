'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { UserRound, Lock, Globe, Bell } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('Aisha');
  const [lastName, setLastName] = useState('Juma');
  const [email, setEmail] = useState('aisha.juma@example.com');
  const [bio, setBio] = useState('Banking trainee passionate about Islamic finance.');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('gmt');
  const [currency, setCurrency] = useState('usd');
  const [darkMode, setDarkMode] = useState(false);

  const saveProfile = () => {
    if (!firstName.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: 'Check your details', description: 'A name and a valid email are required.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Profile saved', description: `Your details were updated (demo).` });
  };

  const savePreferences = () => {
    toast({ title: 'Preferences saved', description: 'Language, time zone, and currency updated (demo).' });
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your account, preferences, and privacy.</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="profile"><UserRound className="me-1.5 h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="password"><Lock className="me-1.5 h-4 w-4" /> Password</TabsTrigger>
            <TabsTrigger value="preferences"><Globe className="me-1.5 h-4 w-4" /> Preferences</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="me-1.5 h-4 w-4" /> Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-6 flex items-center gap-4">
                <Avatar className="h-20 w-20 ring-2 ring-primary/20">
                  <AvatarImage src="https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=200&w=200" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change photo</Button>
                  <p className="mt-1.5 text-xs text-muted-foreground">JPG or PNG, max 2MB</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setFirstName('Aisha'); setLastName('Juma'); setEmail('aisha.juma@example.com'); setBio('Banking trainee passionate about Islamic finance.'); }}>Cancel</Button>
                <Button className="bg-primary text-primary-foreground" onClick={saveProfile}>Save changes</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="password" className="mt-6">
            <div className="max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <Button className="mt-6 bg-primary text-primary-foreground" onClick={() => toast({ title: 'Password updated', description: 'Your password was changed (demo).' })}>Update password</Button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <div className="max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Swahili</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time zone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                      <SelectItem value="eat">East Africa Time (UTC+3)</SelectItem>
                      <SelectItem value="gst">Gulf Standard Time (UTC+4)</SelectItem>
                      <SelectItem value="bst">British Summer Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="tzs">TZS (TSh)</SelectItem>
                      <SelectItem value="kes">KES (KSh)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="aed">AED (د.إ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark mode</Label>
                    <p className="text-xs text-muted-foreground">Use dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>
              <Button className="mt-6 bg-primary text-primary-foreground" onClick={savePreferences}>Save preferences</Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="space-y-5">
                {[
                  { label: 'New course announcements', desc: 'Get notified when new courses are published', defaultChecked: true },
                  { label: 'Live class reminders', desc: 'Reminder 1 hour before scheduled sessions', defaultChecked: true },
                  { label: 'Booking confirmations', desc: 'Email confirmation for private sessions', defaultChecked: true },
                  { label: 'Special offers', desc: 'Promotions and discount codes', defaultChecked: false },
                  { label: 'Weekly progress report', desc: 'Summary of your learning activity', defaultChecked: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <Label>{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>
              <Button className="mt-6 bg-primary text-primary-foreground" onClick={() => toast({ title: 'Notifications saved', description: 'Your notification settings were updated (demo).' })}>Save notification settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
