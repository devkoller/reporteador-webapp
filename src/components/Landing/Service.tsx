
import columna from '@/assets/images/products/columna.png'
import cadera from '@/assets/images/products/cadera.png'
import trauma from '@/assets/images/products/trauma.png'
import maxilo from '@/assets/images/products/maxilo.png'
import estetoscopio from '@/assets/images/products/estetoscopio.png'
import hemo from '@/assets/images/products/hemo.png'
import jabon from '@/assets/images/products/jabon.png'
import laboratorio from '@/assets/images/products/laboratorio.png'
import nebulizador from '@/assets/images/products/nebulizador.png'
import vendaje from '@/assets/images/products/vendaje.png'
import { FaCheck } from "react-icons/fa"



const data = [
  {
    icon: columna,
    title: 'Columna',
    text: 'Comprometidos en brindar servicios neuroquirúrgicos  con soluciones inmediatas, proponiendo el uso de alta tecnología médica y biológicos Vanguardistas, mejorando y prolongando la calidad de vida de las personas.',
    list: [
      'Neuro',
      'Columna minima invasión',
      'Columna cervical',
      'Columna lumbar',
      'Biológicos'
    ]
  },
  {
    icon: cadera,
    title: 'Cadera y rodilla',
    text: 'Dedicados al reemplazo articular, ofreciendo soluciones en artroplastia total de rodilla y cadera.',
    list: [
      'Cementada',
      'No cementada',
      'Revisión',
      'A3 GT - sistema de rodilla',
      'ACCK - sistema de rodilla'
    ]
  },
  {
    icon: trauma,
    title: 'Trauma y fijadores',
    text: 'Diseñadors para el tratamiento de fracturas, osteotomías o artrodesis del sistema músculo esquelético de forma externa.',
    list: [
      'Miembro superior',
      'Miembro inferior',
      'Clavos intramedulares',
      'Pediátricos',
      'Cardiotorácicos'
    ]
  },
  {
    icon: maxilo,
    title: 'Maxilofacial',
    text: 'Diseñado para la atención en cráneo maxilofacial que fija de forma rígida de las fracturas.',
    list: [
      'Placas',
      'Tornillos',
      'Mallas',
      'Rejillas',
      'Implantes personalizados'
    ]
  },
  {
    icon: laboratorio,
    title: 'Laboratorio',
    text: 'Comprometidos en brindar servicios de laboratorio con soluciones inmediatas, proponiendo el uso de alta tecnología y equipos vanguardistas, mejorando la precisión y rapidez en los diagnósticos para la salud de las personas.',
    list: [
      'Analizadores hematológicos',
      'Reactivos de bioquímica',
      'Kits de diagnóstico molecular',
      'Equipos de inmunoensayo',
      'Controles y calibradores'
    ]
  },
  {
    icon: vendaje,
    title: 'Material de curación',
    text: 'Comprometidos en proveer material de curación con soluciones inmediatas, ofreciendo productos vanguardistas que facilitan la atención y aceleran la recuperación, mejorando la calidad de vida de los pacientes.',
    list: [
      'Gasas estériles',
      'Vendas elásticas',
      'Apósitos adhesivos',
      'Suturas quirúrgicas',
      'Esparadrapos hipoalergénicos'
    ]
  },
  {
    icon: nebulizador,
    title: 'Respiratorio',
    text: 'Comprometidos en ofrecer soluciones inmediatas en el área respiratoria, proponiendo el uso de equipos y productos vanguardistas que optimizan el tratamiento y mejoran la calidad de vida de los pacientes con afecciones pulmonares.',
    list: [
      'Ventiladores mecánicos',
      'Nebulizadores',
      'Mascarillas de oxígeno',
      'Humidificadores',
      'Aspiradores de secreciones'
    ]
  },
  {
    icon: hemo,
    title: 'Hemodinamia',
    text: 'Hemodinamia Comprometidos en brindar servicios hemodinámicos con soluciones inmediatas, proponiendo el uso de alta tecnología médica y procedimientos vanguardistas, mejorando y prolongando la calidad de vida de las personas.',
    list: [
      'Cateterismo cardíaco',
      'Angioplastia coronaria',
      'Implante de stents',
      'Estudio electrofisiológico',
      'Intervenciones vasculares mínimamente invasivas'
    ]
  },
  {
    icon: estetoscopio,
    title: 'Equipo medico',
    text: 'Comprometidos en ofrecer soluciones inmediatas mediante la provisión de equipos médicos de alta tecnología, proponiendo productos vanguardistas que mejoran la atención y los resultados en el cuidado de la salud de las personas.',
    list: [
      'Monitores de signos vitales',
      'Respiradores mecánicos',
      'Desfibriladores automáticos',
      'Bombas de infusión',
      'Equipos de diagnóstico por imagen'
    ]
  },
  {
    icon: jabon,
    title: 'Higiene de manos',
    text: 'Comprometidos en promover la higiene de manos con soluciones inmediatas, proponiendo el uso de técnicas y productos vanguardistas, mejorando y protegiendo la salud de las personas en todos los entornos.',
    list: [
      'Jabón antimicrobiano',
      'Soluciones a base de alcohol',
      'Toallas desinfectantes',
      'Dispensadores automáticos',
      'Cremas hidratantes para cuidado de la piel'
    ]
  }
]

export const Service = () => {

  const print = () => {
    return data.map((item, index) => {
      return <_SingleService element={item} key={index} index={index} />
    })
  }
  return (
    <section className='w-10/12 mx-auto mb-5'>
      <div>
        <h1 className='text-4xl text-center my-10'>Nuestros productos</h1>
      </div>
      <ul className='flex flex-wrap justify-center gap-10 [counter-reset:section]'>
        {print()}
      </ul>
    </section>
  )
}

type SingleServiceProps = {
  element: {
    icon: string
    title: string
    text: string
    list: string[]
  }
  index: number
}


const _SingleService = ({ element, index }: SingleServiceProps) => {
  return (
    <li
      className={`
      bg-white p-10 w-full xl:w-5/12 flex flex-col gap-5 relative rounded-md
        before:[counter-increment:section]
        before:content-[counter(section)]
        before:text-slate-50 before:text-8xl before:font-bold 
        before:absolute before:top-20 before:right-10 lg:before:right-20

    `}
      data-aos={`${index % 2 == 0 ? 'fade-right' : 'fade-left'}`}
    >
      <div className='min-h-40'>
        <img src={element.icon} alt='' className='w-6/12' />
        {/* <span className='text-8xl text-meditiva'>{element.icon}</span> */}
      </div>
      <div>
        <h2 className='text-2xl font-bold mb-3'>{element.title}</h2>
        <p className='text-justify'>{element.text}</p>
      </div>
      <ul className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
        {element.list.map((item, index) => {
          return (
            <li
              key={index}
              className={`
                relative ps-5
                text-xl
                before:content-["\\2713"] before:text-meditiva before:flex 
                before:justify-center before:items-center
                before:absolute
                before:w-5 before:h-5
                before:rounded-full
                before:-left-1
                before:top-1
          `}
            >
              <span className="absolute text-meditiva w-6 h-6 rounded-full -left-2 top-1 flex justify-center items-center">
                <FaCheck className='inline-block' />
              </span>
              {item}
            </li>
          )
        })}
      </ul>
    </li>
  )
}