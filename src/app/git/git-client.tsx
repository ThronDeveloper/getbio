"use client";

import Link from "next/link";
import { type ProfileData, type GitRepo } from "@/lib/data";
import { motion } from "framer-motion";

export default function GitClient({ data }: { data: ProfileData }) {
    const activeRepos = data.gitRepos.filter(r => r.isActive !== false);
    const pinnedRepos = activeRepos.filter(r => r.isPinned);
    const unpinnedRepos = activeRepos.filter(r => !r.isPinned);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
    };

    const RepoCard = ({ repo }: { repo: GitRepo }) => (
        <motion.a
            variants={itemVariants}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
                display: "flex", flexDirection: "column", gap: "12px", padding: "20px",
                borderRadius: "16px", background: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff", textDecoration: "none", transition: "border-color 0.3s ease, background 0.3s ease", cursor: "pointer",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255, 255, 255, 0.3)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255, 255, 255, 0.02)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255, 255, 255, 0.1)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px", color: "#a1a1aa" }}>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <span style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em" }}>{repo.name}</span>
                </div>
                {repo.isPinned && (
                    <svg viewBox="0 0 24 24" fill="#a1a1aa" style={{ width: "16px", height: "16px" }}>
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                )}
            </div>
            {repo.description && <p style={{ color: "#a1a1aa", fontSize: "0.9rem", margin: 0, lineHeight: 1.5 }}>{repo.description}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "4px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                {repo.lastCommitMsg && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#71717a", fontSize: "0.8rem" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "12px", height: "12px" }}>
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                        <span style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{repo.lastCommitMsg}</span>
                    </div>
                )}
                {repo.updatedAt && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#71717a", fontSize: "0.8rem" }}>
                        <span>Updated {repo.updatedAt}</span>
                    </div>
                )}
            </div>
        </motion.a>
    );

    return (
        <div style={{ minHeight: "100vh", background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem 1.5rem", fontFamily: "var(--font-geist-sans), sans-serif", position: "relative" }}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column" }}>
                <motion.div variants={itemVariants} style={{ marginBottom: "3rem", textAlign: "center" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                    </div>
                    <h1 style={{ color: "#ffffff", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 0.5rem" }}>{data.name}&apos;s Repositories</h1>
                    <p style={{ color: "#a1a1aa", fontSize: "1rem", margin: 0 }}>Open source projects and contributions</p>
                </motion.div>

                {pinnedRepos.length > 0 && (
                    <div style={{ marginBottom: "3rem" }}>
                        <motion.h2 variants={itemVariants} style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                            <svg viewBox="0 0 24 24" fill="#ffffff" style={{ width: "16px", height: "16px" }}>
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            Pinned
                        </motion.h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {pinnedRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
                        </div>
                    </div>
                )}

                {unpinnedRepos.length > 0 && (
                    <div>
                        <motion.h2 variants={itemVariants} style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>All Repositories</motion.h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {unpinnedRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
                        </div>
                    </div>
                )}

                {activeRepos.length === 0 && (
                    <motion.div variants={itemVariants} style={{ textAlign: "center", padding: "4rem 0" }}>
                        <p style={{ color: "#52525b", fontSize: "1rem" }}>No public repositories available yet.</p>
                    </motion.div>
                )}

                <motion.div variants={itemVariants} style={{ marginTop: "4rem", textAlign: "center" }}>
                    <Link href="/" style={{ color: "#a1a1aa", textDecoration: "none", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "8px", transition: "color 0.2s" }}
                       onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                       onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px" }}>
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Profile
                    </Link>
                </motion.div>

                <motion.p variants={itemVariants} style={{ textAlign: "center", color: "#3f3f46", fontSize: "0.7rem", marginTop: "4rem", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 500 }}>
                    Powered by Svetra
                </motion.p>
            </motion.div>
            <style>{` * { box-sizing: border-box; } body { margin: 0; } `}</style>
        </div>
    );
}
