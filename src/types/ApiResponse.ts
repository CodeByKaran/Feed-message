import {MessageModel} from "@/model/message.model.ts"

export interface ApiResponse {
   success:boolean;
   message:string;
   isAcceptingMessages?:boolean;
   messages?:Array[MessageModel];
}

