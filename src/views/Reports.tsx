import { Layout } from '@/components/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Inventario, Movimientos, CostoCompra, CostoVenta } from '@/components/Reports'



export const Reports = () => {
  const tabs = [
    {
      title: 'Inventario',
      value: 'inventory',
      content: <Inventario />
    },
    {
      title: 'Movimientos',
      value: 'movement',
      content: <Movimientos />
    },
    {
      title: 'Costo de Compra',
      value: 'costo-compra',
      content: <CostoCompra />
    },
    {
      title: 'Costo de Venta',
      value: 'costo-venta',
      content: <CostoVenta />
    }
  ]


  const printTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <TabsTrigger key={index} value={tab.value}>{tab.title}</TabsTrigger>
      )
    })
  }

  const printContent = () => {
    return tabs.map((tab, index) => {
      return (
        <TabsContent key={index} value={tab.value}>{tab.content}</TabsContent>
      )
    })
  }

  return (
    <Layout>
      <div className='className="flex-1 space-y-1 px-2 pt-6"'>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Reportes</h2>
          <div className="flex items-center space-x-2">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button>Download</Button> */}
          </div>
        </div>
        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            {printTabs()}
          </TabsList>
          {printContent()}
        </Tabs>
      </div>
    </Layout>
  )
}
