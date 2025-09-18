import { 
  Home, 
  BookOpen, 
  User, 
  PlusCircle, 
  BarChart3,
  GraduationCap,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, roles: ['admin', 'teacher', 'student'] },
  { title: 'Kursus', url: '/courses', icon: BookOpen, roles: ['admin', 'teacher', 'student'] },
  { title: 'Buat Kursus', url: '/courses/create', icon: PlusCircle, roles: ['admin', 'teacher'] },
  { title: 'Analytics', url: '/analytics', icon: BarChart3, roles: ['admin', 'teacher'] },
  { title: 'Profil', url: '/profile', icon: User, roles: ['admin', 'teacher', 'student'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === path || currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const canAccess = (roles: string[]) => {
    return user && roles.includes(user.role);
  };

  const filteredItems = navigationItems.filter(item => canAccess(item.roles));

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
    >
      <SidebarHeader className="border-b p-4">
        <Link 
          to="/dashboard" 
          className="flex items-center space-x-2 font-semibold text-primary"
        >
          <div className="p-1.5 bg-gradient-primary rounded-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold">Sahasik</span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2 mb-2">
              Menu Utama
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions for non-collapsed sidebar */}
        {!isCollapsed && user && (user.role === 'teacher' || user.role === 'admin') && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2 mb-2">
              Aksi Cepat
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild variant="outline">
                    <Link to="/courses/create">
                      <PlusCircle className="h-4 w-4" />
                      <span>Kursus Baru</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}