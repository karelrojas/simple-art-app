import { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import './sty/Create.css';

export default function Create() {
    const canvas = useRef();
    const [color, setColor] = useState("#000000");

    return (
        <div>
            <h1>Creation Page</h1>
            <h3>This is the page where users can draw images.</h3>
            <div className="drawing-page">
                <div className="colors">
                    <div className="color-black" onClick={() => {setColor("#000000");}}/>
                    <div className="color-blue" onClick={() => {setColor("#0000FF");}}/>
                    <div className="color-green" onClick={() => {setColor("#00FF00");}}/>
                    <div className="color-red" onClick={() => {setColor("#FF0000");}}/>
                </div>
                <div className="drawing-canvas">
                    <CanvasDraw ref={canvas} brushColor={color} canvasWidth={400} canvasHeight={400}/>
                </div>
            </div>
            <button onClick={() => {
                canvas.current.undo()
            }}>
                Undo
            </button>
            <button onClick={() => {
                canvas.current.clear()
            }}>
                Clear
            </button>
        </div>
    );
};