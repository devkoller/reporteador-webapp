import { ColumnDef } from "@tanstack/react-table"
import { UserAttributes } from "@/types"
import { Button } from "@/components/ui/button"
import { Edit, Hospital } from "lucide-react"



export const Columns: ColumnDef<UserAttributes>[] = [
  {
    accessorKey: "fullName",
    header: "Nombre",
  },
  {
    accessorKey: "username",
    header: "RUD",
  },
]

export const getColumnsWithActions = ({ getRow, getRow2 }: {
  getRow: (row: UserAttributes) => void
  getRow2: (row: UserAttributes) => void
}) => {
  return [
    ...Columns,
    {
      accessorKey: "actions",
      header: "Acciones",
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }: { row: any }) => {
        return (
          <div className="flex items-center space-x-2">
            <Button onClick={() => getRow(row.original)} variant="ghost" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button onClick={() => getRow2(row.original)} variant="ghost" className="h-8 w-8 p-0">
              <Hospital className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]
}