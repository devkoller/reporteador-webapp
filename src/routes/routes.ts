// Views
import { Login } from "@/views/Login"
import { RecoveryPassword } from "@/views/RecoveryPassword"
import { Home } from "@/views/Home"

import { Enterprise } from "@/views/enterprise/Enterprise"
import { NewEnterprisePage } from "@/views/enterprise/NewEnterprisePage"
import { EnterpriseDetails } from "@/views/enterprise/EnterpriseDetails"

import { Inventory } from "@/views/inventory/Inventory"
import { AddProduct } from "@/views/inventory/AddProduct"

import { Almacenes } from "@/views/warehouse/Almacenes"
import { WarehouseId } from "@/views/warehouse/WarehouseId"
import { WarehouseEdit } from "@/views/warehouse/WarehouseEdit"
import { InventoryManage } from "@/views/warehouse/InventoryManage"
import { ProductsDetails } from "@/views/warehouse/ProductsDetails"

import { Proveedores } from "@/views/provider/Proveedores"
import { NewProviderPage } from "@/views/provider/NewProviderPage"
import { ProviderDetails } from "@/views/provider/ProviderDetails"
import { ManagesProducts } from "@/views/provider/ManageProducts"

import { OrdersOverview } from "@/views/orders/OrdersOverview"
import { CreatePurchaseOrder } from "@/views/orders/CreatePurchaseOrder"
import { CreateSellingOrder } from "@/views/orders/CreateSellingOrder"
import { PurchaseDetail } from "@/views/orders/PurchaseDetail"
import { SellingDetail } from "@/views/orders/SellingDetail"

import { Services } from "@/views/service/Services"
import { NewService } from "@/views/service/NewService"

import { Contracts } from "@/views/contracts/Contracts"
import { ContractNew } from "@/views/contracts/ContractNew"
import { ContractDetails } from "@/views/contracts/ContractDetails"

import { Users } from "@/views/Users"
import { Clientes } from "@/views/client/Clientes"
import { UserProfile } from "@/views/UserProfile"

import {
	Building2,
	LayoutDashboard,
	Package,
	Warehouse,
	Truck,
	Users as UsersIcon,
	UserCircle,
	ShoppingCart,
	Wrench,
	FileText,
	// ClipboardList,
	// LogOut,
	// ChevronDown,
	// ArrowUpCircle,
	// ArrowDownCircle,
	// BarChart3,
	// CheckCircle,
	// Clock,
} from "lucide-react"

const enterpriseRoutes = [
	{
		route: "/enterprise",
		component: Enterprise,
		title: "Empresas",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: true,
		icon: Building2,
	},
	{
		route: "/enterprise/new",
		component: NewEnterprisePage,
		title: "Empresas",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
	{
		route: "/enterprise/:id",
		component: EnterpriseDetails,
		title: "Empresas",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
	{
		route: "/enterprise/:id/edit",
		component: NewEnterprisePage,
		title: "Empresas",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
]

const warehouseRoues = [
	{
		route: "/warehouse",
		component: Almacenes,
		title: "Almacenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: true,
		icon: Warehouse,
	},
	{
		route: "/warehouse/:id",
		component: WarehouseId,
		title: "Almacenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
	{
		route: "/warehouse/:id/edit",
		component: WarehouseEdit,
		title: "Almacenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
	{
		route: "/warehouse/:id/inventory/manage",
		component: InventoryManage,
		title: "Almacenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
	{
		route: "/warehouse/:id/product/:productId",
		component: ProductsDetails,
		title: "Almacenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
]

const inventoryRoutes = [
	{
		route: "/inventory",
		component: Inventory,
		title: "Inventario",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: true,
		icon: Package,
	},
	{
		route: "/inventory/add",
		component: AddProduct,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
	{
		route: "/inventory/edit/:id",
		component: AddProduct,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
]

const providerRoutes = [
	{
		route: "/provider",
		component: Proveedores,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Proveedores",
		needGrants: true,
		menu: true,
		icon: Truck,
	},
	{
		route: "/provider/:id/edit",
		component: NewProviderPage,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
	{
		route: "/provider/new",
		component: NewProviderPage,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
	{
		route: "/provider/:id",
		component: ProviderDetails,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
	{
		route: "/provider/:id/products",
		component: ManagesProducts,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Building2,
	},
]

const serviceRoutes = [
	{
		route: "/product/services",
		component: Services,
		title: "Servicios",
		state: "Authenticated",
		breadcrumb: "Proveedores",
		needGrants: true,
		menu: true,
		icon: Wrench,
	},
	{
		route: "/product/service/new",
		component: NewService,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: Wrench,
	},
]

const clientRoutes = [
	{
		route: "/client",
		component: Clientes,
		title: "Clientes",
		state: "Authenticated",
		breadcrumb: "Clientes",
		needGrants: true,
		menu: true,
		icon: UsersIcon,
	},
]

const ordersRoutes = [
	{
		route: "/order",
		component: OrdersOverview,
		title: "Ordenes",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: true,
		icon: ShoppingCart,
	},
	{
		route: "/order/selling/new",
		component: CreateSellingOrder,
		title: "Ordenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
	{
		route: "/order/selling/:id",
		component: SellingDetail,
		title: "Ordenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
	{
		route: "/order/purchase/new",
		component: CreatePurchaseOrder,
		title: "Ordenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
	{
		route: "/order/purchase/:id",
		component: PurchaseDetail,
		title: "Ordenes",
		state: "Authenticated",
		breadcrumb: "Almacenes",
		needGrants: true,
		menu: false,
		icon: Warehouse,
	},
]

const contractRoutes = [
	{
		route: "/contract",
		component: Contracts,
		title: "Contratos",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: true,
		icon: FileText,
	},
	{
		route: "/contract/new",
		component: ContractNew,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: FileText,
	},
	{
		route: "/contract/edit/:id",
		component: ContractNew,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: FileText,
	},
	{
		route: "/contract/:id",
		component: ContractDetails,
		title: "Proveedores",
		state: "Authenticated",
		breadcrumb: "Inventario",
		needGrants: true,
		menu: false,
		icon: FileText,
	},
]

export const routes = [
	{
		route: "/login",
		component: Login,
		state: "Not Authenticated",
		menu: false,
		icon: UserCircle,
	},
	{
		route: "/recovery-password",
		component: RecoveryPassword,
		state: "Not Authenticated",
		menu: false,
		icon: UserCircle,
	},
	{
		route: "/home",
		component: Home,
		title: "Dashboard",
		state: "Authenticated",
		breadcrumb: "Inicio",
		needGrants: false,
		menu: true,
		icon: LayoutDashboard,
	},
	//enterprise
	...enterpriseRoutes,
	//inventory
	...inventoryRoutes,
	//services
	...serviceRoutes,
	//warehouse
	...warehouseRoues,
	//provider
	...providerRoutes,
	//clients
	...clientRoutes,
	//orders
	...ordersRoutes,
	//contracts
	...contractRoutes,
	{
		route: "/usuarios",
		component: Users,
		title: "Usuarios",
		state: "Authenticated",
		breadcrumb: "Usuarios",
		needGrants: true,
		menu: true,
		icon: UserCircle,
	},
	{
		route: "/profile",
		component: UserProfile,
		title: "Usuarios",
		state: "Authenticated",
		breadcrumb: "Usuarios",
		needGrants: false,
		menu: false,
	},
]
