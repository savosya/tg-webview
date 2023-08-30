export const getRatio = () => {
    return window.innerHeight <= window.innerWidth
        ? window.innerWidth / window.innerHeight
        : window.innerHeight / window.innerWidth;
};