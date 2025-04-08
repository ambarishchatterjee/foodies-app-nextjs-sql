'use client'
import React, { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
    const imageRef = useRef()
    const [pickedImage, setPickedImage] = useState()
    const handleClickImagePicker = () => {
        imageRef.current.click()
    }
    const handleImageChange = (e) => {

        const file = e.target.files[0]
        if (!file) {
            setPickedImage(null)
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
        setPickedImage(file)

    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No file chosen yet</p>}
                    {pickedImage && <Image src={pickedImage} fill alt='choosen image' />}
                </div>
                

                <input ref={imageRef} name={name} type="file" id={name} accept='image/png, image/jpeg ' className={classes.input} required onChange={handleImageChange} />
                <button onClick={handleClickImagePicker} className={classes.button}>Pick an Image</button>
            </div>

        </div>
    )
}
