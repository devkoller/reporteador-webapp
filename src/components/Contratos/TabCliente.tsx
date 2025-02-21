import { ContratoType } from "./Columns"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"

type Props = {
  contrato: ContratoType | null
}

export const TabCliente = ({ contrato }: Props) => {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>
          {contrato?.catCliente?.nombre}
        </PageHeaderHeading>
        <PageHeaderDescription>
        </PageHeaderDescription>
      </PageHeader>
    </div>
  )
}
