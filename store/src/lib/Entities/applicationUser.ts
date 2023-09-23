import { FriendRequest } from "./friendRequest";

export interface ApplicationUser {
  id:string;
  userName:string;
  email:string;
  password:string;
  link:string;
  token?:string;
  photoUrl?:string;
  file?:File;
  role:string;
  friends?:ApplicationUser[];
  friendRequests?:FriendRequest[];
}
