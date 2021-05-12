import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { StyledThemeToggle } from "./theme-toggle.style"

const Moon = dynamic(() => import("react-ionicons/lib/MoonOutline"), {
	ssr: false
})
const Sunny = dynamic(() => import("react-ionicons/lib/SunnyOutline"), {
	ssr: false
})

function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const iconColor = resolvedTheme == "dark" ? "#fff" : "#000"

	const Icon = resolvedTheme === "dark" ? Sunny : Moon

	return (
		<StyledThemeToggle
			tabIndex="0"
			aria-label="theme-toggle"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
		>
			<Icon height="18px" width="18px" color={iconColor} />
		</StyledThemeToggle>
	)
}

export default ThemeToggle
