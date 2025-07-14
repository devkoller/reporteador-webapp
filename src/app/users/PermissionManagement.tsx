
// import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


export const PermissionManagement = () => {

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Crear permisos
        </Button>
      </div>

      <div className="border rounded-lg">
      </div>

      {/* <PermissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePermission}
        permission={editingPermission}
      /> */}
    </div>
  )
}
