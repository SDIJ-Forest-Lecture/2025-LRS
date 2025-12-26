'use client'

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { reviewSchema } from "@/lib/validations"
import { saveReview } from "@/app/(dashboard)/reviews/actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash } from "lucide-react"
import { toast } from "sonner"
import { Review } from "@/types"

interface ReviewFormProps {
  assignmentId: string;
  initialData?: Review;
  lectureTitle: string;
}

export function ReviewForm({ assignmentId, initialData, lectureTitle }: ReviewFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const isReadOnly = initialData?.status === 'submitted' || initialData?.status === 'evaluated';

  // Parse timestamps if string
  const defaultTimestamps = initialData?.timestamps
    ? (typeof initialData.timestamps === 'string' ? JSON.parse(initialData.timestamps) : initialData.timestamps)
    : [];

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      total_score: initialData?.total_score || 0,
      content_review: initialData?.content_review || "",
      delivery_review: initialData?.delivery_review || "",
      structure_review: initialData?.structure_review || "",
      overall_review: initialData?.overall_review || "",
      timestamps: defaultTimestamps,
    },
    disabled: isReadOnly
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "timestamps",
  })

  async function onSave(isSubmit: boolean) {
    const isValid = await form.trigger();
    if (isSubmit && !isValid) {
      toast.error("필수 항목을 모두 입력해주세요 (최소 글자수 등 확인)");
      return;
    }

    setIsSaving(true);
    try {
      const data = form.getValues();
      const result = await saveReview(assignmentId, initialData?.id, data, isSubmit);
      if (result?.error) {
        toast.error("저장 실패", { description: result.error });
      } else {
        toast.success(isSubmit ? "제출되었습니다" : "임시저장되었습니다");
      }
    } catch (e) {
      toast.error("Error");
    } finally {
      setIsSaving(false);
    }
  }

  if (isReadOnly) {
    // Just show view mode logic or disables form. Currently disabled prop handles inputs.
    // But maybe hide buttons?
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
          <h3 className="font-semibold text-lg">{lectureTitle}</h3>
          {/* Kollus Player placeholder could go here or above */}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="total_score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>총점 (0-100)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* More numeric metrics if needed */}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <FormLabel>타임스탬프 리뷰 (선택)</FormLabel>
            {!isReadOnly && <Button type="button" variant="outline" size="sm" onClick={() => append({ time: "", content: "" })}><Plus className="w-4 h-4 mr-1" />추가</Button>}
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <FormField
                  control={form.control}
                  name={`timestamps.${index}.time`}
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <FormControl>
                        <Input placeholder="00:00" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`timestamps.${index}.content`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="이 부분의 내용이..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {!isReadOnly && <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash className="w-4 h-4" /></Button>}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="content_review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>강의 내용 평가</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" placeholder="내용의 충실성, 정확성 등을 평가해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delivery_review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>전달력 평가</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" placeholder="강사의 발성, 속도, 판서 등을 평가해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="structure_review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>구조 평가</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" placeholder="강의의 구성, 흐름 등을 평가해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="overall_review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>종합 평가</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" placeholder="총평을 작성해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!isReadOnly && (
          <div className="flex justify-end gap-2 sticky bottom-4 bg-background/80 p-4 backdrop-blur border rounded-lg shadow-lg">
            <Button type="button" variant="outline" onClick={() => onSave(false)} disabled={isSaving}>
              임시 저장
            </Button>
            <Button type="button" onClick={() => onSave(true)} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              제출하기
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}
