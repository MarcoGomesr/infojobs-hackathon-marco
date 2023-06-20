import NextAuth from 'next-auth'
import InfojobsProvider from 'infojobs-next-auth-provider'

const clientId = process.env.INFOJOBS_CLIENT_ID ?? ''
const clientSecret = process.env.INFOJOBS_CLIENT_SECRET ?? ''
const redirectUri = process.env.INFOJOBS_REDIRECT_URL ?? ''
const jobScopes = process.env.INFOJOBS_SCOPES ?? ''

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
      accessToken?: string;
      refreshToken?: string;
      user: {
      } & User
  }

  interface User {

  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
      accessToken?: string
      refreshToken?: string;
  }
}

const handler = NextAuth({
  pages: {
    signIn: '/',
    signOut: '/'
  },
  providers: [
    InfojobsProvider({
      clientId,
      clientSecret,
      redirect_uri: redirectUri,
      infojobs_scopes: jobScopes
    })
  ],
  callbacks: {
    async jwt ({ token, account }) {
      console.log(token)
      console.log(account)
      if (account != null) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token || {}
    },
    async session ({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    }
  },
  debug: false
})

export { handler as GET, handler as POST }