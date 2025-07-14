
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { UserAttributes, CentersAttributes } from "@/types"
import { useState, useEffect, } from "react"
import { useFetch, usePost, useToast } from "@/hooks"


interface AssignmentPermissionsProps {
  isOpen: boolean
  onClose: () => void
  user: UserAttributes | null
}



export const AssignmentCenter = ({ isOpen, onClose, user }: AssignmentPermissionsProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [centers, setCenters] = useState<CentersAttributes[]>([])


  const { response: CentersData } = useFetch({
    url: "/v1/user/centers",
  })


  const handleSubmit = () => {

    execute({
      url: "/v1/user/assign-centers",
      method: "put",
      body: {
        userID: user?.id,
        centers: Array.from(selected),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Centers updated successfully",
          })
          onClose()
        } else {
          toast({
            title: "Failed to update Centers",
            variant: "destructive",
          })
        }
      })
      .catch((error) => {
        console.error("Error updating Centers:", error)
        toast({
          title: "Error updating Centers",
          description: error.message,
          variant: "destructive",
        })
      })
  }

  useEffect(() => {
    if (CentersData) {
      setCenters(CentersData.data)
    }
  }, [CentersData])

  useEffect(() => {
    if (!isOpen) return
    if (!user) return

    execute({
      url: "/v1/user/read-user-centers",
      method: "post",
      body: {
        userID: user.id,
      },
    }).then((response) => {
      if (response.status === 200) {
        const userCenters = response.data || []
        let list = userCenters.map((p: any) => p.centerID)

        setSelected(new Set(list))
      } else {
        toast({
          title: "Error loading permissions",
          description: response.message || "Please try again later",
          variant: "destructive",
        })
      }
    })
  }, [user, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar centros del usuario</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 max-h-96 overflow-y-auto">
          {centers.map((center) => (
            <div key={center.id} className="flex items-center space-x-2">
              <Checkbox
                checked={selected.has(center.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelected((prev) => new Set(prev).add(center.id))
                  } else {
                    setSelected((prev) => {
                      const newSet = new Set(prev)
                      newSet.delete(center.id)
                      return newSet
                    })
                  }
                }}
              />
              <span>{center.name}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            Guardar
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
