let canvas = document.querySelector('canvas');
let heightSlider = document.getElementById('heightSlider');
let widthSlider = document.getElementById('widthSlider');
let navButton = document.getElementById('navButton');
let navItems = document.getElementById('navItems');
let shapeButtons = document.getElementsByTagName('button');
let c = canvas.getContext('2d');
let shape = "square";
let height = 25;
let width = 25;

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
}

function createSquare(){
    c.fillStyle = randomColor();
    c.fillRect(event.clientX, event.clientY, width, height);
}

function randomColor(){
    return "rgb(" + randomColNum() + ", " + randomColNum() + ", " + randomColNum() + ")";
}

function randomColNum(){
    return Math.floor(Math.random() * 256);
}
