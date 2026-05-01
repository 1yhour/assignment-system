'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, PlusCircle, FlaskConical,
  Inbox, BarChart2,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
const navItems = [
  { label: 'Dashboard',        href: '/teacher',             icon: LayoutDashboard, section: 'Overview' },
  { label: 'Create Assignment',href: '/teacher/create',      icon: PlusCircle,      section: 'Labs' },
  { label: 'My Assignments',   href: '/teacher/assignments', icon: FlaskConical,    section: null },
  { label: 'Submissions',      href: '/teacher/submissions', icon: Inbox,           section: 'Students', badge: true },
  { label: 'Grades',           href: '/teacher/grades',      icon: BarChart2,       section: null },
];

export default function TeacherSidebar() {
  const path = usePathname();
  const router = useRouter();
  return (
    <aside className="w-[230px] flex-shrink-0 bg-[#141720] border-r border-[#272c3a]
                      flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#272c3a]">
        <div className="text-[#f0b429] text-xl" style={{fontFamily:'DM Serif Display,serif'}}>
          LabFlow
        </div>
        <div className="text-[10px] text-[#7a80a0] tracking-widest uppercase mt-1 font-semibold">
          Teacher Portal
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          const isActive = path === item.href;
          const Icon = item.icon;
          return (
            <div key={item.href}>
              {item.section && (
                <div className="text-[10px] uppercase tracking-widest text-[#7a80a0]
                               font-semibold px-3 pb-1 pt-3">
                  {item.section}
                </div>
              )}
              <Link href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px]
                               font-medium transition-all border
                               ${isActive
                                 ? 'bg-[#f0b42914] text-[#f0b429] border-[#f0b42926]'
                                 : 'text-[#7a80a0] border-transparent hover:bg-[#1c2030] hover:text-white'
                               }`}>
                <Icon size={15} className="flex-shrink-0"/>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#f06060] flex-shrink-0"/>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='px-4 pb-6'>
        <div className='flex items-center gap-3 p-3 rounded-xl bg-[#1a1f2c] border border-[#2d3445]'>
          <div className='bg-[#f0b429] rounded-full w-8 h-8 flex items-center justify-center'>
            <span className='text-[#141720] font-bold text-xs'>LY</span>
          </div>

          <div className='flex-1 min-w-0'>
            <div className='text-white font-semibold text-sm truncate'>Lyhour</div>
          </div>

          <Button  onClick={() => router.push('/login')} size="sm" className='bg-transparent border border-[#3d4561] hover:bg-[#2d3445] text-[#7a80a0] hover:text-white h-8'>
            <LogOut size={14}/>
          </Button>
        </div>
      </div>
    </aside>
  );
}