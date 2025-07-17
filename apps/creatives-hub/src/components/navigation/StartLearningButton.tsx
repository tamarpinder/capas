'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';

interface StartLearningButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function StartLearningButton({ className, children }: StartLearningButtonProps) {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/');
    }
  };

  if (isAuthenticated) {
    return (
      <Link href="/my-courses" className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}