let canvas = document.querySelector('canvas'),
c = canvas.getContext('2d'),
heightSlider = document.getElementById('heightSlider'),
widthSlider = document.getElementById('widthSlider'),
navButton = document.getElementById('navButton'),
navItems = document.getElementById('navItems'),
shapeButtons = document.getElementsByTagName('button'),
shapeDivs = document.getElementsByClassName('shapeDiv'),
shape = "square",
height = 25,
width = 25,
drawnShapes = [];

//initialize the canvas width/height on load.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Listen for the window size to change. Update canvas size accordingly.
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    reset();
}

//Responsive Nav.
navButton.addEventListener("click", function(){
    if(navItems.style.display === "block"){
        navItems.style.display = "none";
    } else {
        navItems.style.display = "block"
    }
})

//Listen for the mouse to move on the canvas and call the draw function.
canvas.addEventListener("mousemove", setOutline, false);

canvas.addEventListener("mouseout", reDraw, false);

//Changes value of shape variable depending on what button is clicked. Default is square.
for(let i = 0; i < shapeButtons.length; i++){
    shapeButtons[i].addEventListener('click', function(){
        shape = this.textContent.toLowerCase();
        this.classList.add('active');
        for(let j = 0; j < shapeButtons.length; j++){
            if(shapeButtons[i] !== shapeButtons[j]){
                shapeButtons[j].classList.remove('active');
            }
        }
    })
}

//listen for height/width sliders to change in value.
heightSlider.addEventListener('input', function(){
    height = this.value;
    document.getElementById('heightNum').textContent = " " + this.value;
})

widthSlider.addEventListener('input', function(){
    width = this.value;
    document.getElementById('widthNum').textContent = " " + this.value;
})

//Create shapes based on the value of variable shape.
canvas.addEventListener("click", function(){
    if(shape === "square"){
        createSquare();
    } else if(shape === "circle"){
        createCircle();
    } else if(shape === "triangle"){
        createTriangle();
    }
})

//create the circle shape and call the createDiv function to create a new html element on the page.
function createCircle(){
    let color = randomColor();
    c.beginPath();
    c.arc(event.clientX, event.clientY, width, 0, 2 * Math.PI);
    c.fillStyle = color;
    c.fill();
    drawnShapes.push({shape: "circle", x: event.clientX, y: event.clientY, w: width, c: color});
    createDiv(color);
}

//create the square shape and call the createDiv function to create a new html element on the page.
function createSquare(){
    let color = randomColor();
    c.fillStyle = color;
    c.fillRect(event.clientX - width / 2, event.clientY - height / 2, width, height);
    drawnShapes.push({shape: "square", x: event.clientX, y: event.clientY, w: width, h: height, c: color});
    createDiv(color);
}

//create a triangle shape and call the createDiv function to create a new html element on the page.
function createTriangle(){
    let color = randomColor();
    c.beginPath();
    c.moveTo(event.clientX, event.clientY);
    c.lineTo(Number(event.clientX) - Number(width), Number(event.clientY) + Number(height));
    c.lineTo(Number(event.clientX) + Number(width), Number(event.clientY) + Number(height));
    c.fillStyle = color;
    c.fill();
    drawnShapes.push({shape: "triangle", x: event.clientX, y: event.clientY, w: width, h: height, c: color});
    createDiv(color);
}

//create a div and add a click listener to that div for the newly created shape. Add a CSS transition to the
//dynamically created div.
function createDiv(color){
    let div = document.createElement('div');
    div.className = 'shapeDiv';
    div.style.background = color;
    document.getElementById('shapeContainer').appendChild(div);
    window.getComputedStyle(div).opacity;
    div.className += ' shapeDivTrans';
    if(shape === "square"){
        div.textContent = "S";
    } else if(shape === "circle"){
        div.textContent = "C";
    } else if(shape === "triangle"){
        div.textContent = "T";
    }
    div.addEventListener('click', function(){
        clearShape(this);
        reDraw();
    });
}

