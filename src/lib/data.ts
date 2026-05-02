export interface LinkItem {
    id: string;
    icon: string;
    label: string;
    href: string;
    clicks?: number;
    updatedAt?: string;
    isActive?: boolean;
}

export interface SocialLink {
    platform: string;
    username: string;
    isActive: boolean;
}

export interface GitRepo {
    id: string;
    name: string;
    description: string;
    url: string;
    lastCommitMsg: string;
    updatedAt: string;
    isPinned: boolean;
    isActive: boolean;
}

export interface ProfileData {
    name: string;
    badge: string;
    bio: string;
    avatarUrl: string;
    links: LinkItem[];
    socials: SocialLink[];
    gitRepos: GitRepo[];
}

export const SOCIAL_PLATFORMS = [
    { id: "instagram", label: "Instagram", baseUrl: "https://instagram.com/" },
    { id: "youtube", label: "YouTube", baseUrl: "https://youtube.com/@" },
    { id: "twitter", label: "Twitter / X", baseUrl: "https://x.com/" },
    { id: "facebook", label: "Facebook", baseUrl: "https://facebook.com/" },
    { id: "tiktok", label: "TikTok", baseUrl: "https://tiktok.com/@" },
    { id: "discord", label: "Discord", baseUrl: "https://discord.gg/" },
    { id: "github", label: "GitHub", baseUrl: "https://github.com/" },
    { id: "linkedin", label: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
    { id: "spotify", label: "Spotify", baseUrl: "https://open.spotify.com/user/" },
    { id: "twitch", label: "Twitch", baseUrl: "https://twitch.tv/" },
    { id: "snapchat", label: "Snapchat", baseUrl: "https://snapchat.com/add/" },
    { id: "telegram", label: "Telegram", baseUrl: "https://t.me/" },
];

const defaultData: ProfileData = {
    name: "Sophie Martin",
    badge: "Restaurant",
    bio: "Chef & fondatrice · Cuisine créative \navec des produits locaux 🌿",
    avatarUrl: "",
    links: [
        { id: "1", icon: "🌐", label: "Site web officiel", href: "#", clicks: 124, updatedAt: "Apr 26", isActive: true },
        { id: "2", icon: "📅", label: "Réserver une table", href: "#", clicks: 85, updatedAt: "Apr 26", isActive: true },
    ],
    socials: SOCIAL_PLATFORMS.map(p => ({ platform: p.id, username: "", isActive: false })),
    gitRepos: [],
};

import { getSupabase, supabaseUrl } from "./supabase";

export async function getProfileData(): Promise<ProfileData> {
    if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_URL_HERE") {
        console.warn("Supabase credentials not configured. Falling back to default data.");
        return defaultData;
    }

    try {
        const client = getSupabase();
        if (!client) return defaultData;

        const { data: result, error } = await client
            .from('profiles')
            .select('data')
            .eq('id', 'admin')
            .maybeSingle();
            
        if (error || !result) {
            if (error) {
                console.error("Supabase fetch error:", error.code, error.message, error.hint || "");
            } else {
                console.warn("No profile row found in Supabase. Create the 'profiles' table and insert an 'admin' row.");
            }
            return defaultData;
        }
        
        const profile = (result as { data: ProfileData }).data;
        // Ensure new fields exist
        if (!Array.isArray(profile.socials)) {
            profile.socials = defaultData.socials;
        }
        if (!Array.isArray(profile.gitRepos)) {
            profile.gitRepos = [];
        }
        return profile;
    } catch (err) {
        console.error("Unexpected error fetching profile:", err);
        return defaultData;
    }
}

export async function saveProfileData(data: ProfileData) {
    if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_URL_HERE") {
        console.warn("Supabase credentials not configured. Cannot save data.");
        return;
    }

    try {
        const client = getSupabase();
        if (!client) return;

        const { error } = await (client as any)
            .from('profiles')
            .upsert({ id: 'admin', data });
            
        if (error) {
            console.error("Supabase save error:", error.code, error.message, error.hint || "", error.details || "");
            return;
        }
        
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("profileDataUpdated"));
        }
    } catch (err) {
        console.error("Unexpected error saving profile:", err);
    }
}
