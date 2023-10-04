import "./NewAdoptionWindow.css"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const NewAdoptionWindow = (props) => {

    const [adoptionInformation, setAdoptionInformation] = useState({
        name: "",
        years: "true",
        age: "0",
        sex: "default",
        vaccines: "",
        text: "",
    })
    const [imageCloud, setImageCloud] = useState("")
    const [posting, setPosting] = useState(false)
    const [submitButtonState, setsubmitButtonState] = useState(true)

    const AdoptionInformationChangeHandler = (e) => {
        // console.log(e.target.name);
        if (e.target.id === "name") {
            setAdoptionInformation({ ...adoptionInformation, name: e.target.value })
        } else if (e.target.name === "years") {
            console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, years: e.target.value })
        } else if (e.target.id === "age") {
            console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, age: e.target.value })
        } else if (e.target.id === "sex") {
            console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, sex: e.target.value })
        } else if (e.target.id === "vaccines") {
            console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, vaccines: e.target.value })
        } else if (e.target.id === "description") {
            console.log(e.target.value);
            setAdoptionInformation({ ...adoptionInformation, text: e.target.value })
        }
    }
    const closeNewAdoptionHandler = () => {
        props.setNewAdoptionShow(false)
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

            if (imageCloud) { //Process to upload the image in cloudinary
                const imageData = new FormData();
                imageData.append("file", imageCloud); //element file is the image that was selected
                imageData.append("folder", "/AdoptaGT/adoption_image"); //element folder is the path from cloudanity wher the image will be saved
                imageData.append("upload_preset", "adoptagt_adoption_image"); // upload preset from cloudinary
                const cloudImageResponse = await axios.post("https://api.cloudinary.com/v1_1/dyiymsxec/upload/", imageData)
                console.log(cloudImageResponse);
                cloudImageURL = cloudImageResponse.data.secure_url;
            }
            const adoptionCreation = {
                user_id: props.idUser,
                image: cloudImageURL,
                sex: adoptionInformation.sex,
                name: adoptionInformation.name,
                age: parseInt(adoptionInformation.age),
                years: adoptionInformation.years,
                text: adoptionInformation.text,
                vaccines: adoptionInformation.vaccines,
            }
            const responseAPI = await axios.post("/adoptions", adoptionCreation)
            console.log(responseAPI);
    
            setPosting(false)
            props.setNewAdoptionShow(false)
            
        } catch (error) {
            console.log(error);
        }
    }
 
    useEffect(() => {
       if (adoptionInformation.name === "") setsubmitButtonState(true)
       else if (adoptionInformation.age === "0") setsubmitButtonState(true)
       else if (adoptionInformation.sex === "default") setsubmitButtonState(true)
       else if (adoptionInformation.vaccines === "") setsubmitButtonState(true)
       else if (adoptionInformation.text === "") setsubmitButtonState(true)
       else if (imageCloud === "") setsubmitButtonState(true)
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

                        <label htmlFor="age">Edad</label>
                        <div>
                                <input type="radio" id="years_true" name="years" value="true"  onChange={AdoptionInformationChangeHandler} checked={adoptionInformation.years === "true"}></input>
                                <label htmlFor="years_true" style={{marginRight:"10px"}}>Años</label>
                                
                                <input type="radio" id="years_false" name="years" value="false" onChange={AdoptionInformationChangeHandler} checked={adoptionInformation.years === "false"}></input>
                                <label htmlFor="years_false">Meses</label> 
                        </div>
                        <input type="number" id="age" name="age" placeholder="Edad de la mascota" className="NewAdoptionWindow__InputBox" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.age}></input>

                        <label htmlFor="sex">Sexo</label>
                        <select id="sex" name="sex" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.sex}>
                            <option value="default" disabled>Genero de la mascota</option>
                            <option value="male">Macho</option>
                            <option value="female">Hembra</option>
                        </select>

                        <label htmlFor="vaccines">Vacunas</label>
                        <input id="vaccines" name="vaccines" placeholder="Vacunas de la mascota" className="NewAdoptionWindow__InputBox" onChange={AdoptionInformationChangeHandler} value={adoptionInformation.vaccines}></input>
                        
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