import LoadingOverlay from "@/components/LoadingOverlay"
import React, { createContext, useState } from "react"

interface LoadingContextProps {
	showLoading: () => void
	hideLoading: () => void
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(
	undefined,
)

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isVisible, setIsVisible] = useState(false)

	const showLoading = () => setIsVisible(true)
	const hideLoading = () => setIsVisible(false)

	return (
		<LoadingContext.Provider value={{ showLoading, hideLoading }}>
			{children}
			<LoadingOverlay isVisible={isVisible} />
		</LoadingContext.Provider>
	)
}
