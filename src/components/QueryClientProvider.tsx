import * as React from 'react';
import { QueryClient, QueryClientProvider as RQProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60 * 60 * 24
        },
    },
});

const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
});

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 60 * 24
});

interface QueryClientProviderProps {
    children: React.ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = ({ children }) => {
    return (
        <RQProvider client={queryClient}>
            {children}
        </RQProvider>
    );
}; 