var iniRect:Rect;
var texPlay:Texture2D;
var texPause:Texture2D;
var texBack:Texture2D;
var texReload:Texture2D;
var texBeintoo:Texture2D;
var texBox:Texture2D;
var invGUI:GUISkin;
var skierAudio:AudioSource;
var finishedText:GameObject;
var testStyle : GUIStyle;

private var glevel:int=0;
var finished:boolean=false;
var xRect:Rect;
var xRectPlay:Rect;
var xRectBack:Rect;
var xRectBeintoo:Rect;
var posFactor:float;

function Start()
	{
	Time.timeScale=1;
	iniRect=new Rect(1,1,Screen.width/3,Screen.height-2);
	xRect=new Rect(10,5,(Screen.height-20)/4,(Screen.height-20)/4);
	xRectPlay=xRect;
	xRectBack=xRect;
	xRectPlay.y=xRect.y+(Screen.height-20)/4+5;
	xRectPlay.x=Screen.width/6-55;
	xRectBeintoo.y=xRectPlay.y+(Screen.height-20)/4+5;
	xRectBeintoo.x=Screen.width/6-55;
	xRectBeintoo.width=xRectPlay.width;
	xRectBeintoo.height=xRectBeintoo.width;
	xRectBack.y=xRectBeintoo.y+(Screen.height-20)/4+5;
	xRectBack.height-=20;
	xRectBack.width-=20;
	xRectBack.x+=15;
	
	}

function OnGUI()
	{
	GUI.depth=0;
	GUI.skin=invGUI;
	if(glevel==0)
	{
	GUI.DrawTexture(Rect(1,1,54,54),texPause);
	if(GUI.Button(Rect(1,1,54,54)," ",testStyle))
		{
		iniRect.x=-iniRect.width;
		switch0to1();
		
		glevel=1;
		}
	}
	else
	{
	GUI.BeginGroup(iniRect);
	GUI.DrawTexture(Rect(1,1,Screen.width/3-3,Screen.height-3),texBox);
	GUI.DrawTexture(xRect,texReload,ScaleMode.ScaleToFit);
	if(GUI.Button(xRect," ",testStyle))
		{
		Application.LoadLevel(""+Application.loadedLevelName );
		}
		
	GUI.DrawTexture(xRectPlay,texPlay,ScaleMode.ScaleToFit);
	if(GUI.Button(xRectPlay," ",testStyle))
		{
		switch1to0();
		}
	
	GUI.DrawTexture(xRectBeintoo,texBeintoo,ScaleMode.ScaleToFit);
	if(GUI.Button(xRectBeintoo," ",testStyle))
		{
		//Show Leaderboard;
		Application.LoadLevel("localscore");
		}
	
	GUI.DrawTexture(xRectBack,texBack,ScaleMode.ScaleToFit);
	if(GUI.Button(xRectBack," ",testStyle))
		{
		Application.LoadLevel(0);
		}				
	GUI.EndGroup();
	}
	}
	
function switch0to1()
	{
	glevel=1;
	skierAudio.mute=true;
	disableTex();
	iTween.ValueTo(gameObject,{"onUpdate":"updatePos","from":-iniRect.width,"to":0,"time":0.5});
	
	}

function switch1to0()
	{
	if(finished==false)
	{
	Time.timeScale=1;
	}
	iTween.ValueTo(gameObject,{"onUpdate":"updatePos","from":0,"to":-iniRect.width,"time":0.5});
	acc();
	}

function updatePos(newPos:float)
	{
	
	iniRect.x=newPos;
	}
	

	
function disableTex()
	{
	yield WaitForSeconds(0.5);
	
	Time.timeScale=0;
	}
	
function acc()
	{
	yield WaitForSeconds(0.5);
	glevel=0;
	skierAudio.mute=false;
	}
	
function OnTriggerEnter (other : Collider)
{
if(other.gameObject.tag=="Finish")
	{
	finished=true;
	finishedText.GetComponent.<Renderer>().enabled=true;
	switch0to1();
	}
}
