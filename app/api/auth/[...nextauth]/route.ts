import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "../../../../lib/mongodb"
import { compare } from "bcryptjs"
import { User } from "../../../../models/user"
import { sendAccountActivityAlert } from "../../../../lib/notifications"

// Use dynamic rendering for development
export const dynamic = "force-dynamic"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        await connectToDatabase()
        // Use the getUserModel function to ensure we have a connection
        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          throw new Error("No user found with this email")
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        // Update last login time
        user.lastLogin = new Date()
        await user.save()

        // Send account activity notification if enabled
        try {
          if (user.preferences?.notifications?.accountActivityAlerts) {
            await sendAccountActivityAlert(
              user._id.toString(),
              "New Login",
              `New login to your account at ${new Date().toLocaleString()}`
            )
          }
        } catch (error) {
          console.error("Failed to send login notification:", error)
          // Don't fail the login if notification fails
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id || user._id?.toString()
        token.name = user.name
        token.email = user.email
      }

      // Handle updates to the session
      if (trigger === "update" && session?.user) {
        // Update the token with the new session data
        if (session.user.name) token.name = session.user.name
        if (session.user.email) token.email = session.user.email
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
