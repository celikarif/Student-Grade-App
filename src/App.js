import React ,{  } from "react";
import {Routes, Route} from 'react-router-dom';
import Header from './components/Common/Header';
import ListOfStudents from './components/ListOfStudents';
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";




function App() 
{  
  return (    
    <div className="App">
     <div className='leftPanel'>    
      <Header/>
     </div>
     <div className='rightPanel'>
      <Routes>
      <Route path='/listofstudents' element={<ListOfStudents/>} />  
      <Route path='/addStudent' element={<AddStudent/>} />  
      <Route path='/editstudent/:id' element={<EditStudent/>} /> 

      </Routes> 
          
     </div>
    </div>
  );
}

export default App;
