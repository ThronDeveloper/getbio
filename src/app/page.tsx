"use client";

import { useState, useEffect } from "react";
import { getProfileData, type ProfileData } from "@/lib/data";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const [data, setData] = useState<ProfileData | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        getProfileData().then(setData);

        const handleUpdate = () => {
            getProfileData().then(setData);
        };

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "thron_profile_data") {
                getProfileData().then(setData);
            }
        };

        window.addEventListener("profileDataUpdated", handleUpdate);
        window.addEventListener("storage", handleStorageChange);
        
        return () => {
            window.removeEventListener("profileDataUpdated", handleUpdate);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    if (!data) return null;

    const socials = [
        {
            label: "Instagram",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
            ),
        },
        {
            label: "YouTube",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
            ),
        },
        {
            label: "Twitter / X",
            svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            label: "Facebook",
            svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            ),
        },
        {
            label: "TikTok",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
            ),
        },
        {
            label: "LinkedIn",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            ),
        },
        {
            label: "GitHub",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
            ),
        },
        {
            label: "Discord",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <path d="M7.5 7.5c3.5-1 5.5-1 9 0" />
                    <path d="M7 16.5c3.5 1 6.5 1 10 0" />
                    <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5" />
                    <path d="M8.5 17c0 1-1.5 3-2 3-1.5 0-2.833-1.667-3.5-3-.667-1.667-.5-5.833 1.5-11.5C5.957 4.485 7.5 4.16 9 4l1 2.5" />
                </svg>
            ),
        },
        {
            label: "Spotify",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 15c2.5-1 5.5-1 8 0" />
                    <path d="M7 12c3-1 7-1 10 0" />
                    <path d="M6 9c3.5-1.5 7.5-1.5 12 0" />
                </svg>
            ),
        },
        {
            label: "Twitch",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
                </svg>
            ),
        },
        {
            label: "Snapchat",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M12 22s7-3 7-9c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 6 7 9 7 9z" />
                    <circle cx="12" cy="10" r="2" />
                </svg>
            ),
        },
        {
            label: "Telegram",
            svg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
            ),
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <div
            className="profile-root"
            style={{
                minHeight: "100vh",
                background: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "3rem 1rem",
                fontFamily: "var(--font-geist-sans), sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Main Content */}
            <motion.div
                className="profile-inner"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "420px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Avatar */}
                <motion.div variants={itemVariants} style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "#000000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}
                    >
                        {data.avatarUrl ? (
                            <img src={data.avatarUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Avatar" />
                        ) : (
                            <svg viewBox="0 0 80 80" style={{ width: "100%", height: "100%" }}>
                                <rect width="80" height="80" fill="#111111" />
                                <circle cx="40" cy="32" r="16" fill="#333333" />
                                <ellipse cx="40" cy="72" rx="24" ry="18" fill="#333333" />
                            </svg>
                        )}
                    </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                    className="profile-name"
                    variants={itemVariants}
                    style={{
                        textAlign: "center",
                        color: "#ffffff",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        margin: "0 0 0.25rem",
                    }}
                >
                    {data.name}
                </motion.h1>

                {/* Badge */}
                {data.badge && (
                    <motion.div variants={itemVariants} style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                        <span
                            style={{
                                color: "#71717a",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                            }}
                        >
                            {data.badge}
                        </span>
                    </motion.div>
                )}

                {/* Bio */}
                {data.bio && (
                    <motion.p
                        variants={itemVariants}
                        style={{
                            textAlign: "center",
                            color: "#a1a1aa",
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                            margin: "0 0 2.5rem",
                            whiteSpace: "pre-line",
                            maxWidth: "90%"
                        }}
                    >
                        {data.bio}
                    </motion.p>
                )}

                {/* Links */}
                <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                    {data.links.filter(l => l.isActive !== false).map((link, i) => (
                        <motion.a
                            key={link.id}
                            href={link.href}
                            className="profile-link"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.75rem",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                background: "transparent",
                                color: hovered === i ? "#ffffff" : "#a1a1aa",
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                textDecoration: "none",
                                transition: "color 0.3s ease, background 0.3s ease",
                                cursor: "pointer",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Social icons */}
                <motion.div className="profile-socials" variants={itemVariants} style={{ display: "flex", justifyContent: "center", gap: "1.75rem", flexWrap: "wrap", marginTop: "3rem" }}>
                    {data.socials.filter(s => s.isActive && s.username).map((social) => {
                        const platform = ((window as unknown as Record<string, unknown>).SOCIAL_PLATFORMS as Array<Record<string, unknown>>)?.find((p: Record<string, unknown>) => p.id === social.platform) || 
                                       { instagram: "https://instagram.com/", youtube: "https://youtube.com/@", twitter: "https://x.com/", facebook: "https://facebook.com/", tiktok: "https://tiktok.com/@", discord: "https://discord.gg/", github: "https://github.com/", linkedin: "https://linkedin.com/in/", spotify: "https://open.spotify.com/user/", twitch: "https://twitch.tv/", snapchat: "https://snapchat.com/add/", telegram: "https://t.me/" }[social.platform as string];
                        
                        const baseUrl = typeof platform === 'string' ? platform : (platform as Record<string, unknown>).baseUrl;
                        const icon = socials.find(s => s.label.toLowerCase().includes(social.platform) || (social.platform === 'twitter' && s.label.includes('X')))?.svg;
                        
                        if (!icon) return null;

                        return (
                            <motion.a
                                key={social.platform}
                                href={`${baseUrl}${social.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.platform}
                                className="profile-social-icon"
                                whileHover={{ y: -2 }}
                                style={{
                                    color: "#52525b",
                                    display: "flex",
                                    background: "transparent",
                                    transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = "#52525b";
                                }}
                            >
                                {icon}
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="profile-footer"
                    variants={itemVariants}
                    style={{
                        textAlign: "center",
                        color: "#3f3f46",
                        fontSize: "0.7rem",
                        marginTop: "2.5rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fontWeight: 500
                    }}
                >
                    Powered by Svetra
                </motion.p>
            </motion.div>

            <style>{`
                * { box-sizing: border-box; }
                body { margin: 0; }

                /* ── Mobile optimisation ── */
                @media (max-width: 640px) {
                    .profile-root {
                        padding: 2.5rem 1.25rem !important;
                        min-height: 100svh !important;
                        align-items: center !important;
                        justify-content: center !important;
                        padding-top: env(safe-area-inset-top, 2.5rem) !important;
                        padding-bottom: env(safe-area-inset-bottom, 2.5rem) !important;
                    }
                    .profile-inner {
                        max-width: 100% !important;
                        padding: 0 !important;
                    }
                    .profile-name {
                        font-size: 1.15rem !important;
                    }
                    .profile-link {
                        padding: 14px 12px !important;
                        font-size: 0.9rem !important;
                        border-radius: 10px !important;
                        /* Give a subtle tap target border on mobile */
                        border: 1px solid rgba(255,255,255,0.07) !important;
                    }
                    .profile-link:active {
                        background: rgba(255,255,255,0.05) !important;
                        color: #ffffff !important;
                    }
                    .profile-socials {
                        gap: 2rem !important;
                        margin-top: 2.5rem !important;
                    }
                    .profile-social-icon {
                        padding: 6px !important;
                    }
                    .profile-footer {
                        margin-top: 2rem !important;
                    }
                }
            `}</style>
        </div>
    );
}