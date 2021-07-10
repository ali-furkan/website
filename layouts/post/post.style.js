import tw, { styled } from "twin.macro"

export const StyledPostMain = tw.main`
    my-8 mx-auto
    px-6
    w-full max-w-3xl
`

export const StyledPostArticle = tw.article`
    prose-lg prose dark:prose-dark
`

export const StyledPostMeta = styled.div(() => [
	`
        &>div {
            display: flex;
        }

        @media (max-width: 640px) {
            &>div:first-of-type {
                margin-top: 1rem;
                margin-left: 0.5rem;
            }
        }

        &>div>* {
            margin-right: 0.5rem;
        }

        &>div>*:last-child {
            margin-right: 0;
        }
    `,
	tw`flex justify-between my-4 text-sm sm:text-base flex-col-reverse sm:flex-row`
])

export const StyledPostMetaItem = styled.div(() => [
	`
        &>*:first-of-type {
            margin-right: 0.5rem
        }
    `,
	tw`flex`
])

export const StyledPostImage = tw.img`
    mb-8
`
