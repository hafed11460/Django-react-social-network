import React from 'react'
import { useState } from 'react';
import {Carousel, Image, Modal} from 'react-bootstrap'


const  ImageView = (props)=> {
    console.log('images',props.images)
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const handleImageViewModal = (e)=>{
        props.onHide()
    }
  return (
    <Modal
        {...props}
        onHide={handleImageViewModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            {/* <Modal.Title>Image View</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
            <Carousel>
                {props.images.map(item => (
                    <Carousel.Item key={item.id}>
                    <img
                        className="d-block w-100"
                        src={item.image}
                        alt={item.caption}
                    />
                    <Carousel.Caption>
                        <h3>{item.caption}</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Modal.Body>

    </Modal>
  )
}

export default ImageView