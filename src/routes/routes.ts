import { transparency } from "@/app/transparency/transparency"
import { directorMessages } from "@/app/Landing/directors/directorMessages"
import { chronology } from "@/app/Landing/chronology/chronology"
import { faq } from "@/app/patients/faq/faq"
import { rights } from "@/app/patients/rights/rights"
import { news } from "@/app/news/news"
import { newsId } from "@/app/news/[id]/newsId"
import { campusId } from "@/app/campus/[id]/campusId"
import { donateBlood } from "@/app/donate/donateBlood"
import { Login } from "@/app/Login/Login"

import { dashboard } from "@/app/dashboard/dashboard/dashboard"

import { UsersView } from "@/app/users/UsersView"

import { Sufficiencies } from "@/app/sufficiencies/Sufficiencies"
import { Contracts } from "@/app/contracts/Contracts"
import { Orders } from "@/app/orders/Orders"

import {
	LayoutDashboard,
	Users,
	// CalendarDays,
	FileText,
	// BarChart3,
	// Settings,
	// BellRing,
	// MessageSquare,
	// PlusCircle,
	// Search,
	// FileClock,
	ShoppingCart,
	// BookOpen,
	Receipt,
	// LogOut,
	// HelpCircle,
} from "lucide-react"

export const mainNavItems = [
	{
		title: "Inicio",
		to: "/",
		component: null,
		menu: true,
		submenu: [
			{
				title: "Mensaje del Director",
				to: "/mensaje-del-director",
				description: "Un de nuestro director general",
				component: directorMessages,
				menu: true,
			},
			{
				title: "Cronología",
				to: "/cronologia",
				description: "Historia de nuestra institución",
				component: chronology,
				menu: true,
			},
		],
	},
	{
		title: "Pacientes",
		to: "/pacientes",
		component: null,
		menu: true,
		submenu: [
			{
				title: "Preguntas Frecuentes",
				to: "/pacientes/faq",
				description: "Preguntas frecuentes sobre nuestros servicios",
				component: faq,
				menu: true,
			},
			{
				title: "Derechos y Deberes",
				to: "/pacientes/derechos-y-deberes",
				description: "Derechos y deberes de los pacientes",
				component: rights,
				menu: true,
			},
		],
	},
	{
		title: "Transparencia",
		to: "/transparencia",
		component: transparency,
		submenu: [],
		menu: true,
	},
	{
		title: "Noticias",
		to: "/noticias",
		component: news,
		menu: true,
		submenu: [
			{
				title: "",
				to: "/noticias/:id",
				description: "",
				component: newsId,
				menu: false,
			},
		],
	},
	{
		title: "Hospitales",
		to: "#campuses",
		component: null,
		menu: true,
		submenu: [
			{
				title: "Fray Antonio Alcalde",
				to: "/hospitales/faa",
				description: "Primer hospital Civil",
				component: campusId,
				menu: true,
			},
			{
				title: "Dr. Juan I. Menchaca",
				to: "/hospitales/jim",
				description: "Segundo hospital Civil",
				component: campusId,
				menu: true,
			},
			{
				title: "Hospital Civil de Oriente",
				to: "/hospitales/hco",
				description: "Tercer hospital Civil",
				component: campusId,
				menu: true,
			},
		],
	},
	{
		title: "Dona sangre",
		to: "/donar-sangre",
		component: donateBlood,
		submenu: [],
		menu: false,
	},
]

export const limboNavItems = [
	{
		title: "login",
		to: "/iniciar-sesion",
		component: Login,
		submenu: [],
		menu: false,
	},
]

export const AuthNavItems = [
	{
		title: "Dashboard",
		to: "/",
		component: dashboard,
		menu: true,
		icon: LayoutDashboard,
		submenu: [],
	},
	{
		title: "Contratos",
		to: "/contracts",
		component: Contracts,
		icon: FileText,
		menu: true,
		permission: 12,
		submenu: [],
	},
	{
		title: "Ordenes de compra",
		to: "/orders",
		component: Orders,
		icon: Receipt,
		menu: true,
		permission: 14,
		submenu: [],
	},
	{
		title: "Suficiencias",
		to: "/sufficiencies",
		component: Sufficiencies,
		icon: ShoppingCart,
		menu: true,
		permission: 13,
		submenu: [],
	},
	{
		title: "Usuarios y permisos",
		to: "/users",
		component: UsersView,
		icon: Users,
		menu: true,
		permission: 11,
		submenu: [],
	},
]
