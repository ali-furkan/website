const ideNames = ["Visual Studio Code", "Vim", "Atom"]

function handleActivityType(status) {
    if (ideNames.includes(status.activities[0].name)) return "Coding"
    if (status.listening_to_spotify) return "Listening"

    return "Playing"
}

export function getActivity(loading, status) {
    if (loading) return { type: "", name: "Status Loading", start: null }

    if (status.discord_status == "offline")
        return { type: "Offline", name: "", start: null }

    if (status.activities.length > 0) {
        const type = handleActivityType(status)

        return {
            type,
            name: status.activities[0].name,
            start: status.activities[0].timestamps.start
        }
    }

    return {
        type: "No Activity",
        name: "",
        start: null
    }
}
