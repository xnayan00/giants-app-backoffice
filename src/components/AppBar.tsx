import { NavLink } from "react-router-dom"

interface NavItem {
	path: string
	label: string
	icon: string
}

const navItems: NavItem[] = [
	{ path: "/dashboard", label: "Dashboard", icon: "fi fi-ts-house-chimney" },
	{ path: "/eventos", label: "Eventos", icon: "fi fi-ts-calendar" },
	{ path: "/palestras", label: "Palestras", icon: "fi fi-ts-presentation" },
	{ path: "/network", label: "Network", icon: "fi fi-ts-users" }
]

export const AppBar = () => {
	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-surface-elevated border-t border-border z-50">
			<div className="grid grid-cols-4 h-16">
				{navItems.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						className={({ isActive }) =>
							`flex flex-col items-center justify-center gap-1 transition-smooth ${
								isActive
									? "text-primary"
									: "text-muted-foreground hover:text-foreground"
							}`
						}
					>
						<i className={`${item.icon} text-xl`}></i>
						<span className="text-xs font-medium">{item.label}</span>
					</NavLink>
				))}
			</div>
		</nav>
	)
}
