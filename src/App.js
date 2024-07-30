import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import jsPDF from "jspdf";
import image from "./images.png"
// import axios from 'axios'; 

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({ mode: "onChange" }); //With mode: "onChange", validation happens whenever the value of an input field changes. As the user types or selects options, the validation rules defined for each field are applied immediately.

    const [submitted, setSubmitted] = useState(false);

    // const onSubmit = (data) => {
    //     console.log(data);
    //     setSubmitted(true);
    // };

    // const onSubmit = async (data) => { 
    //     axios.post('http://localhost:5000/formdata/add', data)
    //         .then(response => { 
    //             console.log(response.data); 
    //             setSubmitted(true); 
    //         }) 
    //         .catch(error => { 
    //             console.error('There was an error!', error); 
    //         }); 
    //         setSubmitted(true);
    // };

    // const onSubmit = async (data) => {
    //     let r = await fetch("http://localhost:5000/", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     });
    //     console.log(data); //here data is actual data from the form
    //     setSubmitted(true);
    // };

    const onSubmit = async (data) => {
        try {
            let response = await fetch("http://localhost:5000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            
                
            // Indicate that the form has been submitted successfully
            setSubmitted(true);

            if (!response.ok) {
                // Handle the case where the response was not successful
                console.error('Error:', response.statusText);
                return;
            }
    
            // Handle the response data if needed
            let result = await response.json();
            console.log('Success:', result);
    
            // Log the form data
            console.log(data); // Here data is actual data from the form

        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        }
    };
    

    // const handleDownloadPDF = (data) => {
    //     const doc = new jsPDF();
    //     doc.text(`First Name: ${data.firstName}`, 10, 10);
    //     doc.text(`Last Name: ${data.lastName}`, 10, 20);
    //     doc.text(`Email: ${data.email}`, 10, 30);
    //     doc.text(`Contact: ${data.contact}`, 10, 40);
    //     doc.text(`Gender: ${data.gender}`, 10, 50);
    //     doc.textWithLink(`GitHub Profile Link: ${data.url1}`, 10, 60, { url: data.url1 });
    //     doc.textWithLink(`LinkedIn Profile Link: ${data.url2}`, 10, 70, { url: data.url2 });
    //     doc.text(`Selected Option: ${data.selectedOption}`, 10, 80);
    //     doc.text(`About: ${data.about}`, 10, 90);
    //     doc.save("form-data.pdf");
    // };

    const handleDownloadPDF = (data) => {
        const doc = new jsPDF();
        
        // Set font size
        doc.setFontSize(12);
    
        // Add text
        doc.text(`First Name:`, 10, 10);
        doc.text(`${data.firstName}`, 50, 10, { align: "left" });
    
        doc.text(`Last Name:`, 10, 20);
        doc.text(`${data.lastName}`, 50, 20, { align: "left" });
    
        // Set text color for email to blue
        doc.text(`Email:`, 10, 30);
        doc.setTextColor(0, 0, 255);
        doc.text(`${data.email}`, 50, 30, { align: "left" });
    
        // Reset text color to black
        doc.setTextColor(0, 0, 0);
        doc.text(`Contact:`, 10, 40);
        doc.text(`${data.contact}`, 50, 40, { align: "left" });
    
        doc.text(`Gender:`, 10, 50);
        doc.text(`${data.gender}`, 50, 50, { align: "left" });
    
        // Add links with mixed colors
        doc.text(`GitHub Profile Link:`, 10, 60);
        doc.setTextColor(0, 0, 255);
        doc.textWithLink(`${data.url1}`, 50, 60, { url: data.url1 });
    
        doc.setTextColor(0, 0, 0);
        doc.text(`LinkedIn Profile Link:`, 10, 70);
        doc.setTextColor(0, 0, 255);
        doc.textWithLink(`${data.url2}`, 50, 70, { url: data.url2 });
    
        // Reset text color to black
        doc.setTextColor(0, 0, 0);
        doc.text(`Selected Option:`, 10, 80);
        doc.text(`${data.selectedOption}`, 50, 80, { align: "left" });
    
        doc.text(`About:`, 10, 90);
        doc.text(`${data.about}`, 50, 90, { align: "left" });
    
        // Save the PDF
        doc.save("form-data.pdf");
    };
    

    const handleReset = () => {
        reset();
        setSubmitted(false);
    };

    return (
        <div className="App">
            <div className="heading">
            <img src={image} className="img1" alt="image1"></img>
            <h1>React Internship</h1>
            <img src={image} className="img2" alt="image2"></img>
            </div>

            <fieldset>
                {!submitted ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="disclaimer blink" style={{ color: "red" }}>
                            **Please fill the form before <strong>15th August</strong>**.
                        </p>

                        <label htmlFor="firstname">First Name*</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            {...register("firstName", { required: "First name is required", type: "text", 
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Invalid format"
                                }
                            })}
                            placeholder="Enter First Name"
                        />
                        {errors.firstName && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.firstName.message}</p>}

                        <label htmlFor="lastname">Last Name*</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            {...register("lastName", { required: "Last name is required",  
                                pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Invalid format"
                            }
                        })}
                            placeholder="Enter Last Name"
                        />
                        {errors.lastName && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.lastName.message}</p>}

                        <label htmlFor="email">Enter Email* </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid format",
                                },
                            })}
                            placeholder="Enter email"
                        />
                        {errors.email && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.email.message}</p>}

                        <label htmlFor="tel">Contact*</label>
                        <input
                            type="tel"
                            name="contact"
                            id="contact"
                            {...register("contact", { required: "Contact is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid format"
                                }
                             })}
                            placeholder="Enter Contact Number"
                        />
                        {errors.contact && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.contact.message}</p>}

                        <label htmlFor="gender">Gender*</label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            id="male"
                            {...register("gender", { required: "Gender is required" })}
                        />
                        Male
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            id="female"
                            {...register("gender", { required: "Gender is required" })}
                        />
                        Female
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            id="other"
                            {...register("gender", { required: "Gender is required" })}
                        />
                        Other
                        {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}

                        <label htmlFor="url1">Enter GitHub Profile Link*</label>
                        <input
                            type="url"
                            name="url1"
                            id="url1"
                            {...register("url1", {
                                required: "GitHub profile link is required",
                                pattern: {
                                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,256}\.[a-zA-Z0-9]{2,6})[\/\w .-]*$/,
                                    message: "Invalid GitHub URL format",
                                },
                            })}
                            placeholder="Enter link"
                        />
                        {errors.url1 && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.url1.message}</p>}

                        <label htmlFor="url2">Enter LinkedIn Profile Link*</label>
                        <input
                            type="url"
                            name="url2"
                            id="url2"
                            {...register("url2", {
                                required: "LinkedIn profile link is required",
                                pattern: {
                                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,256}\.[a-zA-Z0-9]{2,6})[\/\w .-]*$/,
                                    message: "Invalid LinkedIn URL format",
                                },
                            })}
                            placeholder="Enter link"
                        />
                        {errors.url2 && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.url2.message}</p>}

                        <label htmlFor="file">Upload Resume*</label>
                        <input
                            type="file"
                            accept=".pdf"
                            name="file"
                            id="file"
                            {...register("resume", {
                                required: "Resume is required",
                                validate: (file) =>
                                    file && file[0].type === "application/pdf" || "Please upload resume in PDF format",
                            })}
                            placeholder="Enter Upload File"
                        />
                        {errors.resume && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.resume.message}</p>}

                        <label>Select your choice</label>
                        <select
                            name="select"
                            id="select"
                            {...register("selectedOption", { required: "Selection is required" })}
                        >
                            <option value="" disabled>
                                Select your Ans
                            </option>
                            <optgroup label="Beginners">
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="JavaScript">JavaScript</option>
                            </optgroup>
                            <optgroup label="Advanced">
                                <option value="React">React</option>
                                <option value="Node">Node</option>
                                <option value="Express">Express</option>
                                <option value="MongoDB">MongoDB</option>
                            </optgroup>
                        </select>
                        {errors.selectedOption && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", textAlign: "left" }}>{errors.selectedOption.message}</p>}

                        <label htmlFor="about">About</label>
                        <textarea
                            name="about"
                            id="about"
                            cols="30"
                            rows="10"
                            {...register("about")}
                            placeholder="About yourself"
                        ></textarea>

                        <button type="reset" value="reset" onClick={() => handleReset()}>
                            Reset
                        </button>

                        {isValid && (
                            <>
                                <button type="submit" value="Submit">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    value="Download PDF"
                                    onClick={handleSubmit(handleDownloadPDF)}>
                                    Download Response
                                </button>
                            </>
                        )}
                    </form>
                ) : (
                    <div className="thank-you-message">
                        <h2>Thank you for submitting!</h2>
                        <p>We have received your response.</p>
                        <button onClick={() => handleReset()}>Submit another response</button>
                    </div>
                )}
            </fieldset>
        </div>
    );
}

export default App;
