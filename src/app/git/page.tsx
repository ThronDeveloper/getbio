import { getProfileData, type ProfileData, type GitRepo } from "@/lib/data";
import GitClient from "./git-client";

export const dynamic = 'force-dynamic';

export default async function GitPage() {
    const data = await getProfileData();
    return <GitClient data={data} />;
}
