import banner1 from '@/assets/images/meditiva/banner1.jpg'
import { Shape1 } from '@/assets/images/SVGComponents/Shapes'


type BannerType = {
  text: string
  title: string
}

const data = {
  text: 'Material de Curación, Equipo Médico e Instrumental Quirúrgico',
  title: 'de la más alta calidad'
}

export const Banner = () => {
  return <section className='mb-10'>{<_SingleBanner element={data} />}</section>
}

const _SingleBanner = ({ element }: { element: BannerType }) => {
  return (
    <div
      className={`min-h-[600px] h-screen w-screen flex justify-center items-center relative
      before:content-[''] before:absolute before:z-10
      before:top-0
      before:w-full before:h-full
      before:bg-black before:opacity-30
      overflow-hidden
    `}
    >
      <img
        src={banner1}
        alt=''
        className='absolute z-0 w-full h-full animate-banner'
      />
      <div className='w-screen px-10 text-center text-white uppercase whitespace-normal flex flex-col gap-5 relative z-20'>
        <span className='text-md lg:text-6xl break-words'>
          {element.text} {element.title}
        </span>
        <h1 className='text-3xl lg:text-8xl'>
          <span className='font-bold'>{element.title}</span>
        </h1>
      </div>
      <Shape1 className='absolute bottom-0 left-0 w-full z-10' />
      {/* <img
        src={shape}
        alt=''
        className='absolute bottom-0 left-0 w-full z-10'
      /> */}
    </div>
  )
}
