'use server'

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { signupSchema, type SignupInput } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function signup(data: SignupInput) {
    const supabase = await createClient(); // For Auth

    const { email, password, name, phone } = data;

    // 1. Sign Up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
            }
        }
    });

    if (authError) {
        return { error: authError.message };
    }

    if (!authData.user) {
        return { error: "회원가입 중 오류가 발생했습니다. (No User Returned)" };
    }

    // 2. Insert into public.users table using Service Role (Bypass RLS)
    const adminSupabase = await createAdminClient();

    const { error: dbError } = await adminSupabase
        .from('users')
        .insert({
            auth_id: authData.user.id,
            email,
            name,
            phone,
            role: 'member', // Default role
            is_active: true
        });

    if (dbError) {
        console.error("DB Insert Error:", dbError);
        return { error: "프로필 생성 중 오류가 발생했습니다." };
    }

    redirect("/login");
}
