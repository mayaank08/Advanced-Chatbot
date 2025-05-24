
import { Inbox, BarChart3, Users, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { title: 'Inbox', url: '/', icon: Inbox },
    { title: 'Conversations', url: '/conversations', icon: MessageSquare },
    { title: 'Analytics', url: '/analytics', icon: BarChart3 },
    { title: 'Customers', url: '/customers', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 md:hidden">
      <div className="grid grid-cols-4">
        {navItems.map((item) => (
          <Link 
            key={item.title}
            to={item.url}
            className={cn(
              "flex flex-col items-center justify-center py-2 text-xs font-medium",
              location.pathname === item.url 
                ? "text-green-600" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
