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
}

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


//create the circle shape and call the createDiv function to create a new html element on the page
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
    c.fillRect(event.clientX, event.clientY, width, height);
    drawnShapes.push({shape: "square", x: event.clientX, y: event.clientY, w: width, h: height, c: color});
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
    }
    div.addEventListener('click', function(){
        clearShape(this);
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
                // c.beginPath();
                c.clearRect(drawnShapes[i].x - drawnShapes[i].w - 1, drawnShapes[i].y - drawnShapes[i].w - 1, drawnShapes[i].w * 2 + 2, drawnShapes[i].w * 2 + 2);
                // c.closePath();
            }
            drawnShapes.splice(i, 1);
        }
        for(let j = 0; j < shapeDivs.length; j++){
            if(j === 0){
                c.clearRect(0, 0, canvas.width, canvas.height);
            }
            if(drawnShapes[j].shape === "square"){
                c.fillStyle = drawnShapes[j].c;
                c.fillRect(drawnShapes[j].x, drawnShapes[j].y, drawnShapes[j].w, drawnShapes[j].h);
            } else if(drawnShapes[j].shape ==="circle"){
                c.beginPath();
                c.arc(drawnShapes[j].x, drawnShapes[j].y, drawnShapes[j].w, 0, 2 * Math.PI);
                c.fillStyle = drawnShapes[j].c;
                c.fill();
            }
        }
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
