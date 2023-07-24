import { useState, useRef } from 'react';

import CanvasDraw from 'react-canvas-draw';
import './sty/Create.css';


export default function Create() {
    const canvas = useRef();
    const [flag, setFlag] = useState(1);
    const [color, setColor] = useState("#000000");
    const [brushsize, setBrushsize] = useState(10);

    // b64toBlob taken from stack overflow answer, will link in README
    let burl;

    function uploadDrawing(author, image, desc) {
        /*console.log([image, author, desc]);
        const formData = new FormData();
        formData.append("image", image, "image.jpg");
        formData.append("author", author);
        formData.append("desc", desc);
        for (const value of formData.values()) {
            console.log(value);
          }*/
        fetch('http://localhost:8080/submission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author, image, desc})
        })
        .then(data => data.json());
    }
    
    function b64toBlob(base64, type = 'application/octet-stream'){
        fetch(`data:${type};base64,${base64}`)
            .then(res => res.blob()
            .then((myBlob) => { 
                console.log(myBlob)
                setFlag(uploadDrawing("Collia", myBlob, "This is a test description"));
            }));
    }


    const handleUpload = (b64data) => {
        uploadDrawing("Collia", b64data, "testing with b64")
        //const b64 = b64data.split(",")[1];
        //console.log(b64);
        //b64toBlob(b64, 'image/png')
        //uploadDrawing("Collia", blob, "test description");
    }

    return (
        <div>
            <h1>Creation Page</h1>
            <h3>This is the page where users can draw images.</h3>
            <img src=""></img>
            <div className="drawing-page">
                <div className="colors">
                    <div className="color black" onClick={() => {setColor("#000000");}}/>
                    <div className="color red" onClick={() => {setColor("#FF0000");}}/>
                    <div className="color orange" onClick={() => {setColor("#FFA500");}}/>
                    <div className="color yellow" onClick={() => {setColor("#FFFF00");}}/>
                    <div className="color green" onClick={() => {setColor("#00FF00");}}/>
                    <div className="color aquamarine" onClick={() => {setColor("#7FFFD4");}}/>
                    <div className="color blue" onClick={() => {setColor("#0000FF");}}/>
                    <div className="color indigo" onClick={() => {setColor("#4B0082");}}/>
                    <div className="color purple" onClick={() => {setColor("#A020F0");}}/>
                </div>
                <div className="drawing-canvas">
                    <CanvasDraw 
                        ref={canvas} 
                        brushColor={color} 
                        brushRadius={brushsize}
                        catenaryColor={color}
                        lazyRadius={0}
                        canvasWidth={400} 
                        canvasHeight={400}/>
                </div>
                <div className="brush-options">
                    <label className="brush-label">Brush Size:</label>
                    <input className="brush" type="number" min={1} max={20} value={brushsize} onChange={e => setBrushsize(e.target.value)} />
                </div>
            </div>
            <div className="tools">
                <button onClick={() => {
                    canvas.current.undo()
                }}>
                    Undo
                </button>
                <button onClick={() => {
                    canvas.current.clear()
                }}>
                    Clear
                </button><br/><br/>
            </div>
            <div className="upload-settings">
                <label>Description</label>
                <textarea className="upload-description" />
                <button onClick={() => {
                    handleUpload(canvas.current.getDataURL());
                }}>
                    Upload
                </button>
            </div>
        </div>
    );
};