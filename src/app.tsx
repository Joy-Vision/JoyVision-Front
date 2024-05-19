import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import Nav from '~/components/Nav';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

export default function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router
        root={props => (
          <>
            {/* <Nav /> */}
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </QueryClientProvider>
  );
}
