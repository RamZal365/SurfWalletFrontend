import React, {useEffect, useState} from 'react'
import { allWetsuits } from '../../services/api/wetsuits'

const Wetsuits = () => {
  const [wetsuits, setWetsuits] = useState(null)
  useEffect(()=>{
    allWetsuits(setWetsuits)
  },[])

  return (
    <>
    {wetsuits != null ? (
      wetsuits.map(wetsuit => (
        <div key={wetsuit.id}>
          <a href={`/wetsuit/${wetsuit.id}`}>{wetsuit.brand}</a>
        </div>
      ))
    ) : ('No wetsuits')}
    </>
  )
}

export default Wetsuits