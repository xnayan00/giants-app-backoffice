import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { EventoEmpresaTipo } from "@/types/dashboard"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

export default function ParticipacoesPorTipoChart({
	data,
}: {
	data: EventoEmpresaTipo[]
}) {
	const chartData = data
	const chartConfig = {
		total: {
			label: "Total",
			color: "hsl(var(--chart-1))",
		},
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Participações em Eventos por Tipo</CardTitle>
				<CardDescription>
					Encontros, imersões, onlive e outros
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="min-h-[200px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: -20,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="gr_descricao"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<XAxis dataKey="total" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Bar dataKey="total" fill="var(--color-total)" radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
