import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { supabase } from "../authen/supabase";

export const getUid = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error("Failed to get UID:", error?.message);
    return null;
  }

  return data.user.id;
};

export const getEmail = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error("Failed to get email:", error?.message);
    return null;
  }

  return data.user.email ?? null;
};

export const getName = async (): Promise<string | null> => {
  const myUid = await getUid();
  const { data: username, error: error2 } = await supabase
    .from("users")
    .select("name")
    .eq("uid", myUid)
    .maybeSingle();
  return username?.name ?? null;
};
