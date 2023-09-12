

export interface ChatMessage {

  id?:number;
  senderId?:string;
  senderUsername?:string;
  targetId?:string;
  targetUsername?:string
  content?:string;
  dateRead?:Date;
  messageSent?:Date;

}
