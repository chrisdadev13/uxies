import Image from "next/image";
import { createPost } from "~/app/actions";
import { Button } from "~/ui/button";
import { getServerSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";
// import { ClientPostForm } from "./client-form";

export default async function Home() {
  const session = await getServerSession();
  const latestPost = session?.user
    ? await api.post.currentUserLatest.query()
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
    </main>
  );
}
