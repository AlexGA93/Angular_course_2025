import { User } from "./user.interface";

export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export interface LoginResponse {
    user: User;
    token: string;
}