import { ThemeProvider } from "@/context/theme-provider"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Router } from "@/routes/Router"
import { store } from '@/store/store'
import { Toaster } from "@/components/ui/toaster"


function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
      <Toaster />
    </ThemeProvider>

  )
}

export default App
