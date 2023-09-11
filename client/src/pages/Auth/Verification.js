import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Verification = () => {
    const Navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { token } = useParams();
    const [verificationMessage, setVerificationMessage] = useState('Verifying email...');


    useEffect(() => {
        console.log("Verification component mounted."); // Add this line for debugging

        const verifyToken = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/auth/verify/${token}`, {
                    method: "GET"
                });


                const data = await response.json(); // Parse the response JSON
                // alert(response.data.message);

                if (response.ok) {
                    // If the request is successful, display the success message
                    // setVerificationMessage(data.message);
                    setTimeout(() => {
                        Navigate('/login');

                        toast.success('Email is verified. Please login');
                    }, 1000); // Redirect after 1 second
                }
                else if (response.status === 400) {
                    // Invalid verification token
                    setVerificationMessage(data.message);
                }
                else if (response.status === 401) {
                    // Token is already used

                    // If the request is successful, display the success message
                    setVerificationMessage(data.message);
                    setTimeout(() => {
                        Navigate('/login');

                        toast.info('Email is already verified. Please login.', {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }, 1000); // Redirect after 1 second
                }
                else {
                    // If the request fails (e.g., token expired or already used), display the error message
                    setVerificationMessage("Error in verifying the email");

                }

            } catch (error) {
                console.log("Yahan py fail hurha")
                setVerificationMessage('Error. Cant Verify');
            }
        };

        verifyToken();
    }, [token, Navigate]);

    return <div style={containerStyle}>
        <h2 style={headingStyle}>{verificationMessage}
        </h2>
    </div>
}

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    backgroundColor: '#f0f0f0',
};

const headingStyle = {
    fontSize: '50px',
    color: '#333',
    marginBottom: '10px',
};

export default Verification
