'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image';
export default function ImagePicker({label,name}){
    const [picked,setPicked] = useState();
    const imageInputRef = useRef();
    function handlePickClick(){
        imageInputRef.current.click();
    }

    function handleImageChange(event){
        const file = event.target.files[0]

        if(!file){
            setPicked(null);
            return;
        }

        //이미지가 로컬 경로에 있기 때문에 브라우저에서 보여주기 위해 웹에서 인식 가능하도록 URL로 변경.
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPicked(fileReader.result);
        };
        //URL 형식의 파일 읽기
        fileReader.readAsDataURL(file);
    }
    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.preview}>
            {!picked && <p>No image Selected</p>}
            {picked && <Image src={picked} alt="img" fill/>}    
        </div>
        <div className={classes.controls}>
            <input 
                className={classes.input}
                type="file" 
                id={name}
                accept="image/png image/jpeng"
                name={name}
                ref={imageInputRef}
                //multiple => 여러개의 파일을 받을 때 필요함.
                onChange={handleImageChange}
                required
            />
            <button className={classes.button} type="button" onClick={handlePickClick}>
                Pick an Image
            </button>
        </div>
    </div>
}