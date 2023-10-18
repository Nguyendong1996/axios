import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Update() {
    let navigate = useNavigate();
    const [classRoom, setClassRoom] = useState([])
    let {id} = useParams()
    let [student, setStudent] = useState({})

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/classRooms")
            .then((response) => {
                setClassRoom(response.data);
                axios.get("http://localhost:8080/api/students/" + id).then((res) => {
                    setStudent(res.data)
                })
            })
            .catch((error) => {
                console.error("Error fetching class rooms:", error);
            });
    }, []);
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
            id: id,
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
    const initialValues = {
        name: student.name,
        phoneNumber: student.phoneNumber,
        email: student.email,
        address: student.email,
        localDate: student.localDate,
        classRoom:student.classRoom,
    }
    return(
        <>
            <h1>Update Student</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e) => handleSubmit(e)}
                enableReinitialize={true}
            >
                <Form>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <Field type="text" name={'name'} class="form-control"/>
                        <ErrorMessage name="name" component="div"/>
                    </div>

                    <div>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <Field type="text" name={'phoneNumber'} class="form-control"/>
                        <ErrorMessage name="phoneNumber" component="div"/>
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field type="text" name={'email'} class="form-control"/>
                        <ErrorMessage name="email" component="div"/>
                    </div>

                    <div>
                        <label htmlFor="address">Address:</label>
                        <Field type="text" name={'address'} class="form-control"/>
                        <ErrorMessage name="address" component="div"/>
                    </div>

                    <div>
                        <label htmlFor="localDate">Date:</label>
                        <Field type="date" name={'localDate'} class="form-control"/>
                        <ErrorMessage name="localDate" component="div"/>
                    </div>

                    <div>
                        <label htmlFor="classRoom">Class Room:</label>
                        <Field as="select" name={'classRoom'} class="form-control">
                            {classRoom.map((classRoom) => (
                                <option key={classRoom.id} value={classRoom.id}>
                                    {classRoom.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="classRoom" component="div"/>
                    </div>
                    <button type="submit" className="btn btn-warning">update</button>
                </Form>
            </Formik>
        </>
    )
}

export default Update