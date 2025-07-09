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

import {
	LayoutDashboard,
	// Users,
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
		to: "/inicio",
		component: dashboard,
		menu: true,
		icon: LayoutDashboard,
		submenu: [],
	},
	{
		title: "Analítica",
		to: "/analitica",
		component: dashboard,
		icon: BarChart3,
		menu: true,
		submenu: [
			{
				title: "Estadísticas",
				to: "/estadisticas",
				description: "Estadísticas",
				component: statistics,
				menu: true,
				icon: BarChart3,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/citados",
				description: "Estadísticas",
				component: appointments,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/ingresos",
				description: "Estadísticas",
				component: income,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/urgencias",
				description: "Estadísticas",
				component: emergency,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/cirugias",
				description: "Estadísticas",
				component: surgeries,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/productividad",
				description: "Estadísticas",
				component: productivity,
				menu: false,
				icon: null,
			},
			{
				title: "Estadísticas",
				to: "/estadisticas/penalties",
				description: "Estadísticas",
				component: Penalties,
				menu: false,
				icon: null,
			},
			{
				title: "Reportes",
				to: "/reportes",
				description: "reportes",
				component: reports,
				menu: true,
				icon: BookOpen,
			},
		],
	},
]
