video="";
status="";
objects=[];
function preload()
{
    video=createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status : Detecting Objects";
}
function modelloaded()
{
    console.log("model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}
function gotresults (error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results)
        objects=results;
    }
}
function draw()
{
    image(video,0,0,480,380);
    if(status!="")
    {
        objectDetector.detect(video,gotresults);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="status : Object Detected ";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+objects.length;

            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}