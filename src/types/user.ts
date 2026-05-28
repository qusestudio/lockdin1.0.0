export interface User {
  id: string;
  fullName: string;
  schoolName: string;
  grade: string;
  email: string;
  avatarUrl: string | null;
  isVerified: boolean;
}
