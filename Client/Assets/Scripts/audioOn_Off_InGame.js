var soundOn:Texture2D;
var soundOff:Texture2D;
var _audioListener:AudioSource; 
var hideGUI:GUISkin;
var testStyle : GUIStyle;
 var _cTex:Texture2D;
private var  cTex:int=0;

function Start () 
{
if(PlayerPrefs.HasKey("audioOption")==true)
	{
	if(PlayerPrefs.GetString("audioOption")=="1")
		{
		_cTex=soundOn;
		setAudio(false);
		}
	else
		{
		_cTex=soundOff;
		setAudio(true);
		}
	}
}

	
function OnGUI()
	{
	GUI.depth=1;
	GUI.skin=hideGUI;
	GUI.DrawTexture(Rect(2,Screen.height-70,68,68),_cTex);
	if(GUI.Button(Rect(2,Screen.height-70,68,68)," ",testStyle))
		{
		if(cTex==0)
			{
			cTex=1;
			_cTex=soundOff;
			setAudio(true);
			}
		else
			{
			cTex=0;
			_cTex=soundOn;
			setAudio(false);
			}
		}
	}
	
function setAudio(setType:boolean)
	{
	_audioListener.mute=setType;
	if(setType==true)
		{
		PlayerPrefs.SetString("audioOption","1");
		}
	else
		{
		PlayerPrefs.SetString("audioOption","0");
		}
	}