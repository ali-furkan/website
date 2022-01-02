import humanizeDuration from "humanize-duration"

const ideNames = ["Visual Studio Code", "Vim", "Atom"]

function handleActivityType(status) {
    if (status.listening_to_spotify) return "Listening"
    if (ideNames.includes(status.activities[0].name)) return "Coding"

    return "Playing"
}

function handleActivityName(status) {
    if (status.listening_to_spotify) {
        return `${status.spotify.song} by ${status.spotify.artist}`
    }

    return status.activities[0].name
}

function handleActivityTimestamps(status) {
    if (status.listening_to_spotify) {
        return status.spotify.timestamps
    }

    return status.activities[0].timestamps
}

export function getActivity(loading, status) {
    if (loading) return { type: "", name: "Status Loading", start: null }

    if (status.discord_status == "offline")
        return { type: "Offline", name: "", start: null }

    if (status.activities.length > 0 || status.listening_to_spotify) {
        const type = handleActivityType(status),
            name = handleActivityName(status),
            timestamps = handleActivityTimestamps(status)

        return {
            type,
            name,
            timestamps
        }
    }

    return {
        type: "No Activity",
        name: "",
        start: null
    }
}

export const calcDuration = (activity) => {
    if (!activity.timestamps) return "for long time"

    if(activity.type == "Listening") {
        const songDuration = activity.timestamps.end - activity.timestamps.start
        const listeningDuration = Date.now() - activity.timestamps.start

        return `${listeningDuration}/${songDuration}` 
    }

    const durationContent = humanizeDuration(activity.timestamps.start - Date.now(), {
        round: true,
        largest: 1
    })

    return durationContent
}
