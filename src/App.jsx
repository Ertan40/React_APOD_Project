import SideBar from "./components/SideBar"
import Footer from "./components/Footer"
import Main from "./components/Main"
import { useState, useEffect } from 'react'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  function handleToggleModal () {
      setShowModal (!showModal)
  }

  useEffect(() => {
    async function fetchApiData() {
      try {
        const API_KEY = import.meta.env.VITE_NASA_API_KEY
        // console.log("API KEY", API_KEY)
        // const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${API_KEY}`
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
        const response = await fetch (url)

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
      } 
      const apiData = await response.json()
      // console.log(apiData)
      setData(apiData)
      // processData(apiData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchApiData ()
    
  }, [])
     
  return (
    <>
      {data ? (<Main data={data}/>) : (
        <div className="loadingset">
          <i className="fa fa-cog" aria-hidden="true"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal}/>
        )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal}/>}
    </>
  )
}

export default App


// {date: '2024-11-03', explanation: "What's that black spot on Jupiter? No one is sure.…f Juno near Jupiter will be in about three weeks.", hdurl: 'https://apod.nasa.gov/apod/image/2411/JupiterAbyss_JunoEichstadt_1080.jpg', media_type: 'image', service_version: 'v1', …}
// date
// : 
// "2024-11-03"
// explanation
// : 
// "What's that black spot on Jupiter? No one is sure.  During one pass of NASA's Juno over  Jupiter, the robotic spacecraft imaged an usually dark cloud feature informally dubbed the Abyss. Surrounding cloud patterns show the Abyss to be at the center of a vortex. Since dark features on Jupiter's atmosphere tend to run deeper than light features, the Abyss may really be the deep hole that it appears -- but without more evidence that remains conjecture.  The Abyss is surrounded by a complex of meandering clouds and other swirling storm systems, some of which are topped by light colored, high-altitude clouds.  The featured image was captured in 2019 while Juno passed only about 15,000 kilometers above Jupiter's cloud tops.  The next close pass of Juno near Jupiter will be in about three weeks."
// hdurl
// : 
// "https://apod.nasa.gov/apod/image/2411/JupiterAbyss_JunoEichstadt_1080.jpg"
// media_type
// : 
// "image"
// service_version
// : 
// "v1"
// title
// : 
// "Jupiter Abyss"
// url
// : 
// "https://apod.nasa.gov/apod/image/2411/JupiterAbyss_JunoEichstadt_1080.jpg"