import React from 'react'
import { Image } from 'react-bootstrap'

const  ImagePost =({img})=> {
  return (
    <Image fluid src={img.image}>

    </Image>
  )
}

export default ImagePost
