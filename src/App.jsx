import React from 'react'
import './App.css'
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { useContext } from 'react'
import { datacontext } from './context/UserContext.jsx'
import speamking from "./assets/speak.gif"
import aigif from "./assets/aivoice.gif"
const App = () => {
  let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse}=useContext(datacontext);

  return (
    <div className='main'>
      <img src={va} alt="" id="shipra"/>
      <span>I'm Shipra,Your Advanced Virtual Assistant</span>
      {!speaking?<button  onClick={()=>{
        setPrompt("listening...")
        setResponse(false)
        setSpeaking(true);
        recognition.start()
      }}>Click here <CiMicrophoneOn /></button>
      :
      <div className='response'>
        {!response?<img src={speamking} alt="" id="speak"/>:
        <img src={aigif} alt="" id="aigif"/>}
      <p>{prompt}</p>
      </div>
    }
  
  
    </div>
  )
}

export default App