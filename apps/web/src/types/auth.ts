import z from "zod"

export const apiUserSchema = z.object({
  id: z.string().min(1),
  email: z.string(),
  name: z.string().nullable().optional(),
})
export type ApiUser = z.infer<typeof apiUserSchema>

export const loginResponseSchema = z.object({
  ok: z.literal(true),
  accessToken: z.string().min(1),
  user: apiUserSchema,
})
export type LoginResponse = z.infer<typeof loginResponseSchema>

export const tokenSchema = z.object({
  accessToken: z.string().min(1),
  user: apiUserSchema,
})
export type Token = z.infer<typeof tokenSchema>

