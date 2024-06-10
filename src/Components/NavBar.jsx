import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const NavBar = ({ login, Path }) => {

    const nav = useNavigate()

    const SignOut = () => {
        if (window.confirm("Sign Out ?")) {
            axios.get("https://postazonbackend.onrender.com/logout")
                .then(res => {
                    if (res.data.LoggedOut) {
                        localStorage.clear()
                        toast(res.data.msg)
                        nav(`/`)
                    }
                    else toast("Error")
                })
                .catch(er => console.log(er))
        }
    }


    return (
        <>

            <div className="all" style={{ border: "1px solid wheat", height: "12vh", display: "flex", justifyContent: "space-around", alignItems: "center", background: "black", color: "wheat", flexDirection: "row-reverse", position: "fixed", width: "100vw" }}>

                {
                    login ?

                        <h1 style={{ color: "darkred" }}>postAzon 🍚🐔🤟</h1>

                        :
                        <>
                            <button onClick={SignOut} style={{ background: "darkred", color: "wheat", width: "5vw", borderRadius: "10px", height: "4vh", marginRight: "120px" }}>Log Out</button>

                            <h1 onClick={() => nav(`/home/${localStorage.getItem('Id')}`)} style={{ fontSize: "45px", color: "darkred" }}>postAzon🍚🍚</h1>

                            <div className="one" style={{ display: "flex", width: "15vw", alignItems: "center", flexDirection: "column-reverse" }}>

                                <button onClick={() => nav(`/viewprofile/${localStorage.getItem('Id')}`)} style={{ background: "darkgreen", color: "wheat", width: "5vw", borderRadius: "10px", height: "3vh", fontFamily: "monospace", fontSize: "small" }}>Hi {localStorage.getItem('Name')}</button>

                                <br />

                                <img src={Path} alt="" width={45} height={45} style={{ borderRadius: "150px" }} />

                            </div>
                        </>
                }

            </div>
        </>
    )
}

export default NavBar