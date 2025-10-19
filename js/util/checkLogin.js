const authorizedUser = localStorage.getItem('usuarioAutenticado');

function checkSession(hasSession, path) {
    if(hasSession) {
        goTo(path);
        return;
    }

    showContent();
}

function goTo(path) {
    window.location.replace(path);
}

function showContent() {
    document.querySelector('body').classList.toggle('d-none');
}

export { authorizedUser, checkSession };