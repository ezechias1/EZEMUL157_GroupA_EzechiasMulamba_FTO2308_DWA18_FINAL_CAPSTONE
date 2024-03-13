

import './App.css'
import { useEffect, useState } from 'react'

function App
() { 

  const [data ,setData]= useState<any[]>()



  useEffect(( )=>{
    //https://podcast-api.netlify.app/shows

     fetch("https://podcast-api.netlify.app/shows").then(res =>
     
     res.json()).then(shows => setData(shows)
     )

    
    
  },[])

  useEffect(() => {
    if(data) console.log(data)
    
    
    
  },[data] )

  
  return (
    
    <div>
{data!.map(item=>(

<div className='title'>
{item.title}

<img src={item.image} />

</div>




))}

    </div>
  )
}

export default App
