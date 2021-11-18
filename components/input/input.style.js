import tw, { styled } from "twin.macro"

export const StyledInputBox = tw.div`
    flex flex-col
`

export const StyledInputLabel = styled.label`
    ${tw`py-2`}

    p {
        ${tw`text-base font-semibold mb-0`}
    }
`

export const StyledInputWrapper = tw.div`
    flex
    items-center justify-center
    w-full
    px-2
    rounded-lg
    shadow-lg
    bg-gray-100
    dark:bg-gray-900
`

export const StyledInput = tw.input`
    w-full
    px-2 py-4
    font-semibold
    bg-transparent
    outline-none
    text-base
    text-gray-800 
    dark:text-white

    placeholder:select-none
    placeholder:dark:opacity-50
    
    focus:opacity-75
`
