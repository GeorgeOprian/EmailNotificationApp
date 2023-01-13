import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "590587592796-3n4tb2vconjrg5feogqihc7tr2777vni.apps.googleusercontent.com",
            clientSecret: "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"
        })
    ],
    callbacks: {
        session: async ({ session, token }: {session: any, token: any}) => {
          if (session?.user) {
            session.user.id = token.uid;
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
      },
})