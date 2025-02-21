import { ContratoType } from "./Columns"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"

type Props = {
  contrato: ContratoType | null
}


export const TabContrato = ({ contrato }: Props) => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>
          {contrato?.nombre}
        </PageHeaderHeading>
        <PageHeaderDescription>
        </PageHeaderDescription>
      </PageHeader>
    </>
  )
}
