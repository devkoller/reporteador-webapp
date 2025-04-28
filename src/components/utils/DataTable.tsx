

import React, { forwardRef, useImperativeHandle } from "react"
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  FilterFn,
} from "@tanstack/react-table"
import { rankItem } from '@tanstack/match-sorter-utils';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface DataTableHandle<T> {
  getSelectedRows?: () => T[];
}

interface DataTableProps<T> extends DataTableHandle<T> {
  columns: ColumnDef<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  onRowDoubleClick?: (row: T) => void
  pageSize?: number
}

declare module '@tanstack/react-table' {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
}


const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({ itemRank })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function DataTableComponent<T>({
  columns,
  data,
  onRowClick = () => { },
  onRowDoubleClick = () => { },
  pageSize = 10,
}: DataTableProps<T>, ref: React.Ref<DataTableHandle<T>>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    globalFilterFn: 'fuzzy',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,      // ← aquí pones las filas por página que quieras
        pageIndex: 0,
      },
    },
  })

  // Exponemos la función para obtener las filas seleccionadas
  useImperativeHandle(ref, () => ({
    getSelectedRows: () =>
      table.getSelectedRowModel().flatRows.map((row) => row.original),
  }));


  React.useEffect(() => {
    table.toggleAllRowsSelected(false)
  }, [data])



  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}

                  >
                    <div {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}>

                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    <>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                  }}
                  onDoubleClick={() => {
                    onRowDoubleClick(row.original)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={() => {
                      if (cell.column.id !== "actions") {
                        // table.toggleAllRowsSelected(false)

                        // row.toggleSelected()
                        onRowClick(row.original)
                      }
                    }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center border-t justify-between space-x-2 py-4 px-2" >
        <div>
          <p className="flex items-center gap-1">
            <span>Pagina</span>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </p>
          <p>
            <strong>
              {data.length}
            </strong>{' '}
            resultados totales
          </p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}




function Filter({ column }: { column: Column<any, unknown> }) {
  // Determina el tipo de filtro configurado en la columna, por defecto es 'text'
  const filterType = (column.columnDef as any)?.meta?.filterType || 'text';

  if (filterType === 'select') {
    // Para el select, obtenemos las opciones configuradas en la columna
    const options = (column.columnDef as any)?.meta?.filterOptions || [];
    return (
      <>
        <Select value={(column.getFilterValue() ?? '') as string} onValueChange={(value) => {
          if (value === 'all') {
            column.setFilterValue(undefined)
          } else {
            column.setFilterValue(value)
          }
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    );
  } else {
    // Por defecto, se usa el input de texto con debounce
    return (
      <DebouncedInput
        type="text"
        value={(column.getFilterValue() ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Buscar...`}
        className="w-36 border shadow rounded"
      />
    );
  }
}



function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}


const DataTable = forwardRef(DataTableComponent) as <T>(
  props: DataTableProps<T> & { ref?: React.Ref<DataTableHandle<T>> }
) => JSX.Element;

export { DataTable };