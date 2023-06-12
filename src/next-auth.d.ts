import 'next-auth';

declare module "next-auth" {
    export interface User {
        token: string;
        user: {
            role?: string;
            username?: string;
            characters: Array<Character>;
            id: string;
        }
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