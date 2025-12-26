'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const weekSettingSchema = z.object({
    week_number: z.coerce.number().min(1),
    year: z.coerce.number().min(2024),
    application_start: z.string(),
    application_end: z.string(),
    review_deadline: z.string(),
    is_active: z.boolean().default(true),
});

export type WeekSettingInput = z.infer<typeof weekSettingSchema>;

export async function createWeekSetting(data: WeekSettingInput) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('week_settings')
        .insert(data);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/lectures/week-settings');
    return { success: true };
}

export async function updateWeekSetting(id: string, data: Partial<WeekSettingInput>) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('week_settings')
        .update(data)
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/lectures/week-settings');
    return { success: true };
}

export async function toggleWeekSettingStatus(id: string, isActive: boolean) {
    const supabase = await createClient();

    // 만약 활성화하려는 경우, 다른 모든 주차를 비활성화해야 한다면 여기서 로직 추가
    // 현재는 단순 토글만 구현

    const { error } = await supabase
        .from('week_settings')
        .update({ is_active: isActive })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/lectures/week-settings');
    return { success: true };
}
