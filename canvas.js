(function(){

    const DOM = {
        heightSlider: document.getElementById('heightSlider'),
        heightNum: document.getElementById('heightNum'),
        widthSlider: document.getElementById('widthSlider'),
        widthNum: document.getElementById('widthNum'),
        navButton: document.getElementById('navButton'),
        navOptions: document.getElementById('navItems'),
        shapeButtons: document.getElementsByTagName('button'),
        shapeDivs: document.getElementsByClassName('shapeDiv'),
        shapeContainer: document.getElementById('shapeContainer'),
        resetButton: document.getElementById('reset'),
    }
    const canvasSettings = {
        canvas: document.querySelector('canvas'),
        ctx: document.querySelector('canvas').getContext('2d'),
        currentSelectedShape: 'rectangle',
        originalHeight: window.innerHeight,
        originalWidth: window.innerWidth,
    }
    const shapeSettings = {
        rectangle: {
            width: 25,
            height: 25,
            drawShape: function(e){
                let color = randomColor();
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.fillStyle = color;
                canvasSettings.ctx.fillRect(getMousePosition(e).x - this.width / 2, getMousePosition(e).y - this.height / 2, this.width, this.height);
                drawnShapes.push({shape: 'rectangle', x: getMousePosition(e).x, y: getMousePosition(e).y, w: this.width, h: this.height, c: color});
                divSetup(color);
            },
            reDrawShape: function(i){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.fillStyle = drawnShapes[i].c;
                canvasSettings.ctx.fillRect(drawnShapes[i].x - drawnShapes[i].w / 2, drawnShapes[i].y - drawnShapes[i].h / 2, drawnShapes[i].w, drawnShapes[i].h);
            },
            highlightGuide: function(e){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.fillRect(getMousePosition(e).x - this.width / 2, getMousePosition(e).y - this.height / 2, this.width, this.height);
                canvasSettings.ctx.fill();
            },
        },
        circle: {
            radius: 25,
            drawShape: function(e){
                let color = randomColor();
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.arc(getMousePosition(e).x, getMousePosition(e).y, this.radius, 0, 2 * Math.PI);
                canvasSettings.ctx.fillStyle = color;
                canvasSettings.ctx.fill();
                drawnShapes.push({shape: 'circle', x: getMousePosition(e).x, y: getMousePosition(e).y, w: this.radius, c: color});
                divSetup(color);
            },
            reDrawShape: function(i){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.fillStyle = drawnShapes[i].c;
                canvasSettings.ctx.arc(drawnShapes[i].x, drawnShapes[i].y, drawnShapes[i].w, 0, 2 * Math.PI);
                canvasSettings.ctx.fill();
            },
            highlightGuide: function(e){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.arc(getMousePosition(e).x, getMousePosition(e).y, this.radius, 0, 2 * Math.PI);
                canvasSettings.ctx.fill();
            },
        },
        triangle: {
            width: 25,
            height: 25,
            drawShape: function(e){
                let color = randomColor();
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.moveTo(getMousePosition(e).x, getMousePosition(e).y);
                canvasSettings.ctx.lineTo(getMousePosition(e).x - this.width, getMousePosition(e).y + this.height);
                canvasSettings.ctx.lineTo(getMousePosition(e).x + this.width, getMousePosition(e).y + this.height);
                canvasSettings.ctx.fillStyle = color;
                canvasSettings.ctx.fill();
                drawnShapes.push({shape: 'triangle', x: getMousePosition(e).x, y: getMousePosition(e).y, w: this.width, h: this.height, c: color});
                divSetup(color);
            },
            reDrawShape: function(i){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.fillStyle = drawnShapes[i].c;
                canvasSettings.ctx.moveTo(drawnShapes[i].x, drawnShapes[i].y);
                canvasSettings.ctx.lineTo(drawnShapes[i].x - drawnShapes[i].w, drawnShapes[i].y + drawnShapes[i].h);
                canvasSettings.ctx.lineTo(drawnShapes[i].x + drawnShapes[i].w, drawnShapes[i].y + drawnShapes[i].h);
                canvasSettings.ctx.fill();
            },
            highlightGuide: function(e){
                canvasSettings.ctx.beginPath();
                canvasSettings.ctx.moveTo(getMousePosition(e).x, getMousePosition(e).y);
                canvasSettings.ctx.lineTo(getMousePosition(e).x - this.width, getMousePosition(e).y + this.height);
                canvasSettings.ctx.lineTo(getMousePosition(e).x + this.width, getMousePosition(e).y + this.height);
                canvasSettings.ctx.fill();
            },
        }
    }
    const drawnShapes = [];
    //translate positions used for canvas scaling
    const translateX = Math.floor((window.innerWidth - (canvasSettings.originalWidth * (window.innerWidth / canvasSettings.originalWidth))) / 2);
    const translateY = Math.floor((window.innerHeight - (canvasSettings.originalHeight * (window.innerWidth / canvasSettings.originalWidth))) / 2);

    canvasSettings.canvas.width = window.innerWidth;
    canvasSettings.canvas.height = window.innerHeight;


    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas(){
        const scale = window.innerWidth / canvasSettings.originalWidth;
        canvasSettings.canvas.width = window.innerWidth;
        canvasSettings.canvas.height = window.innerHeight;
        canvasSettings.ctx.scale(scale, scale);
        reDraw();
    }
    function getMousePosition(e) {
        const rect = canvasSettings.canvas.getBoundingClientRect();
        return {
        x: (e.clientX - rect.left - translateX) / (window.innerWidth / canvasSettings.originalWidth),
        y: (e.clientY - rect.top - translateY) / (window.innerWidth / canvasSettings.originalWidth)
        };
    }

    //Responsive Nav.
    DOM.navButton.addEventListener('click', function(){
        if(DOM.navOptions.style.display === 'block'){
            DOM.navOptions.style.display = 'none';
        } else {
            DOM.navOptions.style.display = 'block'
        }
    })

  
    canvasSettings.canvas.addEventListener('mousemove', setOutline);

    canvasSettings.canvas.addEventListener('mouseout', reDraw);

    //Changes value of shape variable depending on what button is clicked. Default is rectangle per canvasSettings.currentSelectedShape.
    for(let i = 0; i < DOM.shapeButtons.length; i++){
        if(DOM.shapeButtons[i] !== DOM.resetButton){
            DOM.shapeButtons[i].addEventListener('click', function(){
                canvasSettings.currentSelectedShape = this.textContent.toLowerCase();
                this.classList.add('active');
                if(shapeSettings[canvasSettings.currentSelectedShape].radius){
                    DOM.widthSlider.value = shapeSettings[canvasSettings.currentSelectedShape].radius;
                    DOM.heightSlider.value = '25';
                    DOM.heightNum.textContent = 'N/A';
                    DOM.widthNum.textContent = ' ' + shapeSettings[canvasSettings.currentSelectedShape].radius;
                } else {
                    DOM.heightSlider.value = shapeSettings[canvasSettings.currentSelectedShape].height;
                    DOM.widthSlider.value = shapeSettings[canvasSettings.currentSelectedShape].width;
                    DOM.heightNum.textContent = ' ' + shapeSettings[canvasSettings.currentSelectedShape].height;
                    DOM.widthNum.textContent = ' ' + shapeSettings[canvasSettings.currentSelectedShape].width;
                }
                for(let j = 0; j < DOM.shapeButtons.length; j++){
                    if(DOM.shapeButtons[i] !== DOM.shapeButtons[j]){
                        DOM.shapeButtons[j].classList.remove('active');
                    }
                }
            })
        }
    }

    DOM.heightSlider.addEventListener('input', function(){
        if(shapeSettings[canvasSettings.currentSelectedShape].height){
            shapeSettings[canvasSettings.currentSelectedShape].height = Number(this.value);
            DOM.heightNum.textContent = ' ' + this.value;
        } else{
            DOM.heightNum.textContent = 'N/A';
            this.value = 25;
        }
    })

    DOM.widthSlider.addEventListener('input', function(){
        if(shapeSettings[canvasSettings.currentSelectedShape].radius){
            shapeSettings[canvasSettings.currentSelectedShape].radius = Number(this.value);
        } else {
            shapeSettings[canvasSettings.currentSelectedShape].width = Number(this.value);
        }
        DOM.widthNum.textContent = ' ' + this.value;
    })

    canvasSettings.canvas.addEventListener('click', function(e){
        shapeSettings[canvasSettings.currentSelectedShape].drawShape(e);
    })

    DOM.resetButton.addEventListener('click', reset);

    //create a div and add a click listener to that div for the newly created shape. Add a CSS transition to the
    //dynamically created div.
    function divSetup(color){
        let div = document.createElement('div');
        div.className = 'shapeDiv';
        div.style.background = color;
        DOM.shapeContainer.appendChild(div);
        window.getComputedStyle(div).opacity;
        div.className += ' shapeDivTrans';
        div.textContent = canvasSettings.currentSelectedShape.charAt(0).toUpperCase();
        div.addEventListener('click', function(){
            deleteShape(this);
            reDraw();
        });
    }

    function deleteShape(div){
        for(let i = 0; i < DOM.shapeDivs.length; i++){
            if(DOM.shapeDivs[i] === div){
                drawnShapes.splice(i, 1);
                DOM.shapeContainer.removeChild(DOM.shapeDivs[i]);
                reDraw();
            }
        }
    }

    //Clears the canvas, X and Y values were modified here to correct reDraw after scaling***
    function reDraw(){
        canvasSettings.ctx.clearRect(0, 0, (window.innerWidth * canvasSettings.originalWidth), (window.innerWidth * canvasSettings.originalWidth));
        for(let i = 0; i< DOM.shapeDivs.length; i++){
            if(shapeSettings.hasOwnProperty(drawnShapes[i].shape)){
                shapeSettings[drawnShapes[i].shape].reDrawShape(i);
            }
        }
    }

    //remove all shape divs in reverse order to avoid missing elements in loop
    function reset(){
        for(let i = DOM.shapeDivs.length - 1; i >= 0; i--){
            DOM.shapeContainer.removeChild(DOM.shapeDivs[i]);
        }
        drawnShapes.splice(0, drawnShapes.length);
        canvasSettings.ctx.clearRect(0, 0, canvasSettings.canvas.width, canvasSettings.canvas.height);
    }

    const randomColor = function() {
        const randomColNum = function() {
            return Math.floor(Math.random() * 256);
        }
        return 'rgb(' + randomColNum() + ', ' + randomColNum() + ', ' + randomColNum() + ')';
    }

    //create a transparent shape to show user where the placed shape will land.
    function setOutline(e) {
        reDraw();
        canvasSettings.ctx.fillStyle = 'rgba(255,255,51,0.6)';
        shapeSettings[canvasSettings.currentSelectedShape].highlightGuide(e);
    }
})();
