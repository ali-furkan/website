import Link from "next/link"
import {
    StyledCard,
    StyledCardContainer,
    StyledCardContent,
    StyledCardFooter,
    StyledImage
} from "./card.style"

function Card({ image, children, footer, href }) {
    const component = (
        <StyledCard tabIndex="0">
            <StyledCardContainer>
                {image && (
                    <StyledImage
                        alt={`img-${image.split("/").pop().toLowerCase()}`}
                        src={image}
                    />
                )}
                <StyledCardContent aria-label="card-content">
                    {children}
                </StyledCardContent>
            </StyledCardContainer>
            {footer && <StyledCardFooter>{footer} </StyledCardFooter>}
        </StyledCard>
    )

    if (href) {
        return (
            <Link href={href} passHref>
                {component}
            </Link>
        )
    }

    return component
}

export default Card
