// api.ts
import type { GitHubUser } from "@/app/type/types";

// api.ts
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user data");
  }
  return response.json();
}
