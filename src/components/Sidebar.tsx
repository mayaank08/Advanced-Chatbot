
import { MessageSquare, BarChart3, Users, Settings, Zap, Inbox, Book, HelpCircle, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const mainMenuItems = [
  { title: 'Inbox', url: '/', icon: Inbox, badge: '12' },
  { title: 'Conversations', url: '/conversations', icon: MessageSquare, badge: '3' },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Customers', url: '/customers', icon: Users },
];

const secondaryMenuItems = [
  { title: 'AI Assistant', url: '/ai-assistant', icon: Zap },
  { title: 'Knowledge Base', url: '/knowledge', icon: Book },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarRoot className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Intercom</h2>
            <p className="text-xs text-gray-500">Support Team</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        location.pathname === item.url
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-3 bg-gray-100" />
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        location.pathname === item.url
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-100 p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Chen</p>
              <p className="text-xs text-gray-500">Support Agent</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </SidebarFooter>
    </SidebarRoot>
  );
};
