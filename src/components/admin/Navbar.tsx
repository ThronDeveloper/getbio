"use client";

import { FiUser } from "react-icons/fi";

export function Navbar() {
  return (
    <div className="h-16 bg-black flex items-center justify-end px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden cursor-pointer">
            <FiUser size={18} className="text-zinc-400" />
        </div>
      </div>
    </div>
  );
}

