'use client';

import { useUsers, useDeleteUser } from '@/hooks/use-users';
import { useAuthStore } from '@/store/auth-store';
import { UserRole } from '@/lib/types';
import { Users as UsersIcon, Trash2, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { formatDate, getRoleColor } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UsersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: usersResponse, isLoading } = useUsers();
  const deleteMutation = useDeleteUser();

  const users = usersResponse?.data || [];

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== UserRole.ADMIN) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleDelete = (id: string) => {
    if (id === user?.id) {
      alert('You cannot delete your own account!');
      return;
    }
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  if (user?.role !== UserRole.ADMIN) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-600 dark:text-red-400">
          Access denied. Admin privileges required.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage all users and their permissions ({users.length} total users)
        </p>
      </div>

      {/* Users List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No users found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((userItem) => (
            <UserCard
              key={userItem.id}
              user={userItem}
              onDelete={handleDelete}
              isCurrentUser={userItem.id === user?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UserCard({
  user,
  onDelete,
  isCurrentUser,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
  };
  onDelete: (id: string) => void;
  isCurrentUser: boolean;
}) {
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <ShieldAlert className="h-5 w-5" />;
      case UserRole.MODERATOR:
        return <ShieldCheck className="h-5 w-5" />;
      case UserRole.USER:
        return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Avatar */}
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.name}
                {isCurrentUser && (
                  <span className="ml-2 text-xs text-blue-600 dark:text-blue-400 font-normal">
                    (You)
                  </span>
                )}
              </h3>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                {getRoleIcon(user.role)}
                <span>{user.role}</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{user.email}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Joined: {formatDate(user.createdAt)}</span>
              <span>Updated: {formatDate(user.updatedAt)}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ID: {user.id.slice(0, 12)}...
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!isCurrentUser && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDelete(user.id)}
              className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition"
              title="Delete user"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

