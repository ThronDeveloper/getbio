"use client";

import { useState, useEffect } from "react";
import { getProfileData, saveProfileData, type ProfileData, type LinkItem, type SocialLink, SOCIAL_PLATFORMS } from "@/lib/data";
import { FiPlus, FiMoreVertical, FiHome, FiGlobe, FiUsers, FiCreditCard, FiExternalLink, FiUser, FiInstagram, FiYoutube, FiGithub, FiLinkedin, FiMusic, FiMessageCircle, FiSend, FiTwitch, FiDisc, FiSmile, FiCamera } from "react-icons/fi";
import { Sidebar } from "@/components/admin/Sidebar";
import "../admin-styles.css";

const PLATFORM_ICONS: Record<string, any> = {
    instagram: FiInstagram,
    youtube: FiYoutube,
    twitter: FiGlobe, // Use Globe for X/Twitter fallback
    facebook: FiGlobe, // Use Globe for Facebook fallback
    tiktok: FiMusic,
    discord: FiDisc,
    github: FiGithub,
    linkedin: FiLinkedin,
    spotify: FiMusic,
    twitch: FiTwitch,
    snapchat: FiSmile,
    telegram: FiSend
};

export default function AdminPage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState({ label: "", href: "", icon: "🔗" });
  const [editLink, setEditLink] = useState({ label: "", href: "", icon: "🔗" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    getProfileData().then(fresh => setData(fresh));
  }, []);

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
    setHasUnsavedChanges(true);
    setNewLink({ label: "", href: "", icon: "🔗" });
    setIsAdding(false);
  };

  const handleUpdate = () => {
    if (!data || !editingId) return;
    const newData = {
      ...data,
      links: data.links.map(l => l.id === editingId ? { ...l, ...editLink } : l)
    };
    setData(newData);
    setHasUnsavedChanges(true);
    setEditingId(null);
  };

  const handleSocialUpdate = (platformId: string, username: string) => {
    if (!data) return;
    const newData = {
      ...data,
      socials: data.socials.map(s => s.platform === platformId ? { ...s, username } : s)
    };
    setData(newData);
    setHasUnsavedChanges(true);
  };

  const handleToggleSocial = (platformId: string) => {
    if (!data) return;
    const newData = {
      ...data,
      socials: data.socials.map(s => s.platform === platformId ? { ...s, isActive: !s.isActive } : s)
    };
    setData(newData);
    setHasUnsavedChanges(true);
  };

  const handleToggleActive = (id: string) => {
    if (!data) return;
    const newData = {
      ...data,
      links: data.links.map(l => l.id === id ? { ...l, isActive: l.isActive === undefined ? false : !l.isActive } : l)
    };
    setData(newData);
    setHasUnsavedChanges(true);
  };

  const handleDeleteOne = (id: string) => {
    if (!data) return;
    if (!confirm("Bu linki silmek istediğinize emin misiniz?")) return;
    const newData = { ...data, links: data.links.filter(l => l.id !== id) };
    setData(newData);
    setHasUnsavedChanges(true);
    setMenuId(null);
  };

  if (!data) return null;

  return (
    <>
      <div className="general">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="main-content">
          <button className="add-link-btn" onClick={() => setIsAdding(true)}>
            <FiPlus size={20} />
            Add Link
          </button>

          <header>
            <h1 className="settings-title">Settings</h1>
          </header>

          <section className="profile-section" style={{ 
              marginBottom: "48px", 
              padding: "48px", 
              backgroundColor: "#000000", 
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "24px"
          }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "white", marginBottom: "32px", letterSpacing: "-0.04em" }}>Profile</h2>
            
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" }}>
                {/* Avatar upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
                    <div style={{ 
                        width: "120px", height: "120px", borderRadius: "50%", 
                        backgroundColor: "#000000", border: "2px solid #27272a", 
                        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative"
                    }}>
                        {data.avatarUrl ? (
                            <img src={data.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            <FiUser size={40} color="#52525b" />
                        )}
                        <label style={{
                            position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", 
                            display: "flex", alignItems: "center", justifyContent: "center",
                            opacity: 0, cursor: "pointer", transition: "opacity 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
                        >
                            <FiCamera size={24} color="white" />
                            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        const newData = { ...data, avatarUrl: reader.result as string };
                                        setData(newData);
                                        setHasUnsavedChanges(true);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} />
                        </label>
                    </div>
                    <span style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 500 }}>Click image to change</span>
                </div>

                {/* Text fields */}
                <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Display Name</label>
                        <input 
                            style={{ width: "100%", backgroundColor: "black", border: "1px solid #27272a", borderRadius: "8px", padding: "12px 16px", color: "white", fontSize: "14px", fontWeight: 500, outline: "none" }}
                            value={data.name}
                            onChange={(e) => {
                                const newData = { ...data, name: e.target.value };
                                setData(newData);
                                setHasUnsavedChanges(true);
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "white"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#27272a"}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Badge / Category</label>
                        <input 
                            style={{ width: "100%", backgroundColor: "black", border: "1px solid #27272a", borderRadius: "8px", padding: "12px 16px", color: "white", fontSize: "14px", fontWeight: 500, outline: "none" }}
                            value={data.badge}
                            onChange={(e) => {
                                const newData = { ...data, badge: e.target.value };
                                setData(newData);
                                setHasUnsavedChanges(true);
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "white"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#27272a"}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Bio</label>
                        <textarea 
                            style={{ width: "100%", backgroundColor: "black", border: "1px solid #27272a", borderRadius: "8px", padding: "12px 16px", color: "white", fontSize: "14px", fontWeight: 500, minHeight: "100px", resize: "vertical", fontFamily: "inherit", outline: "none" }}
                            value={data.bio}
                            onChange={(e) => {
                                const newData = { ...data, bio: e.target.value };
                                setData(newData);
                                setHasUnsavedChanges(true);
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "white"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#27272a"}
                        />
                    </div>
                </div>
            </div>
          </section>

          <section className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}></th>
                  <th>Link Name</th>
                  <th>Status</th>
                  <th>URL</th>
                  <th style={{ textAlign: "right" }}>Date</th>
                  <th style={{ width: "50px" }}></th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <td colSpan={6} style={{ padding: "20px" }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <input 
                          className="flex h-10 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                          placeholder="Link Name"
                          value={newLink.label}
                          onChange={e => setNewLink({...newLink, label: e.target.value})}
                        />
                        <input 
                          className="flex h-10 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                          placeholder="https://..."
                          value={newLink.href}
                          onChange={e => setNewLink({...newLink, href: e.target.value})}
                        />
                        <button 
                          onClick={handleAdd}
                          className="bg-white text-black px-6 rounded-md font-bold text-sm"
                        >Save</button>
                        <button 
                          onClick={() => setIsAdding(false)}
                          className="text-zinc-500 text-sm px-4"
                        >Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
                {data.links.map((link) => (
                  <tr 
                    key={link.id} 
                    className={selectedIds.includes(link.id) ? "selected" : ""}
                    style={{ cursor: "default" }}
                  >
                    <td onClick={() => handleToggleActive(link.id)} style={{ cursor: "pointer" }}>
                      <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${link.isActive !== false ? "bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-zinc-700 hover:border-zinc-500"}`}>
                        {link.isActive !== false && <div className="w-2 h-2 bg-black rounded-sm" />}
                      </div>
                    </td>
                    
                    {editingId === link.id ? (
                      <td colSpan={3} style={{ padding: "12px" }}>
                         <div style={{ display: "flex", gap: "8px" }}>
                            <input 
                              className="flex h-9 w-full rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white focus:border-zinc-500 outline-none"
                              value={editLink.label}
                              onChange={e => setEditLink({...editLink, label: e.target.value})}
                            />
                            <input 
                              className="flex h-9 w-full rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white focus:border-zinc-500 outline-none"
                              value={editLink.href}
                              onChange={e => setEditLink({...editLink, href: e.target.value})}
                            />
                            <button onClick={handleUpdate} className="bg-white text-black px-4 rounded-md font-bold text-xs hover:bg-zinc-200 transition-colors">Update</button>
                            <button onClick={() => setEditingId(null)} className="text-zinc-500 text-xs px-2">Cancel</button>
                          </div>
                      </td>
                    ) : (
                      <>
                        <td style={{ fontWeight: 700, opacity: link.isActive !== false ? 1 : 0.4 }}>{link.label}</td>
                        <td style={{ 
                            color: link.isActive !== false ? "#10b981" : "#71717a", 
                            fontSize: "12px", 
                            fontWeight: 600,
                            opacity: link.isActive !== false ? 1 : 0.6
                        }}>
                            {link.isActive !== false ? "Active" : "Deactive"}
                        </td>
                        <td style={{ color: "#555", opacity: link.isActive !== false ? 1 : 0.3 }}>{link.href.replace("https://", "").replace("http://", "")}</td>
                      </>
                    )}

                    <td style={{ textAlign: "right", color: "#555", opacity: link.isActive !== false ? 1 : 0.3 }}>{link.updatedAt || "2 days ago"}</td>
                    <td style={{ textAlign: "right", position: "relative" }}>
                      <button 
                        className="p-2 text-zinc-700 hover:text-white transition-colors"
                        onClick={() => setMenuId(menuId === link.id ? null : link.id)}
                      >
                        <FiMoreVertical size={16} />
                      </button>

                      {menuId === link.id && (
                        <div className="action-menu">
                          <button 
                            className="menu-item"
                            onClick={() => {
                              setEditingId(link.id);
                              setEditLink({ label: link.label, href: link.href, icon: link.icon });
                              setMenuId(null);
                            }}
                          >
                            <FiPlus size={14} className="rotate-45" />
                            Edit Link
                          </button>
                          <div className="h-[1px] bg-white/5 my-1 mx-2" />
                          <button 
                            className="menu-item delete"
                            onClick={() => handleDeleteOne(link.id)}
                          >
                            <FiPlus size={14} className="rotate-45" />
                            Delete Link
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Social Links Section */}
          <section className="social-links-container" style={{ 
              marginTop: "48px", 
              padding: "48px", 
              backgroundColor: "#000000", 
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "24px"
          }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "white", marginBottom: "32px", letterSpacing: "-0.04em" }}>Social Accounts</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {SOCIAL_PLATFORMS.map((platform) => {
                const social = data.socials.find(s => s.platform === platform.id);
                const Icon = PLATFORM_ICONS[platform.id] || FiGlobe;
                const isActive = social?.isActive || false;

                return (
                  <div key={platform.id} style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "16px",
                      padding: "16px",
                      background: "#000000",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "16px",
                      transition: "all 0.2s"
                  }}>
                    {/* Toggle */}
                    <button 
                      onClick={() => handleToggleSocial(platform.id)}
                      style={{ 
                        width: "24px", 
                        height: "24px", 
                        borderRadius: "6px", 
                        border: "1px solid", 
                        borderColor: isActive ? "white" : "rgba(255,255,255,0.1)",
                        backgroundColor: isActive ? "white" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      {isActive && <div style={{ width: "10px", height: "10px", backgroundColor: "black", borderRadius: "2px" }} />}
                    </button>

                    {/* Icon */}
                    <div style={{ color: isActive ? "white" : "#3f3f46" }}>
                      <Icon size={20} />
                    </div>

                    {/* Input */}
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ color: "#3f3f46", fontSize: "13px", fontWeight: 500 }}>{platform.baseUrl}</span>
                      <input 
                        className="custom-input"
                        style={{ 
                            flex: 1, 
                            border: "none", 
                            background: "transparent", 
                            padding: "0", 
                            fontSize: "13px",
                            color: isActive ? "white" : "#3f3f46",
                            fontWeight: 600
                        }}
                        placeholder="username"
                        value={social?.username || ""}
                        onChange={(e) => handleSocialUpdate(platform.id, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* Floating Save Button */}
      {hasUnsavedChanges && (
        <div style={{
          position: "fixed", bottom: "40px", right: "40px", zIndex: 1000,
          display: "flex", gap: "16px", alignItems: "center",
          background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(20px)",
          padding: "16px 24px", borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          animation: "menu-pop 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          <span style={{ color: "white", fontSize: "14px", fontWeight: 600 }}>Unsaved changes</span>
          <button 
            style={{ 
              background: "white", color: "black", padding: "8px 20px", 
              borderRadius: "8px", fontWeight: 700, fontSize: "14px", 
              border: "none", cursor: "pointer", transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            onClick={async () => {
              if (data) {
                await saveProfileData(data);
                setHasUnsavedChanges(false);
              }
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </>
  );
}
