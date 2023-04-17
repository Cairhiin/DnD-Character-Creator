import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const { username, password } = credentials;
                const res = await fetch("http://localhost:3001/api/users/authenticate", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",    
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                });

                const data = await res.json();
                const { user } = data;
                if (res.ok && user) return user;
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        }
    },
    pages: {
        signIn: '/auth/login'
    }
}

export default NextAuth(authOptions);