import { StyledText } from "./text.style"

const htmlComponents = ["h1", "h2", "h3", "h4", "p", "b", "i", "mark", "del"]

/**
 * Text Component
 * @param {{
 * children: any;
 * Component?: import("react").JSXElementConstructor;
 * color?: string;
 * size?: "xs"|"sm"|"base"|"lg"|"xl"|"2xl"|"4xl"|"6xl";
 * p?: boolean;
 * italic?: boolean;
 * mark?: boolean;
 * del?: boolean;
 * b?: boolean;
 * h1?: boolean;
 * h2?: boolean;
 * h3?: boolean;
 * h4?: boolean;
 * }&import("react").ComponentProps<"p"|"h1">} props
 */
function Text({
	children,
	Component,
	color,
	size,
	italic,
	mark,
	del,
	b,
	p,
	h1,
	h2,
	h3,
	h4,
	...props
}) {
	const componentProps = { color, size, italic, b, p, h1, h2, h3, h4, ...props }
	if (Component) return <Component {...componentProps}>{children}</Component>

	const i = [h1, h2, h3, h4, p, b, italic, mark, del].findIndex((e) => e)
	const TextComponent =
		i !== -1 ? StyledText.withComponent(htmlComponents[i]) : StyledText

	return <TextComponent {...componentProps}>{children}</TextComponent>
}

export default Text
