

import React, { forwardRef, useImperativeHandle, useMemo } from "react"
import {
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
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColumnFilterPopover } from "./ColumnFilterPopover"
import ExcelJS from "exceljs";


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
    multiSelect: FilterFn<unknown>
  }
}


function DataTableComponent<T>({
  columns,
  data,
  onRowClick = () => { },
  onRowDoubleClick = () => { },
  pageSize = 20,
}: DataTableProps<T>, ref: React.Ref<DataTableHandle<T>>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const multiSelectFilter: FilterFn<any> = (row, columnId, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    const cellValue = row.getValue(columnId);
    const val = cellValue === null || cellValue === "" ? null : cellValue;
    return filterValue.includes(val);
  };

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      multiSelect: multiSelectFilter, //define as a filter function that can be used in column definitions
    },
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


  const uniqueColumnValues = useMemo(() => {
    const filteredRows = table.getFilteredRowModel().rows;

    const valuesByColumn: Record<string, string[]> = {};

    columns.forEach((col) => {
      const id = col.id ?? (col as any).accessorKey;
      if (!id) return;

      const colValues = new Set<string>();
      filteredRows.forEach((row: any) => {
        colValues.add(row.getValue(id));
      });

      valuesByColumn[id] = Array.from(colValues).filter(Boolean);
    });

    return valuesByColumn;
  }, [table.getFilteredRowModel().rows]);



  async function exportToExcelExcelJS(table: any, filename = "export.xlsx") {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    const visibleColumns = table
      .getAllColumns()
      .filter((col: any) => col.getIsVisible() && col.id !== "actions");

    // Encabezados
    worksheet.addRow(visibleColumns.map((col: any) => col.columnDef.header));

    // Filas
    const rows = table.getFilteredRowModel().rows;

    rows.forEach((row: any) => {
      const rowData = row.getVisibleCells().map((cell: any) =>
        cell.getValue() ?? "(Sin datos)"
      );
      worksheet.addRow(rowData);
    });

    // Descargar
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }




  React.useEffect(() => {
    table.toggleAllRowsSelected(false)
  }, [data])



  return (
    <>
      <div className="mb-3 flex justify-end">
        <Button onClick={() => exportToExcelExcelJS(table, "export-seguro.xlsx")}>
          Exportar a Excel
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}

                    >
                      <div className="max-w-[200px] flex items-center space-x-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}

                        <ColumnFilterPopover
                          columnId={header.column.id}
                          column={header.column}
                          values={uniqueColumnValues[header.column.id] || []}
                        />
                      </div>
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
                        <div
                          className="max-w-[200px] truncate cursor-default"
                          title={String(cell.getValue())} // ← tooltip nativo del navegador
                        >

                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-between gap-4 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <span>
                Mostrando{' '}
                <strong>
                  {table.getRowModel().rows.length}
                </strong>{' '}
                de{' '}
                <strong>
                  {table.getFilteredRowModel().rows.length}
                </strong>{' '}
                resultados (total {data.length})
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            <PaginationControls table={table} />
          </div>

          {/* Panel derecho: paginación y salto */}
          <div className="flex xl:justify-end space-x-2">
            <div className="flex items-center gap-1">
              <span>Filas por página:</span>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={value => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecciona..." />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 50, 100].map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

function PaginationControls({ table }: { table: any }) {
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex

  // Ajusta cuántos “hermanos” mostrar alrededor de la página actual
  const siblingCount = 1

  const paginationRange = useMemo<(number | '...')[]>(() => {
    const totalNumbers = siblingCount * 2 + 5;
    // Si pocas páginas, muéstralas todas
    if (pageCount <= totalNumbers) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage + 1 - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + 1 + siblingCount, pageCount);

    const range: (number | '...')[] = [];
    range.push(1); // siempre incluye la primera

    // ellipsis si hay salto antes del bloque central
    if (leftSiblingIndex > 2) {
      range.push('...');
    }

    // páginas centrales: arrancan en al menos la 2 y van hasta la penúltima como máximo
    const start = Math.max(leftSiblingIndex, 2);
    const end = Math.min(rightSiblingIndex, pageCount - 1);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // ellipsis si faltan páginas antes de la última
    if (rightSiblingIndex < pageCount - 1) {
      range.push('...');
    }

    range.push(pageCount); // siempre incluye la última
    return range;
  }, [pageCount, currentPage, siblingCount]);


  return (
    <div className="flex items-center space-x-1">
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        « Primera
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        ‹
      </Button>

      {paginationRange.map((item, idx) =>
        item === '...' ? (
          <span key={idx} className="px-2">…</span>
        ) : (
          <Button
            key={idx}
            size="sm"
            variant={item - 1 === currentPage ? 'default' : 'outline'}
            onClick={() => table.setPageIndex(item - 1)}
          >
            {item}
          </Button>
        )
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        ›
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
      >
        Última »
      </Button>
    </div>
  )
}


const DataTable = forwardRef(DataTableComponent) as <T>(
  props: DataTableProps<T> & { ref?: React.Ref<DataTableHandle<T>> }
) => JSX.Element;

export { DataTable };