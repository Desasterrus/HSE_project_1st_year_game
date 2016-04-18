var texLoad:Texture2D;
private var setX:boolean=false;

function LateUpdate()
	{
	if(setX==false)
		{
		setX=true;
		Application.LoadLevel(""+PlayerPrefs.GetString("LevelToLoad"));
		}
	}
	
function OnGUI () 
{
GUI.depth=0;
GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),texLoad);
}