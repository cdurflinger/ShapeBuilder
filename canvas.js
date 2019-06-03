let canvas = document.querySelector('canvas');
let heightSlider = document.getElementById('heightSlider');
let widthSlider = document.getElementById('widthSlider');
let navButton = document.getElementById('navButton');
let navItems = document.getElementById('navItems');
let shapeButtons = document.getElementsByTagName('button');
let shapeDivs = document.getElementsByClassName('shapeDiv');
let c = canvas.getContext('2d');
let shape = "square";
let height = 25;
let width = 25;
let drawnShapes = [];

//initialize the canvas width/height on load.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Listen for the window size to change. Update canvas size accordingly.
window.addEventListener('resize', resizeCanvas, false);

//Responsive Nav
navButton.addEventListener("click", function(){
    if(navItems.style.display === "block"){
        navItems.style.display = "none";
    } else {
        navItems.style.display = "block"
    }
})

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
heightSlider.addEventListener('change', function(){
    height = this.value;
})

widthSlider.addEventListener('change', function(){
    width = this.value;
})

//Create shapes based on the value of variable shape.
canvas.addEventListener("click", function(){
    if(shape === "square"){
        createSquare();
    } else if(shape === "circle"){
        createCircle();
    }
})

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createCircle(){
    c.beginPath();
    c.arc(event.clientX, event.clientY, width, 0, 2 * Math.PI);
    c.fillStyle = randomColor();
    c.fill();
    drawnShapes.push({shape: "circle", x: event.clientX, y: event.clientY, w: width});
    createDiv();
}

function createSquare(){
    c.fillStyle = randomColor();
    c.fillRect(event.clientX, event.clientY, width, height);
    drawnShapes.push({shape: "square", x: event.clientX, y: event.clientY, w: width, h: height});
    createDiv();
}

function createDiv(){
    let div = document.createElement('div');
    div.className = 'shapeDiv';
    document.getElementById('shapeContainer').appendChild(div);
    div.addEventListener('click', function(){
        clearShape(this);
    });
}

function clearShape(div){
    for(let i = 0; i < shapeDivs.length; i++){
        if(shapeDivs[i] === div){
            if(drawnShapes[i].shape === "square"){
                document.getElementById('shapeContainer').removeChild(shapeDivs[i]);
                c.clearRect(drawnShapes[i].x, drawnShapes[i].y, drawnShapes[i].w, drawnShapes[i].h);               
            } else if(drawnShapes[i].shape === "circle"){
                document.getElementById('shapeContainer').removeChild(shapeDivs[i]);
                c.save();
                c.globalCompositeOperation = 'destination-out';
                c.beginPath();
                c.arc(drawnShapes[i].x, drawnShapes[i].y, drawnShapes[i].w, 0, 2 * Math.PI, false);
                c.fill();
                c.restore();
            }
                drawnShapes.splice(i, 1);
        }
    }
}

function randomColor(){
    return "rgb(" + randomColNum() + ", " + randomColNum() + ", " + randomColNum() + ")";
}

function randomColNum(){
    return Math.floor(Math.random() * 256);
}
