import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

export const EditPostImage = () => {
    const { postid } = useParams()
    const [file, setFile] = useState({})
    const nav = useNavigate()

    axios.defaults.withCredentials = true
    const tokenChecker = () => {

        axios.get("https://postazon-mern.onrender.com")
            .then(res => {
                if (!res.data.Token) {
                    localStorage.clear()
                    nav(`/`)
                }
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    })

    const handleUpload = (e) => {
        e.preventDefault()
        if (!file) toast("No Files Selected")

        else {
            const formdata = new FormData()

            formdata.append('file', file)
            formdata.append('userid', localStorage.getItem('Id'))

            axios.put(`https://postazon-mern.onrender.com/uploadandeditpostimage/${postid}`, formdata)
                .then(res => {
                    toast(res.data.msg)
                    nav(`/home/${localStorage.getItem('Id')}`)
                })
                .catch(er => console.log(er))
        }
    }

    return (
        <>
            <form action="" onSubmit={handleUpload}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}