import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"



export const RoleManagement = () => {


  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Crear rol
        </Button>
      </div>

      <div className="border rounded-lg">
      </div>

      {/* <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        role={editingRole}
      /> */}
    </div>
  )
}
