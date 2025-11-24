'use client';

import { useTasks } from '@/hooks/use-tasks';
import { useAuthStore } from '@/store/auth-store';
import { CheckSquare, Clock, CheckCircle2, XCircle, Users, ListTodo } from 'lucide-react';
import Link from 'next/link';
import { TaskStatus, UserRole } from '@/lib/types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: tasksResponse, isLoading } = useTasks();

  const tasks = tasksResponse?.data || [];

  // Calculate stats
  const stats = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    completed: tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
    cancelled: tasks.filter((t) => t.status === TaskStatus.CANCELLED).length,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {user?.role === UserRole.ADMIN
            ? 'Admin view - You can see all tasks from all users'
            : 'Manage your tasks and track your progress'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<ListTodo className="h-6 w-6" />}
          color="bg-blue-500"
          isLoading={isLoading}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Clock className="h-6 w-6" />}
          color="bg-yellow-500"
          isLoading={isLoading}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="h-6 w-6" />}
          color="bg-green-500"
          isLoading={isLoading}
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon={<XCircle className="h-6 w-6" />}
          color="bg-red-500"
          isLoading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionCard
          title="My Tasks"
          description="View and manage all your tasks"
          href="/dashboard/tasks"
          icon={<CheckSquare className="h-8 w-8" />}
          color="from-blue-500 to-blue-600"
        />
        {user?.role === UserRole.ADMIN && (
          <QuickActionCard
            title="User Management"
            description="Manage users and their permissions"
            href="/dashboard/users"
            icon={<Users className="h-8 w-8" />}
            color="from-purple-500 to-purple-600"
          />
        )}
      </div>

      {/* Recent Tasks Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Tasks
          </h2>
          <Link
            href="/dashboard/tasks"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            View all →
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No tasks yet. Create your first task to get started!
            </p>
            <Link
              href="/dashboard/tasks"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create Task
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {task.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {task.description || 'No description'}
                  </p>
                </div>
                <StatusBadge status={task.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  isLoading,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  isLoading: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          {isLoading ? (
            <div className="mt-2 h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {value}
            </p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  icon,
  color,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition"
    >
      <div className={`bg-gradient-to-r ${color} p-3 rounded-lg text-white w-fit mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </Link>
  );
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const styles = {
    [TaskStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [TaskStatus.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const labels = {
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.COMPLETED]: 'Completed',
    [TaskStatus.CANCELLED]: 'Cancelled',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

