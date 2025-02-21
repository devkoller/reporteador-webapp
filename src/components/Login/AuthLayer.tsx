import login from '@/assets/images/meditiva/login.jpg'
import shape from '@/assets/images/shapes/6.png'

type AuthLayerProps = {
  children: React.ReactNode
}

export const AuthLayer = ({ children }: AuthLayerProps) => {
  return (
    <div className='w-full h-screen overflow-hidden flex items-center relative bg-slate-100'>
      <img src={shape} alt='' className='absolute w-full bottom-0 -z-1 ' />
      <div className='w-10/12 lg:w-8/12 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:rounded-lg overflow-hidden h-5/6 relative z-10'>
        <div>{children}</div>
        <div className='hidden lg:block relative after:content-[""] after:absolute after:top-0 after:left-0 after:z-10 after:bg-gradient-to-r after:from-cyan-500/50 after:to-blue-500/50 after:w-full after:h-full   '>
          <img
            src={login}
            alt=''
            className='object-cover object-right h-full relative z-0'
          />
        </div>
      </div>
    </div>
  )
}
