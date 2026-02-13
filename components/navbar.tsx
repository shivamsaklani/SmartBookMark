'use client';

import Link from 'next/link';
import { Bookmark, Mail } from 'lucide-react';
import { User } from '@/lib/types';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Navbar({ user, onSignIn, onSignOut }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Bookmarks</span>
          </Link>

          {/* Auth */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'}
                    alt={user.user_metadata?.name || 'User'}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden text-sm text-muted-foreground sm:inline">
                    {user.user_metadata?.name}
                  </span>
                </div>
                <Button onClick={onSignOut} variant="secondary" size="sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <Button onClick={onSignIn} size="sm">
                <span><Mail/></span>Sign In with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
