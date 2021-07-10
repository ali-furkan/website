import dynamic from "next/dynamic"

import { StyledMain } from "./main.style"

const Navbar = dynamic(() => import("@/components/navbar"))
const Footer = dynamic(() => import("@/components/footer"))

function MainLayout({ navbar = true, footer = true, children }) {
	return (
		<>
			{navbar && <Navbar />}
			<StyledMain>{children}</StyledMain>
			{footer && <Footer />}
		</>
	)
}

export default MainLayout
