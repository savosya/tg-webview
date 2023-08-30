
import { notification } from "../components/notification";
import { BOT_TOKEN } from "../config/env";


type ReqProps = {
    chatId: string | null
    imageBlob: Blob | null
}

export async function sendPhotoToTelegramRequest({ chatId, imageBlob }: ReqProps) {
    if (!chatId) {
        notification('ChatId не определене')
        return
    };
    if (!imageBlob) return

    const URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto?chat_id=${chatId}`;

    const caption = "Report_" + Date.now();
    const formData = new FormData();
    formData.append("photo", imageBlob);
    formData.append("caption", caption);

    await fetch(URL, {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            notification('Фото отправленно')
        })
        .catch((error) => {
            notification('Ошибка при отправке фото')
        });
}