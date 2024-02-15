import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent()
{
    const [formValue, setFormValue]= useState({name:'', familyName:'',phone:'',address:'',status:''});
    const [message, setMessage]= useState();
    const navigate= useNavigate();
    const handleInput=(e)=>{
     const {name, value}= e.target;
     setFormValue({...formValue, [name]:value});
    }
    const handleSubmit= async(e)=>{
       e.preventDefault();
       const allInputvalue= { name: formValue.name, familyName:formValue.familyName, phoneNo:formValue.phoneNo, address:formValue.address, midtermGrade:formValue.midtermGrade , finalGrade:formValue.finalGrade  
        , age:formValue.age }; 

      let res= await fetch("http://localhost:8080/student",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(allInputvalue)
      });



      if(res.status===200)
      {
        setTimeout(()=>{
            navigate('/listofstudents');
        }, 2000);

      } else{
        setMessage("Some Error Occured");
      }

    }
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h5 className="mt-2">Öğrenci Kayıt </h5>
                    <p className="text-success"> { message } </p>
                    <form onSubmit={ handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Adı</label>
                                    <input type="text" name="name" className="form-control" value={formValue.name} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Soyadı</label>
                                    <input type="text" name="familyName" className="form-control" value={formValue.familyName} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Vize Notu</label>
                                    <input type="text" name="midtermGrade" className="form-control" value={formValue.midtermGrade} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Final Notu </label>
                                    <input type="text" name="finalGrade" className="form-control" value={formValue.finalGrade} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Yaş</label>
                                    <input type="text" name="age" className="form-control" value={formValue.age} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Telefon Numarası </label>
                                    <input type="text" name="phoneNo" className="form-control" value={formValue.phoneNo} onChange={ handleInput}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-lable">Adres</label>
                                    <input type="text" name="address" className="form-control" value={formValue.address} onChange={ handleInput}/>
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

export default AddStudent;
