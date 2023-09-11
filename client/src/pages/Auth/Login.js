import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from "../../components/Layout/Layout"
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { toast } from 'react-toastify';
import "../../App.css"

const Login = () => {

    const history = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        })
        const data = res.json()


        if (res.status === 400 || res.status === 404 || !data) {
            // window.alert("Invalid credentials!")
            console.log("Invalid register")
            toast.error("Invalid credentials!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }

        else if (res.status === 402) {
            toast.error("Please verify your email first.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else {
            toast.success("Logged in", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            history("/")
        }



    }


    return (
        <>
            <Layout title={"Ecommerce - Login"}>


                <div className="my-5">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    height="200" className="img-fluid" alt="Sample img" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form action="/login" method="POST">
                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="name" id="form3Example3" name="email" className="form-control form-control-lg"
                                            placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-3">
                                        <input type="password" id="form3Example4" name="password"
                                            className="form-control form-control-lg" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* <!-- Checkbox --> */}
                                        <div className="form-check mb-0">
                                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                            <label className="form-check-label" htmlFor="form2Example3">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="#!" className="text-body">Forgot password?</a>
                                    </div>

                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <a href="/" >
                                            <button type="submit" className="btn btn-primary btn-lg"
                                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", }} onClick={loginUser}>Login</button>
                                        </a>



                                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                            className="link-danger">Register</a></p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary" style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                    }}>
                        {/* <!-- Copyright --> */}

                        {/* <!-- Copyright --> */}


                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login