import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  sidebarContent: React.ReactNode;
  headerProps: React.ComponentProps<typeof Header>;
  children: React.ReactNode;
}

export function DashboardLayout({ sidebarContent, headerProps, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Sidebar>
        {sidebarContent}
      </Sidebar>
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header {...headerProps} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
