
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { UserAttributes, PermissionsAttributes, UserPermissionsAttributes } from "@/types"
import { useFetch, usePost, useToast } from "@/hooks"
import { useState, useEffect, useMemo } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface PermissionNode extends PermissionsAttributes {
  children: PermissionNode[]
  level: number
}


interface AssignmentPermissionsProps {
  isOpen: boolean
  onClose: () => void
  user: UserAttributes | null
  // onSave: (assignment: UserAttributes) => void
  // assignment: UserAssignment | null
}



export const AssignmentPermissions = ({ isOpen, onClose, user }: AssignmentPermissionsProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [permissions, setPermissions] = useState<PermissionsAttributes[]>([])


  const { response: permissionsResponse } = useFetch({
    url: "/v1/user/permissions",
  })


  const handleSubmit = () => {
    execute({
      url: "/v1/user/assign-permission",
      method: "put",
      body: {
        userID: user?.id,
        permissions: Array.from(selected),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Permissions updated successfully",
          })
          onClose()
        } else {
          toast({
            title: "Failed to update permissions",
            variant: "destructive",
          })
        }
      })
      .catch((error) => {
        console.error("Error updating permissions:", error)
        toast({
          title: "Error updating permissions",
          description: error.message,
          variant: "destructive",
        })

      })
  }

  // Build hierarchical tree structure
  const permissionTree = useMemo(() => {
    const nodeMap = new Map<string, PermissionNode>()
    const rootNodes: PermissionNode[] = []

    // Create nodes
    permissions.forEach((permission) => {
      nodeMap.set(permission.id, {
        ...permission,
        children: [],
        level: 0,
      })
    })

    // Build tree structure and calculate levels
    permissions.forEach((permission) => {
      const node = nodeMap.get(permission.id)!

      if (permission.parent) {
        const parent = nodeMap.get(permission.parent)
        if (parent) {
          parent.children.push(node)
          node.level = parent.level + 1
        }
      } else {
        rootNodes.push(node)
      }
    })

    // Sort children by name
    const sortChildren = (nodes: PermissionNode[]) => {
      nodes.sort((a, b) => a.name.localeCompare(b.name))
      nodes.forEach((node) => sortChildren(node.children))
    }

    sortChildren(rootNodes)
    return rootNodes
  }, [permissions])

  // Get all descendant IDs
  const getDescendantIds = (node: PermissionNode): string[] => {
    const descendants: string[] = []
    const traverse = (n: PermissionNode) => {
      n.children.forEach((child) => {
        descendants.push(child.id)
        traverse(child)
      })
    }
    traverse(node)
    return descendants
  }

  // Get all ancestor IDs
  const getAncestorIds = (permissionId: string): string[] => {
    const ancestors: string[] = []
    const permission = permissions.find((p) => p.id === permissionId)

    if (permission?.parent) {
      ancestors.push(permission.parent)
      ancestors.push(...getAncestorIds(permission.parent))
    }

    return ancestors
  }

  // Handle permission selection with cascading logic
  const handlePermissionToggle = (permissionId: string, checked: boolean) => {
    const newSelected = new Set(selected)

    if (checked) {
      // Add the permission
      newSelected.add(permissionId)

      // Add all ancestors (parent permissions)
      const ancestors = getAncestorIds(permissionId)
      ancestors.forEach((ancestorId) => newSelected.add(ancestorId))

      // Add all descendants (child permissions)
      const node = findNodeById(permissionTree, permissionId)
      if (node) {
        const descendants = getDescendantIds(node)
        descendants.forEach((descendantId) => newSelected.add(descendantId))
      }
    } else {
      // Remove the permission
      newSelected.delete(permissionId)

      // Remove all descendants (child permissions)
      const node = findNodeById(permissionTree, permissionId)
      if (node) {
        const descendants = getDescendantIds(node)
        descendants.forEach((descendantId) => newSelected.delete(descendantId))
      }
    }

    setSelected(newSelected)
    // onPermissionChange?.(Array.from(newSelected))
  }

  // Find node by ID in tree
  const findNodeById = (nodes: PermissionNode[], id: string): PermissionNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      const found = findNodeById(node.children, id)
      if (found) return found
    }
    return null
  }

  // Toggle expanded state
  const toggleExpanded = (permissionId: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(permissionId)) {
      newExpanded.delete(permissionId)
    } else {
      newExpanded.add(permissionId)
    }
    setExpanded(newExpanded)
  }

  // Check if node has any selected descendants
  const hasSelectedDescendants = (node: PermissionNode): boolean => {
    return getDescendantIds(node).some((id) => selected.has(id))
  }

  // Render permission node
  const renderPermissionNode = (node: PermissionNode) => {
    const isSelected = selected.has(node.id)
    const isExpanded = expanded.has(node.id)
    const hasChildren = node.children.length > 0
    const hasSelectedChildren = hasSelectedDescendants(node)

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors ${node.level > 0 ? "ml-6 border-l-2 border-muted" : ""
            }`}
          style={{ paddingLeft: `${12 + node.level * 24}px` }}
        >
          {/* Expand/Collapse button */}
          {hasChildren && (
            <button onClick={() => toggleExpanded(node.id)} className="p-1 hover:bg-muted rounded transition-colors">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          )}

          {/* Spacer for nodes without children */}
          {!hasChildren && <div className="w-6" />}

          {/* Checkbox */}
          <Checkbox
            id={node.id}
            checked={isSelected}
            onCheckedChange={(checked) => handlePermissionToggle(node.id, checked as boolean)}
            className={hasSelectedChildren && !isSelected ? "data-[state=unchecked]:border-primary" : ""}
          />


          {/* Permission details */}
          <div className="flex-1 min-w-0">
            <label
              htmlFor={node.id}
              className={`block text-sm font-medium cursor-pointer ${node.level === 0 ? "text-foreground" : "text-muted-foreground"
                } ${isSelected ? "text-primary" : ""}`}
            >
              {node.name}
            </label>
            {node.description && <p className="text-xs text-muted-foreground mt-1 truncate">{node.description}</p>}
          </div>

          {/* Selected indicator */}
          {(isSelected || hasSelectedChildren) && (
            <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-primary" : "bg-primary/50"}`} />
          )}
        </div>

        {/* Render children */}
        {hasChildren && (isExpanded || hasSelectedChildren) && (
          <div className="space-y-1">{node.children.map((child) => renderPermissionNode(child))}</div>
        )}
      </div>
    )
  }

  useEffect(() => {
    if (permissionsResponse) {
      setPermissions(permissionsResponse.data)
    }
  }, [permissionsResponse])

  useEffect(() => {
    if (!isOpen) return
    if (!user) return

    execute({
      url: "/v1/user/read-user-permissions",
      method: "post",
      body: {
        userID: user.id,
      },
    }).then((response) => {
      if (response.status === 200) {
        const userPermissions = response.data || []
        let list = userPermissions.map((p: UserPermissionsAttributes) => p.permissionID)
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
          <DialogTitle>Editar permisos de usuario</DialogTitle>
          <DialogDescription>
            Selecciona los permisos que deseas asignar al usuario. Los permisos seleccionados se aplicarán a todas las acciones del usuario en el sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {permissionTree.map((node) => renderPermissionNode(node))}
        </div>
        {selected.size > 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Selected Permissions ({selected.size})</p>
            <div className="flex flex-wrap gap-1">
              {Array.from(selected)
                .slice(0, 5)
                .map((id) => {
                  const permission = permissions.find((p) => p.id === id)
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
                    >
                      {permission?.name}
                    </span>
                  )
                })}
              {selected.size > 5 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                  +{selected.size - 5} more
                </span>
              )}
            </div>
          </div>
        )}

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
