import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // 如果需要获取用户额外信息，可以配置 authorization
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful sign in
    async signIn({ profile }) {
      //1.Connect to the database
      //2. Check if user exists
      //3.if not, create user
      //4. Return true to aloow sign in
    },
    //Session callback function that modifies the session object
    async session({ session }) {
      //1.Get user from the database
      //2.Assign user id from the session
      //3.Return session
    },
  },
};
