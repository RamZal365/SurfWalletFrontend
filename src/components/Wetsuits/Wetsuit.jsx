import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getWetsuit } from '../../services/api/wetsuits'

const Wetsuit = () => {
  const params = useParams()
  const [wetsuit, wetsuitItem] = useState(null)

  useEffect(()=>{
    getWetsuit(params.id, wetsuitItem)
  },[])

  return (
    <>
    {wetsuit != null ? (
        <div key={wetsuit.id}>
          {wetsuit.brand}
        </div>
      ) : ('No board with this name')
    }
    </>
  )
}

export default Wetsuit