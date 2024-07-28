"use client";

import LoadingScreen from "@/components/loading-screen";
import useAuthCheck from "@/hooks/useCheckAuth";

export default function Home() {
  const isLoading = useAuthCheck();
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
}
