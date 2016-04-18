#pragma strict
var hideGUI:GUISkin;
var realoadLevelTex:Texture2D;
var tex_back:Texture2D;
var tex_SingleRun:Texture2D;
var finished:boolean=false;
function OnGUI()
	{
	GUI.skin=hideGUI;
	if(finished==true)
	{
	GUI.BeginGroup(Rect(Screen.width/2-35,Screen.height/2-33,1000,1000));
	GUI.DrawTexture(Rect(1,1,64,32),tex_SingleRun);
	GUI.DrawTexture(Rect(17,35,32,32),tex_back);
	
	if(GUI.Button(Rect(1,1,64,32),""))
		{
		Application.LoadLevel(""+Application.loadedLevelName);
		}
		
	if(GUI.Button(Rect(17,35,32,32),""))
		{
		Application.LoadLevel(0);
		}
	
	GUI.EndGroup();
	}
	GUI.DrawTexture(Rect(1,1,32,32),realoadLevelTex);
	if(GUI.Button(Rect(1,1,48,48),""))
		{
		Application.LoadLevel(""+Application.loadedLevelName);
		}
	}