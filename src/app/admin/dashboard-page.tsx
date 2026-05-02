"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { LinkCard } from "@/components/admin/LinkCard";
import { getProfileData, saveProfileData, type ProfileData, type LinkItem } from "@/lib/data";
import { FiPlus, FiFilter, FiLayout } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({ label: "", href: "", icon: "🔗" });

  useEffect(() => {
    setData(getProfileData());
  }, []);

  const handleDelete = (id: string) => {
    if (!data) return;
    const newData = { ...data, links: data.links.filter(l => l.id !== id) };
    setData(newData);
    saveProfileData(newData);
  };

  const handleAdd = () => {
    if (!data || !newLink.label || !newLink.href) return;
    const link: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLink,
      clicks: 0,
      updatedAt: "Just now"
    };
    const newData = { ...data, links: [link, ...data.links] };
    setData(newData);
    saveProfileData(newData);
    setNewLink({ label: "", href: "", icon: "🔗" });
    setIsAdding(false);
  };

  if (!data) return null;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar />
        <main className="flex-1 ml-64 flex flex-col">
          <Navbar />
          
          <div className="p-8 max-w-5xl w-full mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Links</h1>
              <Button 
                  onClick={() => setIsAdding(true)}
                  className="bg-white text-black hover:bg-zinc-200"
              >
                  <FiPlus size={18} />
                  Create link
              </Button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-2 bg-zinc-950 border-zinc-900 text-zinc-400">
                      <FiFilter size={14} />
                      Filter
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-2 bg-zinc-950 border-zinc-900 text-zinc-400">
                      <FiLayout size={14} />
                      Display
                  </Button>
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                  Viewing {data.links.length} links
              </div>
            </div>

            {isAdding && (
              <Card className="p-6 mb-6 bg-zinc-950 border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-sm font-semibold mb-4 text-white">New Link</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input 
                          placeholder="Label (e.g. Instagram)" 
                          className="bg-black border-zinc-900 text-sm focus-visible:ring-zinc-700"
                          value={newLink.label}
                          onChange={e => setNewLink({...newLink, label: e.target.value})}
                      />
                      <Input 
                          placeholder="URL (https://...)" 
                          className="bg-black border-zinc-900 text-sm focus-visible:ring-zinc-700"
                          value={newLink.href}
                          onChange={e => setNewLink({...newLink, href: e.target.value})}
                      />
                      <div className="flex gap-2">
                          <Input 
                              placeholder="Emoji" 
                              className="bg-black border-zinc-900 text-sm w-16 text-center focus-visible:ring-zinc-700"
                              value={newLink.icon}
                              onChange={e => setNewLink({...newLink, icon: e.target.value})}
                          />
                          <Button 
                              onClick={handleAdd}
                              className="flex-1 bg-white text-black hover:bg-zinc-200"
                          >
                              Save
                          </Button>
                          <Button 
                              variant="outline"
                              onClick={() => setIsAdding(false)}
                              className="bg-transparent border-zinc-900 text-white hover:bg-zinc-900"
                          >
                              Cancel
                          </Button>
                      </div>
                  </div>
              </Card>
            )}

            <div className="space-y-3">
              {data.links.map(link => (
                <LinkCard 
                  key={link.id} 
                  link={link} 
                  onDelete={handleDelete} 
                  onEdit={() => {}} 
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="bg-zinc-950 border border-zinc-900 rounded-full px-4 py-2 flex items-center gap-4">
                  <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">Viewing 1-{data.links.length} of {data.links.length} links</span>
                  <div className="h-4 w-[1px] bg-zinc-800"></div>
                  <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-[10px] font-bold text-zinc-600 disabled:opacity-50" disabled>Previous</Button>
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-[10px] font-bold text-zinc-600 disabled:opacity-50" disabled>Next</Button>
                  </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

