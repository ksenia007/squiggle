var fC=0;
var xPos=[];
var yPos=[];


//////////////////////////////CUSTOM CHANGES
var d=20; //distance we can jump
var durationOneSquiggle=2000; //how many steps we take in one squiggle
var controlDensity=0; //this is a control of density, from 0 to durationOneSquiggle
// if we are in the very red region, we add this value to the duration of the squiggle, 
// thus terminating it early
// setting to 0 means we do not care about the density and only control is duration
// setting to durationOneSquiggle means that is we randomly hit red near our last location
// we terminate immediately
var strokeW=1;//weight of the line
var showImage=false;
var imageAddress="assets/bottle.jpg";
////////////////////////////////////////////////////////////////

function preload(){
    //preload bw image with threshold already applied (see examples)
    img=loadImage(imageAddress);
}

function setup(){
    //create canvas
    createCanvas(600, 800);
    background(255);
    //resize the image to fit if not done already
    img.resize(width,0); 
 
    //un-comment below to check that it is ok (then image shows up)
    if (showImage){
        image(img,0,0);
    }
    // set the frame rate 
    frameRate(60);
    //initialize the start
    initNew();

}

function draw(){ 
    fC+=1; //iterate the counter
    print(fC);

    if (fC>durationOneSquiggle){ //spent too much time in this area, maybe there is some other disconneted region
        fC=0;
        initNew();
    }
    //get the number of elements in the curve position
    var l=xPos.length;

    noFill();
    stroke(255, 102, 0);
    curveTightness(.01);

    //draw the curve
    strokeWeight(strokeW);
    curve(xPos[l-4],yPos[l-4],xPos[l-3],yPos[l-3],xPos[l-2],yPos[l-2],xPos[l-1],yPos[l-1]);
    
    var newP=getNear(xPos[l-1], yPos[l-1]);
    if (!newP[2]){initNew();} //counld not find any black around for many iters
    else{
        xPos.push(newP[0]);
        yPos.push(newP[1]);
    }
    print(get(newP[0],newP[1]));
}

function initNew(){
        fC=0;
        //initialize the position 
        xPos=[];
        yPos=[];
        //initialize the color
        var c=(255,0,0);
        //while we did not find black
        while (c[0]!=0){
            var x1=randomPosition()[0];
            var y1=randomPosition()[1];
            c=img.get(x1,y1); //get the color
        }
        //push it into the array
        xPos.push(x1);
        yPos.push(y1);
        //initialize other 4 elements (start)
        np=getNear(xPos[0],yPos[0]);
        if (!np[2]){initNew();} //if we could not find black around
        xPos.push(np[0]);
        yPos.push(np[1]);
        
        np=getNear(xPos[1],yPos[1]);
        if (!np[2]){initNew();}
        xPos.push(np[0]);
        yPos.push(np[1]);
    
        np=getNear(xPos[2],yPos[2]);
        if (!np[2]){initNew();}
        xPos.push(np[0]);
        yPos.push(np[1]);
    
        np=getNear(xPos[3],yPos[3]);
        if (!np[2]){initNew();}
        xPos.push(np[0]);
        yPos.push(np[1]);

}


function getNear(x, y){
    //counter for number of attempts
    var count =0;
    // init color
    var c=(200,0,0);
    while (c[0]!=0 && count<70){
        var angle=random(2*PI); //random angle
        var xx=floor(d*sin(angle))+x; //get random x
        if (xx<0){ //out of canvas
            xx=0;
        }
        else if (xx>width){ //out of canvas
            xx=width-1;
        }
        var yy=floor(d*cos(angle))+y; //get y
        if (yy<0){ //out of canvas
            yy=0;
        }
        else if (yy>height){
            xx=height-1;
        }
        c=img.get(xx,yy); //get the color of the background image
        c2=get(xx,yy);  //get the color on the canvas
        if (c2[0]==255){ //if we hit the color - this is way too dense
            fC+=controlDensity; //might be bad luck hitting red so do not want to completely terminate yet
        }
        count+=1; //update counter
    }
    if (c[0]==0){ //if we are out of while loop and had success
        var success=true;
    }
    else{
        var success=false;
    }
    return [xx,yy,success];
}

function randomPosition(){ //random start
    //we do not want to start at the very edges
    return [floor(random(20,width-20)),floor(random(20, height-20))];
}