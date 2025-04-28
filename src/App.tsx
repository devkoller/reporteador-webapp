import { ThemeProvider } from "@/context/theme-provider"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Router } from "@/routes/Router"
import { store } from '@/store/store'
import { Toaster } from "@/components/ui/toaster"
import { PermissionProvider } from '@/context/PermissionContext';
import { UserConfigProvider } from "./context/UserConfigContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <UserConfigProvider>
            <PermissionProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </PermissionProvider>
          </UserConfigProvider>
        </QueryClientProvider>
      </Provider>
      <Toaster />
    </ThemeProvider>

  )
}

export default App
