if (!localStorage.getItem('usuarioAutenticado')) {
  window.location.replace('./login.html');
}

const inputImage = document.getElementById('img-input');
const imgProfile = document.getElementById('img-profile');

const email = document.getElementById('email');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastname');
const phoneInput = document.getElementById('phone');
const imageProfile = document.getElementById('img-profile');

email.value = localStorage.usuarioAutenticado;

let imageBase64 = '';

inputImage.addEventListener('change', (event) => {
  const image = event.target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    imageBase64 = reader.result;
    imgProfile.src = imageBase64;
  };
  reader.readAsDataURL(image);
});

if (localStorage.profiles) {
  const profiles = new Map(JSON.parse(localStorage.profiles));
  const userProfile = profiles.get(localStorage.usuarioAutenticado);

  if (userProfile) {
    nameInput.value = userProfile.name;
    lastNameInput.value = userProfile.lastName;
    phoneInput.value = userProfile.phone;
    email.value = userProfile.email;
    imgProfile.src = userProfile.imageSrc;
    imageBase64 = userProfile.imageSrc;
  }
}

const profileForm = document.getElementById('profile-form');

const profiles = new Map();
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (imageBase64 === '') {
    alert('Por favor, seleccione una imagen de perfil.');
    return;
  }

  const { name, lastname, phone, email } = event.target;
  const profile = {
    name: name.value,
    lastName: lastname.value,
    phone: phone.value,
    email: email.value,
    imageSrc: imageBase64,
  };

  profiles.set(localStorage.usuarioAutenticado, profile);
  localStorage.setItem('profiles', JSON.stringify([...profiles]));
  alert('Perfil guardado con éxito.');
});
