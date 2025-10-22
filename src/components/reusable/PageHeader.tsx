interface PageHeaderProps {
	pageName: string
}

const PageHeader = ({ pageName }: PageHeaderProps) => {
	return (
		<header className="animate-slide-down fixed top-0 w-full pt-10 -z-10">
			<h1 className="text-[1.2rem] font-bold tracking-[1.5em] bg-gradient-to-t from-transparent to-muted-foreground bg-clip-text text-transparent text-center mr-[-1em] uppercase">
				{pageName}
			</h1>
		</header>
	)
}

export default PageHeader
