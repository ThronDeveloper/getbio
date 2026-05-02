"use client";

import { useState, useEffect } from "react";
import { getProfileData, saveProfileData, type ProfileData, type GitRepo } from "@/lib/data";
import { FiPlus, FiMoreVertical, FiGithub, FiStar, FiActivity } from "react-icons/fi";
import { Sidebar } from "@/components/admin/Sidebar";
import "../admin-styles.css";

export default function AdminGitPage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  
  const [newRepo, setNewRepo] = useState({ name: "", description: "", url: "", lastCommitMsg: "", updatedAt: "" });
  const [editRepo, setEditRepo] = useState({ name: "", description: "", url: "", lastCommitMsg: "", updatedAt: "" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    getProfileData().then(fresh => setData(fresh));
  }, []);

  const handleAdd = () => {
    if (!data || !newRepo.name || !newRepo.url) return;
    const repo: GitRepo = {
      id: Math.random().toString(36).substr(2, 9),
      ...newRepo,
      isPinned: false,
      isActive: true
    };
    const newData = { ...data, gitRepos: [repo, ...data.gitRepos] };
    setData(newData);
    setHasUnsavedChanges(true);
    setNewRepo({ name: "", description: "", url: "", lastCommitMsg: "", updatedAt: "" });
    setIsAdding(false);
  };

  const handleUpdate = () => {
    if (!data || !editingId) return;
    const newData = {
      ...data,
      gitRepos: data.gitRepos.map(r => r.id === editingId ? { ...r, ...editRepo } : r)
    };
    setData(newData);
    setHasUnsavedChanges(true);
    setEditingId(null);
  };

  const handleToggleActive = (id: string) => {
    if (!data) return;
    const newData = {
      ...data,
      gitRepos: data.gitRepos.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r)
    };
    setData(newData);
    setHasUnsavedChanges(true);
  };

  const handleTogglePin = (id: string) => {
    if (!data) return;
    const newData = {
      ...data,
      gitRepos: data.gitRepos.map(r => r.id === id ? { ...r, isPinned: !r.isPinned } : r)
    };
    setData(newData);
    setHasUnsavedChanges(true);
  };

  const handleDeleteOne = (id: string) => {
    if (!data) return;
    if (!confirm("Are you sure you want to delete this repository?")) return;
    const newData = { ...data, gitRepos: data.gitRepos.filter(r => r.id !== id) };
    setData(newData);
    setHasUnsavedChanges(true);
    setMenuId(null);
  };

  if (!data) return null;

  return (
    <>
      <div className="general">
        <Sidebar />

        <main className="main-content">
          <button className="add-link-btn" onClick={() => setIsAdding(true)}>
            <FiPlus size={20} />
            Add Repository
          </button>

          <header>
            <h1 className="settings-title">GitHub Integrations</h1>
          </header>

          <section className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}></th>
                  <th style={{ width: "50px" }}>Pin</th>
                  <th>Repository Details</th>
                  <th>Status</th>
                  <th style={{ width: "50px" }}></th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <td colSpan={5} style={{ padding: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <input 
                            className="flex h-10 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                            placeholder="Repository Name (e.g. thron/core)"
                            value={newRepo.name}
                            onChange={e => setNewRepo({...newRepo, name: e.target.value})}
                            />
                            <input 
                            className="flex h-10 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                            placeholder="https://github.com/..."
                            value={newRepo.url}
                            onChange={e => setNewRepo({...newRepo, url: e.target.value})}
                            />
                        </div>
                        <input 
                            className="flex h-10 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                            placeholder="Description"
                            value={newRepo.description}
                            onChange={e => setNewRepo({...newRepo, description: e.target.value})}
                        />
                        <div style={{ display: "flex", gap: "12px" }}>
                            <input 
                                className="flex h-10 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                                placeholder="Last Commit Message"
                                value={newRepo.lastCommitMsg}
                                onChange={e => setNewRepo({...newRepo, lastCommitMsg: e.target.value})}
                            />
                            <input 
                                className="flex h-10 w-[200px] rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                                placeholder="Updated (e.g. 2h ago)"
                                value={newRepo.updatedAt}
                                onChange={e => setNewRepo({...newRepo, updatedAt: e.target.value})}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                            <button 
                                onClick={handleAdd}
                                className="bg-white text-black px-6 py-2 rounded-md font-bold text-sm"
                            >Save</button>
                            <button 
                                onClick={() => setIsAdding(false)}
                                className="text-zinc-500 text-sm px-4"
                            >Cancel</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {data.gitRepos.map((repo) => (
                  <tr 
                    key={repo.id} 
                    className={selectedIds.includes(repo.id) ? "selected" : ""}
                    style={{ cursor: "default" }}
                  >
                    <td onClick={() => handleToggleActive(repo.id)} style={{ cursor: "pointer" }}>
                      <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${repo.isActive !== false ? "bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-zinc-700 hover:border-zinc-500"}`}>
                        {repo.isActive !== false && <div className="w-2 h-2 bg-black rounded-sm" />}
                      </div>
                    </td>

                    <td onClick={() => handleTogglePin(repo.id)} style={{ cursor: "pointer", textAlign: "center" }}>
                        <FiStar size={18} fill={repo.isPinned ? "#fbbf24" : "transparent"} color={repo.isPinned ? "#fbbf24" : "#52525b"} />
                    </td>
                    
                    {editingId === repo.id ? (
                      <td colSpan={2} style={{ padding: "12px" }}>
                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                             <div style={{ display: "flex", gap: "8px" }}>
                                <input 
                                className="flex h-9 w-full rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white focus:border-zinc-500 outline-none"
                                value={editRepo.name}
                                onChange={e => setEditRepo({...editRepo, name: e.target.value})}
                                />
                                <input 
                                className="flex h-9 w-full rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white focus:border-zinc-500 outline-none"
                                value={editRepo.url}
                                onChange={e => setEditRepo({...editRepo, url: e.target.value})}
                                />
                            </div>
                            <input 
                                className="flex h-9 w-full rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white focus:border-zinc-500 outline-none"
                                value={editRepo.description}
                                onChange={e => setEditRepo({...editRepo, description: e.target.value})}
                            />
                            <div style={{ display: "flex", gap: "8px" }}>
                                <input 
                                    className="flex h-9 w-full rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white focus:border-zinc-500 outline-none"
                                    value={editRepo.lastCommitMsg}
                                    onChange={e => setEditRepo({...editRepo, lastCommitMsg: e.target.value})}
                                />
                                <input 
                                    className="flex h-9 w-[150px] rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white focus:border-zinc-500 outline-none"
                                    value={editRepo.updatedAt}
                                    onChange={e => setEditRepo({...editRepo, updatedAt: e.target.value})}
                                />
                                <button onClick={handleUpdate} className="bg-white text-black px-4 rounded-md font-bold text-xs hover:bg-zinc-200 transition-colors">Update</button>
                                <button onClick={() => setEditingId(null)} className="text-zinc-500 text-xs px-2">Cancel</button>
                            </div>
                          </div>
                      </td>
                    ) : (
                      <>
                        <td style={{ opacity: repo.isActive !== false ? 1 : 0.4 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{ fontWeight: 700, fontSize: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <FiGithub size={14} /> {repo.name}
                                </span>
                                <span style={{ fontSize: "12px", color: "#a1a1aa" }}>{repo.description}</span>
                                <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
                                    <span style={{ fontSize: "11px", color: "#71717a", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <FiActivity size={12} /> {repo.lastCommitMsg}
                                    </span>
                                    <span style={{ fontSize: "11px", color: "#71717a" }}>Updated: {repo.updatedAt}</span>
                                </div>
                            </div>
                        </td>
                        <td style={{ 
                            color: repo.isActive !== false ? "#10b981" : "#71717a", 
                            fontSize: "12px", 
                            fontWeight: 600,
                            opacity: repo.isActive !== false ? 1 : 0.6
                        }}>
                            {repo.isActive !== false ? "Active" : "Deactive"}
                        </td>
                      </>
                    )}

                    <td style={{ textAlign: "right", position: "relative" }}>
                      <button 
                        className="p-2 text-zinc-700 hover:text-white transition-colors"
                        onClick={() => setMenuId(menuId === repo.id ? null : repo.id)}
                      >
                        <FiMoreVertical size={16} />
                      </button>

                      {menuId === repo.id && (
                        <div className="action-menu">
                          <button 
                            className="menu-item"
                            onClick={() => {
                              setEditingId(repo.id);
                              setEditRepo({ name: repo.name, description: repo.description, url: repo.url, lastCommitMsg: repo.lastCommitMsg, updatedAt: repo.updatedAt });
                              setMenuId(null);
                            }}
                          >
                            <FiPlus size={14} className="rotate-45" />
                            Edit Repo
                          </button>
                          <div className="h-[1px] bg-white/5 my-1 mx-2" />
                          <button 
                            className="menu-item delete"
                            onClick={() => handleDeleteOne(repo.id)}
                          >
                            <FiPlus size={14} className="rotate-45" />
                            Delete Repo
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
