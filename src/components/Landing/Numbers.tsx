

import { CiCalendar } from 'react-icons/ci'
import { GiMexico } from 'react-icons/gi'
import { GiCrossedBones } from 'react-icons/gi'
import { FaUsers } from 'react-icons/fa'
import productos from '@/assets/images/meditiva/productos.png'

const data = [
  {
    icon: <CiCalendar />,
    number: 7,
    text: 'Años en el mercado'
  },
  {
    icon: <GiMexico />,
    number: 12,
    text: 'Estados de la república'
  },
  {
    icon: <GiCrossedBones />,
    number: 2000,
    text: 'Productos en catálogo',
    img: productos
  },
  {
    icon: <FaUsers />,
    number: 4000,
    text: 'Clientes satisfechos'
  }
]


export const Numbers = () => {

  const print = () => {
    return data.map((item, index) => {
      return <_SingleNumber element={item} key={index} />
    })
  }
  return (
    <section className='w-10/12 mx-auto relative z-10'  >
      <div className='bg-meditiva2 px-10 py-20 rounded-md '>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-20'>
          {print()}
        </div>
      </div>
    </section>
  )
}

type SingleNumberProps = {
  element: {
    icon: JSX.Element
    number: number
    text: string
    img?: string
  }
}


const _SingleNumber = ({ element }: SingleNumberProps) => {
  return (
    <div className='flex flex-col items-center gap-3' data-aos='flip-up'>
      <div
        className={`bg-meditiva rounded-full p-5 relative mb-5
          after:content-['']
          after:bg-meditiva after:w-5 after:h-5 after:absolute after:-bottom-2 after:[left:calc(50%-.625rem)]
          after:transform after:rotate-45
        `}
      >
        {element.img && <img src={element.img} className='w-28' />}
        {!element.img && (
          <span className='text-8xl text-white'>{element.icon}</span>
        )}
      </div>
      <div className='flex flex-col items-center gap-3 text-white'>
        <h2 className='text-4xl font-bold'>+ {element.number}</h2>
        <p className='text-2xl font-bold text-center'>{element.text}</p>
      </div>
    </div>
  )
}
