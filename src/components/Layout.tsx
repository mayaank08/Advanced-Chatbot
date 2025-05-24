
import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { UserProfileMenu } from './UserProfileMenu';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="intercom-theme">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          {!isMobile && <Sidebar />}
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
          </div>
          {isMobile && <MobileNav />}
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};
