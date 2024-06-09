import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { toast } from "react-toastify";
import { LoginForm } from '../Components/LoginForm';
import NavBar from '../Components/NavBar';
import { Footer } from '../Components/Footer';

export const Login = () => {

    const nav = useNavigate()
    const [useremail, setUseremail] = useState("")
    const [userpassword, setUserpassword] = useState("")


    axios.defaults.withCredentials = true
    const tokenChecker = () => {

        axios.get("https://postazon-mern.onrender.com/")
            .then(res => {
                if (res.data.Token) {
                    nav(`/home/${localStorage.getItem('Id')}`)
                }
                else {
                    localStorage.clear()
                    nav('/')
                }
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (useremail.trim() === "" || userpassword.trim() === "") toast("Missing fields")
        else {
            axios.post("http://localhost:9000/login", { useremail, userpassword })
                .then(res => {
                    if (res.data.LoggedIn) {
                        localStorage.setItem('Id', res.data.LoggedInUser._id)
                        localStorage.setItem('Name', res.data.LoggedInUser.name)

                        axios.get("http://localhost:9000/allusers")
                            .then(res2 => {
                                nav(`/home/${res.data.LoggedInUser._id}`)

                                localStorage.setItem('Users', JSON.stringify(res2.data.AllUsers))
                            })
                            .catch(er => console.log(er))
                    }
                    else if (res.data.msg === "Incorrect Password") toast(res.data.msg)
                    else toast(res.data.msg)
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <>
            <NavBar login={true} />
            <div className="all" style={{ background: "grey", height: "100vh" }}>


                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <LoginForm handleSubmit={handleSubmit} useremail={useremail} userpassword={userpassword} setUseremail={setUseremail} setUserpassword={setUserpassword} />

                <br />
                <hr />
                <br />

                <button onClick={() => nav('/register')} style={{ background: "darkgreen", width: "auto", height: "4vh", color: "wheat", borderRadius: "20px", fontSize: "large" }}>New User ?</button>

            </div>
            <Footer />
        </>
    )
}

