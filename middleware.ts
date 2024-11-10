import { auth } from "@/lib/auth";

const apiAuthPrefix = "/api/auth";
const authRoutes = ["/sign-in", "/sign-up"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isRootRoute = nextUrl.pathname === "/";

  if (isApiAuthRoute) {
    return; 
  }

  if (isLoggedIn) {
    if (isRootRoute || isAuthRoute) {
      return Response.redirect(new URL("/boards", nextUrl));
    }
  } else {
    if (!isRootRoute && !isAuthRoute) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  return; 
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+s|_next).*)", "/", "/(api|trpc)(.*)"],
};
