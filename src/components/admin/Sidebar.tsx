"use client";

import { FiHome, FiGlobe, FiUsers, FiCreditCard, FiExternalLink, FiUser } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: FiHome, label: "bio.getbio.cfg", href: "/admin/bio" },
  { icon: FiGlobe, label: "git.getbio.cfg", href: "/admin/git" },
  { icon: FiUsers, label: "docs.getbio.cfg", href: "#" },
  { icon: FiCreditCard, label: "discord.getbio.cfg", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] shrink-0 bg-black border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen overflow-y-auto z-50">
      <div className="flex items-center gap-3 mb-12 mt-2">
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
            <FiUser size={18} className="text-zinc-400" />
        </div>
        <span className="font-bold text-sm tracking-tight text-white">Admin</span>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link 
            key={item.label}
            href={item.href} 
            className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300",
                pathname === item.href 
                    ? "bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.1)]" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={18} />
            <span className={cn(
                "text-[13px] tracking-tight",
                pathname === item.href ? "font-bold" : "font-medium"
            )}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:text-white transition-colors">
            <FiExternalLink size={16} />
            <span className="text-[13px] font-medium">View Page</span>
        </a>
      </div>
    </aside>
  );
}
