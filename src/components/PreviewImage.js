import React,{useEffect, useState} from 'react';

const PreviewImage = ({file}) => {
    const[preview,setPreview]=useState(null)
    const reader =new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
        setPreview(reader.result)
    }

  return (<>
      <img src={preview} alt='preview' width="75px" height="75px" style={{borderRadius:'10px',display:'inline-block'}}/>
  </>)
};

export default PreviewImage;
