import { ColumnDef } from "@tanstack/react-table"
import { AppointmentType, IncomeType } from "@/types"

export const Columns: ColumnDef<AppointmentType>[] = [
  {
    accessorKey: "Fecha",
    header: "Fecha",
  },
  {
    accessorKey: "Hora",
    header: "Hora",
  },
  {
    accessorKey: "nombrecom",
    header: "Paciente",
  },
  {
    accessorKey: "Centro",
    header: "Centro",
  },
  {
    accessorKey: "Servicio",
    header: "Servicio",
  },
  {
    accessorKey: "Genero",
    header: "Sexo",
  },
  {
    accessorKey: "Agenda",
    header: "Medico",
  },
  {
    accessorKey: "Visita",
    header: "Visita",
  },
  {
    accessorKey: "rud_emision",
    header: "RUD de Usuario que agendo la cita",
  },
  {
    accessorKey: "Usuario",
    header: "Usuario que agendo la cita",
  },
  {
    accessorKey: "Estado",
    header: "Estado",
  },
  {
    accessorKey: "Municipio",
    header: "Municipio",
  },
  {
    accessorKey: "Colonia",
    header: "Colonia",
  },

]


export const IncomeColumns: ColumnDef<IncomeType>[] = [
  {
    accessorKey: "registro",
    header: "Registro",
  },
  {
    accessorKey: "nombre",
    header: "Paciente",
  },
  {
    accessorKey: "fecha_nac",
    header: "Fecha de Nacimiento",
  },
  {
    accessorKey: "FechaIngreso",
    header: "Fecha de ingreso",
  },
  {
    accessorKey: "hrs",
    header: "Hora de ingreso",
  },
  {
    accessorKey: "TurnoIngreso",
    header: "Turno de ingreso",
  },
  {
    accessorKey: "Centro",
    header: "Centro",
  },
  {
    accessorKey: "servicio",
    header: "Servicio de ingreso",
  },
  {
    accessorKey: "servicio_cama",
    header: "Servicio de cama",
  },
  {
    accessorKey: "cod_cama",
    header: "Cama",
  },
  {
    accessorKey: "estado_cama",
    header: "Estado de la cama",
  },
  {
    accessorKey: "censable",
    header: "Censable",
  },
  {
    accessorKey: "financiamiento",
    header: "Financiamiento",
  },
]