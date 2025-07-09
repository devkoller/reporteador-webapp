import { ThemeProvider } from "@/context/theme-provider"
import { BrowserRouter } from 'react-router-dom'
import { Router } from "@/routes/Router"
import { Toaster } from "@/components/ui/toaster"
// import { PermissionProvider } from '@/context/PermissionContext';
// import { UserConfigProvider } from "./context/UserConfigContext"
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
      <QueryClientProvider client={queryClient}>
        {/* <UserConfigProvider> */}
        {/* <PermissionProvider> */}
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        {/* </PermissionProvider> */}
        {/* </UserConfigProvider> */}
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>

  )
}

export default App
