if (!localStorage.getItem("usuarioAutenticado")) {
    window.location.replace('./login.html');
}

const inputImage = document.getElementById('img-input');
const imgProfile = document.getElementById('img-profile');

const email = document.getElementById('email')

email.value = localStorage.usuarioAutenticado;

inputImage.addEventListener('change', (event) => {
    const image = event.target.files[0];
    imgProfile.src = `./img/${image.name}`;
});

const profileForm = document.getElementById('profile-form')
const profiles = new Map();
profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { name, lastname, phone, email } = event.target;
    const profile = {
        name: name.value,
        lastName: lastname.value,
        phone: phone.value,
        email: email.value
    };

    profiles.set(localStorage.usuarioAutenticado, profile);
    localStorage.setItem('profiles', JSON.stringify([...profiles]));
});