//remove the Div from the html as well as the shape. Remove the shape information from the drawnShapes array.
function clearShape(div){
    for(let i = 0; i < shapeDivs.length; i++){
        if(shapeDivs[i] === div){
            if(drawnShapes[i].shape === "square"){
                document.getElementById('shapeContainer').removeChild(shapeDivs[i]);
                c.clearRect(drawnShapes[i].x, drawnShapes[i].y, drawnShapes[i].w, drawnShapes[i].h);               
            } else if(drawnShapes[i].shape === "circle"){
                document.getElementById('shapeContainer').removeChild(shapeDivs[i]);
                c.clearRect(drawnShapes[i].x - drawnShapes[i].w - 1, drawnShapes[i].y - drawnShapes[i].w - 1, drawnShapes[i].w * 2 + 2, drawnShapes[i].w * 2 + 2);
            } else if(drawnShapes[i].shape === "triangle"){
                document.getElementById('shapeContainer').removeChild(shapeDivs[i]);
                c.clearRect(drawnShapes[i].x - drawnShapes[i].w, drawnShapes[i].y + drawnShapes[i].h, drawnShapes[i].w, drawnShapes[i].h);  
            }
            drawnShapes.splice(i, 1);
        }
    }
}

//Clears the canvas, loops through the existing shapeDivs and redraws the shape.
function reDraw(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i< shapeDivs.length; i++){
        if(drawnShapes[i].shape === "square"){
            c.fillStyle = drawnShapes[i].c;
            c.fillRect(drawnShapes[i].x - drawnShapes[i].w / 2, drawnShapes[i].y - drawnShapes[i].h / 2, drawnShapes[i].w, drawnShapes[i].h);
        } else if(drawnShapes[i].shape === "circle"){
            c.beginPath();
            c.arc(drawnShapes[i].x, drawnShapes[i].y, drawnShapes[i].w, 0, 2 * Math.PI);
            c.fillStyle = drawnShapes[i].c;
            c.fill();
        } else if(drawnShapes[i].shape === "triangle"){
            c.beginPath();
            c.fillStyle = drawnShapes[i].c;
            c.moveTo(drawnShapes[i].x, drawnShapes[i].y);
            c.lineTo(Number(drawnShapes[i].x) - Number(drawnShapes[i].w), Number(drawnShapes[i].y) + Number(drawnShapes[i].h));
            c.lineTo(Number(drawnShapes[i].x) + Number(drawnShapes[i].w), Number(drawnShapes[i].y) + Number(drawnShapes[i].h));
            c.fill();
        }
    }
}

//remove all shape divs and remove all shape information from the drawnShapes array.
function reset(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < shapeDivs.length; i++){
        document.getElementById('shapeContainer').removeChild(shapeDivs[i]);
        drawnShapes.splice(i, 1);
    }
}

//generate a random rgb color for the shapes.
let randomColor = () => {
    return "rgb(" + randomColNum() + ", " + randomColNum() + ", " + randomColNum() + ")";
}

//generate a random rgb color for the randomColor function.
let randomColNum = () => {
    return Math.floor(Math.random() * 256);
}

//create a transparent shape to show user where the placed shape will land.
function setOutline(e) {
    reDraw();
    c.fillStyle = "rgba(255,255,51,0.6)";
    if(shape === "square"){
        c.beginPath();
        c.fillRect(event.clientX - width / 2, event.clientY - height / 2, width, height);
        c.fill();
    } else if(shape === "circle"){
        c.beginPath();
        c.arc(event.clientX, event.clientY, width, 0, 2 * Math.PI);
        c.fill();
    } else if(shape === "triangle"){
        c.beginPath();
        c.moveTo(event.clientX, event.clientY);
        c.lineTo(Number(event.clientX) - Number(width), Number(event.clientY) + Number(height));
        c.lineTo(Number(event.clientX) + Number(width), Number(event.clientY) + Number(height));
        c.fill();
    }
}
