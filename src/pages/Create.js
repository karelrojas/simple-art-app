import { useState, useRef } from 'react';

import CanvasDraw from 'react-canvas-draw';
import './sty/Create.css';


export default function Create({username}) {
    const canvas = useRef();
    const [flag, setFlag] = useState(1);
    const [color, setColor] = useState("#000000");
    const [brushsize, setBrushsize] = useState(10);

    function uploadDrawing(author, image, desc) {
        fetch('http://localhost:8080/submission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author, image, desc})
        })
        .then(data => data.json());
    }
    


    const handleUpload = (image, desc) => {
        uploadDrawing(username, image, desc)
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
                <textarea id="upload-desc" className="upload-description" />
                <button onClick={() => {
                    const desc = document.getElementById("upload-desc");
                    handleUpload(canvas.current.getDataURL(), desc.value);
                }}>
                    Upload
                </button>
            </div>
        </div>
    );
};