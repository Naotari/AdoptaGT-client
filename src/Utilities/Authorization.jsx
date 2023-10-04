import axios from "axios";

const authorizationProcess = (verificationToken) => {
    // console.log(verificationToken);
    const tokenObject = {token: verificationToken}
    axios.post("users/verify", tokenObject)
    .then((data) => {
        console.log(data.data.idUser);
        return data.data.idUser;
    }).catch ((error) => {return error})
    // return response.data.idUser
}

export default authorizationProcess;