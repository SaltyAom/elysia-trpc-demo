import { useState, type ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from './trpc'

export function Provider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:3000/trpc'
                })
            ]
        })
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
