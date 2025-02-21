import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type FormInputProps = {
  control: any
  label?: string
  name: string
  description?: string
  placeholder?: string
  password?: boolean
  required?: boolean
  disabled?: boolean
}

export const FormInput = ({ control, label, name, description, password, placeholder, required, disabled }: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <>
            <FormLabel>{label}</FormLabel>{' '}
            {required && <sup className="text-red-500">*</sup>}
          </>}
          <FormControl>
            <Input placeholder={placeholder || ''} {...field} type={password ? 'password' : ''} disabled={disabled} />
          </FormControl>
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
