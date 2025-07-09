import { AppointmentType } from "@/types"
import { DataTable } from "@/components/utils";
import { Columns } from "./columns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { usePost } from "@/hooks";
import { Button } from "@/components/ui/button";


interface DataProps {
  data: AppointmentType[];
}

export const Data = ({ data }: DataProps) => {
  const { execute, loading } = usePost();


  const handleExcel = async () => {
    const filteredData = data.map(item => {
      const filteredItem: any = {};
      Columns.forEach(col => {
        if ("accessorKey" in col) {
          filteredItem[col.accessorKey as keyof AppointmentType] = item[col.accessorKey as keyof AppointmentType]?.toString().trim();
        }
      });
      return filteredItem;
    });


    execute({
      url: "/api/patients/report/excel",
      body: {
        columns: Columns.map(col => ("accessorKey" in col ? col.accessorKey : undefined)),
        data: filteredData,
        title: "Citas",
      },
    }).then((resp) => {
      const byteCharacters = atob(resp.data)
      const byteNumbers = new Uint8Array(byteCharacters.length)

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }

      const blob = new Blob([byteNumbers], { type: "application/xlsx" })
      const url = URL.createObjectURL(blob);


      const a = document.createElement('a');
      a.href = url;
      a.download = 'Citas.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }).catch((error) => {
      console.log("🚀 > Data.tsx:51 > handleExcel > error:", error);

    })
  }

  // const handleReport = async () => {
  //   execute({
  //     url: "/api/patients/report/pdf",
  //     body: {
  //       columns: Columns.map(col => ("accessorKey" in col ? col.accessorKey : undefined)),
  //       data
  //     },
  //   }).then((res) => {
  //     const url = window.URL.createObjectURL(new Blob([res.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `citas.xlsx`);
  //     document.body.appendChild(link);
  //     link.click();
  //   })
  // }


  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Button
          className="btn btn-primary"
          onClick={handleExcel}
          disabled={loading}
        >
          Descargar Excel
        </Button>

      </div>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-sm font-medium">Tabla de datos</CardTitle>
          <CardDescription>
            Tabla de citas. Muestra la información detallada de cada cita programada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={Columns}
            data={data}
          />
        </CardContent>
      </Card>
    </>
  )
}
