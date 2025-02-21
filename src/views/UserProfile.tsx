import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layout } from '@/components/auth'

export const UserProfile = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm p-4 shadow-lg">
          <CardHeader className="flex items-center flex-col">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-lg font-semibold">John Doe</CardTitle>
            <p className="text-sm text-gray-500">johndoe@example.com</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button className="w-full">Editar Perfil</Button>
            <Button variant="destructive" className="w-full">Cerrar Sesión</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

