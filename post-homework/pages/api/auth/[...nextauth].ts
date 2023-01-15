import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "590587592796-3pm3a49np5oe7qnf66b6s2l8felvibir.apps.googleusercontent.com",
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