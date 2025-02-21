import { AritculosType } from "./Columns"

type FormCatalagoProps = {
  selectedArticulo: AritculosType | null
  update: () => void
  closeSheet: () => void
}


export const FormCatalago = ({ }: FormCatalagoProps) => {
  return (
    <div>FormCatalago</div>
  )
}
