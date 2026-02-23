import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null

        // Aquí tu validación real con Prisma
        if (
          credentials.email === "test@test.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            email: "test@test.com",
          }
        }

        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}