import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { EventoEmpresaTipo } from "@/types/dashboard"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

export default function ParticipacoesPorTipoChart({
	data,
}: {
	data: EventoEmpresaTipo[]
}) {
	const chartData = data
	const COLORS = ["#60a5fa", "#a78bfa", "#4ade80", "#facc15"]
	const chartConfig = {
		total: {
			label: "Total",
		},
		encontros: {
			label: "Encontros",
			color: "#60a5fa",
		},
		imersoes: {
			label: "Imersões",
			color: "#a78bfa",
		},
		onlive: {
			label: "Onlive",
			color: "#4ade80",
		},
		outros: {
			label: "Outros",
			color: "#facc15",
		},
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Participações em Eventos por Tipo</CardTitle>
				<CardDescription>Encontros, imersões, onlive e outros</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="min-h-[150px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 50,
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
						<XAxis
							dataKey="total"
							type="number"
							hide
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Bar
							dataKey="total"
							radius={5}
						>
							{chartData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Bar>
						<ChartLegend
							content={<ChartLegendContent nameKey="gr_descricao" />}
							className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
