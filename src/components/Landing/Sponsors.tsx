import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import atronix from '@/assets/images/sponsors/Artronix.png'
import bica from '@/assets/images/sponsors/bica.png'
import bonefix from '@/assets/images/sponsors/bonefix.webp'
import core from '@/assets/images/sponsors/core.png'
import exos from '@/assets/images/sponsors/exos.png'
import human from '@/assets/images/sponsors/human.jpg'
import kls from '@/assets/images/sponsors/kls.png'
import maxo from '@/assets/images/sponsors/maxo.jpg'
import medical from '@/assets/images/sponsors/medical.png'
import mindray from '@/assets/images/sponsors/mindray.png'
import newfix from '@/assets/images/sponsors/newfix.png'
import signus from '@/assets/images/sponsors/signus.png'
import spinart from '@/assets/images/sponsors/spineart.png'
import topspine from '@/assets/images/sponsors/topspine.jpg'
import trauma from '@/assets/images/sponsors/trauma.png'
import ulrich from '@/assets/images/sponsors/ulrich.png'
import varlix from '@/assets/images/sponsors/varlix.jpg'
import boston from '@/assets/images/sponsors/boston.png'
import dewi from '@/assets/images/sponsors/dewi.webp'
import purell from '@/assets/images/sponsors/purell.png'
import wested from '@/assets/images/sponsors/wested.png'
import wing from '@/assets/images/sponsors/wing.png'
import resp from '@/assets/images/sponsors/Respifix.png'

const data = [
  { img: atronix },
  { img: bica },
  { img: bonefix },
  { img: core },
  { img: exos },
  { img: human },
  { img: kls },
  { img: maxo },
  { img: medical },
  { img: mindray },
  { img: newfix },
  { img: signus },
  { img: spinart },
  { img: topspine },
  { img: trauma },
  { img: ulrich },
  { img: varlix },
  { img: boston },
  { img: dewi },
  { img: purell },
  { img: wested },
  { img: wing },
  { img: resp }
]

export const Sponsors = () => {
  const print = () => {
    return data.map((item, index) => {
      return <CarouselItem className="basis-1/3 flex items-center" key={index}>
        <div className="flex flex-col items-center gap-3 px-5 grayscale duration-500 hover:grayscale-0">
          <div className="flex gap-3 items-center">
            <img
              src={item.img}
              alt=''
              className="text-black w-12/12 aspect-3/2 object-contain mix-blend-color-burn"
            />
          </div>
        </div>
      </CarouselItem>
    })
  }
  return (
    <div className='w-10/12 mx-auto py-10' data-aos='zoom-in'>
      <div>
        <h2 className='text-3xl text-center mb-5'>
          {/* <span className='font-light'>Nuestros principales</span> <br /> */}
          <span className='text-meditiva text-4xl xl:text-8xl font-bold'>
            Socios comerciales
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
            delay: 2000,
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
