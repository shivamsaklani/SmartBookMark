'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onSignIn: () => void;
}

export function LandingHero({ onSignIn }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left side - Text */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary w-fit">
              <Zap className="mr-2 h-4 w-4" />
              Save & Organize Your Links
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
              Your Smart
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Bookmark Manager
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-2xl">
              Organize, save, and sync your bookmarks across all devices. Keep your favorite links organized with a simple, powerful tool built for modern productivity.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button onClick={onSignIn} size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 border-t border-border pt-8">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground mt-1">Private & Secure</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">Real-time</p>
                <p className="text-sm text-muted-foreground mt-1">Sync Across Devices</p>
              </div>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 sm:max-w-lg">
              {/* Floating cards */}
              <div className="absolute top-8 left-8 rounded-lg bg-card border border-border p-4 shadow-lg transform -rotate-6 w-40 sm:w-48">
                <div className="space-y-3">
                  <div className="h-3 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-2 bg-muted rounded w-full"></div>
                  <div className="h-2 bg-muted rounded w-2/3"></div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 rounded-lg bg-card border border-border p-4 shadow-lg transform rotate-6 w-40 sm:w-48">
                <div className="space-y-3">
                  <div className="h-3 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-2 bg-muted rounded w-full"></div>
                  <div className="h-2 bg-muted rounded w-2/3"></div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="inline-flex items-center justify-center rounded-full bg-primary/20 p-8">
                  <Lock className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
