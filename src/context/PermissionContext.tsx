// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { useAuthStore } from '@/hooks';
// import { updatePermissions } from "@/service/authService.ts"

// interface IPermissions {
//   id: number
//   resource: string
//   action: string
// }

// interface IPermission {
//   permissionsID: number;
//   userID: number;
//   permissionID: IPermissions;
// }

// interface PermissionContextType {
//   permissions: IPermission[];
//   loading: boolean;
// }

// export const PermissionContext = createContext<PermissionContextType>({
//   permissions: [],
//   loading: true,
// });

// interface PermissionProviderProps {
//   children: ReactNode;
// }

// export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
//   const [permissions, setPermissions] = useState<IPermission[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const { token } = useAuthStore();


//   useEffect(() => {
//     // se ejecuta cuando el token cambia
//     if (token) {
//       const fetchPermissions = async () => {
//         setLoading(true);
//         try {

//           const response = await updatePermissions(token);
//           if (!response.ok) {
//             throw new Error('Error al obtener permisos');
//           }
//           const data: any = await response.json();

//           setPermissions(data.data);


//         } catch (error) {
//           console.error('Error fetching permissions:', error);
//         } finally {
//           setLoading(false);
//         }
//       }
//       fetchPermissions();
//     }
//   }, [token]);

//   return (
//     <PermissionContext.Provider value={{ permissions, loading }}>
//       {children}
//     </PermissionContext.Provider>
//   );
// };
