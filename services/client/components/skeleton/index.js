import PropTypes from "prop-types";
import style from "./skeleton.module.css";

/**
 * SkeletonImage
 * @param {{size: "sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"}} param0
 */
const SkeletonImage = ({ size }) => (
    <div className={[style.default, style[`img-${size}`]].join(" ")} />
);

SkeletonImage.defaultProps = {
    size: "md",
};

SkeletonImage.propTypes = {
    size: PropTypes.string,
};

/**
 *
 * @param {{type: "image"}} param0
 */
export const Skeleton = ({ height, width, type, ...props }) => {
    if (type === "image") return <SkeletonImage {...props} />;
    return <div className={[style.default, style.text].join(" ")} />;
};
