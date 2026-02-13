'use client';
import { Bookmark } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          {/* Brand */}
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Bookmarks</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your smart bookmark manager for a more organized digital life.
            </p>
          </div>


        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Smart Bookmark Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
