'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, PlusCircle, FlaskConical,
  Inbox, BarChart2,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { label: 'Dashboard',         href: '/teacher',             icon: LayoutDashboard, section: 'Overview' },
  { label: 'Create Assignment', href: '/teacher/create',      icon: PlusCircle,      section: 'Labs' },
  { label: 'My Assignments',    href: '/teacher/assignments', icon: FlaskConical,    section: null },
  { label: 'Submissions',       href: '/teacher/submissions', icon: Inbox,           section: 'Students', badge: true },
  { label: 'Grades',            href: '/teacher/grades',      icon: BarChart2,       section: null },
];

export default function TeacherSidebar() {
  const path = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-full md:w-[230px] flex-shrink-0 bg-white border-b md:border-b-0 md:border-r border-slate-200
                      flex flex-col md:h-screen sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <div className="px-5 py-4 md:py-6 border-b border-slate-100 flex items-center justify-between md:block">
        <div>
          <div className="text-indigo-600 text-xl font-bold" style={{fontFamily:'DM Serif Display,serif'}}>
            LabFlow
          </div>
          <div className="hidden md:block text-[10px] text-slate-400 tracking-widest uppercase mt-1 font-semibold">
            Teacher Portal
          </div>
        </div>
        
        {/* Mobile Logout (Hidden on md+) */}
        <div className="md:hidden">
          <Button onClick={logout} size="sm" variant="ghost" className="text-slate-500">
            <LogOut size={18}/>
          </Button>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-3 flex md:flex-col overflow-x-auto md:overflow-y-auto space-x-2 md:space-x-0 md:space-y-0.5 hide-scrollbar flex-shrink-0">
        {navItems.map((item) => {
          const isActive = path === item.href;
          const Icon = item.icon;
          return (
            <div key={item.href} className="flex-shrink-0 md:w-full">
              {item.section && (
                <div className="hidden md:block text-[10px] uppercase tracking-widest text-slate-400
                               font-semibold px-3 pb-1 pt-3">
                  {item.section}
                </div>
              )}
              <Link href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px]
                               font-medium transition-all border
                               ${isActive
                                 ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                 : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
                               }`}>
                <Icon size={15} className="flex-shrink-0"/>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-red-400 flex-shrink-0"/>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Desktop Footer (Hidden on mobile) */}
      <div className="px-4 pb-6 mt-auto hidden md:block">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {user?.name?.substring(0, 2).toUpperCase() || 'U'}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-slate-800 font-semibold text-sm truncate">
              {user?.name || 'Teacher'}
            </div>
          </div>

          <Button onClick={logout} size="sm"
                  className="bg-transparent border border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-slate-600 h-8">
            <LogOut size={14}/>
          </Button>
        </div>
      </div>
    </aside>
  );
}