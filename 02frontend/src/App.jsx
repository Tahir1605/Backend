
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
 const [student,setStudent] = useState([])
 
 useEffect(() => {
  axios.get('/api/students')
  .then((response) => {
    setStudent(response.data)
  })
  .catch((error) => {
    console.log(error);
    
  })
 })
  return (
    <div>
      <h1>Chai Aur Backend</h1>
      <p>Students : {student.length}</p>

      {
        student.map((student,index) => (
          <div key={student.id}>
               <h3>{student.name}</h3>
               <p>{student.course}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
