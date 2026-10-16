'use client';

import Link from 'next/link';
import { PatternBackground, Logo, ArchFrame } from '@/components/brand/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { CreditCard, ShieldCheck, Tag, ArrowRight, CheckCircle2, Globe, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponApplied, setCouponApplied] = useState(false);
  const [coupon, setCoupon] = useState('');

  const subtotal = 89;
  const discount = couponApplied ? 15 : 0;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-6">
          <Link href="/"><Logo /></Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Checkout</h1>
              <p className="mt-1 text-sm text-muted-foreground">Complete your purchase to start learning.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                Account
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Aisha" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Juma" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                Billing details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Dar es Salaam" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Postal code</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <div className="relative">
                    <Globe className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select id="country" className="h-10 w-full rounded-md border border-input bg-background ps-9 pe-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option>Tanzania</option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>Kenya</option>
                      <option>Nigeria</option>
                      <option>Saudi Arabia</option>
                      <option>United States</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select id="currency" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>USD ($)</option>
                    <option>TZS (TSh)</option>
                    <option>KES (KSh)</option>
                    <option>GBP (£)</option>
                    <option>AED (د.إ)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                Payment method
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                  { id: 'mobile', label: 'Mobile Money', icon: Smartphone },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/30'
                    )}
                  >
                    <method.icon className={cn('h-6 w-6', paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground')} />
                    <span className={cn('text-sm font-medium', paymentMethod === method.id ? 'text-foreground' : 'text-muted-foreground')}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cardNumber">Card number</Label>
                    <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input id="expiry" placeholder="MM / YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mt-5 rounded-xl border border-border bg-secondary p-4 text-center text-sm text-muted-foreground">
                  You will be redirected to PayPal to complete your payment securely.
                </div>
              )}

              {paymentMethod === 'mobile' && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mobileProvider">Provider</Label>
                    <select id="mobileProvider" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option>M-Pesa</option>
                      <option>Tigo Pesa</option>
                      <option>Airtel Money</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Phone number</Label>
                    <Input id="mobileNumber" placeholder="+255 7XX XXX XXX" />
                  </div>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Checkbox id="terms" />
              <span>I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and understand the <Link href="/refund" className="text-primary hover:underline">Refund Policy</Link> (14-day money-back guarantee).</span>
            </label>
          </div>

          <div>
            <div className="sticky top-8 rounded-2xl border border-border bg-card p-6 shadow-soft-lg">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h2>

              <div className="flex gap-4 border-b border-border pb-4">
                <ArchFrame className="aspect-[16/10] w-24 shrink-0 bg-secondary">
                  <img src="https://images.pexels.com/photos/13431445/pexels-photo-13431445.jpeg?auto=compress&cs=tinysrgb&h=200&w=300" alt="Course" className="h-full w-full object-cover" />
                </ArchFrame>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Foundations of Islamic Banking & Finance</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Dr. Yusuf Al-Kabir</p>
                  <Badge className="mt-1.5 bg-primary/10 text-primary" variant="secondary">Beginner</Badge>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => setCouponApplied(true)}
                  disabled={!coupon || couponApplied}
                >
                  <Tag className="me-1.5 h-3.5 w-3.5" />
                  {couponApplied ? 'Applied' : 'Apply'}
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium tabular-nums text-foreground">${subtotal}.00</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-success">
                    <span>Discount (TAQSEEM15)</span>
                    <span className="font-medium tabular-nums">-$${discount}.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="font-medium tabular-nums text-foreground">${tax}.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-base font-semibold text-foreground">Total</span>
                  <span className="font-display text-2xl font-bold tabular-nums text-foreground">${total}.00</span>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Globe className="h-3.5 w-3.5 text-primary" /> Price shown in USD. Converted at checkout if paying in another currency.
              </p>

              <Link href="/checkout/success">
                <Button className="mt-5 w-full bg-primary text-primary-foreground" size="lg">
                  Complete Purchase
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> 256-bit SSL encrypted payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
