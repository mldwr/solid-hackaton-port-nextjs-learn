export interface AuthConfig {
  pages: {
    signIn: string;
  };
  callbacks: {
    authorized: (params: { 
      auth: { user?: any } | null; 
      request: { url: URL }
    }) => boolean | Response;
  };
}

export const authConfig: AuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const url = request.url;
      const isOnDashboard = url.pathname.includes('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', url));
      }
      return true;
    },
  },
};