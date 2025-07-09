"use client"

import { Button } from "@/components/ui/button"
import { getAgeGroup } from "@/utils/functions"


interface FastFiltersProps<T> {
  filteredData: T[];
  fastFiltersKeys?: Partial<keyof T>[]; // tu estado de filtros
  handleInclude: (key: keyof T, value: string) => void; // función para incluir un filtro
}

export const FastFilters = <T,>({
  filteredData,
  fastFiltersKeys,
  handleInclude,
}: FastFiltersProps<T>) => {

  if (!fastFiltersKeys) {
    return null
  }


  return (
    <div className="flex flex-wrap gap-2 items-center">
      {fastFiltersKeys?.map((key) => {
        const filterObj = filteredData.map((item) => {
          let i: any = item[key]
          if (key === "AgeGroup") {
            i = getAgeGroup((item as Record<string, any>)['fecha_nac'] as string)
          }

          return i
        });
        const uniqueValues = Array.from(new Set(filterObj));

        return uniqueValues.map((value) => (
          <Button
            key={`${String(key)}-${value}`}
            variant="outline"
            size="sm"
            onClick={() => handleInclude(key as keyof T, String(value))}
          >
            {`${String(key)}: ${value}`}
          </Button>
        ));

      })}
    </div>
  )
}
