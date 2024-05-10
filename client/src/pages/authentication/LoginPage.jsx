import React, { useState } from "react";
import { logo } from "@/assets/assets.js";
import PrimaryButton from "@/components/ui/PrimaryButton.jsx";
import { login } from "@/hooks/authentication.js";
import useRouting from "@/components/routes";
import ErrorSnackbar from "@/components/ui/ErrorSnackbar";
import { TextField } from "@mui/material";
import SomeCircles from "@/components/shared/styles/SomeCircles";

function Login() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [severityType, setSeverityType] = useState("success");
    const { navigateToRegistration, navigateToDashboard } = useRouting();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    // Handles login event
    const handleLoginButton = async (e) => {
        // TODO: Add more error handling here

        e.preventDefault();
        try {
            if (!formData.email || !formData.password) {
                console.log("Forms are empty.");
                setSnackbarOpen(true);
                setErrorMessage("Please fill up all fields.");
            }

            /**
             * Performs a login request to the server and returns an access and refresh token.
             *
             * @param {Object} formData - The form data containing the user's email and password.
             * @returns {Object} An object containing the access and refresh tokens.
             */
            const response = await login(formData);
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);

                console.log(
                    `Login Sucessfull: Saving Access and Refresh Tokens to Local Storage. Access: ${response.data.access} Refresh: ${response.data.refresh}`
                );
                navigateToDashboard();
                setFormData({ email: "", password: "" });

                console.log(response.status, response.statusText);
                setSnackbarOpen(true);
                setSeverityType("success");
                setErrorMessage("Login Successful.");
            }
        } catch (error) {
            // console.log(response);
            setSnackbarOpen(true);
            setSeverityType("error");
            setErrorMessage("Network error.");
        }
    };

    // Handles input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="h-screen md:flex">
            <div className="relative overflow-hidden md:flex w-1/2 bg-light-tint justify-around items-center hidden">
                <div>
                    <img src={logo} alt="" className="w-96" />
                    <p className="mx-5 text-lg">
                        Pediatric Gross Motor Skills Assessment System
                    </p>
                </div>
                <SomeCircles />
            </div>
            <div className="flex-col flex md:w-1/2 justify-center py-10 items-center bg-white">
                <form className="bg-blue-700 w-[45%] p-10 rounded-lg">
                    <h1 className="font-bold text-white text-2xl mb-1">
                        Login
                    </h1>
                    <p className="text-white text-sm">
                        Welcome back! Let's take you to your account.
                    </p>
                    <div className="flex flex-col mt-3">
                        <div className="flex flex-col mt-3 gap-3">
                            {Object.keys(formData).map((key) => (
                                <TextField
                                    key={key}
                                    fullWidth
                                    id={key}
                                    label={
                                        key.charAt(0).toUpperCase() +
                                        key.slice(1).replace(/([A-Z])/g, " $1")
                                    }
                                    variant="filled"
                                    value={formData[key]}
                                    onChange={handleInputChange}
                                    type={
                                        key.includes("password")
                                            ? "password"
                                            : ""
                                    }
                                    autoComplete={
                                        key.includes("password")
                                            ? "currentPassword"
                                            : ""
                                    }
                                    name={key}
                                    InputProps={{
                                        disableUnderline: true,
                                        style: {
                                            color: "black",
                                            backgroundColor: "white",
                                        },
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-blue-200 text-sm my-1 cursor-pointer hover:underline hover:underline-offset-2 hover:text-white tracking-normal">
                            Forgot Password ?
                        </span>
                        <PrimaryButton onClick={handleLoginButton}>
                            Log In
                        </PrimaryButton>
                        <div className=" flex border border-white p-2 my-2 gap-2 items-center rounded-lg align-around">
                            <span className="text-white text-sm">
                                Don't have an account yet?
                            </span>
                            <button
                                className="font-bold text-blue-200 text-sm hover:text-white hover:underline-offset-2 cursor-pointer"
                                onClick={() => navigateToRegistration()}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ErrorSnackbar
                handleOpen={snackbarOpen}
                handleClose={handleClose}
                severityType={severityType}
            >
                {errorMessage}
            </ErrorSnackbar>
        </div>
    );
}

export default Login;
