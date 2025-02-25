import { Contact, Menu, Banner, About, Clients, Service, Numbers, Sponsors, Maps, Footer } from '@/components/Landing'
import { Shape2 } from '@/assets/images/SVGComponents/Shapes'

export const Landing = () => {
  return (
    <>
      <Contact />
      <Menu />
      <Banner />
      <div className="pt-10 pb-20 lg:pb-40 relative bg-red overflow-hidden">
        <About />
        <Clients />
        <Shape2 pathClassName='fill-current text-slate-100' className='absolute bottom-0 left-0 w-full h-auto z-0 overflow-hidden' />
      </div>
      <div className="bg-slate-100 py-5 overflow-hidden">
        <Service />
      </div>
      <div className="py-10 relative">
        <Numbers />
        <Shape2 pathClassName='fill-current text-slate-100' className='absolute top-0 left-0 w-full h-auto z-0 rotate-180 overflow-hidden' />
      </div>
      <Sponsors />
      <div className="">
        <Maps />
      </div>
      <Footer />
    </>
  )
}
