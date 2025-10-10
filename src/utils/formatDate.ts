export const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}
	return new Date(dateString).toLocaleDateString("pt-BR", options)
}

export const getTime = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit"
	}
	return new Date(dateString).toLocaleTimeString("pt-BR", options)
}

export const getDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		year: "numeric"
	}
	return new Date(dateString).toLocaleDateString("pt-BR", options)
}
