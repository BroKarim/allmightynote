
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  const NEXT_PUBLIC_GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Remove NEXT_PUBLIC_ for server-side secrets

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub user data" },
        { status: response.status },
      );
    }

    const userData = await response.json();
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
