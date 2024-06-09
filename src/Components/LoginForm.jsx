export const LoginForm = ({ handleSubmit, setUseremail, setUserpassword, useremail, userpassword }) => {
    return (
        <>
            <form action="" onSubmit={handleSubmit}>

                <br />
                <br />
                <label htmlFor="email" style={{ fontSize: "x-Large", fontFamily: "cursive" }}>Email</label>

                <br />

                <input type="email" id='email' value={useremail} onChange={(e) => setUseremail(e.target.value)} style={{ background: "black", color: "wheat", textAlign: "center", width: "auto", height: "4vh", borderRadius: "20px", fontSize: "large" }} placeholder="Email..." />

                <br />
                <br />
                <br />

                <label htmlFor="pwd" style={{ fontSize: "x-Large", fontFamily: "cursive" }}>Password</label>

                <br />

                <input type="password" id='pwd' value={userpassword} onChange={(e) => setUserpassword(e.target.value)} style={{ background: "black", color: "wheat", textAlign: "center", width: "auto", height: "4vh", borderRadius: "20px", fontSize: "large" }} placeholder="Password" />

                <br />
                <br />

                <button type='submit' style={{ background: "darkgreen", width: "05rem", height: "4vh", color: "wheat", borderRadius: "20px", fontSize: "large" }}>Log In</button>

            </form>
        </>
    )
}