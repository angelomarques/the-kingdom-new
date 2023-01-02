import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    onLoginRequestError: (err) => {
      console.error(err)
    },
    onLogoutRequestError: (err) => {
      console.error(err)
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!,
      },
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL!,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL!,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    },
    cookies: {
      name: 'the-kingdom',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth