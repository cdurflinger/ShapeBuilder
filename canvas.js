(function(){

    const canvasSettings = {
        canvas: document.querySelector('canvas'),
        ctx: document.querySelector('canvas').getContext('2d'),
        heightSlider: document.getElementById('heightSlider'),
        widthSlider: document.getElementById('widthSlider'),
        navButton: document.getElementById('navButton'),
        navOptions: document.getElementById('navItems'),
        shapeButtons: document.getElementsByTagName('button'),
        shapeDivs: document.getElementsByClassName('shapeDiv'),
        currentSelectedShape: 'rectangle',
    }
    const shapeSettings = {
        rectangle: {
            width: 25,
            height: 25,
        },
        circle: {
            radius: 25,
        },
        triangle: {
            width: 25,
            height: 25,
        }
    }
    //console.log(shapeSettings[canvasSettings.shapeButtons[0].textContent.toLowerCase()].width);
    let drawnShapes = [];

    //initialize the canvas width/height on load.
    canvasSettings.canvas.width = window.innerWidth;
    canvasSettings.canvas.height = window.innerHeight;

    //Listen for the window size to change. Update canvas size accordingly.
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas(){
        canvasSettings.canvas.width = window.innerWidth;
        canvasSettings.canvas.height = window.innerHeight;
        reset();
    }

    //Responsive Nav.
    canvasSettings.navButton.addEventListener('click', function(){
        if(canvasSettings.navOptions.style.display === 'block'){
            canvasSettings.navOptions.style.display = 'none';
        } else {
            canvasSettings.navOptions.style.display = 'block'
        }
    })

    //Listen for the mouse to move on the canvas and call the draw function.
    canvasSettings.canvas.addEventListener('mousemove', setOutline, false);

    canvasSettings.canvas.addEventListener('mouseout', reDraw, false);

    //Changes value of shape variable depending on what button is clicked. Default is rectangle.
    for(let i = 0; i < canvasSettings.shapeButtons.length; i++){
        canvasSettings.shapeButtons[i].addEventListener('click', function(){
            canvasSettings.currentSelectedShape = this.textContent.toLowerCase();
            this.classList.add('active');
            if(canvasSettings.currentSelectedShape === 'circle'){
                console.log('hi');
                canvasSettings.widthSlider.value = shapeSettings[canvasSettings.currentSelectedShape].radius;
                document.getElementById('heightNum').textContent = 'N/A';
                document.getElementById('widthNum').textContent = ' ' + shapeSettings[canvasSettings.currentSelectedShape].radius;
            } else {
                canvasSettings.heightSlider.value = shapeSettings[canvasSettings.currentSelectedShape].height;
                canvasSettings.widthSlider.value = shapeSettings[canvasSettings.currentSelectedShape].width;
                document.getElementById('heightNum').textContent = ' ' + shapeSettings[canvasSettings.currentSelectedShape].height;
                document.getElementById('widthNum').textContent = ' ' + shapeSettings[canvasSettings.currentSelectedShape].width;
            }
            for(let j = 0; j < canvasSettings.shapeButtons.length; j++){
                if(canvasSettings.shapeButtons[i] !== canvasSettings.shapeButtons[j]){
                    canvasSettings.shapeButtons[j].classList.remove('active');
                }
            }
        })
    }

    //listen for height/width sliders to change in value.
    canvasSettings.heightSlider.addEventListener('input', function(){
        shapeSettings[canvasSettings.currentSelectedShape].height = this.value;
        if(canvasSettings.currentSelectedShape === 'circle'){
            document.getElementById('heightNum').textContent = 'N/A';
        } else{
            document.getElementById('heightNum').textContent = ' ' + this.value;
        }
    })

    canvasSettings.widthSlider.addEventListener('input', function(){
        if(canvasSettings.currentSelectedShape === 'circle'){
            console.log(canvasSettings.currentSelectedShape);
            shapeSettings[canvasSettings.currentSelectedShape].radius = this.value;
        }
        shapeSettings[canvasSettings.currentSelectedShape].width = this.value;
        document.getElementById('widthNum').textContent = ' ' + this.value;
    })

    //Create shapes based on the value of variable shape.
    canvasSettings.canvas.addEventListener('click', function(){
        if(canvasSettings.currentSelectedShape === 'rectangle'){
            createRectangle();
        } else if(canvasSettings.currentSelectedShape === 'circle'){
            createCircle();
        } else if(canvasSettings.currentSelectedShape === 'triangle'){
            createTriangle();
        }
    })

    //create the circle shape and call the createDiv function to create a new html element on the page.
    function createCircle(){
        let color = randomColor();
        canvasSettings.ctx.beginPath();
        canvasSettings.ctx.arc(event.clientX, event.clientY, shapeSettings[canvasSettings.currentSelectedShape].radius, 0, 2 * Math.PI);
        canvasSettings.ctx.fillStyle = color;
        canvasSettings.ctx.fill();
        drawnShapes.push({shape: 'circle', x: event.clientX, y: event.clientY, w: shapeSettings[canvasSettings.currentSelectedShape].radius, c: color});
        createDiv(color);
    }

    //create the rectangle shape and call the createDiv function to create a new html element on the page.
    function createRectangle(){
        let color = randomColor();
        canvasSettings.ctx.fillStyle = color;
        canvasSettings.ctx.fillRect(event.clientX - shapeSettings[canvasSettings.currentSelectedShape].width / 2, event.clientY - shapeSettings[canvasSettings.currentSelectedShape].height / 2, shapeSettings[canvasSettings.currentSelectedShape].width, shapeSettings[canvasSettings.currentSelectedShape].height);
        drawnShapes.push({shape: 'rectangle', x: event.clientX, y: event.clientY, w: shapeSettings[canvasSettings.currentSelectedShape].width, h: shapeSettings[canvasSettings.currentSelectedShape].height, c: color});
        createDiv(color);
    }

    //create a triangle shape and call the createDiv function to create a new html element on the page.
    function createTriangle(){
        let color = randomColor();
        canvasSettings.ctx.beginPath();
        canvasSettings.ctx.moveTo(event.clientX, event.clientY);
        canvasSettings.ctx.lineTo(Number(event.clientX) - Number(shapeSettings[canvasSettings.currentSelectedShape].width), Number(event.clientY) + Number(shapeSettings[canvasSettings.currentSelectedShape].height));
        canvasSettings.ctx.lineTo(Number(event.clientX) + Number(shapeSettings[canvasSettings.currentSelectedShape].width), Number(event.clientY) + Number(shapeSettings[canvasSettings.currentSelectedShape].height));
        canvasSettings.ctx.fillStyle = color;
        canvasSettings.ctx.fill();
        drawnShapes.push({shape: 'triangle', x: event.clientX, y: event.clientY, w: shapeSettings[canvasSettings.currentSelectedShape].width, h: shapeSettings[canvasSettings.currentSelectedShape].height, c: color});
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
        if(canvasSettings.currentSelectedShape === 'rectangle'){
            div.textContent = 'R';
        } else if(canvasSettings.currentSelectedShape === 'circle'){
            div.textContent = 'C';
        } else if(canvasSettings.currentSelectedShape === 'triangle'){
            div.textContent = 'T';
        }
        div.addEventListener('click', function(){
            clearShape(this);
            reDraw();
        });
    }

    //remove the Div from the html as well as the shape. Remove the shape information from the drawnShapes array.
    function clearShape(div){
        for(let i = 0; i < canvasSettings.shapeDivs.length; i++){
            if(canvasSettings.shapeDivs[i] === div){
                if(drawnShapes[i].shape === 'rectangle'){
                    document.getElementById('shapeContainer').removeChild(canvasSettings.shapeDivs[i]);
                    canvasSettings.ctx.clearRect(drawnShapes[i].x, drawnShapes[i].y, drawnShapes[i].w, drawnShapes[i].h);               
                } else if(drawnShapes[i].shape === 'circle'){
                    document.getElementById('shapeContainer').removeChild(canvasSettings.shapeDivs[i]);
                    canvasSettings.ctx.clearRect(drawnShapes[i].x - drawnShapes[i].w - 1, drawnShapes[i].y - drawnShapes[i].w - 1, drawnShapes[i].w * 2 + 2, drawnShapes[i].w * 2 + 2);
                } else if(drawnShapes[i].shape === 'triangle'){
                    document.getElementById('shapeContainer').removeChild(canvasSettings.shapeDivs[i]);
                    canvasSettings.ctx.clearRect(drawnShapes[i].x - drawnShapes[i].w, drawnShapes[i].y + drawnShapes[i].h, drawnShapes[i].w, drawnShapes[i].h);  
                }
                drawnShapes.splice(i, 1);
            }
        }
    }

    //Clears the canvas, loops through the existing shapeDivs and redraws the shape.
    function reDraw(){
        canvasSettings.ctx.clearRect(0, 0, canvasSettings.canvas.width, canvasSettings.canvas.height);
        for(let i = 0; i< canvasSettings.shapeDivs.length; i++){
            if(drawnShapes[i].shape === 'rectangle'){
                canvasSettings.ctx.fillStyle = drawnShapes[i].c;
                canvasSettings.ctx.fillRect(drawnShapes[i].x - drawnShapes[i].w / 2, drawnShapes[i].y - drawnShapes[i].h / 2, drawnShapes[i].w, drawnShapes[i].h);
            } else if(drawnShapes[i].shape === 'circle'){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.arc(drawnShapes[i].x, drawnShapes[i].y, drawnShapes[i].w, 0, 2 * Math.PI);
                canvasSettings.ctx.fillStyle = drawnShapes[i].c;
                canvasSettings.ctx.fill();
            } else if(drawnShapes[i].shape === 'triangle'){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.fillStyle = drawnShapes[i].c;
                canvasSettings.ctx.moveTo(drawnShapes[i].x, drawnShapes[i].y);
                canvasSettings.ctx.lineTo(Number(drawnShapes[i].x) - Number(drawnShapes[i].w), Number(drawnShapes[i].y) + Number(drawnShapes[i].h));
                canvasSettings.ctx.lineTo(Number(drawnShapes[i].x) + Number(drawnShapes[i].w), Number(drawnShapes[i].y) + Number(drawnShapes[i].h));
                canvasSettings.ctx.fill();
            }
        }
    }

    //remove all shape divs and remove all shape information from the drawnShapes array.
    function reset(){
        canvasSettings.ctx.clearRect(0, 0, canvasSettings.canvas.width, canvasSettings.canvas.height);
        for(let i = 0; i < canvasSettings.shapeDivs.length; i++){
            document.getElementById('shapeContainer').removeChild(canvasSettings.shapeDivs[i]);
            drawnShapes.splice(i, 1);
        }
    }

    //generate a random rgb color for the shapes.
    let randomColor = () => {
        return 'rgb(' + randomColNum() + ', ' + randomColNum() + ', ' + randomColNum() + ')';
    }

    //generate a random rgb color for the randomColor function.
    let randomColNum = () => {
        return Math.floor(Math.random() * 256);
    }

    //create a transparent shape to show user where the placed shape will land.
    function setOutline(e) {
        reDraw();
        canvasSettings.ctx.fillStyle = 'rgba(255,255,51,0.6)';
        if(canvasSettings.currentSelectedShape === 'rectangle'){
            canvasSettings.ctx.beginPath();
            canvasSettings.ctx.fillRect(event.clientX - shapeSettings[canvasSettings.currentSelectedShape].width / 2, event.clientY - shapeSettings[canvasSettings.currentSelectedShape].height / 2, shapeSettings[canvasSettings.currentSelectedShape].width, shapeSettings[canvasSettings.currentSelectedShape].height);
            canvasSettings.ctx.fill();
        } else if(canvasSettings.currentSelectedShape === 'circle'){
            canvasSettings.ctx.beginPath();
            canvasSettings.ctx.arc(event.clientX, event.clientY, shapeSettings[canvasSettings.currentSelectedShape].radius, 0, 2 * Math.PI);
            canvasSettings.ctx.fill();
        } else if(canvasSettings.currentSelectedShape === 'triangle'){
            canvasSettings.ctx.beginPath();
            canvasSettings.ctx.moveTo(event.clientX, event.clientY);
            canvasSettings.ctx.lineTo(Number(event.clientX) - Number(shapeSettings[canvasSettings.currentSelectedShape].width), Number(event.clientY) + Number(shapeSettings[canvasSettings.currentSelectedShape].height));
            canvasSettings.ctx.lineTo(Number(event.clientX) + Number(shapeSettings[canvasSettings.currentSelectedShape].width), Number(event.clientY) + Number(shapeSettings[canvasSettings.currentSelectedShape].height));
            canvasSettings.ctx.fill();
        }
    }

})();