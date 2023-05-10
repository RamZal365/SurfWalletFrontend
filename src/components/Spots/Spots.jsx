import React, {useEffect, useState} from 'react'
import { allSpots } from '../../services/api/spots'

const Spots = () => {
  const [spots, setSpots] = useState(null)
  useEffect(()=>{
    allSpots(setSpots)
  },[])

  return (
    <>
    {spots != null ? (
      spots.map(spot => (
        <div key={spot.id}>
          <a href={`/spot/${spot.id}`}>{spot.name}</a>
        </div>
      ))
    ) : ('No spots')}
    </>
  )
}

export default Spots