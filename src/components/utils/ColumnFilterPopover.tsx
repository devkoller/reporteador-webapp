import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

type Props = {
  columnId: string;
  column: any;
  values: any[];
};

export const ColumnFilterPopover = ({ column, values }: Props) => {
  const [search, setSearch] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    // inicializar con los filtros aplicados previamente
    const current = column.getFilterValue() as string[] | undefined;
    if (current) setSelectedValues(current);
  }, []);

  const filteredValues = values.filter((val) =>
    val?.toString().toLowerCase().includes(search.toLowerCase())
  );

  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    if (selectedValues.length === 0) {
      column.setFilterValue(undefined);
    } else {
      column.setFilterValue(selectedValues);
    }
  };

  const clearFilter = () => {
    column.setFilterValue(undefined);
    setSelectedValues([]);
  };



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="ml-2">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2 space-y-2">
        <div className="flex justify-between items-center px-1 py-2 border-b">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            onClick={() => column.toggleSorting(false)}
          >
            🔼 Ascendente
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(true)}
          >
            🔽 Descendente
          </Button>
        </div>
        <Command>
          <CommandInput
            placeholder="Buscar..."
            value={search}
            onValueChange={setSearch}
          />
        </Command>
        <ScrollArea className="h-40">
          <Command>
            <CommandList>
              {filteredValues.map((value) => (
                <CommandItem key={value}>
                  <Checkbox
                    checked={selectedValues.includes(value)}
                    onCheckedChange={() => toggleValue(value)}
                    className="mr-2"
                    id={value.toString()}
                  />
                  <Label className="flex-1 truncate" htmlFor={value.toString()}>
                    {value.toString()}
                  </Label>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </ScrollArea>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={clearFilter}>
            Limpiar
          </Button>
          <Button size="sm" onClick={applyFilter}>
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
