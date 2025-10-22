const PageMainContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="px-6 pt-10 pb-6 mt-[4rem] space-y-4 animate-fade-in bg-gradient-to-b from-transparent to-black to-[50px] z-20">
			{children}
		</main>
	)
}

export default PageMainContainer
