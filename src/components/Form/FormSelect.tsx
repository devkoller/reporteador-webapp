
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
}



export const FormSelect = ({ control, label, name, description, required, option = [], }: FormComboboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col max-w-full px-1 overflow-hidden space-y-4">
          {label && <FormLabel>{label}
            {required && <sup className="text-red-500">*</sup>}
          </FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {option.map((item) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
