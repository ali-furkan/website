import readingTime from "reading-time";
import { fmtPost } from "@/lib/fmt";

/**
 * Compile Post
 * @param {import("contexts/edit").EditState} payload
 */
export const CompilePost = ({
    type,
    title,
    tags,
    image,
    content,
    description,
}) => {
    const createdAt = Date.now();
    const tagsObj = tags
        .split(", ")
        .slice(0, tags.split(", ").length - 1)
        .map((t) => ({
            text: t,
            color: "secondary-400",
        }));
    const hash = fmtPost(title);

    const meta = {
        hash,
        title,
        image,
        description,
        tags: tagsObj,
        href: {
            pathname: `/${type}/[id]`,
            query: {
                id: hash,
            },
        },
        createdAt,
    };

    const compiledContent = `<MdxPageHead title="${title}" description="${description}" image="${image}" createdAt={${createdAt}} tags={${JSON.stringify(
        tagsObj
    )}} readingTime={"${readingTime(content).text}"} />

<MdxPageText>

${content}

</MdxPageText>
    `;

    return {
        meta,
        compiledContent,
        hash,
    };
};
