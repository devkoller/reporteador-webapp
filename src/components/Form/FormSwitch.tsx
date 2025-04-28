import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"


type FormCheckBoxProps = {
  control: any
  label?: string
  name: string
  description?: string
}

export const FormSwitch = ({ control, name, label, description }: FormCheckBoxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row w-full items-start space-x-3 space-y-0 rounded-md ">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
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
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

