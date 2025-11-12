import { authorizedUser, checkSession } from "./util/checkLogin.js";
import { Header } from "./header.js";
import { successAlert, warningAlert } from "./util/alerts.js";

checkSession(!authorizedUser, './login.html');
new Header(authorizedUser);

let inputImage = document.getElementById('img-input');
let imgProfile = document.getElementById('img-profile');
let profileForm = document.getElementById('profile-form');
const profiles = JSON.parse(localStorage.getItem('profiles')) ?? [];

const MAX_FILE_SIZE = 1024 * 1024;

inputImage.addEventListener('change', (event) => {
    let image = event.target.files[0];

    if (image.size > MAX_FILE_SIZE) {
        warningAlert('La imagen debe pesar menos de 1mb.');
        event.target.value = '';
        return;
    }

    let reader = new FileReader();
    reader.onloadend = () => {
        imgProfile.src = reader.result;
    };

    reader.readAsDataURL(image);
});

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let { name, lastname, phone, email } = event.target;

    if (!name.value || !lastname.value, !phone.value) {
        return;
    }

    const userProfile = profiles.find(profile => profile.user === authorizedUser);

    if (!userProfile) {
        let profile = {
            user: email.value,
            name: name.value,
            lastName: lastname.value,
            phone: phone.value,
            image: imgProfile.src,
        };
        profiles.push(profile)
    } else {
        userProfile.name = name.value;
        userProfile.lastName = lastname.value;
        userProfile.phone = phone.value;
        userProfile.image = imgProfile.src;
    }
    localStorage.setItem('profiles', JSON.stringify([...profiles]));
    successAlert('Perfil guardado con exito.')

    setTimeout(()=> window.location.reload(), 1250);
});

function loadInformation() {
    const userProfile = profiles.find(profile => profile.user === authorizedUser);

    if (!localStorage.profiles || !userProfile) {
        email.value = authorizedUser;
        return;
    }

    profileForm['name'].value = userProfile.name;
    profileForm['lastname'].value = userProfile.lastName;
    profileForm['phone'].value = userProfile.phone;
    profileForm['email'].value = userProfile.user;
    imgProfile.src = userProfile.image;
}

loadInformation();

