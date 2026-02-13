'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { LandingHero } from '@/components/landing-hero';
import { LandingFooter } from '@/components/landing-footer';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { User } from '@/lib/types';
import { setUser } from '@/lib/Auth';

export default function Page() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state)=>state.auth);
  const router = useRouter();

  const signIn = ()=>{
    const user:User= {
      id:"123",
      email:"shivamsaklani",
      user_metadata:{
       name:"Shivam",
       avatar_url:""
      }
    }
    dispatch(setUser(user));

  }
  const signOut= ()=>{
    alert("signout");
  }
  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

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
