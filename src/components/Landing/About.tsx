import { FaCheck } from "react-icons/fa"
const list = [
  {
    name: 'Columna'
  },
  {
    name: 'Cadera y rodilla'
  },
  {
    name: 'Trauma y fijadores'
  },
  {
    name: 'Maxilofacial'
  },
  {
    name: 'Laboratorio'
  },
  {
    name: 'Material de curación'
  },
  {
    name: 'Respiratorio'
  },
  {
    name: 'Hemodinamia'
  },
  {
    name: 'Equipo medico'
  },
  {
    name: 'Higiene de manos'
  }
]

export const About = () => {

  const printList = () => {
    return list.map((item, index) => {
      return (
        <li
          className={`
        w-full
        lg:w-5/12 ps-5
        relative
        text-xl
      `}
          key={index}
        >
          <span className="absolute bg-meditiva w-6 h-6 text-white rounded-full -left-2 top-1 flex justify-center items-center">
            <FaCheck className='inline-block' />
          </span>
          {item.name}
        </li>
      )
    })
  }
  return (
    <div className='w-8/12 mx-auto flex flex-wrap' data-aos='fade-right'>
      <section className='xl:w-full mb-5'>
        <div>
          <h2 className='text-meditiva text-xl lg:text-4xl mb-3'>
            Acerca de nosotros
          </h2>
          <h3 className='text-3xl lg:text-6xl font-bold mb-3'>
            Meditiva Medical es una empresa 100% Mexicana
          </h3>
          <p className='text-justify mb-3 lg:text-2xl text-slate-700'>
            Nos encargamos proporcionar la mejor tecnología e innovación en
            equipo médico de Traumatologia y Ortopedia, Neuro, Material de
            Curación e Instrumental Quirúrgico de la más alta calidad para
            satisfacer las necesidades del mercado.
          </p>
        </div>
        <div className=''>
          <h3 className='text-2xl font-bold mb-3'>División Corporativa</h3>
          <ul className='flex flex-wrap gap-3 justify-center'>{printList()}</ul>
        </div>
      </section>
    </div>
  )
}
