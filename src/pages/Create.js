import { useState, useRef } from 'react';

import CanvasDraw from 'react-canvas-draw';
import './sty/Create.css';


export default function Create() {
    const canvas = useRef();
    const [tempblob, setTempblob] = useState();
    const [color, setColor] = useState("#000000");
    const [brushsize, setBrushsize] = useState(10);
    {/* b64toBlob taken from stack overflow answer, will link in README */}
    let burl;
    
    const b64toBlob = (base64, type = 'application/octet-stream') => 
        fetch(`data:${type};base64,${base64}`)
            .then(res => res.blob()
            .then((myBlob) => { 
                setTempblob(myBlob);
                burl = URL.createObjectURL(myBlob);
            }));

    //const blob = b64toBlob(data, 'image/png');

    const handleUpload = (b64data) => {
        const b64 = b64data.split(",")[1];
        console.log(b64);
        const blob = b64toBlob(b64, 'image/png')
    }

    return (
        <div>
            <h1>Creation Page</h1>
            <h3>This is the page where users can draw images.</h3>
            <img src="blob:http://localhost:3000/9982d4a2-bfb4-4585-bebc-0a258843cbd0"></img>
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
                    console.log(tempblob);
                }}>
                    Upload
                </button>
            </div>
        </div>
    );
};