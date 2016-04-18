var time : float;
var finished : boolean = false;

function Update(){
  //Add the time every Frame if race isnt finished
  if(finished == false){
    time += Time.deltaTime;
  }
}

function OnTriggerEnter(hit : Collider){
  //if hit Collider is the Finish Cube
  if(hit.tag == "FinishLine"){
    //Race is finished
    finished = true;
  }
}

function OnGUI(){
  if(finished){
    //if Race finished
    GUI.Label(Rect(Screen.width / 2 - 100, 20, 200, 25), "Your Time: " + time);
  }
  else{
    //if race isnt finished (only draw time)
    GUI.Label(Rect(Screen.width / 2 - 100, 20, 200, 25), "" + time);
  }
}