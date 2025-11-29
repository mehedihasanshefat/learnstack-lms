"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { courseSchema, CourseType } from "@/schemas/courseSchema";
import { ApiResponse } from "@/lib/types";
import { prisma } from "@/lib/db";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function editCourse(
  data: CourseType,
  courseId: string,
): Promise<ApiResponse> {
  const user = await requireAdmin();
  try {
    const result = courseSchema.safeParse(data);
    const req = await request();
    const decission = await aj.protect(req, {
      fingerprint: user?.user.id,
    });
    if (decission.isDenied()) {
      if (decission?.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Request blocked due to rate limit",
        };
      } else {
        return {
          status: "error",
          message: "Melicious request",
        };
      }
    }
    if (!result.success) {
      return {
        status: "error",
        message: "Invalid course data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update course",
    };
  }
}
