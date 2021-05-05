import tw from "twin.macro"

export const StyledIconButton = tw.div`
    mx-2 
    duration-200 ease-in transition-all 
    cursor-pointer 
    hover:opacity-75
`

export const StyledIconButtonA = StyledIconButton.withComponent("a")
