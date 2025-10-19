import { authorizedUser, checkSession } from "./util/checkLogin.js";

checkSession(!authorizedUser, './login.html');

const inputImage = document.getElementById('img-input');
const imgProfile = document.getElementById('img-profile');
const profileForm = document.getElementById('profile-form');
const profiles = new Map(JSON.parse(localStorage.getItem('profiles')) ?? [])

inputImage.addEventListener('change', (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        imgProfile.src = reader.result;
    };

    reader.readAsDataURL(image);
});

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { name, lastname, phone, email } = event.target;
    const profile = {
        name: name.value,
        lastName: lastname.value,
        phone: phone.value,
        email: email.value,
        image: imgProfile.src,
    };

    profiles.set(localStorage.usuarioAutenticado, profile);
    localStorage.setItem('profiles', JSON.stringify([...profiles]));
    alert('Perfil guardado con éxito.');
});

function loadInformation() {
    const userProfile = profiles.get(localStorage.usuarioAutenticado);

    if (!localStorage.profiles || !userProfile) {
        email.value = localStorage.usuarioAutenticado;
        return;
    }

    profileForm['name'].value = userProfile.name;
    profileForm['lastname'].value = userProfile.lastName;
    profileForm['phone'].value = userProfile.phone;
    profileForm['email'].value = userProfile.email;
    imgProfile.src = userProfile.image;
}

loadInformation();

