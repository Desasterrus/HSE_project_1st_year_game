#pragma strict
var shownewScore: float;
var showbestScore: float;
var shownewTime: float;
var showbestTime: float;
var scorestyle : GUIStyle;
var bonusstyle : GUIStyle;
            
function Start(){
showbestScore = PlayerPrefs.GetFloat("bestScore");	
shownewScore = PlayerPrefs.GetFloat("newScore");
showbestScore=Mathf.RoundToInt(showbestScore); 	
shownewScore=Mathf.RoundToInt(shownewScore); 	

showbestTime = PlayerPrefs.GetFloat("bestTime");	
shownewTime = PlayerPrefs.GetFloat("newTime");	
PlayerPrefs.Save();
}

function OnGUI()
{

GUI.Label(Rect(Screen.width / 2 - 150, 200, 400, 50), "Single Run",bonusstyle);
if (showbestTime==0){
GUI.Label(Rect(Screen.width / 2 - 150, 280, 400, 35), "Best Time: DNF",scorestyle);
}
else {
GUI.Label(Rect(Screen.width / 2 - 150, 280, 400, 35), "Best Time: " + showbestTime,scorestyle);
}
GUI.Label(Rect(Screen.width / 2 - 150, 350, 400, 35), "Latest Time: " + shownewTime,scorestyle);




}