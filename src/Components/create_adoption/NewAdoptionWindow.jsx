import "./NewAdoptionWindow.css"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { NewAdoptionWindowSwitch } from "../../redux/newAdoptionSlice";

const NewAdoptionWindow = () => {

    const dispatch = useDispatch()
    const idUser = useSelector((state) => state.LoginInfo.loginData.id)

    const [adoptionInformation, setAdoptionInformation] = useState({
        name: "",
        years: "true",
        age: "0",
        sex: "default",
        vaccines: "",
        pet_type: "",
        text: "",
        phone: 0,
    })
    const [imageCloud, setImageCloud] = useState("")
    const [posting, setPosting] = useState(false)
    const [submitButtonState, setsubmitButtonState] = useState(true)

    const AdoptionInformationChangeHandler = (e) => { //check if any of the inputs where changed
        // console.log(e.target.name);
        if (e.target.id === "name") {
            setAdoptionInformation({ ...adoptionInformation, name: e.target.value })
        } else if (e.target.name === "years") {
            // console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, years: e.target.value })
        } else if (e.target.id === "age") {
            // console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, age: e.target.value })
        } else if (e.target.id === "sex") {
            // console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, sex: e.target.value })
        } else if (e.target.id === "vaccines") {
            // console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, vaccines: e.target.value })
        } else if (e.target.id === "pet_type") {
            console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, pet_type: e.target.value })
        } else if (e.target.id === "description") {
            // console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, text: e.target.value })
        } else if (e.target.id === "phone") {
            // console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, phone: e.target.value })
        }
    }
    const closeNewAdoptionHandler = () => {
        dispatch(NewAdoptionWindowSwitch(false))
    }
    const imageCloudChangeHandler = (event) => {
        // console.log(URL.createObjectURL(event.target.files[0]));
        setImageCloud(event.target.files[0])
    };
    const imageCloudDeletehandler = (event) => {
        event.preventDefault()
        const fileInput = document.getElementById('cloudImage');
        fileInput.value = ''
        setImageCloud("")
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            setPosting(true)
            let cloudImageURL = ""

            if (imageCloud) { //Process to upload the image to cloudinary
                const imageData = new FormData();
                imageData.append("file", imageCloud); //element file is the image that was selected
                imageData.append("folder", "/AdoptaGT/adoption_image"); //element folder is the path from cloudanity wher the image will be saved
                imageData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET_ADOPTION); // upload preset from cloudinary
                const cloudImageResponse = await axios.post("https://api.cloudinary.com/v1_1/dyiymsxec/upload/", imageData)
                console.log(cloudImageResponse);
                cloudImageURL = cloudImageResponse.data.secure_url;
            }
            const adoptionCreation = {
                user_id: idUser,
                image: cloudImageURL,
                sex: adoptionInformation.sex,
                name: adoptionInformation.name,
                age: parseInt(adoptionInformation.age),
                years: adoptionInformation.years,
                text: adoptionInformation.text,
                vaccines: adoptionInformation.vaccines,
                pet_type: adoptionInformation.pet_type,
                phone: adoptionInformation.phone,
            }
            const responseAPI = await axios.post("/adoptions", adoptionCreation)
            console.log(responseAPI);
    
            setPosting(false)
            dispatch(NewAdoptionWindowSwitch(false))
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }
 
    useEffect(() => { //Verify the information of the inputs to enable the post button
        if (adoptionInformation.name === "" ||
            adoptionInformation.age === "0" ||
            adoptionInformation.sex === "default" ||
            adoptionInformation.vaccines === "" ||
            adoptionInformation.pet_type === "" ||
            adoptionInformation.text === "" ||
            imageCloud === "" ||
            !(adoptionInformation.phone.toString().length === 8)
        ) setsubmitButtonState(true)
        else setsubmitButtonState(false)
    }, [adoptionInformation, imageCloud])

    return (
        <div className="NewAdoptionWindow_Main">
            {posting && 
                <div className="NewAdoptionWindow__Posting">
                    <p>Publicando...</p>
                    <i className="material-symbols-outlined LoadingRotation">
                        cached
                    </i>
                </div>
            }
            <div className="NewAdoptionWindow_Title">
                Crear Adopción
                <button onClick={closeNewAdoptionHandler} className="material-symbols-outlined NewAdoptionWindow_Close">
                    close
                </button>
            </div>
            <form className="NewAdoptionWindow_Form" onSubmit={submitHandler}>
                <div className="NewAdoptionWindow_Form__SubBox">
                    <div className="NewAdoptionWindow_Form__LeftBox">
                        <label htmlFor="name">Nombre</label>
                        <input id="name" name="name" placeholder="Nombre de la mascota" className="NewAdoptionWindow__InputBox" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.name}></input>

                        <label htmlFor="pet_type">Especie</label>
                        <select id="pet_type" name="pet_type" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.pet_type} className="NewAdoptionWindow__InputBox">
                            <option value="default" disabled>Especie de la mascota</option>
                            <option value="dog">Perro</option>
                            <option value="cat">Gato</option>
                            <option value="rabbit">Conejo</option>
                            <option value="hamster">Hamster</option>
                            <option value="bird">Ave</option>
                            <option value="fish">Pez</option>
                            <option value="other">otros</option>
                        </select>

                        <label htmlFor="age">Edad</label>
                        <div className="NewAdoptionWindow_Form__AgeSection">
                            <input type="number" id="age" name="age" placeholder="Edad de la mascota" className="NewAdoptionWindow__InputBox NewAdoptionWindow__AgeBox" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.age}></input>
                            <div>
                                    <input type="radio" id="years_true" name="years" value="true"  onChange={AdoptionInformationChangeHandler} checked={adoptionInformation.years === "true"}></input>
                                    <label htmlFor="years_true" style={{marginRight:"10px"}}>Años</label>
                                    
                                    <input type="radio" id="years_false" name="years" value="false" onChange={AdoptionInformationChangeHandler} checked={adoptionInformation.years === "false"}></input>
                                    <label htmlFor="years_false">Meses</label> 
                            </div>
                        </div>

                        <label htmlFor="sex">Sexo</label>
                        <select id="sex" name="sex" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.sex} className="NewAdoptionWindow__InputBox">
                            <option value="default" disabled>Genero de la mascota</option>
                            <option value="male">Macho</option>
                            <option value="female">Hembra</option>
                        </select>

                        <label htmlFor="vaccines">Vacunas</label>
                        <input id="vaccines" name="vaccines" placeholder="Vacunas de la mascota" className="NewAdoptionWindow__InputBox" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.vaccines}></input>
                        
                        <label htmlFor="phone">Numero de telefono</label>
                        <input type="number" id="phone" name="phone" placeholder="Telefono al cual llamar" className="NewAdoptionWindow__InputBox" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.phone}></input>

                        <label htmlFor="description"></label>
                        <textarea
                            id="description"
                            name="description"
                            value={adoptionInformation.text}
                            onChange={AdoptionInformationChangeHandler}
                            placeholder="Informacion extra (Caracter, alguna discapacidad o si tiene alguna comida favorita)"
                            className="NewAdoptionWindow--description__Box">
                        </textarea>
                    </div>

                    {imageCloud &&
                        <div className="NewAdoptionWindow_Content_Section_Image_Box">
                            <img src={URL.createObjectURL(imageCloud)} className="NewAdoptionWindow_Content_Section_Image"></img>
                            <button onClick={imageCloudDeletehandler} className="material-symbols-outlined NewAdoptionWindow_Close Over_Image">
                                close
                            </button>
                        </div>
                    }
                </div>
                <div className="NewAdoptionWindow--BelowOptions">
                    <label htmlFor="cloudImage" className="material-symbols-outlined NewAdoptionWindow--ImageLabel">photo_camera</label>
                    <input id="cloudImage" type="file" className="NewAdoptionWindow--ImageButton" onChange={imageCloudChangeHandler}></input>
                    <button className="NewAdoptionWindow_UploadButton" disabled={submitButtonState}>publicar</button>
                </div>
                {submitButtonState && <p className="NewAdoptionWindow__Warning">*Todos los campos e imagen son obligatorios.</p>}
                
            </form>
        </div>  
    )
}

export default NewAdoptionWindow;