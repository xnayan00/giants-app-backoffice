import { useState } from "react"

interface StarRatingProps {
	count?: number
	value?: number
	onChange?: (rating: number) => void
}

export function StarRating({
	count = 5,
	value = 0,
	onChange,
}: StarRatingProps) {
	const [hover, setHover] = useState(0)
	const [rating, setRating] = useState(value)

	const handleClick = (ratingValue: number) => {
		setRating(ratingValue)
		if (onChange) {
			onChange(ratingValue)
		}
	}

	return (
		<div className="flex items-center">
			{[...Array(count)].map((_, index) => {
				const ratingValue = index + 1
				return (
					<label key={index}>
						<input
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={() => handleClick(ratingValue)}
							className="hidden"
						/>
						<i
							className={`fi ${ratingValue <= (hover || rating) ? "fi-ss-star mx-1" : "fi-ts-star mx-1"} text-yellow-400 text-3xl cursor-pointer transition-smooth`}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(0)}
						></i>
					</label>
				)
			})}
		</div>
	)
}
