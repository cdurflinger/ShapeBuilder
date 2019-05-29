let canvas = document.querySelector('canvas');
let squareButton = document.getElementById('square');
let circleButton = document.getElementById('circle');
let heightSlider = document.getElementById('heightSlider');
let widthSlider = document.getElementById('widthSlider');
let navButton = document.getElementById('navButton');
let navItems = document.getElementById('navItems');
let c = canvas.getContext('2d');
let shape = "square";
let height = 25;
let width = 25;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Responsive Nav
navButton.addEventListener("click", function(){
    if(navItems.style.display === "block"){
        navItems.style.display = "none";
    } else {
        navItems.style.display = "block"
    }
})

//Changes value of shape variable depending on what button is clicked. Default is square.

squareButton.addEventListener('click', function(){
    shape = "square";
})

circleButton.addEventListener('click', function(){
    shape = "circle";
})

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
    return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
}

function randomNumber(){
    return Math.floor(Math.random() * 101);
}


// document.addEventListener("click", function(){
//     c.beginPath();
//     c.arc(event.clientX, event.clientY, 50, 0, 2 * Math.PI);
//     c.fillStyle = randomColor();
//     c.fill();
// });

// document.addEventListener("click", function(){
//     c.fillStyle = randomColor();
//     c.fillRect(event.clientX, event.clientY, randomNumber(), randomNumber());
// });