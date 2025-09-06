export function getTotalSecondsFromYoutubeDuration(duration) {
    if (!duration) return duration;

    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0,
        minutes = 0,
        seconds = 0,
        totalSeconds;

    if (reptms.test(duration)) {
        var matches = reptms.exec(duration);
        if (matches[1]) hours = Number(matches[1]);
        if (matches[2]) minutes = Number(matches[2]);
        if (matches[3]) seconds = Number(matches[3]);
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    return totalSeconds;
}

export function convertSecondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        hours: isNaN(hours) ? 0 : hours,
        minutes: isNaN(minutes) ? 0 : minutes,
        seconds: isNaN(seconds) ? 0 : seconds,
    };
}

export const formatHHMMSS = (currentTime) => {
    const {
        hours = 0,
        minutes = 0,
        seconds = 0,
    } = convertSecondsToHMS(currentTime);

    const min = minutes < 10 ? '0' + minutes : minutes;
    const sec = seconds < 10 ? '0' + seconds : seconds;

    if (hours > 0) {
        return `${hours < 10 ? '0' + hours : hours}:${min}:${sec}`;
    }

    return `${min}:${sec}`;
};
