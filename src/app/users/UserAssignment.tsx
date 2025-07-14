
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
// import UserAssignmentModal from "./user-assignment-modal"
import { useFetch } from "@/hooks/useFetch"
import { UserAttributes } from "@/types"
import { DataTable } from "@/components/utils"
import { getColumnsWithActions } from "./components/columns"
import { AssignmentPermissions } from "./components/AssignmentPermissions"
import { AssignmentCenter } from "./components/AssignmentCenter"

interface StateTypeof {
  users: UserAttributes[]
  selectedUser?: UserAttributes | null
}

export const UserAssignment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [centersModalOpen, setCentersModalOpen] = useState(false)
  const [Data, setData] = useState<StateTypeof>({
    users: [],
    selectedUser: null,
  })

  const { response: usersResponse } = useFetch({
    url: "/v1/user",
  })


  const getRowData = (userRow: UserAttributes) => {
    setData(prev => ({
      ...prev,
      selectedUser: userRow,
    }))
    setIsModalOpen(true)
  }

  const getRowData2 = (userRow: UserAttributes) => {
    setData(prev => ({
      ...prev,
      selectedUser: userRow,
    }))
    setCentersModalOpen(true)
  }

  const columns = getColumnsWithActions({
    getRow: getRowData,
    getRow2: getRowData2,
  })




  useEffect(() => {
    if (usersResponse) {
      const users = usersResponse.data as UserAttributes[]
      setData(prev => ({
        ...prev,
        users: users,
      }))
    }
  }, [usersResponse])

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Crear usuario
        </Button>
      </div>

      <div className="border rounded-lg">

        <DataTable
          data={Data.users}
          columns={columns}
        />


        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Additional Permissions</TableHead>
              <TableHead>Centers</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{getUserName(assignment.userId)}</div>
                    <div className="text-sm text-muted-foreground">{getUserEmail(assignment.userId)}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getUserStatus(assignment.userId) === "active" ? "default" : "secondary"}>
                    {getUserStatus(assignment.userId)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {assignment.roles.map((role, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {assignment.permissions.map((permission, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {assignment.permissions.length === 0 && <span className="text-sm text-muted-foreground">None</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {getCenterNames(assignment.centers).map((centerName, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {centerName}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{assignment.assignedAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditAssignment(assignment)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>

      <AssignmentPermissions
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={Data.selectedUser || null}
      />

      <AssignmentCenter
        isOpen={centersModalOpen}
        onClose={() => setCentersModalOpen(false)}
        user={Data.selectedUser || null}
      />
    </div>
  )
}
