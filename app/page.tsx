'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Manage Your Tasks
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Efficiently & Simply
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            A modern task management application with role-based access control,
            built with Next.js and NestJS.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              Sign In
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <FeatureCard
              icon={<CheckCircle2 className="h-10 w-10 text-blue-600" />}
              title="Task Management"
              description="Create, update, and organize your tasks with ease. Track progress with status updates."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-10 w-10 text-purple-600" />}
              title="Role-Based Access"
              description="Secure authentication with JWT tokens and role-based permissions for users and admins."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-10 w-10 text-indigo-600" />}
              title="Modern UI"
              description="Beautiful, responsive interface built with Next.js 15 and Tailwind CSS."
            />
          </div>

          {/* Tech Stack */}
          <div className="mt-20 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Built With Modern Technologies
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <TechBadge text="Next.js 15" />
              <TechBadge text="React 19" />
              <TechBadge text="TypeScript" />
              <TechBadge text="NestJS" />
              <TechBadge text="Prisma" />
              <TechBadge text="PostgreSQL" />
              <TechBadge text="Tailwind CSS" />
              <TechBadge text="React Query" />
              <TechBadge text="Zustand" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function TechBadge({ text }: { text: string }) {
  return (
    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
      {text}
    </span>
  );
}
