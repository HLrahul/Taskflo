"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { useToast } from "@/components/ui/use-toast";

interface SessionContextProps {
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();

  const hasCheckedAuth = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRefreshToken = async () => {
      try {
        const refreshResponse = await axios.get(`/api/refresh`, {
          withCredentials: true,
        });

        if (refreshResponse.status === 200) {
          router.push("/dashboard");
        } else {
          router.push("/login");
          toast({
            title: "Tokens expired",
            description: "Please login again",
          });
        }
      } catch (refreshError) {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      handleRefreshToken();
    }
  }, [router, toast]);

  return (
    <SessionContext.Provider value={{ isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
