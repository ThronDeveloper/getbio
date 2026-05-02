"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    
    const result = await login(formData);
    if (result.success) {
      router.push("/admin/bio");
    } else {
      setError(result.error || "Bilinmeyen bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
      <div className="w-full max-w-[400px] bg-black border border-white/5 rounded-[24px] p-10 space-y-8" style={{ backdropFilter: "blur(20px)" }}>
        <div className="text-center space-y-5">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-black rounded-full border border-white/10 flex items-center justify-center">
                <FiLock className="text-white" size={24} />
            </div>
          </div>
          <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight" style={{ letterSpacing: "-0.04em" }}>GetBio Admin</h1>
              <p className="text-zinc-500 text-[13px] font-medium">Panele erişmek için giriş yapın.</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider">Kullanıcı Adı</label>
            <input 
              className="w-full h-12 bg-black border border-white/5 rounded-xl px-4 text-white text-[14px] font-medium focus:outline-none focus:border-white/30 transition-colors"
              placeholder="admin" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider">Şifre</label>
            <input 
              type="password"
              className="w-full h-12 bg-black border border-white/5 rounded-xl px-4 text-white text-[14px] font-medium focus:outline-none focus:border-white/30 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-[13px] text-red-500 font-medium text-center">{error}</p>}
          <button type="submit" className="w-full h-12 bg-white text-black rounded-xl font-bold text-[14px] hover:scale-[1.02] active:scale-[0.98] transition-transform mt-2" style={{ marginTop: "32px" }}>
            Giriş Yap
          </button>
        </form>

        <div className="flex justify-center pt-8 border-t border-white/5">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Powered by Svetra</p>
        </div>
      </div>
    </div>
  );
}
