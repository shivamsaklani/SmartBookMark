'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { LandingHero } from '@/components/landing-hero';
import { LandingFooter } from '@/components/landing-footer';
import { useAppDispatch} from '@/hooks/use-redux';
import { User } from '@/lib/types';
import { setUser } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signIn = async () => {
    try {
      await supabase.auth.signInWithOAuth(
        {
          provider: "google",
          options: {
            redirectTo: process.env.NEXT_PUBLIC_CALLBACK_URL,
          },
        }
      );
      const { data } = await supabase.auth.getUser();
      const user: User = {
        id: data.user?.id as string,
        email: data.user?.email as string,
        user_metadata: {
          name: data.user?.email,
          avatar_url: data.user?.user_metadata.avatar_url,
        }

      }
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }

  }
  const signOut = () => {
    alert("signout");
  }
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar user={null} onSignIn={signIn} onSignOut={signOut} />

      <main className="flex-1">
        <LandingHero onSignIn={signIn} />
      </main>

      <LandingFooter />
    </div>
  );
}
