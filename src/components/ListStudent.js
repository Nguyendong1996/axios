import axios from "axios";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
function ListStudent() {
    const [student, setStudent] = useState([]);
    const [check, setCheck] = useState(true)
    const [search, setSearch] = useState("")
    useEffect(() => {
            axios.get("http://localhost:8080/api/students").then(res => {
                setStudent(res.data)
            }).catch(error => {
                throw error
            })
        }, [check]
    )
    function searchByName(){
        axios.post("http://localhost:8080/api/students/searchByName?name="+ search)
            .then(response => {
                    setStudent(response.data)
                }
            )
    }
    return (
        <>
            <h1>List Student</h1>
            <div className={'input-group mb-3'}>
                <input type="text" onChange={(e) => {
                    setSearch(e.target.value)
                }} id={'search'} name={'search'} className={"form-control"} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button className={'btn btn-primary'} onClick={searchByName}>Search</button>
            </div>
            <Link to={'/create'} class="btn btn-warning">Create new Student</Link>

            <table className={"table table-striped"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name Student</th>
                    <th>Date of Birth</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>PhoneNumber</th>
                    <th>ClassRoom</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {student.map((x) => {
                    return (
                        <>
                            <tr>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.localDate}</td>
                                <td>{x.email}</td>
                                <td>{x.address}</td>
                                <td>{x.phoneNumber}</td>
                                <td>{x.classRoom.name}</td>
                                <td>
                                    <Link to={"/update/" +x.id} class="btn btn-warning">update</Link>
                                </td>
                                <td>
                                    <button onClick={()=>(deleteStudent(x.id))} class="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </table>
        </>
    )

    function deleteStudent(id) {
        axios.delete("http://localhost:8080/api/students/" + id).then(() => {
            setCheck(!check)
            alert("delete succsefuly !!")
        })
    }
}
export default ListStudent