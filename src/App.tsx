import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { useAuthStore } from "./store/auth-store";
import { QueryProvider } from "./providers/query-provider";
import { routeTree } from "./routeTree.gen";
import { useShallow } from "zustand/react/shallow";

// Create a single query client instance for the app
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: {
      isAuthenticated: false,
      accessToken: null,
    },
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  // Use useShallow to prevent unnecessary re-renders when the identity of the selection changes
  const auth = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      accessToken: state.accessToken,
    }))
  );

  return (
    <QueryProvider>
      <RouterProvider
        router={router}
        context={{
          queryClient,
          auth, // Live state syncs with route guards
        }}
      />
    </QueryProvider>
  );
}
