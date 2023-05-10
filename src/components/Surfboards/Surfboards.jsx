import React, {useEffect, useState} from 'react'
import { allSurfboards } from '../../services/api/surfboards'

const Surfboards = () => {
  const [surfboards, setSurfboards] = useState(null)
  useEffect(()=>{
    allSurfboards(setSurfboards)
  },[])

  return (
    <>
    {surfboards != null ? (
      surfboards.map(surfboard => (
        <div key={surfboard.id}>
          <a href={`/surfboard/${surfboard.id}`}>{surfboard.name}</a>
        </div>
      ))
    ) : ('No surfboards')}
    </>
  )
}

export default Surfboards