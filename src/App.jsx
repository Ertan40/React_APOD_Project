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
      const API_KEY = import.meta.env.VITE_NASA_API_KEY
      // const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${API_KEY}`
      const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
      // Cache the information
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}` 
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log("Fetched from cached today.")
        return 
      }
      localStorage.clear()
      try {
        const response = await fetch (url)
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
      } 
      const apiData = await response.json()
      localStorage.setItem(localKey, JSON.stringify(apiData))
      setData(apiData)
      console.log("Fetched from API today.")
    
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


