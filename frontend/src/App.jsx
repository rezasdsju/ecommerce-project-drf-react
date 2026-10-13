import { useState, useEffect } from "react"


function App(){
  const [message, setMessage] = useState('')
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/')
    .then(res=>res.json())
    .then(data=>setMessage(data))
    .catch(error=> console.log('Error fething massage: ',error))
  },[])
  console.log(message)
  return (
    <div>
      <h1>Message from backend</h1>
      <p>{message.message} </p>
    </div>
  )
}

export default App;