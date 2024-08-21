import { z } from "zod";

export const MessageSchemaValidation = z.object({
  content: z.string().min(1, "Content is required").max(500,"content must ne not more than 300 characters").trim(),
});




export type MessageSchemaValidationType = z.infer<typeof MessageSchemaValidation>;
