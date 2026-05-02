'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/app/actions/auth';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await checkAuth();
      if (!result.success) {
        // Redirect to login if not authenticated
        const router = useRouter();
        router.push('/login');
      }
    };

    checkAuthentication();
  }, []);

  return children;
}