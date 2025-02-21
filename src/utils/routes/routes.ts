// Views
import { Login } from "@/views/Login"
import { RecoveryPassword } from "@/views/RecoveryPassword"
import { Home } from "@/views/Home"
import { Reports } from "@/views/Reports"
import { Contratos } from "@/views/Contratos"
import { Almacenes } from "@/views/Almacenes"
import { CatalagoVenta } from "@/views/CatalagoVenta"
import { Proveedores } from "@/views/Proveedores"
import { Users } from "@/views/Users"
import { Clientes } from "@/views/Clientes"
import { UserProfile } from "@/views/UserProfile"
import { ContratoID } from "@/views/ContratoID"

//ICONS
import { CiViewTable } from "react-icons/ci"
import { FaHome, FaUsers, FaWarehouse } from "react-icons/fa"
import { IoNewspaperOutline, IoMedical } from "react-icons/io5"
import { GiPelvisBone } from "react-icons/gi"
import { BsHospitalFill } from "react-icons/bs"

export const routes = [
	{
		route: "/login",
		component: Login,
		state: "Not Authenticated",
		menu: false,
	},
	{
		route: "/recovery-password",
		component: RecoveryPassword,
		state: "Not Authenticated",
		menu: false,
	},
	{
		route: "/home",
		component: Home,
		title: "Inicio",
		state: "Authenticated",
		breadcrumb: "Inicio",
		grants: null,
		menu: true,
		icon: FaHome,
	},
	{
		route: "/reportes",
		component: Reports,
		title: "Reportes",
		state: "Authenticated",
		breadcrumb: "Inicio",
		grants: null,
		menu: true,
		icon: CiViewTable,
	},
	// {
	// 	route: "/consulta",
	// 	title: "Consulta",
	// 	state: "Authenticated",
	// 	breadcrumb: "Consulta",
	// 	menu: true,
	// 	icon: CiViewTable,
	// 	submenus: [
	// 		{
	// 			route: "reports",
	// 			title: "Reportes",
	// 			component: Reports,
	// 			breadcrumb: "Reportes",
	// 			state: "Authenticated",
	// 			menu: true,
	// 		},
	// 		{
	// 			route: "inventory",
	// 			title: "Inventario",
	// 			component: Inventory,
	// 			breadcrumb: "Inventario",
	// 			state: "Authenticated",
	// 			menu: true,
	// 		},
	// 		{
	// 			route: "movement",
	// 			title: "Movimientos",
	// 			component: Movements,
	// 			breadcrumb: "Movimientos",
	// 			state: "Authenticated",
	// 			menu: true,
	// 		},
	// 	],
	// },
	{
		route: "/contratos",
		component: Contratos,
		title: "Contratos",
		state: "Authenticated",
		breadcrumb: "Contratos",
		grants: null,
		menu: true,
		icon: IoNewspaperOutline,
	},
	{
		route: "/contratos/:id",
		component: ContratoID,
		title: "Contratos",
		state: "Authenticated",
		breadcrumb: "Contratos",
		grants: null,
		menu: false,
		icon: IoNewspaperOutline,
	},
	// {
	// 	route: "/insumos",
	// 	title: "Insumos",
	// 	state: "Authenticated",
	// 	breadcrumb: "Consulta",
	// 	menu: true,
	// 	icon: FaBriefcaseMedical,
	// 	submenus: [
	// 		{
	// 			route: "movement",
	// 			title: "Movimientos",
	// 			component: CapturarMovimientos,
	// 			breadcrumb: "Movimientos",
	// 			state: "Authenticated",
	// 			menu: true,
	// 		},
	// 		{
	// 			route: "solicitud",
	// 			title: "Solicitud de Insumos",
	// 			component: SolicitudInsumos,
	// 			breadcrumb: "Solicitud de Insumos",
	// 			state: "Authenticated",
	// 			menu: true,
	// 		},
	// 		{
	// 			route: "recepcion",
	// 			title: "Recepción de Insumos",
	// 			component: RecepcionInsumos,
	// 			breadcrumb: "Recepción de Insumos",
	// 			state: "Authenticated",
	// 			menu: true,
	// 		},
	// 	],
	// },
	{
		route: "/catalago-venta",
		component: CatalagoVenta,
		title: "Catalogo de Venta",
		state: "Authenticated",
		breadcrumb: "Catalogo de Venta",
		grants: null,
		menu: true,
		icon: IoMedical,
	},
	{
		route: "/almacenes",
		component: Almacenes,
		title: "Almacenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		grants: null,
		menu: true,
		icon: FaWarehouse,
	},
	{
		route: "/proveedores",
		component: Proveedores,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Proveedores",
		grants: null,
		menu: true,
		icon: GiPelvisBone,
	},
	{
		route: "/clientes",
		component: Clientes,
		title: "Clientes",
		state: "Authenticated",
		breadcrumb: "Clientes",
		grants: null,
		menu: true,
		icon: BsHospitalFill,
	},
	{
		route: "/usuarios",
		component: Users,
		title: "Usuarios",
		state: "Authenticated",
		breadcrumb: "Usuarios",
		grants: null,
		menu: true,
		icon: FaUsers,
	},
	{
		route: "/cuenta",
		component: UserProfile,
		title: "Usuarios",
		state: "Authenticated",
		breadcrumb: "Usuarios",
		grants: null,
		menu: false,
		icon: FaUsers,
	},
]
