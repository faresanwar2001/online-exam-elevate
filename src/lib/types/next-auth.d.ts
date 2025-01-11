import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  /**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
interface User {
    "token": string,
    "_id": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": number,
    "role": string,
    "createdAt": string,
 
}

  interface Session {
    "_id": string,
    "token": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": number,
    "role": string,
    "isVerified": boolean,
    "createdAt": string,
    "passwordResetCode": string,
    "passwordResetExpires": string,
    "resetCodeVerified": boolean
  }
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      /** OpenID ID Token */
      "token": string,
      "_id": string,
      "username": string,
      "firstName": string,
      "lastName": string,
      "email": string,
      "phone": number,
      "role": string,
      "isVerified": boolean,
      "createdAt": string,
      "passwordResetCode": string,
      "passwordResetExpires": string,
      "resetCodeVerified": boolean
    }
  }