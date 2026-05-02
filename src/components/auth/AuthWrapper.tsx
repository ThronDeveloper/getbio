'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/app/actions/auth';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await checkAuth();
      if (!result.success) {
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  return children;
}