const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

/**
 * Formatting Post hash
 * @param {string} str
 */
export const fmtPost = (str) =>
    encodeURIComponent(
        str
            .toLowerCase()
            .replace(/\p{Emoji_Presentation}|\p{P}/gu, "")
            .replace(/\s+/gi, "-")
    );

export const fmtDate = (s) => {
    const cur = new Date();
    const d = new Date(s);
    return `${months[d.getMonth()]} ${d.getDate()}${
        cur.getFullYear() !== d.getFullYear() ? ", " + d.getFullYear() : ""
    }`;
};
