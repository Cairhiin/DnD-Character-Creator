import 'next-auth';

declare module "next-auth" {
    export interface User {
        role?: string;
        username?: string;
    };

    interface Session extends DefaultSession {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      role?: Role;
      username: string;
    }
  }