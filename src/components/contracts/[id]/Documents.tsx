import { useFetch } from '@/hooks'
import { useState, useEffect } from "react"
import { Spinner } from '@/components/ui/spinner'
import { DocumentsType } from '@/types'
import { TabsContent, } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Download,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
interface DocumentsProps {
  contractID?: string
}

export const Documents = ({ contractID }: DocumentsProps) => {
  const [Documents, setDocuments] = useState<DocumentsType[]>([])
  const { response: contractData, loading: loadingContract } = useFetch({
    url: "/contract/read/document/all",
    qs: {
      contractID: contractID,
    }
  })

  function formatBytes(bytes: number, decimales = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = Math.max(decimales, 0);
    const unidades = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const tamaño = bytes / Math.pow(k, i);
    return `${tamaño.toFixed(dm)} ${unidades[i]}`;
  }


  useEffect(() => {
    if (contractData) {
      setDocuments(contractData.data)
    }
  }, [contractData])

  if (loadingContract) {
    return (
      <TabsContent value="documents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Documentos del contrato</CardTitle>
            <CardDescription>
              Documentos asociados a este contrato
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
    <TabsContent value="documents" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Documentos del contrato</CardTitle>
          <CardDescription>
            Documentos asociados a este contrato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del archivo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell className="uppercase">{doc.extension}</TableCell>
                    <TableCell>{formatBytes(doc.size)}</TableCell>
                    <TableCell>{format(doc.createdAt || '', 'yyyy-MM-dd')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descargar</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Cargar documento
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
