import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Memoize QueryClient initialization to prevent recreations on rerenders
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
            gcTime: 1000 * 60 * 60 * 24, // Keep garbage collection cache for 24 hours (Critical for offline)
            refetchOnWindowFocus: false, // Turned off to protect local un-synced mutation edits
            retry: (failureCount, error: any) => {
              // Only retry network errors automatically; do not retry 401s or 403s
              if (error?.status === 401 || error?.status === 403) return false;
              return failureCount < 3;
            },
          },
          mutations: {
            // Global failure interception point
            onError: (error: any) => {
              console.error("Global Mutation Error Interception:", error);
              // Trigger your notification system here (e.g., toast.error(error.message))
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools are automatically stripped from production builds */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
