import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuthStore, usePost, useToast } from '@/hooks';
import { userConfig } from "@/service/authService"
import { EnterpriseType } from '@/types';


interface IConfig {
  enterprise: EnterpriseType;
}

interface UserConfigContextType {
  config: IConfig | undefined;
  loading: boolean;
  setValue: (key: keyof IConfig, value: any) => void;
}

export const UserConfigContext = createContext<UserConfigContextType>({
  config: {} as IConfig,
  loading: true,
  setValue: () => { },
});

interface UserConfigProps {
  children: ReactNode;
}

export const UserConfigProvider: React.FC<UserConfigProps> = ({ children }) => {
  const [config, setConfig] = useState<IConfig>();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const { execute } = usePost();
  const { token } = useAuthStore();

  const setValue = (key: keyof IConfig, value: any) => {

    execute({
      url: `/user/update-config`,
      method: 'put',
      body: {
        jsonWebSiteConfig: {
          ...config,
          [key]: value,
        }
      },
    }).then((response) => {
      if (response.status === 200) {
        setConfig((prevConfig) => ({
          ...prevConfig,
          [key]: value,
        }));
      } else {
        toast({
          title: "Error",
          description: "No se pudo guardar la configuración",
          variant: "destructive",
        });
      }
    })

    // setConfig((prevConfig) => ({
    //   ...prevConfig,
    //   [key]: value,
    // }));

  };


  useEffect(() => {
    // se ejecuta cuando el token cambia
    if (token) {
      const fetchPermissions = async () => {
        setLoading(true);
        try {

          const response = await userConfig(token);
          if (!response.ok) {
            throw new Error('Error al obtener permisos');
          }
          const data: any = await response.json();

          let jsonWebSiteConfig = JSON.parse(data?.data?.jsonWebSiteConfig || '{}');

          setConfig(jsonWebSiteConfig);


        } catch (error) {
          console.error('Error fetching permissions:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchPermissions();
    }
  }, [token]);

  return (
    <UserConfigContext.Provider value={{ config, loading, setValue }}>
      {children}
    </UserConfigContext.Provider>
  );
};
