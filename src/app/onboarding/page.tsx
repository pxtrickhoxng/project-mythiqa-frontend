"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { createUser, userExists } from "@/lib/api/users";
import { roles } from "@/lib/userRoles";

export default function OnboardingPage() {
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const { user } = useUser();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOnboarding = async () => {
      if (!userId || !user) {
        router.push("/sign-in");
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          router.push("/sign-in");
          return;
        }

        // Check if user exists in our database
        const res = await userExists(userId, token);

        if (res.ok) {
          // User exists in our database, redirect to home
          router.push("/");
        } else {
          // User doesn't exist, create them in our database
          const userPayload = {
            userId: user.id,
            username: user.username ?? "", 
            displayName: user.username ?? "", // Set it same as username initially
            email: user.emailAddresses[0]?.emailAddress || "",
            description: null,
            userBackgroundImgUrl: null,
            userProfileImgUrl: null,
            role: roles.user,
          };

          const res = await createUser(userPayload, token);
          
          if (!res.ok) {
            throw new Error("Failed to create user in database");
          }
          // Redirect to set display name page
          router.push("/set-display-name");
        }
      } catch (error) {
        console.error("Error during onboarding:", error);
        setError("An error occurred during setup. Please try again.");
      }
    };

    handleOnboarding();
  }, [userId, user, getToken, router]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f3f4f6]">
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4 text-red-600">Setup Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#f3f4f6]">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-bold mb-2 text-gray-800">Welcome to Mythiqa!</h1>
          <p className="text-gray-600">Logging you in...</p>
        </div>
      </div>
    </div>
  );
}
