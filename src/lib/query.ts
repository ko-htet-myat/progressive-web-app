import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays "fresh" for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache kept in memory for 10 minutes (v5 renamed cacheTime -> gcTime)
      retry: 1, // Fail fast in production, retry once
      refetchOnWindowFocus: true, // Revalidate in background when user returns to tab
    },
    mutations: {
      onError: (error: any) => {
        console.error("Global Mutation Error Interception:", error);
      },
    },
  },
});
