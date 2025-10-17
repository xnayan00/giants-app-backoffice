// Componente criado apenas para renderizar icones da biblioteca que não carregaram corretamente
import SearchIcon from "@/assets/icons/SearchIcon"

function getIconByName(name: string) {
	switch (name) {
		case "search":
			return <SearchIcon />
		default:
			return null
	}
}

interface IconProps {
	name?: string
	size?: string
	color?: string
}
export default function Icon({
	name = "search",
	size = "24px",
	color = "#FFF",
}: IconProps) {
	return (
		<div style={{ width: size, height: size, fill: color }}>
			{getIconByName(name)}
		</div>
	)
}
