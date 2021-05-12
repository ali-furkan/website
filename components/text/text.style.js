import tw, { styled } from "twin.macro"

export const StyledText = styled.p((props) => [
	props.italic && tw`italic`,
	props.b && tw`font-bold`,
	props.mark &&
		tw`font-medium after:content[""] after:w-3 after:h-2 after:bg-black`,

	props.h1 && tw`text-6xl font-extrabold`,
	props.h2 && tw`text-4xl font-bold`,
	props.h3 && tw`text-2xl font-bold`,
	props.h4 && tw`text-xl font-bold`,
	props.p && tw`text-base text-gray-900 dark:text-gray-100`,

	props.color &&
		`
		color: ${props.color};
	`
])
