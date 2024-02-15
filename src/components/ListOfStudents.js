import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './modal.css';

function Studentdata() {
    const [studentData, setStudentdata] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsStudentData, setSelectedItemsStudentData] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [additionalStudentData, setAdditionalStudentData] = useState(null);
    const [selectedStudentData, setSelectedStudentData] = useState([]);
    const [allItemsSelected, setAllItemsSelected] = useState(false);

    useEffect(() => {
        const getStudentData = async () => {
            const reqData = await fetch("http://localhost:8080/student");
            const resData = await reqData.json();

            setStudentdata(resData);
        }
        getStudentData();
    }, []);

    useEffect(() => {
        if (allItemsSelected) {
            setSelectedItemsStudentData([...studentData]);
        } else {
            setSelectedItemsStudentData([]);
        }
    }, [allItemsSelected, studentData]);

    useEffect(() => {
        setSelectedStudentData(selectedItemsStudentData);
    }, [selectedItemsStudentData]);

    const sortByName = async () => {
        const reqData = await fetch("http://localhost:8080/student/sortbyname");
        const sortedData = await reqData.json();
        setStudentdata(sortedData);
    };

    const handleCheckboxChange = (index) => {
        const isSelected = selectedItems.includes(index);
        let updatedSelectedItems;

        if (!isSelected) {
            updatedSelectedItems = [...selectedItems, index];
        } else {
            updatedSelectedItems = selectedItems.filter(item => item !== index);
        }
        setSelectedItems(updatedSelectedItems);

        const selectedStudentData = updatedSelectedItems.map(i => studentData[i]);
        setSelectedItemsStudentData(selectedStudentData);
    };

    const handleBulkDelete = async () => {
        if (selectedItemsStudentData.length === 0) {
            alert("Lütfen silinecek öğeleri seçin!");
            return;
        }

        const confirmation = window.confirm("Seçili öğeleri silmek istediğinizden emin misiniz?");
        if (!confirmation) {
            return;
        }

        selectedItemsStudentData.forEach(async (item) => {
            await handleDelete(item.id);
        });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8080/student?id=${id}`, {
            method: 'DELETE',
        })

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleInfoClick = async (id) => {
        setSelectedStudentId(id);
        setShowPopup(true);

        const reqData = await fetch(`http://localhost:8080/student/byid?id=${id}`);
        const StudentData = await reqData.json();
        setAdditionalStudentData(StudentData);
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mt-2">Öğrenci Listesi</h5>
                        <div className="d-grid d-md-flex justify-content-md-end mb-3">
                            <div className="btn-group me-2">
                                <Link to="/addStudent" className="btn btn-warning">Öğrenci Ekle</Link>
                            </div>

                            { (selectedStudentData.length > 0 || allItemsSelected) && (
                                <div className="btn-group me-2">
                                    <button type="button" className="btn btn-danger" onClick={handleBulkDelete}>Toplu Sil</button>
                                </div>
                            )}

                            <DropdownButton
                                title="Sırala"
                                id="dropdown-menu-align-right"
                                variant="primary"
                            >
                                <Dropdown.Item eventKey="1" onClick={sortByName}>Ada Göre Sırala</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Sıra</th>
                                    <th className="text-center">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setAllItemsSelected(isChecked);
                                                const updatedSelectedItems = isChecked ? studentData.map((_, index) => index) : [];
                                                setSelectedItems(updatedSelectedItems);
                                            }}
                                            checked={allItemsSelected}
                                        />
                                    </th>
                                    <th>Adı</th>
                                    <th>Soyadı</th>
                                    <th>Vize Notu</th>
                                    <th>Final Notu</th>
                                    <th>Harf Notu</th>
                                    <th>Seçenekler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((studentData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="text-center">
                                            <input type="checkbox" onChange={() => handleCheckboxChange(index)} checked={selectedItems.includes(index)} />
                                        </td>
                                        <td>{studentData.name}</td>
                                        <td>{studentData.familyName}</td>
                                        <td>{studentData.midtermGrade}</td>
                                        <td>{studentData.finalGrade}</td>
                                        <td>{studentData.letterGrade}</td>

                                        <td>
                                            { (selectedStudentData.length === 0 && !allItemsSelected) && (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Link to={"/editstudent/" + studentData.id} className="btn btn-success mx-2">Edit</Link>
                                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(studentData.id)}>Sil</button>
                                                    <div style={{ marginLeft: '0.5rem', cursor: 'pointer' }} onClick={() => handleInfoClick(studentData.id)}>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                    </div>
                                                </div>
                                            )}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
                        {additionalStudentData && (
                            <div>
                                <p>Yaş: {additionalStudentData.age}</p>
                                <p>Telefon Numarası: {additionalStudentData.phoneNo}</p>
                                <p>Adres: {additionalStudentData.address}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default Studentdata;
