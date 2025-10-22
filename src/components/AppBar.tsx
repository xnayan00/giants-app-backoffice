import { NavLink, useLocation, matchPath } from "react-router-dom"

interface NavItem {
	path: string
	label: string
	icon: string
}

const navItems: NavItem[] = [
	{ path: "/eventos", label: "Eventos", icon: "fi fi-ts-calendar" },
	{ path: "/palestras", label: "Palestras", icon: "fi fi-ts-presentation" },
	{ path: "/dashboard", label: "", icon: "house-chimney" },
	{ path: "/network", label: "Network", icon: "fi fi-ts-network-analytic" },
	{
		path: "/mentoring",
		label: "Mentorias",
		icon: "fi fi-ts-bubble-discussion",
	},
]

export const AppBar = () => {
	function checkIsActive(path: string) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { pathname } = useLocation()

		return matchPath({ path, end: false }, pathname)
	}

	return (
		<>
			<nav className="fixed bottom-0 left-0 right-0 mx-5 mb-3 bg-[rgba(15,15,15,.7)] border-t rounded-xl border-[#555555] backdrop-blur-sm z-40">
				<div className="grid grid-cols-5 h-16">
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
							<i
								className={`fi fi-${checkIsActive(item.path) ? "ss-" : "ts-"}${item.icon} text-xl`}
							></i>
							<span
								className={`text-xs font-${checkIsActive(item.path) ? "bold" : "medium"}`}
							>
								{item.label}
							</span>
						</NavLink>
					))}
				</div>
			</nav>
		</>
	)
}
