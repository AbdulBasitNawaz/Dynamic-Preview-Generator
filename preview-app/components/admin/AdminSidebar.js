'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/leads', label: 'Leads', icon: '☰' },
  { href: '/admin/leads/new', label: 'Add Lead', icon: '+' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-[#0f0f0f] border-r border-white/5 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#f36100] flex items-center justify-center text-white font-black text-sm">P</div>
          <span className="text-white font-bold text-sm tracking-wide">PitchDeck</span>
        </div>
        <p className="text-white/30 text-xs mt-0.5 ml-9">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href) && item.href !== '/admin';
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#f36100]/15 text-[#f36100]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5">
        <p className="text-white/20 text-xs">Dynamic Preview Gen</p>
        <p className="text-white/15 text-xs">v1.0.0</p>
      </div>
    </aside>
  );
}
