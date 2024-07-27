"use client"

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <section className="h-[100vh] w-full flex items-center justify-center">
      <span className="inline-block w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></span>
    </section>
  );
}
