"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

type genericType = {
  [key: string]: any;
}

interface ActiveFiltersProps<T> {
  filters: Partial<Record<keyof T, genericType>>;
  searchFilters: Partial<Record<keyof T, genericType>>;
  handleInclude: (key: keyof T, value: string) => void; // función para incluir un filtro
  handleExclude: (key: keyof T, value: string) => void; // función para excluir un filtro
  handleSearchInclude: (key: keyof T, value: string) => void; // función para incluir un filtro de búsqueda
  handleSearchExclude: (key: keyof T, value: string) => void; // función para excluir un filtro de búsqueda
}

export const ActiveFilters = <T,>({
  filters,
  searchFilters,
  handleInclude,
  handleExclude,
  handleSearchInclude,
  handleSearchExclude, }: ActiveFiltersProps<T>) => {

  let countFilters = (Object.keys(filters) as (keyof T)[]).reduce((acc, key) => {
    const filter = filters[key];
    if (filter && filter.include && filter.include.length > 0) {
      acc += filter.include.length;
    }
    if (filter && filter.exclude && filter.exclude.length > 0) {
      acc += filter.exclude.length;
    }
    return acc;
  }, 0);

  let countSearchFilters = (Object.keys(searchFilters) as (keyof T)[]).reduce((acc, key) => {
    const filter = searchFilters[key];
    if (filter && filter.include && filter.include.length > 0) {
      acc += 1;
    }
    if (filter && filter.exclude && filter.exclude.length > 0) {
      acc += 1;
    }
    return acc;
  }, 0);

  if (countFilters === 0 && countSearchFilters === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium text-muted-foreground">Filtros activos:</span>

      {Object.keys(filters).map((key) => {
        const filterObj = filters[key as keyof T] || {};
        return Object.keys(filterObj).map((filterType) => {
          const filterValues = filterObj[filterType as keyof genericType];
          if (filterValues && filterValues.length > 0) {
            return filterValues.map((value: string, index2: number) => (
              <Badge
                key={`${key}-${filterType}-${index2}`}
                variant={filterType === "include" ? "default" : "destructive"}
                className="flex items-center gap-1 px-3 py-1.5"
              >
                <span className="capitalize">{key}</span>
                <span className="mx-1">{filterType === "include" ? "Incluye" : "Excluye"}</span>
                <span className="font-medium">{value}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => {
                    if (filterType === "include") {
                      handleInclude(key as keyof T, value);
                    } else {
                      handleExclude(key as keyof T, value);
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover filtro</span>
                </Button>
              </Badge>
            ))
          }
          return null;
        })
      })}

      {Object.keys(searchFilters).map((key) => {
        const filterObj = searchFilters[key as keyof T] || {};
        return Object.keys(filterObj).map((filterType) => {
          const filterValues = filterObj[filterType as keyof genericType];
          if (filterValues && filterValues.length > 0) {
            return (
              <Badge
                key={`${key}-${filterType}`}
                variant={filterType === "include" ? "default" : "destructive"}
                className="flex items-center gap-1 px-3 py-1.5"
              >
                <span className="capitalize">{key}</span>
                <span className="mx-1">{filterType === "include" ? "Incluye" : "Excluye"}</span>
                <span className="font-medium">{filterValues}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => {
                    if (filterType === "include") {
                      handleSearchInclude(key as keyof T, '');
                    } else {
                      handleSearchExclude(key as keyof T, '');
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover filtro</span>
                </Button>
              </Badge>
            )
          }
          return null;
        })
      }
      )}


      <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => {
        Object.keys(filters).forEach((key) => {
          const filterObj = filters[key as keyof T] || {};
          Object.keys(filterObj).forEach((filterType) => {
            const filterValues = filterObj[filterType as keyof genericType];
            if (filterValues && filterValues.length > 0) {
              filterValues.forEach((value: string) => {
                if (filterType === "include") {
                  handleInclude(key as keyof T, value);
                } else {
                  handleExclude(key as keyof T, value);
                }
              });
            }
          });
        });

        Object.keys(searchFilters).forEach((key) => {
          const filterObj = searchFilters[key as keyof T] || {};
          Object.keys(filterObj).forEach((filterType) => {
            const filterValues = filterObj[filterType as keyof genericType];
            if (filterValues && filterValues.length > 0) {
              if (filterType === "include") {
                handleSearchInclude(key as keyof T, '');
              } else {
                handleSearchExclude(key as keyof T, '');
              }
            }
          });
        });
      }}>
        Quitar todos
      </Button>
    </div>
  )
}
