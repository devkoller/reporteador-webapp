
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
  setValue: (name: any, value: any) => void
}
import { cn } from "@/lib/utils"



export const FormCombobox = ({ control, label, name, description, required, option = [], setValue }: FormComboboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full overflow-hidden">
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
                    "max-w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? option.find(
                      (item) => item.value === field.value
                    )?.label
                    : "Selecciona una opción"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>
                    No hay resultados.
                  </CommandEmpty>
                  <CommandGroup>
                    {option.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          setValue(name, item.value)
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
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
