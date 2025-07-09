import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Filter, PlusCircle, SlidersHorizontal, X } from "lucide-react"
import { ActiveFilters } from "./active-filters"
import { FastFilters } from "./fast-filters"
import { getAgeGroup } from "@/utils/functions"
import { Label } from "@/components/ui/label"


type genericType = {
  [key: string]: any;
}

export interface FiltersPanelProps<T> {
  filteredData: T[];                                      // cualquier array de T
  filters: Partial<Record<keyof T, genericType>>;    // tu estado de filtros
  searchFilters: Partial<Record<keyof T, genericType>>; // tu estado de filtros de búsqueda
  handleInclude: (key: keyof T, value: string) => void; // función para incluir un filtro
  handleExclude: (key: keyof T, value: string) => void; // función para excluir un filtro
  handleSearchInclude: (key: keyof T, value: string) => void; // función para incluir un filtro de búsqueda
  handleSearchExclude: (key: keyof T, value: string) => void; // función para excluir un filtro de búsqueda
  fastFiltersKeys?: Partial<keyof T>[]; // si quieres mostrar los filtros rápidos
}

export const FiltersPanel = <T,>({
  filteredData,
  filters,
  searchFilters,
  handleInclude,
  handleExclude,
  handleSearchInclude,
  handleSearchExclude,
  fastFiltersKeys
}: FiltersPanelProps<T>) => {
  // console.log("🚀 > FilterPanel.tsx:46 > filters:", filters);
  const [customFilterValue, setCustomFilterValue] = useState("")
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<any>("include")

  const handleAddCustomFilter = () => {
    if (selectedColumn && customFilterValue.trim()) {
      if (filterType === "include") {
        handleSearchInclude(selectedColumn as keyof T, customFilterValue.trim())
      } else {
        handleSearchExclude(selectedColumn as keyof T, customFilterValue.trim())
      }
      setCustomFilterValue("")
    }
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex gap-2 items-center">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Filtros:</span>
        </div>

        {/* Column selection dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2 items-center">
              <Filter className="h-4 w-4" />
              Agregar filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtros por columna</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>

              {Object.keys(filters).map((key, index) => {

                let values = filteredData.reduce((acc: string[], item: any) => {
                  let value = item[key as keyof T];
                  if (key === 'AgeGroup') {
                    value = getAgeGroup(item['fecha_nac'] as string)
                  }
                  if (key === 'Hora') {
                    value = item['Hora'].split(':')[0]
                  }
                  if (typeof value === "string" && !acc.includes(value)) {
                    acc.push(value);
                  }
                  return acc;
                }, []);



                return (<DropdownMenuSub key={index}>
                  <DropdownMenuSubTrigger>{key}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {
                          setSelectedColumn(key)
                        }}>
                          <span>Filtro personalizado</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {values.map((value, index) => {
                          return (
                            <DropdownMenuItem
                              key={index}
                              onClick={() => {
                                handleInclude(key as keyof T, value)
                              }}
                            >
                              Incluir: {value} [{filters[key as keyof T]?.include?.includes(value) ? "✓" : ""}]
                            </DropdownMenuItem>
                          )
                        })}
                        <DropdownMenuSeparator />
                        {values.map((value, index) => {
                          return (
                            <DropdownMenuItem
                              key={index}
                              onClick={() => {
                                handleExclude(key as keyof T, value)
                              }}
                            >
                              Excluir: {value} [{filters[key as keyof T]?.exclude?.includes(value) ? "✓" : ""}]
                            </DropdownMenuItem>
                          )
                        })}
                      </DropdownMenuGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>)
              })}

            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Custom filter input */}
        {selectedColumn && (
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {filterType === "include" ? "Incluir" : "Excluir"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterType("include")}>Incluir</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("exclude")}>Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="font-medium capitalize">{selectedColumn}:</span>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                placeholder={`Filtrar por ${selectedColumn}...`}
                value={customFilterValue}
                onChange={(e) => setCustomFilterValue(e.target.value)}
                className="w-full sm:w-auto min-w-[200px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCustomFilter()
                }}
              />

              <Button size="sm" onClick={handleAddCustomFilter}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelectedColumn(null)
                setCustomFilterValue("")
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

        )}
      </div>
      <div>
        <ActiveFilters
          filters={filters}
          searchFilters={searchFilters}
          handleInclude={handleInclude}
          handleExclude={handleExclude}
          handleSearchInclude={handleSearchInclude}
          handleSearchExclude={handleSearchExclude}
        />
      </div>
      <div className="space-y-2">
        <Label className="font-medium">Filtros rápidos:</Label>
        <FastFilters
          filteredData={filteredData}
          fastFiltersKeys={fastFiltersKeys}
          handleInclude={handleInclude}
        />
      </div>
    </div>
  );
};
