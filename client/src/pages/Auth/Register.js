
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Layout from "../../components/Layout/Layout"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { toast } from 'react-toastify';

const Register = () => {



    const [user, setUser] = useState({ name: "", email: "", phone: "", address: "", password: "", cpassword: "" })
    const navigate = useNavigate()
    let name, value

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false); // Track checkbox state
    const [isLoading, setIsLoading] = useState(false); // Track loading status


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // for modal

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);



    // x---x

    const handleInputs = (event) => {
        name = event.target.name
        value = event.target.value

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        setError("");



        try {
            console.log("hello")

            e.preventDefault()
            const { name, email, phone, address, password, cpassword } = user



            setIsLoading(true); // Set loading state to true when registration starts


            const response = await fetch('http://localhost:8000/api/v1/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    address,
                    password,
                    cpassword,
                })
            });

            const data = await response.json();

            if (response.status === 422 || !data) {
                // setError("Invalid Registration");
                toast.error("Please fill all the fields properly", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                console.log("Invalid register")
            }
            else if (password !== cpassword) {
                // setError("Passwords do not match");
                toast.error("Passwords do not match", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                console.log("Invalid register")
            }

            else if (response.status === 423) {
                toast.error("This email address is already used", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            }
            else if (!termsChecked) {
                toast.error('Please accept the Terms and Conditions', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                console.log('Terms and Conditions not accepted');
                return; // Don't proceed with registration
            }

            else {
                // window.alert("Registration successful")
                toast.success("Registration successful. Please login", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                navigate("/login")

            }
        } catch (error) {
            // setError("Error during registration");
            toast.error("Error during registration", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(error)
        }

        finally {
            setIsLoading(false); // Set loading state to false when registration completes
        }

    }

    return (
        <>
            <Layout title={"Register - Ecommerce"}>
                <div className="my-3">
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className="card-heading">
                            <center>
                                <h3>Get started</h3>
                                <h5>Let us create your account</h5>

                            </center>
                        </div>
                    </div>
                </div>

                <div className="container my-3">
                    <div className="row">
                        {/* <form method="POST" className="col-md-6 col-lg-6 col-xl-6"> */}
                        <form method="POST">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">Full Name</label>
                                        <input type="name" id="form3Example3" name="name" value={user.name} onChange={handleInputs} className="form-control form-control-lg"
                                            placeholder="Enter your full name" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">Email Address</label>
                                        <input type="name" id="form3Example3" name="email" value={user.email} onChange={handleInputs} className="form-control form-control-lg"
                                            placeholder="Enter your Email address" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">Complete Address</label>
                                        <input type="name" id="form3Example3" name="address" value={user.address} onChange={handleInputs} className="form-control form-control-lg"
                                            placeholder="Enter your address" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">Phone Number</label>
                                        <input type="name" id="form3Example3" name="phone" value={user.phone} onChange={handleInputs} className="form-control form-control-lg"
                                            placeholder="Enter your phone number" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-outline mb-4" style={{ position: 'relative' }}>
                                        <label className="form-label" htmlFor="form3Example3">Password</label>
                                        <input type={showPassword ? 'text' : 'password'} name="password" id="form3Example3" value={user.password} onChange={handleInputs} className="form-control form-control-lg"
                                            placeholder="Enter your password" />
                                        <button
                                            type="button"  // Set the type to "button" to prevent form submission
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                position: 'absolute',
                                                top: '66%',
                                                right: '13px',  // Adjust as needed
                                                transform: 'translateY(-50%)',
                                                border: 'none',
                                                background: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>

                                    <div className="form-outline mb-4" style={{ position: 'relative' }}>
                                        <label className="form-label" htmlFor="form3Example3">Confirm Password</label>
                                        <input type={showPassword ? 'text' : 'password'} name="cpassword" id="form3Example3" value={user.cpassword} onChange={handleInputs} className="form-control form-control-lg"
                                            placeholder="Enter your password again" />
                                        <button
                                            type="button"  // Set the type to "button" to prevent form submission
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                position: 'absolute',
                                                top: '66%',
                                                right: '13px',  // Adjust as needed
                                                transform: 'translateY(-50%)',
                                                border: 'none',
                                                background: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>

                                    </div>





                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-0" >
                                        <input className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="form2Example3"
                                            checked={termsChecked}
                                            onChange={() => setTermsChecked(!termsChecked)} // Toggle checkbox state
                                        />
                                        <div className="card-info">
                                            <p>By signing up you are agreeing to our <span onClick={handleOpenModal}><NavLink to="#">Terms and Conditions</NavLink></span></p>
                                        </div>

                                        <Modal show={showModal} onHide={handleCloseModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Terms and Conditions</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {/* Add your terms and conditions content here */}
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseModal}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>


                                    </div>

                                    {error && <p className="error-message">{error}</p>}

                                    <div className="text-center text-lg-start mt-4 pt-2" style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <NavLink to="/">
                                            <button type="submit" className="btn btn-primary btn-lg" onClick={postData}
                                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", }}
                                            // Disable button if terms are not checked
                                            >{isLoading ? (
                                                <span>
                                                    <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '24px' }}></i> Registering...
                                                </span>
                                            ) :
                                                (
                                                    'Register'
                                                )} {/* Display loading text when isLoading is true */}</button>
                                        </NavLink>



                                        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login"
                                            className="link-danger">Login</a></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bg-primary" style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                }}>




                </div>

            </Layout >
        </>
    )
}

export default Register


// e.preventDefault()
//             const { name, email, phone, address, password, cpassword } = user

//             const response = await axios.post('http://localhost:8000/api/v1/auth/register', {
//                 name,
//                 email,
//                 phone,
//                 address,
//                 password,
//                 cpassword,
//             });

//             const data = response.data;