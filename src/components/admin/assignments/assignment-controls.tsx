'use client'

import { useState } from "react"
import { executeAutoAssignment, clearAssignments } from "@/app/admin/assignments/actions"
import { Button } from "@/components/ui/button"
import { Loader2, Play, Trash } from "lucide-react"
import { toast } from "sonner"

interface AssignmentControlsProps {
    weekNumber: number;
    hasAssignments: boolean;
}

export function AssignmentControls({ weekNumber, hasAssignments }: AssignmentControlsProps) {
    const [loading, setLoading] = useState(false)

    async function onRun() {
        if (!confirm(`${weekNumber}주차 자동 배정을 실행하시겠습니까?`)) return;

        setLoading(true)
        try {
            const result = await executeAutoAssignment(weekNumber);
            if (result.error) {
                toast.error("배정 실패", { description: result.error });
            } else {
                toast.success(`배정 완료: ${result.count}건`);
            }
        } catch (e) {
            toast.error("Error");
        } finally {
            setLoading(false);
        }
    }

    async function onClear() {
        if (!confirm(`정말 ${weekNumber}주차 배정을 초기화하시겠습니까?`)) return;

        setLoading(true)
        try {
            const result = await clearAssignments(weekNumber);
            if (result.error) {
                toast.error("초기화 실패", { description: result.error });
            } else {
                toast.success("초기화되었습니다");
            }
        } catch (e) {
            toast.error("Error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-2">
            <Button onClick={onRun} disabled={loading || hasAssignments}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                자동 배정 실행
            </Button>
            {hasAssignments && (
                <Button variant="destructive" onClick={onClear} disabled={loading}>
                    <Trash className="mr-2 h-4 w-4" />
                    배정 초기화
                </Button>
            )}
        </div>
    )
}
