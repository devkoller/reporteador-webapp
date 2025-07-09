import { MainNav } from "./mainNav"
import { Footer } from "./footer"

export const PageLayout = ({ children }: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-8">
          <MainNav />
        </div>
      </header>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}
