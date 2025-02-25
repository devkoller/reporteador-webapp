import { ContratoType } from "./Columns"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"
import { Pie, PieChart, } from "recharts"
import { utils } from "@/utils"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  buying: {
    label: "Monto de compra ",
    color: "hsl(var(--chart-2))",
  },
  gain: {
    label: "Monto de ganancias",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


type chart1Type = {
  type: string
  value: number,
  fill: string
}

type Props = {
  contrato: ContratoType | null
  chart1: chart1Type[]
  total: number
}




export const TabContrato = ({ contrato, chart1, total }: Props) => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>
          {contrato?.nombre}
        </PageHeaderHeading>
        <PageHeaderDescription>
        </PageHeaderDescription>
      </PageHeader>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Ganancias</CardTitle>
          <CardDescription>{utils.formatCurrency(parseFloat(total.toFixed(2)))}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chart1} dataKey="value" label nameKey="type" />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
        </CardFooter>
      </Card >

    </>
  )
}
