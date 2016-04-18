#pragma strict

var mainGUI:GUITexture;
var back:Texture2D;
var testStyle : GUIStyle;
 

function OnGUI () {

	if (GUI.Button (Rect (10,Screen.height-100, 150, 70), back, testStyle)) {
		Application.LoadLevel ("mainMenu");
	}	
}