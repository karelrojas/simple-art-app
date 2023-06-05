import Sketch from "react-p5";
import './sty/Create.css';



export default function Create() {

    function setup(p5, canvasParentRef) {
        p5.createCanvas(400,300).parent(canvasParentRef);
        p5.background(255,255,210);
        let button = p5.createButton('Clear Drawing');
        button.mousePressed(clearDraw);
    }

    function draw(p5) {

        if(p5.mouseIsPressed === true) {
            p5.line(p5.mouseX,p5.mouseY,p5.pmouseX,p5.pmouseY);
            p5.stroke(104,223,63);
            p5.strokeWeight(8);
        }
        
    }

    function clearDraw(p5) {
        p5.background(50);
        
    }

    return (
        <div>
            <h1>Creation Page</h1>
            <h3>This is the page where users can create things.</h3>
            <div className="drawing-canvas">
                <Sketch setup={setup} draw={draw}/>
            </div>
        </div>
    );
};