import { FaSpinner } from 'react-icons/fa'

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <FaSpinner className="animate-spin h-8 w-8" />
    </div>
  )
}
