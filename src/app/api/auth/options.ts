import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import Google from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from "../../../../utils/db";

secret: zNDP2+6We9I76xRHX0LKpFtTIZuUD0rXXi/tQt7ouHo=

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_KEY as string,
        }),
        
        CredentialsProvider({
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                },
            },
            async authorize(credentials) {
                const user = { id: '42', name: "Dave", password: "nextauth" }
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({session}) {
            return session 
        },
        async signIn({profile}) {
            console.log(profile)

            try {
                await connectDB()
                return true
            } catch (error){
                console.log(error)
                return false
            }
        }
    }
} 