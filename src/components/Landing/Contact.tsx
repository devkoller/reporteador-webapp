import { CiMail, CiMapPin, CiPhone } from 'react-icons/ci'


export const Contact = () => {
  const goTo = () => {
    let ele = document.getElementById('maps')
    if (ele) {
      ele.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
  return (
    <div className=''>
      <div className='w-10/12 mx-auto py-5'>
        <ul className='flex flex-wrap items-center gap-5 xl:text-2xl font-bold'>
          <li
            className='flex gap-3 items-center hover:text-meditiva duration-500 hover:cursor-pointer'
            onClick={goTo}
          >
            <span className='text-meditiva text-4xl'>
              <CiMapPin />
            </span>
            <span>Volcán Telica #5044</span>
          </li>
          <li className='flex gap-3 items-center hover:text-meditiva duration-500'>
            <span className='text-meditiva text-4xl'>
              <CiMail />
            </span>
            <a href='mailto:contactomeditiva@gmail.com'>
              contactomeditiva@gmail.com
            </a>
          </li>
          <li className='flex gap-3 items-center hover:text-meditiva duration-500'>
            <span className='text-meditiva text-4xl'>
              <CiPhone />
            </span>
            <a href='tel:+3310012561'>33 10 01 25 61</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
