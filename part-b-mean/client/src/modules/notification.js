export async function generateErrorNotification(error) {
    const notif = document.createElement("div");
    notif.classList.add("error-notification");
    notif.textContent = error;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.transition = "opacity 0.5s ease";
        notif.style.opacity = "0";
    }, 4500);

    setTimeout(() => {
        notif.remove();
    }, 5000);
}