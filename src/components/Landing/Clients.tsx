import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import colima from "@/assets/images/clients/colima.png"
import gto from "@/assets/images/clients/gto.png"
import hcg from "@/assets/images/clients/hcg.png"
import michoacan from "@/assets/images/clients/michoacan.png"
import sonora from "@/assets/images/clients/sonora.png"
import ssrojo from "@/assets/images/clients/ssrojo.png"
import imss from "@/assets/images/clients/imss.png"
import bienestart from "@/assets/images/clients/bienestart.svg"

const data = [
  { img: colima, alt: "Colima" },
  { img: hcg, alt: "HCG" },
  { img: gto, alt: "Guanajuato" },
  { img: michoacan, alt: "Michoacán" },
  { img: sonora, alt: "Sonora" },
  { img: ssrojo, alt: "SS Rojo" },
  { img: imss, alt: "IMSS" },
  { img: bienestart, alt: "nBie" },
]


export const Clients = () => {

  const print = () => {
    return data.map((item, index) => {
      return <CarouselItem className="basis-1/3 flex items-center" key={index}>
        <div className="flex flex-col items-center gap-3 px-5 grayscale duration-500 hover:grayscale-0">
          <div className="flex gap-3 items-center">
            <img
              src={item.img}
              alt={item.alt}
              className="text-black w-full aspect-3/2 object-contain mix-blend-color-burn"
            />
          </div>
        </div>
      </CarouselItem>
    })
  }

  return (
    <div className='w-10/12 mx-auto py-10 relative z-10' data-aos='zoom-in'>
      <div>
        <h2 className='text-3xl text-center mb-5'>
          <span className='font-light'>Nuestros principales</span> <br />
          <span className='text-meditiva text-6xl xl:text-8xl font-bold'>
            Clientes
          </span>
        </h2>
      </div>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {print()}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
