import { LayoutDashboard, Package, Users, ShoppingCart, Bot, Shield, FileText, ChevronLeft, LogOut, Settings, User, Brain } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
const navigationItems = [{
  title: 'Dashboard',
  url: '/',
  icon: LayoutDashboard,
  roles: ['admin', 'moderator']
}, {
  title: 'Sneaky IA',
  url: '/sneaky',
  icon: Brain,
  roles: ['admin', 'moderator']
}, {
  title: 'Produits',
  url: '/products',
  icon: Package,
  roles: ['admin', 'moderator']
}, {
  title: 'Catégories',
  url: '/categories',
  icon: FileText,
  roles: ['admin', 'moderator']
}, {
  title: 'Clients',
  url: '/customers',
  icon: Users,
  roles: ['admin', 'moderator']
}, {
  title: 'Commandes',
  url: '/orders',
  icon: ShoppingCart,
  roles: ['admin', 'moderator']
}, {
  title: 'Mon Compte',
  url: '/profile',
  icon: User,
  roles: ['admin', 'moderator', 'customer']
}, {
  title: 'Gestion Comptes',
  url: '/account-management',
  icon: Settings,
  roles: ['admin']
}, {
  title: 'RGPD',
  url: '/legal',
  icon: Shield,
  roles: ['admin']
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const {
    user,
    userGestion,
    signOut
  } = useAuth();
  const location = useLocation();
  const collapsed = state === 'collapsed';
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  const getNavCls = (path: string) => {
    const baseClass = 'nav-item w-full justify-start';
    return isActive(path) ? `${baseClass} nav-item-active` : baseClass;
  };
  const visibleItems = navigationItems.filter(item => {
    const userRole = userGestion?.role;
    console.log('Current user role:', userRole, 'Item roles:', item.roles);
    return userRole && item.roles.includes(userRole);
  });
  return <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} border-r border-sidebar-border transition-all duration-300`}>
      <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && <div className="flex items-center gap-2">
            
            <span className="font-semibold text-sidebar-foreground">Sneakertreet</span>
          </div>}
        
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Section */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed ? <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                   {userGestion?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {userGestion?.name || user?.email}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userGestion?.role ?? '...'}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="w-full justify-start gap-2 text-xs">
              <LogOut className="w-3 h-3" />
              Déconnexion
            </Button>
          </div> : <div className="flex flex-col items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {userGestion?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={signOut} className="p-1">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>}
      </div>
    </Sidebar>;
}