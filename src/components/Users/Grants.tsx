import { useState, useEffect } from 'react'
import { useFetch, usePost } from '@/hooks'
import { UserType } from '@/components/Users'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"




type GrantsProps = {
  selectedUser: UserType | null,
  update: () => void,
  closeSheet: () => void
}

type DataProps = {
  userGrants: string[],
  userBlocked: string[],
  userData: any,
  grants: any[]
}

export const Grants = ({ selectedUser, update, closeSheet }: GrantsProps) => {
  const { execute, loading } = usePost()
  const { toast } = useToast()
  const [Data, SetData] = useState<DataProps>({
    userGrants: [],
    userBlocked: [],
    userData: {},
    grants: []
  })

  const { response: userData, loading: userLoading } = useFetch({
    url: "/user/find-user/" + selectedUser?.id,
  })

  const { response: permisosData, loading: gransLoading } = useFetch({
    url: '/data/list-grants'
  })

  const onSubmit = () => {
    execute({
      url: '/user/update-user',
      method: 'patch',
      body: {
        id: selectedUser?.id,
        grants: Data.userGrants,
        blocked: Data.userBlocked
      }
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Usuario actualizado",
          description: "Se han actualizado los permisos del usuario",
        })
        update()
        closeSheet()
      }
    })
  }

  const setGrants = ({ action, sid }: { action: string, sid: string }) => {

    if (Data.userGrants.includes(`${sid}.${action}`)) {
      let permisos = Data.userGrants.filter(
        item => item !== `${sid}.${action}`
      )
      permisos = permisos.sort((one, two) => (one > two ? -1 : 1))
      SetData(prev => ({
        ...prev,
        userGrants: permisos
      }))
    } else {
      let permisos = [...Data.userGrants, `${sid}.${action}`]
      permisos = permisos.sort((one, two) => (one > two ? -1 : 1))
      SetData(prev => ({
        ...prev,
        userGrants: permisos
      }))
    }
  }

  const setBlocked = ({ action, sid }: { action: string, sid: string }) => {
    if (Data.userBlocked.includes(`${sid}.${action}`)) {
      let permisos = Data.userBlocked.filter(
        item => item !== `${sid}.${action}`
      )
      permisos = permisos.sort((one, two) => (one > two ? -1 : 1))
      SetData(prev => ({
        ...prev,
        userBlocked: permisos
      }))
    } else {
      let permisos = [...Data.userBlocked, `${sid}.${action}`]
      permisos = permisos.sort((one, two) => (one > two ? -1 : 1))
      SetData(prev => ({
        ...prev,
        userBlocked: permisos
      }))
    }
  }

  const printHeads = (activeGrants: string[]) => {
    if (Data.grants.length === 0) {
      return null
    }

    return Data.grants.map((permiso: any, index) => {
      if (permiso?.permisos.length === 0) {
        return null
      }
      return (
        <div key={index}>
          <h2>{permiso.nombre}</h2>
          {printGrants({ list: permiso.permisos, grant: permiso.grant, activeGrants })}
        </div>
      )
    })
  }

  const printGrants = ({ list, grant, activeGrants }: {
    list: any[],
    grant: string,
    activeGrants: string[]
  }) => {
    return list.map((permiso, index) => {
      return (
        <div key={index} className="items-top flex space-x-2">
          <Checkbox
            id={`${grant}.${permiso.grant}`}
            checked={activeGrants.includes(`${grant}.${permiso.grant}`)}
            onCheckedChange={() => {
              if (permiso.tipo === 1) {
                setGrants({ action: permiso.grant, sid: grant })
              } else {
                setBlocked({ action: permiso.grant, sid: grant })
              }
            }} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`${grant}.${permiso.grant}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {permiso.nombre}
            </label>
            <p className="text-sm text-muted-foreground">
              {permiso.descrip}
            </p>
          </div>
        </div>
      )
    })
  }

  useEffect(() => {
    if (userData) {
      const grants = JSON.parse(userData.data.grants)
      SetData(prev => ({
        ...prev,
        userData: userData,
        userGrants: grants.Statement[0].Action,
        userBlocked: grants.Statement[1].Action
      }))
    }
  }, [userData])

  useEffect(() => {
    if (permisosData) {
      SetData(prev => ({
        ...prev,
        grants: permisosData.data
      }))
    }
  }, [permisosData])

  if (userLoading || gransLoading) {
    return <div>Cargando...</div>
  }


  return (
    <div>
      <div>
        <Button onClick={onSubmit} className='w-full' disabled={loading}>
          Guardar
        </Button>
      </div>
      {printHeads([...Data.userGrants, ...Data.userBlocked])}
      <div>
        <Button onClick={onSubmit} className='w-full' disabled={loading}>
          Guardar
        </Button>
      </div>
    </div>
  )
}
