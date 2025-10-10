import api from "../http/api"

interface AuthData {
	access_token: string
	expires_in: number
	token_type: string
}

export interface User {
	name: string
	role: string
}

export const authenticate = async (): Promise<{
	authData: AuthData
	user: User
}> => {
	const { data } = await api.post("/autenticacao", {
		client_id: import.meta.env.VITE_CLIENT_ID,
		client_secret: import.meta.env.VITE_CLIENT_SECRET
	})

	const user: User = {
		name: "João Silva",
		role: "Participante"
	}

	return { authData: data, user: user }
}

export const autenticacaoToken = async (email: string) => {
	return api.post("/autenticacao-token", { email })
}

export const validarToken = async (email: string, token: string) => {
	return api.post("/validar-token", { email, token })
}

export const login = async (email: string, otp: string) => {
	// This is a mock login function, it will be replaced with the actual login logic
	console.log(email, otp)
	return {
		token: "mock-token"
	}
}
