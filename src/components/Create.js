import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import "./create.css"

function Create() {
    const navigate = useNavigate();
    const [classRooms, setClassRooms] = useState([]);

    useEffect(() => {
        // Fetch class rooms data from API
        axios
            .get("http://localhost:8080/api/classRooms")
            .then((response) => {
                setClassRooms(response.data);
            })
            .catch((error) => {
                console.error("Error fetching class rooms:", error);
            });
    }, []);

    const initialValues = {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        localDate: "",
        classRoom:"",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        address: Yup.string().required("Address is required"),
        localDate: Yup.string().required("Date is required"),
        classRoom: Yup.string().required("Class Room is required"),
    });

    function handleSubmit(e) {
        const student = {
            name: e.name,
            phoneNumber: e.phoneNumber,
            email: e.email,
            address: e.address,
            localDate: e.localDate,
            classRoom: {
                id: e.classRoom,
            }
        };
        axios
            .post("http://localhost:8080/api/students", student)
            .then(() => {
                navigate("/"); // Redirect to the list of students
            })
            .catch((error) => {
                console.error("Error creating student:", error);
            });
    };

    return (
        <>
            <h1 >Create Student</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e) =>handleSubmit(e)}
            >
                <Form>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <Field type="text" name={'name'} class="form-control"/>
                        <ErrorMessage name="name" component="div" />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <Field type="text" name={'phoneNumber'} class="form-control"/>
                        <ErrorMessage name="phoneNumber" component="div" />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field type="text" name={'email'} class="form-control"/>
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="address">Address:</label>
                        <Field type="text" name={'address'}  class="form-control"/>
                        <ErrorMessage name="address" component="div" />
                    </div>

                    <div>
                        <label htmlFor="localDate">Date:</label>
                        <Field type="date" name={'localDate'}  class="form-control"/>
                        <ErrorMessage name="localDate" component="div" />
                    </div>

                    <div>
                        <label htmlFor="classRoom">Class Room:</label>
                        <Field as="select" name={'classRoom'} class="form-control">
                            <option value="">Select Class Room</option>
                            {classRooms.map((classRoom) => (
                                <option key={classRoom.id} value={classRoom.id}>
                                    {classRoom.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="classRoom" component="div" />
                    </div>
                    <input type="file"/>
                    <button type="submit" class="btn btn-warning">Create</button>
                </Form>
            </Formik>
        </>
    );
}

export default Create;