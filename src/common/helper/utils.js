export function repairNumber(number) {
    if (number.toFixed().length === 1) {
        return `0${number}`
    }
    return number
}

export function formatTime(time) {
    if(!time) return '00:00'
    const minute = parseInt(time / 60)
    const second = parseInt(time % 60)
    return `${repairNumber(minute)}:${repairNumber(second)}`
}