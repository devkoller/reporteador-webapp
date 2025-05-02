import { useFetch } from '@/hooks'
import { useState, useEffect } from "react"
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Phone,
  Mail,
  // LinkIcon,
} from "lucide-react"
import { TabsContent, } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ContactsType } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


interface ContactsProps {
  contractID?: string
}

export const Contacts = ({ contractID }: ContactsProps) => {
  const [Contacts, setContacts] = useState<ContactsType[]>([])
  const { response: contractData, loading: loadingContract } = useFetch({
    url: "/contract/read/contact/all",
    qs: {
      contractID: contractID,
    }
  })

  useEffect(() => {
    if (contractData) {
      setContacts(contractData.data)
    }
  }, [contractData])

  if (loadingContract) {
    return (
      <TabsContent value="contacts" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Contactos</CardTitle>
            <CardDescription>
              Contactos asociados a este contrato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Spinner />
          </CardContent>
        </Card>
      </TabsContent>
    )
  }

  return (
    <TabsContent value="contacts" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contactos</CardTitle>
          <CardDescription>
            Contactos asociados a este contrato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Contacts.map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={contact.name} />
                      <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="font-medium">
                        {contact.name}
                        {contact.isPrimaryContact && (
                          <Badge variant="outline" className="ml-2">
                            Principal
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{contact.position}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              Agregar contrato
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
