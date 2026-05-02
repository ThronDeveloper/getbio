"use client";

import { FiMousePointer } from "react-icons/fi";
import { ExternalLink, Edit2, Trash2 } from "lucide-react";
import type { LinkItem } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LinkCardProps {
  link: LinkItem;
  onDelete: (id: string) => void;
  onEdit: (link: LinkItem) => void;
}

export function LinkCard({ link, onDelete, onEdit }: LinkCardProps) {
  return (
    <Card className="bg-zinc-950 border-zinc-900 p-4 flex items-center justify-between group hover:border-zinc-800 transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">
          {link.icon || "🔗"}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">{link.label}</h3>
            <span className="text-[10px] text-zinc-500 font-mono">/</span>
            <span className="text-[10px] text-zinc-500 font-medium bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                {link.id}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <a href={link.href} target="_blank" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
                {link.href.replace("https://", "").replace("http://", "")}
                <ExternalLink size={10} />
            </a>
            <span className="text-zinc-700 text-xs">•</span>
            <span className="text-xs text-zinc-600">{link.updatedAt || "Just now"}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-zinc-500">
            <FiMousePointer size={14} />
            <span className="text-xs font-medium">{link.clicks || 0} clicks</span>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
                variant="ghost"
                size="icon"
                onClick={() => onEdit(link)}
                className="text-zinc-500 hover:text-white hover:bg-zinc-900"
            >
                <Edit2 size={16} />
            </Button>
            <Button 
                variant="ghost"
                size="icon"
                onClick={() => onDelete(link.id)}
                className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
            >
                <Trash2 size={16} />
            </Button>
        </div>
      </div>
    </Card>
  );
}

