import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

function EditStudent()
{
    const {id}= useParams();
    const navigate= useNavigate();
    const [editStudent, setEditStudent]= useState({name:'', familyName:'',phone:'',address:'',midtermGrade:'',finalGrade:'',age:'', id:'',});
    const [message, setMessage]= useState('');

        useEffect(()=>{
        const getStudent= async()=>{
            const reqData= await fetch(`http://localhost:8080/student/byid?id=${id}`);
            const resData= await reqData.json();
            setEditStudent(resData);
        }
        getStudent();
    },[id]);

    const handleInput= (e)=>{
        setEditStudent({...editStudent, [e.target.name]:e.target.value});
    } 
 
    const handleUpdate= async(e)=>{
        e.preventDefault();
        const editInputvalue= {name:editStudent.name, familyName:editStudent.familyName, phoneNo:editStudent.phoneNo, address:editStudent.address, midtermGrade:editStudent.midtermGrade,  finalGrade:editStudent.finalGrade, 
            age:editStudent.age, id:id};
        console.log(editInputvalue);  
        let res=  await fetch("http://localhost:8080/student" , {
            method:"PUT",
            headers:{'content-type':'application/json'},
            body: JSON.stringify(editInputvalue)
        });  

        if(res.status===200)
        {
          setTimeout(() => {
            navigate('/listofstudents'); 
          }, 2000);        

        } else {
            setMessage("Some error Occured");
        }

    }
    
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h5 className="mt-2">Öğrenci Düzenle{ id }</h5>
              <p className="text-success"> { message} </p>
                    <form onSubmit={ handleUpdate}>
                    <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Adı</label>
                                    <input type="text" name="name" className="form-control" value={editStudent.name} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Soyadı</label>
                                    <input type="text" name="familyName" className="form-control" value={editStudent.familyName} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Vize Notu</label>
                                    <input type="text" name="midtermGrade" className="form-control" value={editStudent.midtermGrade} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Final Notu </label>
                                    <input type="text" name="finalGrade" className="form-control" value={editStudent.finalGrade} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Yaş</label>
                                    <input type="text" name="age" className="form-control" value={editStudent.age} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Telefon Numarası </label>
                                    <input type="text" name="phoneNo" className="form-control" value={editStudent.phoneNo} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Adres</label>
                                    <input type="text" name="address" className="form-control" value={editStudent.address} onChange={ handleInput}/>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-lable"></label>
                                    <button type="submit" className="btn btn-success btn-lg">Kaydet</button>
                                     </div>
                            </div>
                        </div>
                    </form>

                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
}

export default EditStudent;
