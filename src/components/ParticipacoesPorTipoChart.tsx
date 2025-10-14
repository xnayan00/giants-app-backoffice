import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
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
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="min-h-[100px] h-[140px] w-full"
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
							barSize={100}
						>
							{chartData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Bar>
					</BarChart>
				</ChartContainer>
				<div className="flex items-center justify-center gap-4 p-4">
					{Object.keys(chartConfig)
						.filter((key) => key !== "total")
						.map((key, index) => (
							<div key={key} className="flex items-center gap-2">
								<div
									className="h-2 w-2 shrink-0 rounded-[2px]"
									style={{ backgroundColor: COLORS[index % COLORS.length] }}
								/>
								<span className="text-white">
									{chartConfig[key as keyof typeof chartConfig]?.label}
								</span>
							</div>
						))}
				</div>
			</CardContent>
		</Card>
	)
}