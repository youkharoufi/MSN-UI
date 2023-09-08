export interface ApplicationUser {
  userName:string;
  email:string;
  password:string;
  link:string;
  token?:string;
  photoUrl?:string;
  file?:File;
  role:string;
}
