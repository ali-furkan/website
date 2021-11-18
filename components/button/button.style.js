import tw, { styled } from "twin.macro"

export const StyledButton = styled.button((props) => [
    props.border &&
        tw`
            border-2 
            border-black dark:border-white 
            text-black dark:text-white
            hover:dark:bg-white
            hover:bg-black
            hover:text-white
            hover:dark:text-black
        `,
    !props.border &&
        tw`
            bg-black dark:bg-white 
            text-white dark:text-gray-700
            hover:bg-opacity-60
        `,
    tw`
    rounded-lg
    px-5 py-1.5 
    m-0
    duration-200
    transition-all
    ease-in
    `
])
