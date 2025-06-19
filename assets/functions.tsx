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
