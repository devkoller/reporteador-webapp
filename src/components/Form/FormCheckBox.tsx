import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

type FormCheckBoxProps = {
  control: any
  label?: string
  name: string
  description?: string
}

export const FormCheckBox = ({ control, name, label, description }: FormCheckBoxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && (
              <FormLabel>
                {label}
              </FormLabel>
            )}
            {description && (
              <FormDescription>
                {description}
              </FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

