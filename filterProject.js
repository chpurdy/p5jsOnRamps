/**   DM Filter Project Starter Code
/*    v3.5
/*    Original code by: Bradley Beth
/*    Update by: Erik Dillaman, January 2016
**/

// changelog:
// 3.1  added e*Pressed switches and noLoop(); 
// 3.2  added img.resize() to line 132, for students with more advanced filters
// 3.25  possible fix for the double-click bug
// 3.5  double-click bug squashed  [Shout out to Mr. Purdy for the squashing!]

let picLoaded = false;
let Grayscale = false;
let Effect1 = false;
let Effect2 = false;
let Effect3 = false;
let gPressed = false;
let e1Pressed = false;
let e2Pressed = false;
let e3Pressed = false;
let picWidth = 0;
let picHeight = 0;
let img, resetImg;
let canvas;
let loadPicButton, savePicButton, grayscaleButton, filter1Button, filter2Button, filter3Button;

/***********************************/

function setup() {
    //size(800, 480);
    canvas = createCanvas(850, 480);
    background(185);
    textAlign(LEFT);
    textSize(16);

    /* create buttons */
    loadPicButton = createFileInput(infileSelected);//createButton("Load Picture");
    loadPicButton.position(660, 50);
    loadPicButton.size(130, 40);
    //loadPicButton.mousePressed();

    savePicButton = createButton("Save Picture");
    savePicButton.position(660, 100);
    savePicButton.size(130, 40);
    savePicButton.mouseClicked(function () {
        if (picLoaded) {
            save(img, "filterimage.jpg");
        }
    });

    noLoop();

}


function draw() {



    background(185);
    fill(0);
    rect(0, 0, 649, 480);
    //noStroke();
    fill(255);

    let picStart = 0;
    let picEnd = 0;


    /* draw buttons */

    stroke(0);
    fill(0);
    textSize(16);
    text("File Operations", 665, 30);
    line(650, 0, 650, 480);
    noStroke();

    stroke(0);
    line(650, 150, 800, 150);
    noStroke();

    stroke(0);
    fill(0);
    textSize(16);
    text("Filter Effects", 675, 180);
    line(650, 0, 650, 480);
    noStroke();

    if (Grayscale)
        fill('#FFFF7D');    //Effect on means a yellow lighted button
    else
        fill(255);
    rect(660, 200, 130, 40, 10);
    fill(55);
    text("Grayscale", 680, 225);

    if (Effect1)
        fill('#FFFF7D');    //Effect on means a yellow lighted button
    else
        fill(255);
    rect(660, 250, 130, 40, 10);
    fill(55);
    text("Effect One", 680, 275);

    if (Effect2)
        fill('#FFFF7D');     //Effect on means a yellow lighted button 
    else
        fill(255);
    rect(660, 300, 130, 40, 10);
    fill(55);
    text("Effect Two", 680, 325);

    if (Effect3)
        fill('#FFFF7D');    //Effect on means a yellow lighted button
    else
        fill(255);
    rect(660, 350, 130, 40, 10);
    fill(55);
    text("Effect Three", 680, 375);

    fill(185, 0, 203);
    rect(693, 400, 65, 40, 10);
    fill(255);
    text("Reset", 703, 425);

    noStroke();
    textSize(16);

    //The following loads and displays an image file.
    //The image is resized to best fit in a 640x480 frame.
    if (picLoaded) {
        img.loadPixels();
               

        /***** Effects Code *****/
        /* This sample grayscale code may serve as an example */
        if (Grayscale && !gPressed) {
            for(let i = 0; i<img.pixels.length;i+=4) {
                // get RGB values
                let r = img.pixels[i];
                let g = img.pixels[i+1];
                let b = img.pixels[i+2];
                let gray = (r + g + b)/3.0;

                // put RGB values back into picture
                img.pixels[i] = gray;
                img.pixels[i+1] = gray;
                img.pixels[i+2] = gray;
            }
            gPressed = true;
        }

        if (Effect1 && !e1Pressed) {
            //**  Your first filter effect code goes here  **//

            e1Pressed = true;
        }

        if (Effect2 && !e2Pressed) {
            //**  Your second filter effect code goes here  **//

            e2Pressed = true;
        }

        if (Effect3 && !e3Pressed) {
            //**  Your third filter effect code goes here  **//

            e3Pressed = true;
        }

        img.updatePixels();
        image(img, 0, 0, 649, 480);

    }

    //if (picLoaded) 
    fill(255);
    noStroke();



}

function mouseClicked() {
    redraw();
}

function mousePressed() {
    //The following define the clickable bounding boxes for any buttons used.
    //Note that these boundaries should match those drawn in the draw() function.

    if (mouseX > 660 && mouseX < 790 && mouseY > 200 && mouseY < 240 && picLoaded) {
        Grayscale = true;
        redraw();
    }

    if (mouseX > 660 && mouseX < 790 && mouseY > 250 && mouseY < 290 && picLoaded) {
        Effect1 = true;
        redraw();
    }

    if (mouseX > 660 && mouseX < 790 && mouseY > 300 && mouseY < 340 && picLoaded) {
        Effect2 = true;
        redraw();
    }

    if (mouseX > 660 && mouseX < 790 && mouseY > 350 && mouseY < 390 && picLoaded) {
        Effect3 = true;
        redraw();
    }

    if (mouseX > 693 && mouseX < 758 && mouseY > 400 && mouseY < 440 && picLoaded) {
        resetTheImage();
        redraw();
    }


}

function resetTheImage() {
    Grayscale = false;
    Effect1 = false;
    Effect2 = false;
    Effect3 = false;
    gPressed = false;
    e1Pressed = false;
    e2Pressed = false;
    e3Pressed = false;
    if (picLoaded) img = resetImg.get();
}

function infileSelected(file) {
    // If it's an image file
    if (file.type === 'image') {
        resetTheImage();
        resetImg = loadImage(file.data);
        img = loadImage(file.data);
        picLoaded = true;
        redraw();
    } else {
        console.log('Not an image file!');
    }
}

