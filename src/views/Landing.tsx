import { Contact, Menu, Banner, About, Clients, Service, Numbers, Sponsors, Maps, Footer } from '@/components/Landing'

export const Landing = () => {
  return (
    <>
      <Contact />
      <Menu />
      <Banner />
      <div className="pt-10 pb-20 lg:pb-40 relative bg-red overflow-hidden">
        <About />
        <Clients />
      </div>
      <div className="bg-slate-100 py-5 overflow-hidden">
        <Service />
      </div>
      <div className="py-10 relative">
        <Numbers />
      </div>
      <Sponsors />
      <div className="">
        <Maps />
      </div>
      <Footer />
    </>
  )
}
