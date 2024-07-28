import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function useAuthCheck() {
  const router = useRouter();
  const hasCheckedAuth = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/check-auth`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          router.push("/dashboard");
        }
      } catch (error) {
        try {
          const refreshResponse = await axios.get("/api/refresh", {
            withCredentials: true,
          });

          if (refreshResponse.status === 200) {
            router.push("/dashboard");
          } else {
            router.push("/login");
          }
        } catch (refreshError) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkAuth();
    }
  }, [router]);

  return isLoading;
}
