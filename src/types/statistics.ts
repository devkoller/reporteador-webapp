export interface AppointmentType {
	Fecha: string // Fecha de la cita (YYYY-MM-DD)
	Hora: string // Hora de la cita (HH:mm:ss)
	Agenda: string // Nombre del médico
	Genero: string // Nombre del sexo (M/F)
	t_entrada?: string // Hora de entrada al turno (HH:mm:ss)
	t_salida?: string // Hora de salida
	t_llegada?: string // Hora de llegada real
	hora_forzado?: string // Hora forzada (HH:mm:ss)
	Centro: string // Centro de atención
	Servicio: string // Servicio médico
	Visita: string // Tipo de visita (Ej: 'consulta', 'examen', etc.)
	Tipo: string // 'nueva', 'seguimiento', 'urgencia', etc.
	EstadoCita: string // Estado de la cita (Ej: 'confirmada', 'cancelada')
	asist_conf_sn: string // Asistencia confirmada (S/N)
	fecha_nac: string // Fecha de nacimiento (YYYY-MM-DD)
	segsoc1?: string // Estrato socioeconómico
	segpop?: string // Tipo de seguro
	activa_sn: string // Estado de la cita (S/N)
	fecha_emision: string // Fecha de emisión de la cita (YYYY-MM-DD)
	hora_emision: string // Hora de emisión de la cita (HH:mm:ss)
	hora_llamada?: string // Hora de llamada (HH:mm:ss)
	n_solic: number // Número de solicitudes
	AgeGroup?: string // Grupo de edad calculado
	Usuario?: string // Usuario que creó la cita
	Estado: string // Estado de la cita (Ej: 'confirmada', 'cancelada')
	Municipio: string // Municipio de residencia del paciente
	Localidad: string // Localidad de residencia del paciente
	Colonia: string // Colonia de residencia del paciente
	HoraEntrada?: string // Hora de entrada al turno (HH:mm:ss)
	HoraSalida?: string // Hora de salida (HH:mm:ss)
}

export interface IncomeType {
	CIE_ALTA: string // Código de alta (Ej: 'Z491')
	CIE_DESC_ALTA: string // Descripción del alta (Ej: 'DIALISIS EXTRACORPOREA')
	Centro: string // Centro de atención (Ej: 'FAA')
	Destino_alta: string // Destino del alta (Ej: 'DOMICILIO')
	Diagnostico: string // Diagnóstico (Ej: 'DIALISIS EXTRACORPOREA')
	EdadDias: number // Edad en días (Ej: 20248)
	EdadMeses: number // Edad en meses (Ej: 674)
	Escolaridad: string // Escolaridad (Ej: 'PRIMARIA COMPLETA')
	Estado: string // Estado del paciente (Ej: 'ALTA')
	EstadoCivil: string // Estado civil (Ej: 'SOLTERO')
	FechaEgreso: string // Fecha de egreso (YYYY-MM-DD)
	FechaIngreso: string // Fecha de ingreso (YYYY-MM-DD)
	Fecha_Alta: string // Fecha de alta (YYYY-MM-DD)
	Genero: string // Género (Ej: 'M')
	Hora_Alta: string // Hora de alta (HH:mm:ss)
	Localidad: string // Localidad de residencia del paciente
	Motivo_alta: string // Motivo del alta (Ej: 'MEJORIA')
	Municipio: string // Municipio de residencia del paciente
	Ocupacion: string // Ocupación (Ej: 'MEDICO')
	PISO_DESC: string // Descripción del piso (Ej: 'PISO 1')
	PagadorEvento: string // Pagador del evento (Ej: 'IMSS')
	Proc_urg: string // Procedimiento de urgencia (Ej: 'NO')
	Procedencia: string // Procedencia (Ej: 'EMERGENCIA')
	ServicioEgreso: string // Servicio de egreso (Ej: 'MEDICINA INTERNA')
	TurnoIngreso: string // Turno de ingreso (Ej: 'MATUTINO')
	UnidadEnfermeria: string // Unidad de enfermería (Ej: 'UEN 1')
	cama: string // Número de cama (Ej: 'CAMA 1')
	capturo: string // Usuario que capturó el ingreso (Ej: 'ADMIN')
	divi: string // División (Ej: 'DIVISION 1')
	division: string // División (Ej: 'DIVISION 1')
	edadaños: number // Edad en años (Ej: 56)
	epis_pk: string // Clave del episodio (Ej: 'EPISODIO 1')
	fecha_nac: string // Fecha de nacimiento (YYYY-MM-DD)
	hrs: string // Horas de ingreso (Ej: '12:00:00')
	ing_tipo_desc: string // Descripción del tipo de ingreso (Ej: 'EMERGENCIA')
	med_alta: string // Médico de alta (Ej: 'DR. PEREZ')
	meding: string // Médico de ingreso (Ej: 'DR. GARCIA')
	nombre: string // Nombre del paciente (Ej: 'JUAN PEREZ')
	numdias: string // Número de días de estancia (Ej: 5)
	registro: string // Registro del paciente (Ej: 'REGISTRO 123')
	segsoc: string // Seguro social (Ej: 'IMSS')
	servicio: string // Servicio médico (Ej: 'MEDICINA INTERNA')
	siih: string // Clave del SIIH (Ej: 'SIIH 123')
	ssj: string // Seguro social (Ej: 'SSJ')
	AgeGroup?: string // Grupo de edad calculado
	Egreso?: string // Indica si es egreso (Ej: 'S/N')
	financiamiento: string // Tipo de financiamiento (Ej: 'Público')
	edad: string // Edad en años (Ej: '56')
	estado_cama: string // Estado de la cama (Ej: 'OCUPADA')
	censable: string // Indica si es censable (Ej: 'S/N')
}

