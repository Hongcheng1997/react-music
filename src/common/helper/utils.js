export function filterTime(time) {
    if (!time) return
    const minute = repairNumber(parseInt(time.toFixed().substr(0, 3) / 60))
    const second = repairNumber(+time.toFixed().substr(0, 3) - minute * 60)
    return `${minute}:${second}`
}

export function repairNumber(number) {
    if (number.toFixed().length === 1) {
        return `0${number}`
    }
    return number
}