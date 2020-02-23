export function repairNumber(number) {
    if (number.toFixed().length === 1) {
        return `0${number}`
    }
    return number
}

export function formatTime(time, isMillisecond) {
    if (!time) return '00:00'
    if (isMillisecond) time = time / 1000
    let minute = parseInt(time / 60)
    let second = parseInt(time % 60)
    return `${repairNumber(minute)}:${repairNumber(second)}`
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}