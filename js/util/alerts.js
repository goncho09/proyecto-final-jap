const notificationContainer = document.getElementById('notification');

function successAlert(text) {

    notificationContainer.innerHTML +=
        createAlert(text, 'alert-success', 'fa-check');
    timeRemoveAlert();
}

function warningAlert(text) {
    notificationContainer.innerHTML +=
        createAlert(text, 'alert-warning', 'fa-exclamation-triangle');
    timeRemoveAlert();
}

function errorAlert(text) {
    notificationContainer.innerHTML +=
        createAlert(text, 'alert-danger', 'fa-exclamation-circle');
    timeRemoveAlert();
}

function timeRemoveAlert() {
    setTimeout(() => {
        notificationContainer.removeChild(notificationContainer.querySelector('.alert'));
    }, 1250)
}

function createAlert(text, className, icon) {
    return `
        <div class="alert ${className}" role="alert">
            <i class="fa ${icon}"></i>
            ${text}
        </div>
    `
}

export { successAlert, warningAlert, errorAlert }