/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import getAuth from "../auth";
import { supabase } from "./supabase";

export async function createAIModel(model: {
  model: string;
  from: string;
  system: string;
}) {
  await fetch("http://192.168.0.29:11434/api/create", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(model),
  });
}

export async function sendWhatsAppMessage(user_id: string, model_id: any) {
  await fetch("/api/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: "+27649076440", message: "Hello from AI!" }),
  });

  const newMessage = {
    user_id: user_id,
    model_id: model_id,
    position: "end", // Adjust as needed ("start" for user, "end" for bot)
    name: "Finn_1",
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
    to: "User",
    message: "Hello from AI!",
  };

  createUserChat(newMessage);
}

export async function fetchAIChat(message: string): Promise<string> {
  const req = await fetch("http://192.168.0.29:11434/api/chat", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      model: "Finn",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const res = await req.text();

  // Process the data
  const combinedContent = res
    .split("\n") // Split by newline
    .filter((line) => line.trim() !== "") // Remove empty lines
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        console.log(error);
        console.error("Invalid JSON line:", line);
        return null;
      }
    })
    .filter((obj) => obj !== null) // Remove nulls from failed JSON parsing
    .map((obj) => obj.message.content) // Extract content
    .join(""); // Join content together

  return combinedContent;
}

export async function getUserData(email: string) {
  const { data: users } = await supabase
    .from("users")
    .select()
    .eq("email", email);

  if (users && users.length == 1) {
    return users;
  }
}

export async function getUserModels(userId: string) {
  const { data: userModels } = await supabase
    .from("userModels")
    .select()
    .like("modelName", "*_" + userId);

  if (userModels && userModels.length > 0) {
    return userModels;
  }
}

export async function getUserChats(userId: string, model: any) {
  if (model && model.length > 0) {
    const { data: userChats } = await supabase
      .from("userChats")
      .select()
      .eq("user_id", userId)
      .eq("model_id", model[0].id);

    if (userChats && userChats.length > 0) {
      return userChats;
    }
  }
}

export async function createUserChat(chat: any) {
  await supabase.from("userChats").insert([
    {
      user_id: chat.user_id,
      model_id: chat.model_id,
      name: chat.name,
      date: chat.date,
      time: chat.time,
      message: chat.message,
      to: chat.to,
      position: chat.position,
    },
  ]);
}

export async function getUserProfile(userId: string) {
  const { data: userProfile } = await supabase
    .from("userProfile")
    .select()
    .eq("user_id", userId);

  if (userProfile && userProfile.length > 0) {
    return userProfile;
  }
}

export async function updateUserProfile(userProfile: any) {
  const { data: existingProfile } = await supabase
    .from("userProfile")
    .select()
    .eq("user_id", userProfile.user_id);

  if (existingProfile && existingProfile.length > 0) {
    const { error: userProfileError } = await supabase
      .from("userProfile")
      .update({
        birthday: userProfile.birthday,
        gender: userProfile.gender,
        occupation: userProfile.occupation,
        origin: userProfile.origin,
        hobbies: userProfile.hobbies,
        weekends: userProfile.weekends,
        locationPreference: userProfile.locationPreference,
        careerLikes: userProfile.careerLikes,
        careerGoals: userProfile.careerGoals,
        partnerPreferences: userProfile.partnerPreferences,
        relationshipCategory: userProfile.relationshipCategory,
        loveLanguage: userProfile.loveLanguage,
        funFacts: userProfile.funFacts,
        threeWordDescription: userProfile.threeWordDescription,
        funActivity: userProfile.funActivity,
        family: userProfile.family,
        familyImportance: userProfile.familyImportance,
        traveled: userProfile.traveled,
        dreamDestination: userProfile.dreamDestination,
        favoriteFood: userProfile.favoriteFood,
        coffeeOrTea: userProfile.coffeeOrTea,
        favoriteMovie: userProfile.favoriteMovie,
        favoriteShow: userProfile.favoriteShow,
        entertainmentPreference: userProfile.entertainmentPreference,
        philosophies: userProfile.philosophies,
        stress: userProfile.stress,
      })
      .eq("user_id", userProfile.user_id);

    if (userProfileError) {
      console.error("Error updating user:", userProfileError);
    }
  } else {
    await supabase.from("userProfile").insert([
      {
        user_id: userProfile.user_id,
        birthday: userProfile.birthday,
        gender: userProfile.gender,
        occupation: userProfile.occupation,
        origin: userProfile.origin,
        hobbies: userProfile.hobbies,
        weekends: userProfile.weekends,
        locationPreference: userProfile.locationPreference,
        careerLikes: userProfile.careerLikes,
        careerGoals: userProfile.careerGoals,
        partnerPreferences: userProfile.partnerPreferences,
        relationshipCategory: userProfile.relationshipCategory,
        loveLanguage: userProfile.loveLanguage,
        funFacts: userProfile.funFacts,
        threeWordDescription: userProfile.threeWordDescription,
        funActivity: userProfile.funActivity,
        family: userProfile.family,
        familyImportance: userProfile.familyImportance,
        traveled: userProfile.traveled,
        dreamDestination: userProfile.dreamDestination,
        favoriteFood: userProfile.favoriteFood,
        coffeeOrTea: userProfile.coffeeOrTea,
        favoriteMovie: userProfile.favoriteMovie,
        favoriteShow: userProfile.favoriteShow,
        entertainmentPreference: userProfile.entertainmentPreference,
        philosophies: userProfile.philosophies,
        stress: userProfile.stress,
      },
    ]);
  }
}

export async function uploadPicture(photo: Blob) {
  const auth = getAuth();

  await auth.updateUser({
    photo: photo,
  });

  await auth.refresh();
}
