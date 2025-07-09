// src/hooks/useDynamicFilters.ts
import { useState, useMemo, useCallback } from 'react';

export interface ColumnFilter {
  include: string[];
  exclude: string[];
}

export interface SearchFilter {
  include?: string;
  exclude?: string;
}

export interface UseDynamicFiltersOptions<T> {
  getValue?: (item: T, key: keyof T) => string;
  extraFilter?: (item: T) => boolean;
}

export function useDynamicFilters<T extends Record<string, any>>(
  rawData: T[],
  filterableKeys: (keyof T)[],
  options: UseDynamicFiltersOptions<T> = {}
) {
  // exact-match filters
  const [filters, setFilters] = useState<Record<keyof T, ColumnFilter>>(
    Object.fromEntries(
      filterableKeys.map((k) => [k, { include: [], exclude: [] }])
    ) as unknown as Record<keyof T, ColumnFilter>
  );

  // text-based filters (now with include/exclude)
  const [searchFilters, setSearchFilters] = useState<
    Partial<Record<keyof T, SearchFilter>>
  >({});

  // toggle exact include/exclude
  const toggleFilterValue = useCallback(
    (key: keyof T, value: string, mode: 'include' | 'exclude') => {
      setFilters((prev) => {
        const col = prev[key] || { include: [], exclude: [] };
        const arr = col[mode];
        const updated = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value];
        return { ...prev, [key]: { ...col, [mode]: updated } };
      });
    },
    []
  );

  const handleInclude = useCallback(
    (key: keyof T, value: string) => toggleFilterValue(key, value, 'include'),
    [toggleFilterValue]
  );
  const handleExclude = useCallback(
    (key: keyof T, value: string) => toggleFilterValue(key, value, 'exclude'),
    [toggleFilterValue]
  );

  // set text include/exclude
  const handleSearchInclude = useCallback(
    (key: keyof T, text: string) =>
      setSearchFilters((prev) => {
        const sf = prev[key] || {};
        return { ...prev, [key]: { ...sf, include: text } };
      }),
    []
  );
  const handleSearchExclude = useCallback(
    (key: keyof T, text: string) =>
      setSearchFilters((prev) => {
        const sf = prev[key] || {};
        return { ...prev, [key]: { ...sf, exclude: text } };
      }),
    []
  );

  // filtering logic
  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      // 0) extra filter hook
      if (options.extraFilter && !options.extraFilter(item)) {
        return false;
      }

      // 1) exact-match include/exclude
      for (const key of filterableKeys) {
        const rawVal = options.getValue
          ? options.getValue(item, key)
          : ((item[key] as any) || '');
        const val = String(rawVal);

        const col = filters[key] || { include: [], exclude: [] };
        if (col.include.length > 0 && !col.include.includes(val)) {
          return false;
        }
        if (col.exclude.length > 0 && col.exclude.includes(val)) {
          return false;
        }

        // 2) text-based include/exclude
        const sf = searchFilters[key];
        if (sf?.include && !val.toLowerCase().includes(sf.include.toLowerCase())) {
          return false;
        }
        if (sf?.exclude && val.toLowerCase().includes(sf.exclude.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [rawData, filters, searchFilters, filterableKeys, options]);

  return {
    filteredData,
    filters,
    searchFilters,
    handleInclude,
    handleExclude,
    handleSearchInclude,
    handleSearchExclude,
  };
}
