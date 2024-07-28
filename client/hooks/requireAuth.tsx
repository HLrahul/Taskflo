"use client";

import { useEffect, useState, useRef } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import LoadingScreen from "@/components/loading-screen";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();

  const hasCheckedAuth = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/check-auth`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "You are authenticated",
        });

        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkAuth();
    }
  });

  if (isAuthenticated === false) {
    toast({
      title: "Unauthorized",
      description: "You need to login to access your dashboard",
    });
    router.push("/login");
  }

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default RequireAuth;
