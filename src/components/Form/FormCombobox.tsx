
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState, useMemo } from 'react'

type OptionsType = {
  label: string
  value: string | number
}


type FormComboboxProps = {
  control: any
  label?: string
  name: string
  description?: string
  placeholder?: string
  required?: boolean
  option?: OptionsType[]
  needFilter?: boolean
  onChange?: (value: any) => void
  setValue: (name: any, value: any) => void
}
import { cn } from "@/lib/utils"



export const FormCombobox = ({ control, label, name, description, required, needFilter, option = [], setValue, onChange }: FormComboboxProps) => {
  const [filterText, setFilterText] = useState('')

  const filteredOptions = useMemo(
    () => {
      if (!filterText && needFilter) return []
      return option.filter(item => {
        let label = item?.label || ''
        if (typeof label !== 'string') {
          label = String(label)
        }
        return label.toLowerCase().includes(filterText.toLowerCase())
      }
      )
    },
    [filterText, option]
  )


  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-center max-w-full overflow-hidden space-y-4">
          {label && <FormLabel>{label}
            {required && <sup className="text-red-500">*</sup>}
          </FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full truncate justify-between",
                    !field.value && "text-muted-foreground truncate"
                  )}
                >
                  <span className="w-96 flex justify-start truncate overflow-hidden">
                    {field.value
                      ? option.find(
                        (item) => item.value === field.value
                      )?.label
                      : "Selecciona una opción"}
                  </span>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar..."
                  className="h-9"
                  // Actualizamos el estado cuando el usuario escribe.
                  value={filterText}
                  onValueChange={setFilterText}
                />
                <CommandList>
                  <CommandEmpty>
                    No hay resultados.
                  </CommandEmpty>
                  <CommandGroup>
                    {filteredOptions.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          setValue(name, item.value)
                          onChange && onChange(item.value)
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
