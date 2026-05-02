import { getProfileData, type ProfileData, type GitRepo } from "@/lib/data";
import GitClient from "./git-client";

export default async function GitPage() {
    const data = await getProfileData();
    return <GitClient data={data} />;
}
