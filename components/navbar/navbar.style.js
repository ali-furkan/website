import tw from "twin.macro"

export const StyledHeader = tw.header`
    backdrop-filter[blur(8px)]
    bg-white
    dark:bg-black
    dark:bg-opacity-40
    bg-opacity-30
    w-full
    sticky
    top-0
    z-10
`

export const StyledNavbar = tw.nav`
    max-w-5xl
    mx-auto
    flex justify-between items-center
    py-5 px-6
    select-none
`

export const StyledNavbarLinks = tw.div`flex items-center`

export const StyledNavbarLink = tw.a`
    cursor-pointer 
    px-2.5 sm:px-5
    h-full
    dark:text-gray-100
    duration-200 ease-in transition-all 
    hover:opacity-60
`
