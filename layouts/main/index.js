import dynamic from "next/dynamic"
import Footer from "@/components/footer"

import { StyledMain } from "./main.style"

const Navbar = dynamic(() => import("@/components/navbar"))

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
