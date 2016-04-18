#pragma strict

var mainGUI:GUITexture;
var back:Texture2D;
var testStyle : GUIStyle;

 
function Start ()
	{
	//highscoreAndroid.enabled=false;
	mainGUI.pixelInset = Rect(-Screen.width/2,-Screen.height/2,Screen.width,Screen.height);
	
	}
	
function OnGUI () {

	if (GUI.Button (Rect (20,Screen.height-100, 200, 100), back, testStyle)) {
		Application.LoadLevel ("mainMenu");
	}	
}