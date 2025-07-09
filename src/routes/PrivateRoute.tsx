// PrivateRoute.tsx
// import React, { useContext } from 'react';
// import { PermissionContext } from '@/context/PermissionContext';
// import { UserConfigContext } from '@/context/UserConfigContext';
// import { Navigate } from 'react-router-dom';

// interface PrivateRouteProps {
//   children: JSX.Element;
//   path: string;
//   needGrants?: boolean
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path, needGrants }) => {
//   const { permissions, loading } = useContext(PermissionContext);
//   const { config, loading: loadingUserConfig } = useContext(UserConfigContext);

//   if (loading || loadingUserConfig) {
//     return <div>Cargando permisos...</div>;
//   }

//   if (!needGrants) {
//     return children
//   }

//   if (!config) {
//     return <Navigate to="/" replace />;
//   }

//   let enterprise = config.enterprise;


//   let menu = path.split("/")[1];

//   let access = Array.isArray(permissions)
//     ? permissions.find((perm: any) => {
//       return perm.permission.resource === menu && perm.permission.action === "read" && perm.permission.enterpriseID === enterprise.id;
//     })
//     : undefined;


//   // Verificamos si el usuario tiene acceso
//   if (!permissions.length || !access) {
//     return <Navigate to="/home" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
