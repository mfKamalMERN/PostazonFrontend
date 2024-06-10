import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../Components/NavBar"
import { toast } from "react-toastify"
import axios from "axios"
import { Footer } from "../Components/Footer"

export const Register = () => {

    const nav = useNavigate()
    const [useremail, setUseremail] = useState("")
    const [username, setUsername] = useState("")
    const [userpassword, setUserpassword] = useState("")

    axios.defaults.withCredentials = true
    const tokenChecker = () => {

        axios.get("https://postazonbackend.onrender.com")
            .then(res => {
                if (res.data.Token) {
                    nav(`/home/${localStorage.getItem('Id')}`)
                }
                else localStorage.clear()
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (useremail.trim() === "" || userpassword.trim() === "" || username.trim() === "") toast("Missing fields")

        else {
            try {
                const res = await axios.post("https://postazonbackend.onrender.com/register", { username, useremail, userpassword })
                if (res.data.AlreadyRegistered) toast(res.data.msg)
                else {
                    toast(res.data.msg)
                    nav('/')
                }

            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <div className="all" style={{ background: "grey", height: "100vh" }}>

                <NavBar login={true} />

                <br />
                <br />
                <br />
                <br />
                <br />

                <form action="" onSubmit={handleSubmit}>

                    <label htmlFor="name" style={{ fontSize: "x-Large", fontFamily: "cursive" }}>Name</label>

                    <br />

                    <input type="text" id='name' value={username} onChange={(e) => setUsername(e.target.value)} style={{ background: "black", color: "wheat", textAlign: "center", width: "40vw", height: "4vh", borderRadius: "20px", fontSize: "large" }} placeholder="Name..." />

                    <br />
                    <br />
                    <br />
                    <label htmlFor="email" style={{ fontSize: "x-Large", fontFamily: "cursive" }}>Email</label>

                    <br />

                    <input type="email" id='email' value={useremail} onChange={(e) => setUseremail(e.target.value)} style={{ background: "black", color: "wheat", textAlign: "center", width: "40vw", height: "4vh", borderRadius: "20px", fontSize: "large" }} placeholder="Email..." />

                    <br />
                    <br />
                    <br />

                    <label htmlFor="pwd" style={{ fontSize: "x-Large", fontFamily: "cursive" }}>Password</label>

                    <br />

                    <input type="password" id='pwd' value={userpassword} onChange={(e) => setUserpassword(e.target.value)} style={{ background: "black", color: "wheat", textAlign: "center", width: "40vw", height: "4vh", borderRadius: "20px", fontSize: "large" }} placeholder="Password" />

                    <br />
                    <br />

                    <button type='submit' style={{ background: "green", width: "8vw", height: "4vh", color: "wheat", borderRadius: "20px", fontSize: "large" }}>Register</button>

                </form>

                <br />
                <br />
                <hr />
                <br />
                <br />

                <button onClick={() => nav('/')} style={{ background: "green", width: "10vw", height: "4vh", color: "wheat", borderRadius: "20px", fontSize: "large" }}>Already a User ?</button>

            </div>

            <Footer />
        </>
    )
}