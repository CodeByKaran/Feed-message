import mongoose, { Schema, Document, Types } from "mongoose";

// Define the MessageModel interface
export interface MessageModel extends Document {
  to: Types.ObjectId;
  content: string;
}

// Create the message schema
const messageSchema: Schema<MessageModel> = new Schema(
  { 
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Recipient is required'], // Added required validation for 'to'
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists, if not, create a new one
const Message = mongoose.models.Message as mongoose.Model<MessageModel> || mongoose.model<MessageModel>("Message", messageSchema);

export default Message;
