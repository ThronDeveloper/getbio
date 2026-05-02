"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { getProfileData, saveProfileData, type ProfileData } from "@/lib/data";
import { FiSave, FiUser, FiCamera, FiCheckCircle, FiFileText } from "react-icons/fi";
import { User, Camera, BadgeCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { AuthWrapper } from "@/components/auth/AuthWrapper";

export default function AdminSettings() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfileData();
      setData(profileData);
    };
    fetchData();
  }, []);

  const handleSave = () => {
    if (!data) return;
    setLoading(true);
    saveProfileData(data);
    setTimeout(() => setLoading(false), 500);
  };

  if (!data) return null;

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar />
        <main className="flex-1 ml-64 flex flex-col">
          <Navbar />
          
          <div className="p-8 max-w-2xl w-full mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <Button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-white text-black hover:bg-zinc-200 px-6"
              >
                  <FiSave size={18} />
                  {loading ? "Saving..." : "Save changes"}
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-zinc-950 border-zinc-900">
                  <h3 className="text-sm font-semibold mb-6 flex items-center gap-2 text-white">
                      <FiUser size={16} className="text-zinc-500" />
                      Profile Information
                  </h3>
                  
                  <div className="space-y-4">
                      <div className="flex items-center gap-6 mb-8">
                          <div className="relative group">
                              <div className="w-20 h-20 rounded-full bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
                                  {data.avatarUrl ? (
                                      <img src={data.avatarUrl} alt="Profile picture" className="w-full h-full object-cover" />
                                  ) : (
                                      <User size={32} className="text-zinc-700" />
                                  )}
                              </div>
                              <Button variant="ghost" size="icon" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-full h-full">
                                  <Camera size={18} />
                              </Button>
                          </div>
                          <div>
                              <h4 className="text-sm font-medium mb-1 text-white">Profile Picture</h4>
                              <p className="text-xs text-zinc-500">JPG, PNG or GIF. Max size 2MB.</p>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-2">
                              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Display Name</Label>
                              <Input 
                                  className="bg-black border-zinc-900 text-sm focus-visible:ring-zinc-700"
                                  value={data.name}
                                  onChange={e => setData({...data, name: e.target.value})}
                              />
                          </div>
                          
                          <div className="space-y-2">
                              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Badge / Category</Label>
                              <div className="relative">
                                  <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                                  <Input 
                                      className="bg-black border-zinc-900 pl-10 text-sm focus-visible:ring-zinc-700"
                                      value={data.badge}
                                      onChange={e => setData({...data, badge: e.target.value})}
                                  />
                              </div>
                          </div>

                          <div className="space-y-2">
                              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Bio</Label>
                              <div className="relative">
                                  <FileText className="absolute left-3 top-3 text-zinc-600" size={14} />
                                  <textarea 
                                      rows={4}
                                      className="flex min-h-[80px] w-full rounded-md border border-zinc-900 bg-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 resize-none"
                                      value={data.bio}
                                      onChange={e => setData({...data, bio: e.target.value})}
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthWrapper>
  );
}


