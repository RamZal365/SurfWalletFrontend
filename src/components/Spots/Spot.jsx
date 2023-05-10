import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getSpot } from '../../services/api/spots'

const Spot = () => {
  const params = useParams()
  const [spot, spotItem] = useState(null)

  useEffect(()=>{
    getSpot(params.id, spotItem)
  },[])

  return (
    <>
    {spot != null ? (
        <div key={spot.id}>
          {spot.name}
        </div>
      ) : ('No board with this name')
    }
    </>
  )
}

export default Spot