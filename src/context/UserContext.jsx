import React from 'react'
import { createContext } from 'react'
import run from '../gemini';
import { useState } from 'react'
export const datacontext=createContext();
const UserContext = ({children})=>{

    let [speaking,setSpeaking]=useState(false);
    let[prompt,setPrompt]=useState("listening...")
    let[response,setResponse]=useState(false);
    function speak(text){
        let speech=new SpeechSynthesisUtterance(text);
        speech.lang="en-US";
        speech.rate=1;
        speech.pitch=1;
        speech.volume=1;
        window.speechSynthesis.speak(speech);
    }
    async function aiResponse(prompt){
       let text=await run(prompt)
       let newText=text.split("**")&&text.split("*")&& text.replace("google","Siddhant Dash")&& text.replace("Google","Siddhant Dash")
       setPrompt(newText);
       speak(newText)
       setResponse(true)
       setTimeout(()=>{
        setSpeaking(false)
       },5000)
    }
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition=new speechRecognition();
    recognition.onresult=(e)=>{
        let currentindex=e.resultIndex;
        let transcript=e.results[currentindex][0].transcript;
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
    }
    function takeCommand(command)
    {
        if(command.includes("open")&& command.includes("youtube"))
        {
            window.open("https://www.youtube.com/","_blank");
            speak("Opening YouTube for you...");
            setPrompt("Opening YouTube for you...");
                setTimeout(()=>{
            setSpeaking(false)
        },5000)
        }
        else if(command.includes("open")&& command.includes("google"))
        {
            window.open("https://www.google.com/","_blank");
            speak("Opening Google for you...");
            setPrompt("Opening YouTube for you...");
                setTimeout(()=>{
            setSpeaking(false)
        },5000)
        }
        else if(command.includes("open")&& command.includes("instagram"))
        {
            window.open("https://www.instagram.com/","_blank");
            speak("Opening Instagram for you...");
            setPrompt("Opening YouTube for you...");
                setTimeout(()=>{
            setSpeaking(false)
        },5000)
        }
        else if(command.includes("time"))
        {
            let time=new Date().toLocaleTimeString(undefined,{hour:"numeric",minute:"numeric"});
            speak(time);
            setPrompt(time);
                setTimeout(()=>{
            setSpeaking(false)
        },5000)
        }
        else if(command.includes("date"))
        {
            let date=new Date().toLocaleTimeString(undefined,{day:"numeric",month:"numeric"});
            speak(date);
            setPrompt(date);
                setTimeout(()=>{
            setSpeaking(false)
        },5000)
        }
        else{
            aiResponse(command);
        }
    }
    let value=
    {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
  return (
    <div>
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>

    </div>
  )
}

export default UserContext