export function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`)
}

export function printCards() {
    const counter = { init: 16, step: 4 }
    if (window.innerWidth < 1020) {
        counter.init = 8
        counter.step = 2
    }
    if (window.innerWidth < 650) {
        counter.init = 5
        counter.step = 2
    }
    return counter
}

