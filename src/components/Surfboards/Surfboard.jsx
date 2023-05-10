import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getSurfboard } from '../../services/api/surfboards'

const Surfboard = () => {
  const params = useParams()
  const [surfboard, surfboardItem] = useState(null)

  useEffect(()=>{
    getSurfboard(params.id, surfboardItem)
  },[])

  return (
    <>
    {surfboard != null ? (
        <div key={surfboard.id}>
          {surfboard.name}
        </div>
      ) : ('No board with this name')
    }
    </>
  )
}

export default Surfboard