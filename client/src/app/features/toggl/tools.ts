

export const secondsToHm = duration => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration % 3600 / 60);
    return `${hours}:${(minutes <= 9) ? 0 : ''}${minutes}`;
}