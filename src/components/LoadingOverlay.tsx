import clsx from "clsx"
import loadingGif from "@/assets/loading.gif"

const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
	return (
		<div
			className={clsx(
				"fixed inset-0 flex bg-black items-center justify-center z-50",
				{
					hidden: !isVisible,
				},
			)}
			style={{
				background: "radial-gradient(circle , black 10%, rgba(0,0,0,0.7))",
			}}
		>
			<div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden">
				<img
					src={loadingGif}
					alt="Loading..."
				/>
			</div>
		</div>
	)
}

export default LoadingOverlay
