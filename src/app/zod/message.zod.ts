import { z } from "zod";

export const MessageSchemaValidation = z.object({
  username:z.string().min(1,"username required").optional(),
  title:z.string().min(1, "title is required").max(50,"title must ne not more than 50 characters").trim(),
  content: z.string().min(1, "Content is required").max(300,"content must ne not more than 300 characters").trim(),
});




export type MessageSchemaValidationType = z.infer<typeof MessageSchemaValidation>;
