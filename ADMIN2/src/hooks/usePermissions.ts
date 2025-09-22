import { useAuth } from '@/contexts/AuthContext';

export interface Permission {
  canViewPage: (page: string) => boolean;
  canCreateUsers: boolean;
  canEditUserRoles: boolean;
  canDeactivateUsers: boolean;
  canViewLogs: boolean;
  canEditLegal: boolean;
  canDeleteProducts: boolean;
  canManageAccounts: boolean;
  isAdmin: boolean;
  isModerator: boolean;
}

export function usePermissions(): Permission {
  const { userGestion } = useAuth();
  const userRole = userGestion?.role || 'customer';

  const isAdmin = userRole === 'admin';
  const isModerator = userRole === 'moderator';
  const isModeratorOrAdmin = isAdmin || isModerator;

  const canViewPage = (page: string): boolean => {
    const pagePermissions: { [key: string]: string[] } = {
      '/': ['admin', 'moderator'],
      '/sneaky': ['admin', 'moderator'],
      '/products': ['admin', 'moderator'],
      '/categories': ['admin', 'moderator'],
      '/customers': ['admin', 'moderator'],
      '/orders': ['admin', 'moderator'],
      '/scraper': ['admin', 'moderator'],
      '/legal': ['admin'],
      '/logs': ['admin'],
      '/account-management': ['admin'],
    };

    const allowedRoles = pagePermissions[page] || [];
    return allowedRoles.includes(userRole);
  };

  return {
    canViewPage,
    canCreateUsers: isAdmin,
    canEditUserRoles: isAdmin,
    canDeactivateUsers: isAdmin,
    canViewLogs: isAdmin,
    canEditLegal: isAdmin,
    canDeleteProducts: isAdmin,
    canManageAccounts: isAdmin,
    isAdmin,
    isModerator,
  };
}