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

export function convertSecondsToHoursMinutes(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    return {
        hours,
        minutes,
    };
}
