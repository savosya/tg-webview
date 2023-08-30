export const addWatermark = (canvas: HTMLCanvasElement, waterObj: any) => {
    const context = canvas.getContext('2d')
    if (context) {
        context.fillStyle = '#FFF'
        context.textBaseline = 'middle'
        context.font = '24px Arial'
        context.fillText(`Госномер: A123AA777`, 20, canvas.height - 205)
        // context.fillText(`Госномер: ${waterObj.grz}`, 20, canvas.height - 205)
        // context.fillText(`Статус: ${waterObj.newStatus}`, 20, canvas.height - 170)
        // context.fillText(`Широта: ${waterObj.coords.lat}`, 20, canvas.height - 135)
        // context.fillText(`Долгота: ${waterObj.coords.long}`, 20, canvas.height - 100)
        // context.fillText(`Адрес: ${waterObj.address}`, 20, canvas.height - 65)
        // context.fillText(`Дата: ${waterObj.date}`, 20, canvas.height - 30)
    }
    return canvas
}
