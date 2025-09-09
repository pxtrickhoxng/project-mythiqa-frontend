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
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setDisplayName(user?.username || "");
  }, [user]);

  const validateDisplayName = (name: string) => {
    const minLength = 3;
    const maxLength = 30;
    const allowedCharacters = /^[a-zA-Z0-9_.\- ]+$/;
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FB00}-\u{1FBFF}]/u;

    if (name.length < minLength) {
      return `Display name must be at least ${minLength} characters long.`;
    }
    if (name.length > maxLength) {
      return `Display name cannot exceed ${maxLength} characters.`;
    }
    if (!allowedCharacters.test(name)) {
      return "Display name can only contain letters, numbers, spaces, underscores (_), dashes (-), and dots (.).";
    }
    if (emojiRegex.test(name)) {
      return "Display name cannot contain emojis.";
    }
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validateDisplayName(displayName.trim());
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    if (!userId || !user) {
      router.push("/sign-in");
      return;
    }

    const token = await getToken();
    if (!token) {
      router.push("/sign-in");
      return;
    }

    const res = await userExists(userId, token);

    if (res.ok) {
      // User exists; go home
      router.push("/");
    } else {
      // User doesn't exist; create new user
      const userPayload = {
        userId: user.id,
        username: user.username,
        displayName: displayName.trim(),
        email: user.emailAddresses[0].emailAddress,
        description: null,
        userBackgroundImgUrl: null,
        userProfileImgUrl: null,
        role: roles.user,
      };

      await createUser(userPayload, token);
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f3f4f6]">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Welcome to Mythiqa!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Choose a display name to represent yourself in the Mythiqa community.
          This can be different from your username.
        </p>
        <input
          type="text"
          placeholder="Enter your display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
