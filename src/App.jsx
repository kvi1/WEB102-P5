import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [fact, setFact] = useState(null);
  const [ban, setBan] = useState([]);


  const getRandomDate = () => {
    const start = new Date(1995, 5, 16); // when the apod api started
    const end = new Date(); //today
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split("T")[0]; // date form

  }

  const getData = async () => {
    const randomDate = getRandomDate();
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`);
    const data = await response.json();
    while(ban.includes(data.date) || ban.includes(data.title)){
      randomDate = getRandomDate();
      response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`);
      data = await response.json();
    }
    console.log(data);
    setFact(data);
  }
  useEffect(() => {
    getData();
  }, [])

  const banned = (value) => {
    if(!ban.includes(value)){
      setBan(prev => [...prev, value])
    }
    
  }

  const nbanned = (value) => {
    setBan(prev => prev.filter(item => item !== value));
  }

  return(
    <div className = "mainC">
      <div 
      className = "mainX"
      >
         <button onClick = {getData}>New Fact</button>
      <h1>Learn More NASA Facts 🪐</h1>
      {fact && (
          <>
            <h2 onClick = {() => banned(fact.title)} className = "facts">Fact Title: {fact.title}</h2>
            <p onClick = {() => banned(fact.date)} className = "facts">Date: {fact.date}</p>
            <h3 >Image</h3>
            <img src={fact.url} alt={fact.title} className = "facts"/>

            <h3>Ban List:</h3>
            <ul className = "facts">
              {ban.map((item,index) => (
                <li key={index} onClick = {() => nbanned(item)}>{item}</li>
              ))}
            </ul>

           
          </>
          
          
        )}
      </div>
    </div>
  );
}

export default App
