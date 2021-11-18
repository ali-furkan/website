import tw, { styled } from "twin.macro"

export const StyledCard = styled.article((props) => [
    `
        a,
        h1,
        h2,
        h3,
        h4,
        p,
        img,
        svg {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }
    `,
    tw`
    p-6
    cursor-pointer
    rounded-lg
    bg-gray-700
    bg-opacity-0
    transition-all duration-200 ease-in-out 
    hover:light:bg-opacity-5
    hover:dark:opacity-80
    `,
    props.border && tw`border-2 border-gray-700`
])

export const StyledCardContainer = tw.div`
    flex 
    flex-col sm:flex-row
`

export const StyledCardContent = tw.div`
    sm:mt-0 mt-4
`

export const StyledImage = tw.img`
    rounded
    object-cover 
    sm:w-48 
    sm:mr-4 
    h-32 
    w-full
`

export const StyledCardFooter = tw.footer`
    pt-4
    text-gray-500
    dark:text-gray-450
`
