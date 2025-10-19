import { authorizedUser, checkSession } from "./util/checkLogin.js";

checkSession(!authorizedUser, './login.html');