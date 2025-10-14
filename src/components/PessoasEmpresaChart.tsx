import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { PessoaEmpresa } from "@/types/dashboard"
import { Label, Pie, PieChart, Cell } from "recharts"

export default function PessoasEmpresaChart({
	data,
}: {
	data: PessoaEmpresa[]
}) {
	const chartData = data
	const chartConfig = {
		total: {
			label: "Total",
			color: "#8884d8",
		},
		colaborador: {
			label: "Colaborador",
			color: "#60a5fa",
		},
		lideranca: {
			label: "Liderança",
			color: "#facc15",
		},
		membro: {
			label: "Membro",
			color: "#4ade80",
		},
	}

	const total = chartData.reduce((acc, curr) => acc + curr.total, 0)

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Pessoas da Empresa por Perfil</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="total"
							nameKey="perfil"
							innerRadius={60}
							strokeWidth={5}
						>
							{chartData.map((entry) => (
								<Cell
									key={entry.perfil}
									fill={
										chartConfig[
											entry.perfil.toLowerCase() as keyof typeof chartConfig
										]?.color || "#8884d8"
									}
								/>
							))}
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{total.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Total
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<div className="flex items-center justify-center gap-4 p-4">
				{Object.keys(chartConfig)
					.filter((key) => key !== "total")
					.map((key) => (
						<div
							key={key}
							className="flex items-center gap-2"
						>
							<div
								className="h-2 w-2 shrink-0 rounded-[2px]"
								style={{
									backgroundColor:
										chartConfig[key as keyof typeof chartConfig]?.color,
								}}
							/>
							<span className="text-white">
								{chartConfig[key as keyof typeof chartConfig]?.label}
							</span>
						</div>
					))}
			</div>
		</Card>
	)
}
