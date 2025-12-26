'use server'

import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(data: z.infer<typeof loginSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}
