import tw from "twin.macro"

export const StyledFooterWrapper = tw.div`
    mx-auto
    w-full max-w-3xl
`

export const StyledFooter = tw.footer`
    border-t-2 border-gray-600 
    px-2 mx-1 py-8
`

export const StyledTree = tw.div`
    flex 
    items-start justify-between 
    mt-6
`

export const StyledLinks = tw.div`
    flex flex-col
`

export const StyledLink = tw.a`
    sm:text-lg
    text-base
    text-gray-500
    dark:text-gray-450
    p-2 
    cursor-pointer 
    ease-in duration-200 transition-all 
    hover:opacity-60
`
