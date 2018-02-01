var x1=450;
var y1=200;

var fC=0;

var xPos=[];
var yPos=[];

var d=30;

function preload(){
    img=loadImage("assets/greece.jpg");
}

function setup(){
    //create canvas
    //img.resize(width,0);
    createCanvas(900, 400);
    img.resize(width,0);   
    img.filter(POSTERIZE,6);
    //img.filter(INVERT);
    image(img,0,0);
    
    // change the frame rate to make slower
    frameRate(60);
    initNew();



}

function draw(){ 
    fC+=1;


    // if (fC>100){
    //     fC=0;
    //     initNew();
    // }

    // else if (fC<5){
    //     //background(0);
    //     noFill();
    //     stroke(255, 102, 0);
    //     curveTightness(.1);
    //     bezier(xPos[0],yPos[0],xPos[1],yPos[1],xPos[2],yPos[2],xPos[3],yPos[3]);
    //     var newP=getNearFirst(xPos[3], yPos[3]);
    //     xPos.push(newP[0]);
    //     yPos.push(newP[1]);
    //     xPos.splice(0,1);
    //     yPos.splice(0,1);
    //     //print(xPos);
    // }
    var l=xPos.length;
    
    
    // if (c[0]==0){
    //     d=1;
    // }
    // else{
    //     d=20;
    // }
    //background(0);
    noFill();
    stroke(255, 102, 0);
    curveTightness(.01);
    curve(xPos[l-4],yPos[l-4],xPos[l-3],yPos[l-3],xPos[l-2],yPos[l-2],xPos[l-1],yPos[l-1]);
    var c=1;
    var newP=getNear(xPos[l-1], yPos[l-1]);
    //print(newP)
    while (c!=0){
        var newP=getNear(xPos[l-1], yPos[l-1]);
        c=img.get(newP[0], newP[1])[0];
        print(c);
    }
    xPos.push(newP[0]);
    yPos.push(newP[1]);
    //xPos.splice(0,1);
    //yPos.splice(0,1);
    //print(xPos);
}

function initNew(){
        
        //initialize the position 
        xPos=[];
        yPos=[];
        print(xPos);
        xPos.push(x1);
        yPos.push(y1);
    
        np=getNear(xPos[0],yPos[0]);
        xPos.push(np[0]);
        yPos.push(np[1]);
        
        np=getNear(xPos[1],yPos[1]);
        xPos.push(np[0]);
        yPos.push(np[1]);
    
        np=getNear(xPos[2],yPos[2]);
        xPos.push(np[0]);
        yPos.push(np[1]);
    
        np=getNear(xPos[3],yPos[3]);
        xPos.push(np[0]);
        yPos.push(np[1]);
}

function bezierC(xPos, yPos){}

function getNear(x, y){
    var angle=random(2*PI);
    var xx=floor(d*sin(angle))+x;
    if (xx<0){
        xx=0;
    }
    else if (xx>width){
        xx=width-1;
    }
    var yy=floor(d*cos(angle))+y;
    if (yy<0){
        yy=0;
    }
    else if (yy>height){
        xx=height-1;
    }
    return [xx,yy];
}

// function getNearFirst(x, y){
//     var angle=random(2*PI);
//     return [floor(d*sin(angle))+x,floor(d*cos(angle))+y];
// }

function randomPosition(){
    return [floor(random(width)),floor(random(height))];
}