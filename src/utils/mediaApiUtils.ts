
export function isMediaDevicesSupported() {
    return (
        !!(navigator?.mediaDevices && navigator?.mediaDevices?.getUserMedia) || //@ts-ignore
        !!navigator?.getUserMedia || //@ts-ignore
        !!navigator?.webkitGetUserMedia || //@ts-ignore
        !!navigator?.mozGetUserMedia
    )
}