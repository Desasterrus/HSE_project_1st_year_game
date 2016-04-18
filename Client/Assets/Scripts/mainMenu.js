#pragma strict

var mainGUI:GUITexture;
var texMains:Texture[];
var rects:Rect[];
var rects_2:Rect[];
var hideSkin:GUISkin;
var defaultSkin:GUISkin;
var loadScript:drawLoading;
var helpText:Texture2D;
var testStyle : GUIStyle;

private var lastCompute:int=-1;
private var computeing:boolean=false;
private var curAction:int=-1;
 var level:int=1;

function Start ()
	{
	
	mainGUI.pixelInset = Rect(-Screen.width/2,-Screen.height/2,Screen.width,Screen.height);
	rects[0].x=1;
	rects[0].y=1;
	rects[1].x=Screen.width*0.25;
	rects[1].y=1;
	rects[2].x=Screen.width*0.50;
	rects[2].y=1;
	rects[6].x=Screen.width*0.75;
	rects[6].y=1;	
	}

function OnGUI () 
	{	
	GUI.depth=1;
	GUI.skin=hideSkin;
	GUI.BeginGroup(Rect(25,Screen.height-100,1000,1000));
			
			
	if(level==1)
		{
		GUI.DrawTexture(rects[0],texMains[0], ScaleMode.ScaleToFit);
		GUI.DrawTexture(rects[1],texMains[1], ScaleMode.ScaleToFit);
		GUI.DrawTexture(rects[2],texMains[6], ScaleMode.ScaleToFit);
		GUI.DrawTexture(rects[6],texMains[2], ScaleMode.ScaleToFit);
		
		if(GUI.Button(rects[1],"",testStyle))
	  {
	
	Application.LoadLevel("help");
	curAction=5;
	  }			
		
		if(GUI.Button(rects[6],"",testStyle))
			{
		Application.OpenURL ("http://itunes.apple.com/us/app/ski-full-tilt-3d/id516385267?ls=1&mt=8#");
		}
		if(GUI.Button(rects[2],"",testStyle))
			{
			Application.LoadLevel("localscore");
			curAction=6;
			}
		
		if(GUI.Button(rects[0],"",testStyle))
			{
			loadScript.enabled=true;
	PlayerPrefs.SetString("LevelToLoad","singleRun");
			}
		if(GUI.Button(rects[1],"",testStyle))
			{
							
			if(level==1)
				{
				curAction=5; // TESTING
				}
			else if(level==2)
				{
						curAction=4;
				}
			doCompute();
			}
			
		if(GUI.Button(rects[2],"",testStyle))
			{
			if(level==1)
				{
				curAction=6;
				}
			else if(level==2)
				{
				curAction=0;
				}
			doCompute();
			}
		else
			{
			if(lastCompute!=-1)
				{
				dGUI(lastCompute);
				}
			}
		
		}
		GUI.EndGroup();
		GUI.BeginGroup(Rect(25,Screen.height-100,1000,1000));
	 if(level==2)
		{
		GUI.DrawTexture(rects[0],texMains[3], ScaleMode.ScaleToFit);
		GUI.DrawTexture(rects[1],texMains[4], ScaleMode.ScaleToFit);
		GUI.DrawTexture(rects[2],texMains[5], ScaleMode.ScaleToFit);
		if(GUI.Button(rects[0],"",testStyle))
			{
			loadLevel();
			//Application.LoadLevel("singleRun");
			}
		if(GUI.Button(rects[1],"",testStyle))
			{
			loadLevel2();
			//Application.LoadLevel("infiniteRun");
			//doCompute();
			}
		if(GUI.Button(rects[2],"",testStyle))
			{
			level=1;
			}
		}
		GUI.EndGroup();
		
	}
	
function Update()
	{
	
	}

function iGUI(by:int)
	{
	if(computeing==false)
		{
		computeing=true;
		var startTime:float=Time.time+1;
		while(startTime>Time.time)
			{
			rects[by].width+=Time.deltaTime*20;
			rects[by].height+=Time.deltaTime*20;
			yield;
			}
		computeing=true;
		lastCompute=by;
		}
	}
	
function dGUI(by:int)
	{
	if(computeing==false)
		{
		computeing=true;
		var startTime:float=Time.time+1;
		while(startTime>Time.time)
			{
			rects[by].width-=Time.deltaTime*20;
			rects[by].height-=Time.deltaTime*20;
			yield;
			}
		computeing=true;
		lastCompute=-1;
		doCompute();
		}
	}
	
function doCompute()
	{
	switch (curAction)
		{
		case 0:level=1; break;
		case 1:level=2; break;
		case 2:quit(); break;
		case 3:loadScript.enabled=true; loadLevel(); break;
		case 4:loadScript.enabled=true; loadLevel2(); break;
		case 5:loadScript.enabled=true; loadLevel3(); break;
		case 6:loadScript.enabled=true; loadLevel4(); break;
		}
	curAction=-1;
	}
	
	
function loadLevel()
	{
	//Application.backgroundLoadingPriority = ThreadPriority.Low;
	//var async : AsyncOperation = Application.LoadLevelAsync ("singleRun");
    //yield async;
	loadScript.enabled=true;
	PlayerPrefs.SetString("LevelToLoad","singleRun");
	}
	
function loadLevel2()
	{
	//Application.backgroundLoadingPriority = ThreadPriority.High;
	//var async : AsyncOperation = Application.LoadLevelAsync ("infiniteRun");
    //yield async;
	loadScript.enabled=true;
	//Application.LoadLevel("infiniteRun");
	PlayerPrefs.SetString("LevelToLoad","infiniteRun");
	}
function loadLevel3()
	{
	//Application.backgroundLoadingPriority = ThreadPriority.High;
	//var async : AsyncOperation = Application.LoadLevelAsync ("infiniteRun");
    //yield async;
	//loadScript.enabled=true;
	//Application.LoadLevel("infiniteRun");
	PlayerPrefs.SetString("LevelToLoad","help");
	}
function loadLevel4()
	{
	PlayerPrefs.SetString("LevelToLoad","localscore");
	}

function quit()
	{
	Application.Quit();
	}