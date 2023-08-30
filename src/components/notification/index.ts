import cls from './styles.module.scss'


export const notification = (message: string) => {
    const root = document.body;

    if (!root) return;


    const $notification = document.createElement("div");
    $notification.setAttribute("class", cls.notification);
    $notification.innerText = message;
    root.appendChild($notification);

    setTimeout(() => {
        root.removeChild($notification);
    }, 2000);
};

