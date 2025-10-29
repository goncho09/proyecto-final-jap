function initializeTheme() {
    const tema = JSON.parse(localStorage.getItem('tema')) ?? {}

    const labelMode = document.getElementById('theme-toggle');
    const checkButton = document.querySelector('#mode');

    if (!labelMode && !checkButton) {
        setTimeout(initializeTheme, 100); // Reintentar en 100ms
        return;
    }

    if (tema) {
        applicar(tema.checked, labelMode)
        checkButton.checked = tema.checked;
    }

    checkButton.addEventListener('change', () => {

        const nuevoTema = document.body.classList.contains("oscuro")
            ? "claro"
            : "oscuro";

        applicar(checkButton.checked, labelMode)
        localStorage.setItem('tema', JSON.stringify(
            {
                theme: nuevoTema,
                checked: checkButton.checked
            }
        ));
    });
}

function applicar(check, labelMode) {

    if (!check) {
        document.body.classList.add("claro");
        document.body.classList.remove("oscuro");
        labelMode.textContent = "🌙 Modo Oscuro";

        return;
    }
    document.body.classList.add("oscuro");
    document.body.classList.remove("claro");
    labelMode.textContent = "☀️ Modo Claro";
}

// Esperar a que cargue el DOM y ejecutar la función
document.addEventListener("DOMContentLoaded", () => initializeTheme());
