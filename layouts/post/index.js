import { useEffect, useState } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import useClipboard from "react-use-clipboard"

import IconButton from "@/components/icon-button"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Text from "@/components/text"

const TwIco = dynamic(() => import("react-ionicons/lib/LogoTwitter"), {
    ssr: false
})
const LinkedinIco = dynamic(() => import("react-ionicons/lib/LogoLinkedin"), {
    ssr: false
})
const CopyIco = dynamic(() => import("react-ionicons/lib/Copy"), { ssr: false })
const CheckmarkIco = dynamic(() => import("react-ionicons/lib/CheckmarkDone"), {
    ssr: false
})
const DateIco = dynamic(() => import("react-ionicons/lib/Calendar"), {
    ssr: false
})
const BookIco = dynamic(() => import("react-ionicons/lib/Book"), { ssr: false })

import {
    StyledPostMain,
    StyledPostMeta,
    StyledPostMetaItem,
    StyledPostImage,
    StyledPostArticle
} from "./post.style"

function PostLayout({
    title,
    subtitle,
    description,
    image,
    keywords,
    readingTime,
    date,
    header = true,
    footer = true,
    children
}) {
    const [state, setState] = useState({ twContent: "", curHref: "" })

    const { resolvedTheme } = useTheme()
    const [isCopied, setCopied] = useClipboard(state.curHref, {
        successDuration: 5000
    })

    const color = resolvedTheme === "dark" ? "#ddd" : "#444"

    useEffect(() => {
        if (!window) return

        const href = window.location.href

        setState({
            twContent: encodeURIComponent(
                [title, "@ali_furkqn", href].join(" ")
            ),
            curHref: href
        })
    }, [])

    return (
        <>
            <Head>
                <title>{title} | Ali Furkan&apos;s Blog</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta
                    property="og:title"
                    content={`${title} | Ali Furkan's Blog`}
                />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="article:author" content="Ali Furkan Kurt" />
            </Head>
            {header && <Navbar />}
            <StyledPostMain>
                <Text h1>{title}</Text>
                {subtitle && (
                    <Text h3 color={"#888"}>
                        {subtitle}
                    </Text>
                )}
                <StyledPostMeta>
                    <div>
                        <StyledPostMetaItem>
                            {/* Meta Data*/}
                            <DateIco fontSize={24} color={color} />
                            <Text> {date} </Text>
                        </StyledPostMetaItem>
                        {readingTime && (
                            <StyledPostMetaItem>
                                <BookIco fontSize={24} color={color} />
                                <Text>{readingTime}</Text>
                            </StyledPostMetaItem>
                        )}
                    </div>
                    <div>
                        {/* Social Links */}
                        <IconButton
                            Icon={TwIco}
                            href={`https://twitter.com/intent/tweet?text=${state.twContent}`}
                            size={"24px"}
                            color={color}
                        />
                        <IconButton
                            Icon={LinkedinIco}
                            href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                state.curHref
                            )}`}
                            size="24px"
                            color={color}
                        />
                        <IconButton
                            Icon={isCopied ? CheckmarkIco : CopyIco}
                            onClick={setCopied}
                            size="24px"
                            color={color}
                        />
                    </div>
                </StyledPostMeta>
                {image && (
                    <StyledPostImage alt={title.toLowerCase()} src={image} />
                )}
                <StyledPostArticle>{children}</StyledPostArticle>
            </StyledPostMain>

            {footer && <Footer></Footer>}
        </>
    )
}

export default PostLayout
