import Credentials from "next-auth/providers/credentials";
import GoogleProivder from "next-auth/providers/google";
import GitHubProivder from "next-auth/providers/github";
import RedditProvider from "next-auth/providers/reddit";
import BungieProivder from "next-auth/providers/bungie";
import TwitchProivder from "next-auth/providers/twitch";
import { AuthOptions } from "next-auth";
import { findUserByEmail } from "@/database/queries/user/findUserByEmail";
import { findUserByEmailAndPassword } from "@/database/queries/user/findUserByEmailAndPassword";
import Discord from "next-auth/providers/discord";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 Days
  },
  providers: [
    GoogleProivder({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
    GitHubProivder({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    RedditProvider({
      clientId: process.env.REDDIT_ID!,
      clientSecret: process.env.REDDIT_SECRET!,
    }),
    BungieProivder({
      clientId: process.env.BUNGIE_ID!,
      clientSecret: process.env.BUNGIE_SECRET!,
    }),
    TwitchProivder({
      clientId: process.env.TWITCH_ID!,
      clientSecret: process.env.TWITCH_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {
          label: "E-Mail",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const user = await findUserByEmailAndPassword(email, password) as { uid: string, username: string, email: string, firstname: string, lastname: string }[];

        if (user && user.length > 0) {
          const role = await getUserRoleByUID(user[0].uid);

          return {
            id: user[0].uid,
            username: user[0].username,
            email: user[0].email,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        // Manually update token fields during session updates
        token.username = session.user.username;
        token.email = session.user.email;
        token.firstname = session.user.firstname;
        token.lastname = session.user.lastname;
      }

      if (user) {
        // On login, set the token fields
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.role = user.role;
      }
      return token;
    }, async session({ session, token }) {
      // Map token fields to the session object
      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
        firstname: token.firstname as string,
        lastname: token.lastname as string,
        role: token.role as string,
      };
      return session;
    }, async signIn({ user, account }) {
      if ((account?.provider != "google" && account?.provider != "discord" && account?.provider != "github") && user.email) {
        return true;
      }
      else {
        const existingUser = await findUserByEmail(user.email);
        const role = await getUserRoleByUID(existingUser[0].uid);

        // If the user exists, proceed with the sign-in process
        if (existingUser.length > 0) {
          user.id = existingUser[0].uid;
          user.username = existingUser[0].username;
          user.email = existingUser[0].email;
          user.firstname = existingUser[0].firstname;
          user.lastname = existingUser[0].lastname;
          user.role = role;
          return true;
        } else {
          return false;
        }
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/signup",
  },
};
