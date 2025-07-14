import { Layout } from "@/components/auth"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, UserCheck } from "lucide-react"

import { UserAssignment } from "./UserAssignment"
import { PermissionManagement } from "./PermissionManagement"
import { RoleManagement } from "./RoleManagement"


export const UsersView = () => {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrador de permisos</h1>
            <p className="text-gray-600">
              Administra los permisos, roles y asignaciones de usuarios en tus centros de salud.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Permisos
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Roles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Usuarios Asignados
                  </CardTitle>
                  <CardDescription>
                    Administra los permisos y roles asignados a los usuarios en tus centros de salud.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserAssignment />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Gestión de Permisos
                  </CardTitle>
                  <CardDescription>
                    Crea y gestiona permisos para asignar a roles y usuarios.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PermissionManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestión de Roles
                  </CardTitle>
                  <CardDescription>
                    Crea y gestiona roles para asignar permisos a grupos de usuarios.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleManagement />
                </CardContent>
              </Card>
            </TabsContent>


          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
