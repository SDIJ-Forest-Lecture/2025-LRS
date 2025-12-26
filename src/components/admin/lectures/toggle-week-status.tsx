'use client'

import { useState } from "react"
import { toggleWeekSettingStatus } from "@/app/admin/lectures/actions"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface ToggleWeekStatusProps {
    id: string
    isActive: boolean
}

export function ToggleWeekStatus({ id, isActive }: ToggleWeekStatusProps) {
    const [loading, setLoading] = useState(false)

    async function onToggle(checked: boolean) {
        setLoading(true)
        try {
            const result = await toggleWeekSettingStatus(id, checked)
            if (result?.error) {
                toast.error("상태 변경 실패", {
                    description: result.error,
                })
            } else {
                toast.success(checked ? "활성화되었습니다" : "비활성화되었습니다")
            }
        } catch (error) {
            toast.error("오류가 발생했습니다")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Switch
            checked={isActive}
            onCheckedChange={onToggle}
            disabled={loading}
        />
    )
}
