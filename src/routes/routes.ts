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
import { statistics } from "@/app/dashboard/analytics/statistics/statistics"
import { appointments } from "@/app/dashboard/analytics/statistics/boards/appointments"
import { emergency } from "@/app/dashboard/analytics/statistics/boards/emergency"
import { surgeries } from "@/app/dashboard/analytics/statistics/boards/surgeries"
import { income } from "@/app/dashboard/analytics/statistics/boards/income"
import { productivity } from "@/app/dashboard/analytics/statistics/boards/productivity"
import { reports } from "@/app/dashboard/analytics/reports/reports"
import { Penalties } from "@/app/dashboard/analytics/statistics/boards/penalties"
import { Incumplimientos } from "@/app/dashboard/analytics/statistics/boards/incumplimientos"

import { UsersView } from "@/app/users/UsersView"

import {
	LayoutDashboard,
	Users,
	// CalendarDays,
	// FileText,
	BarChart3,
	// Settings,
	// BellRing,
	// MessageSquare,
	// PlusCircle,
	// Search,
	// FileClock,
	// Activity,
	BookOpen,
	// FlaskConical,
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
		title: "Analítica",
		to: "/analitica",
		component: statistics,
		icon: BarChart3,
		permission: 1,
		menu: true,
		submenu: [
			{
				title: "Estadísticas",
				to: "/estadisticas",
				description: "Estadísticas",
				component: statistics,
				permission: 2,
				menu: true,
				icon: BarChart3,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/citados",
				description: "Estadísticas",
				component: appointments,
				permission: 2,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/ingresos",
				description: "Estadísticas",
				component: income,
				permission: 5,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/urgencias",
				description: "Estadísticas",
				component: emergency,
				menu: false,
				permission: 6,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/cirugias",
				description: "Estadísticas",
				component: surgeries,
				permission: 7,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/productividad",
				description: "Estadísticas",
				component: productivity,
				menu: false,
				permission: 8,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/penalties",
				description: "Estadísticas",
				component: Penalties,
				permission: 9,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/incumplimientos",
				description: "Estadísticas",
				component: Incumplimientos,
				menu: false,
				permission: 10,
				icon: null,
			},
			{
				title: "Reportes",
				to: "/reportes",
				description: "reportes",
				component: reports,
				permission: 3,
				menu: true,
				icon: BookOpen,
			},
		],
	},
	{
		title: "Usuarios y permisos",
		to: "/users",
		component: UsersView,
		icon: Users,
		menu: true,
		submenu: [],
	},
]
