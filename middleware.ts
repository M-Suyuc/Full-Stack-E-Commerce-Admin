import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // publicRoutes: ['/']
  publicRoutes: ['/api/:path*']
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
