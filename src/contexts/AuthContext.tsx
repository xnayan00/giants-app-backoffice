import * as React from "react"
import {
	autenticacaoToken as autenticacaoTokenService,
	validarToken as validarTokenService,
} from "@/services/authService"
import { toast } from "sonner"
import { MembroDataType } from "@/types/membros"

type AuthContextType = {
	user: MembroDataType | null
	token: string | null
	login: (user: MembroDataType, token: string) => void
	logout: () => void
	autenticacaoToken: (email: string) => Promise<void>
	validarToken: (email: string, otp: string) => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<MembroDataType | null>(null)
	const [token, setToken] = React.useState<string | null>(null)

	const login = (user: MembroDataType, token: string) => {
		setUser(user)
		setToken(token)
		localStorage.setItem("token", token)
		localStorage.setItem("user", JSON.stringify(user))
	}

	const logout = () => {
		setUser(null)
		setToken(null)
		localStorage.removeItem("token")
		localStorage.removeItem("user")
	}

	const autenticacaoToken = async (email: string) => {
		return autenticacaoTokenService(email)
			.then(() => {
				toast.success("Código enviado para seu email")
			})
			.catch(() => {
				toast.error("Erro ao enviar código. Tente novamente.")
				throw new Error("Erro ao enviar código")
			})
	}

	const validarToken = async (email: string, otp: string) => {
		return validarTokenService(email, otp)
			.then(({ data }) => {
				console.log("AHHHHHHHHH: ", data)

				const user = data.data[0]
				setUser(user)
				localStorage.setItem("user", JSON.stringify(user))
				toast.success("Login realizado com sucesso!")
			})
			.catch(() => {
				toast.error("Código inválido. Tente novamente.")
				throw new Error("Código inválido")
			})
	}

	React.useEffect(() => {
		const storedToken = localStorage.getItem("token")
		const storedUser = localStorage.getItem("user")
		if (storedToken && storedUser) {
			setToken(storedToken)
			setUser(JSON.parse(storedUser))
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				login,
				logout,
				autenticacaoToken,
				validarToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = React.useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