export interface EmergencyType {
	Genero: string
	FechaIngreso: string
	Centro: string
	DestinoUrgencias: string
	DiagnosticoEgreso: string
	DiagnostivoIngreso: string
	EdadDias: string
	EdadMeses: string
	Estado: string
	FechaAtencion: string
	FechaAtendido: string
	FechaEgreso: string
	Localidad: string
	Localizacion: string
	MotivoUrgencia: string
	MotivoUrgenciaLibre: string
	Municipio: string
	Nombre: string
	NombreMedico: string
	Pagador: string
	Piso: string
	PrimeraVez: string
	Procedencia: string
	SeguridadSocial: string
	ServicioIngreso: string
	Turno: string
	UnidadEnfermeria: string
	categoria_registro: string
	desc_area: string
	edadaños: string
	epis_pk: string
	fecha_nac: string
	registro: string
	tipo_urgencia: string
	usuario_registro: string
	AgeGroup?: string // Grupo de edad calculado
	financiamiento: string
}

export interface SurgeryType {
	Centro: string
	Cirugia: string
	Diagnostico: string
	Fecha: string
	Hora_QX: string
	Nombre: string
	QX: string
	Radiologo: string
	Servicio: string
	Turno: string
	ambulatorio: string
	anestesiologo: string
	ci_inter_diagno1: string
	cirujano: string
	descripcion: string
	ejercicio: string
	icd_nom_proc_ppal: string
	imprevisto: string
	registro: string
	registro_reserva: string
	rud_reserva: string
	suspendida: string
	fecha_nac: string
	Genero: string
	AgeGroup?: string // Grupo de edad calculado
}

export interface ProductivityType {
	Agenda: string
	CITAS_AÑO: string
	CITAS_SERV_AÑO: string
	Cita: string
	Diagnostico: string
	EdadDias: string
	EdadMeses: string
	EstadoCita: string
	Estado: string
	FechaEntrada: string
	Localidad: string
	Medico: string
	Municipio: string
	Nombre: string
	Pagador: string
	Servicio: string
	ServicioAgenda: string
	TipoCita: string
	Turno: string
	Visita: string
	agenda_efectora: string
	centro: string
	diagnosticos: string
	div: string
	edadaños: string
	fecha: string
	fecha_nac: string
	nombre_corto: string
	registro: string
	Centro: string
	Genero: string
	AgeGroup?: string // Grupo de edad calculado
}

export interface PenaltiesType {
	penalizacion_pk: number
	estado: string
	descripcion: string
	fecha: string
	consecutivo_penalizacion: number
	estatus_correo_notificacion: string
	fecha_notificacion: string
	fecha_visualiza: string
	fecha_vedefinitiva: string
	ano: number
	total: number
	observaciones: string
	proveedo_nombre: string
	proveedo_rfc: string
	firma: string
	no_orden: number
	partida: string
	num_licitacion: number
	unidad_hosp_nombre: string
	almacen_deno: string
	fecha_limite: string
	porcentaje: number
	movBanco: string
	referencia: string
}
