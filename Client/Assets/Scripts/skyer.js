import System;

var animationComp:Animation;
var trailParticle:ParticleEmitter;
var maxSpeed:float;
var speedProgression:float;
var turnProgression:float;
var wheel:WheelCollider;
var dir:Vector3;
var brakeFactor:float;
var trickType:int=-1;
var skinedMesh:GameObject;
var radDollObj:ragdoll;
var score:float=0;
var Scorefactor:float;
var cScript:cameraScript;
var secObj:GameObject;
var eulerAnglesX:Vector3;
var numberArray:Mesh[];
var numberDisplay:MeshFilter[];
var hColors:Color[];
var mainMaterial:GameObject;
var mainMaterialX:Material;
var buttonA:Texture2D;
var buttonB:Texture2D;
var hideSkin:GUISkin;
var healthBar:GameObject;

private var playing:boolean=true;
private var outHit:WheelHit;
private var calibrationQuaternion:Quaternion;
private var canRotate:float=1;
private var ok:boolean=true;
private var ok2:boolean=true;
private var processed:boolean=false;
private var processedX2:boolean=false;
private var timeCache:float;
private var grounded:boolean;
private var needsFade:boolean=true;
private var fadeColor:int=0;
 var type:boolean=false;
function OnCollisionEnter()
	{
	canRotate=1;
	}
	
function OnCollisionExit()
	{
	canRotate=0;
	}

function OnTriggerEnter(other : Collider)
	{
	if(other.transform.tag!="finish")
		{
		trickType=int.Parse(other.transform.tag);
		}
	else
		{
		finishGame();
		}
	}
	


function Start()
	{
	if(type==true)
		{
		score=99999;
		}
	mainMaterial.GetComponent.<Renderer>().material.color=hColors[0];
	trailParticle.minEmission=0;
	trailParticle.maxEmission=0;
	//animationComp.AnimationBlendMode=
	//doRagdoll();
	CalibrateAccelerometer();
	}
var fixedAcceleration : Vector3 ;
var rawTurn : float;
var rawThrust : float;


function Update () 

{

if(type==true)
	{
	updateScore();
	}
 var acceleration : Vector3 = Input.acceleration;
fixedAcceleration= FixAcceleration (acceleration);
var force:Vector3;  
var cacheMagnitude:float=GetComponent.<Rigidbody>().velocity.magnitude;
 if(cacheMagnitude<maxSpeed)
		{
		
		if(fixedAcceleration.x>-0.05)
			{
			wheel.motorTorque=520*Time.deltaTime*Mathf.Abs(fixedAcceleration.x);
			Debug.Log(520*Time.deltaTime*Mathf.Abs(fixedAcceleration.x));
			Debug.Log(32*Time.deltaTime);
			wheel.brakeTorque=0;
			}
		else
			{
			wheel.brakeTorque=Mathf.Abs((cacheMagnitude-maxSpeed)*brakeFactor*20);
			}
		}
else
		{
		if(fixedAcceleration.x>0)
			{
			wheel.brakeTorque =Mathf.Abs((cacheMagnitude-maxSpeed)*brakeFactor);
			}
		else
			{
			wheel.brakeTorque=Mathf.Abs((cacheMagnitude-maxSpeed)*brakeFactor*20);
			}
		}
ok=true;

if(transform.eulerAngles.y>240)
	{
	if(fixedAcceleration.y<0)
		{
		ok=false;
		}
	}
if(transform.eulerAngles.y<140)
	{
	if(fixedAcceleration.y>0)
		{
		ok=false;
		}
	}
	grounded=wheel.GetGroundHit(outHit);
if(grounded==false)
	{
	ok=false;
	timeCache=Time.time;
	cScript.setX();
	if(processedX2==false)
		{
		trailParticle.emit=false;
		GetComponent.<AudioSource>().Pause();
		ok2=false;
		processedX2=true;
		processed=false;
		//We see if we are in a  particular Zone so we can set the trickType
		}
	}
else
	{
	if(processed==false)
		{
			if(secObj.transform.localRotation.eulerAngles.y<300&&secObj.transform.localRotation.eulerAngles.y>60||playing==false)
			{
			secObj.transform.localRotation.eulerAngles.y=0;
			doRagdoll();
			}
		trailParticle.emit=true;
		GetComponent.<AudioSource>().Play();
		cScript.resetX();
		processedX2=false;
		processed=true;
		trickType=-1;
		ok2=true;
		}
	}
	
if(cacheMagnitude>3)
	{
	GetComponent.<AudioSource>().volume=cacheMagnitude/40;
	trailParticle.minEmission=cacheMagnitude*3;
	trailParticle.maxEmission=cacheMagnitude*5.5;
	
	if(ok==true)
		{
		if(Mathf.Abs(fixedAcceleration.y)>0.11)
		{
		wheel.steerAngle =1/(cacheMagnitude/4)*fixedAcceleration.y*turnProgression*canRotate;
		GetComponent.<Rigidbody>().AddRelativeTorque (Vector3.up * fixedAcceleration.y*turnProgression*canRotate*2);
		}
		
	if(ok2==true)
		{
		if(fixedAcceleration.y<-0.11)
			{
			animationComp.CrossFade("CarveRight",0.35);
						}
		else if (fixedAcceleration.y>0.11)
			{
			animationComp.CrossFade("CarveLeft",0.35);
						}
		else if(cacheMagnitude>(maxSpeed/2))
			{
			animationComp.CrossFade("Fast",0.8);
			}
		else
			{
			animationComp.CrossFade("Ski",0.8);
			}
		}
	}
}
else
	{
	 if(Mathf.Abs(fixedAcceleration.y)>0.11)
		{
		GetComponent.<Rigidbody>().AddRelativeTorque (Vector3.up * fixedAcceleration.y*turnProgression*canRotate*2);
		}
	animationComp.CrossFade("idle",0.2);
	}
}
function getWeight(acceleration:float):float
	{
	acceleration=Mathf.Abs(acceleration);
	if(acceleration<2.1)
		{
		return (2.1-acceleration)*100;
		}
	return 100;
	}

function CalibrateAccelerometer () {
    var accelerationSnapshot : Vector3 = Input.acceleration;
    var rotateQuaternion : Quaternion = Quaternion.FromToRotation (new Vector3 (0.0, 0.0, -1.0), accelerationSnapshot);
    calibrationQuaternion = Quaternion.Inverse (rotateQuaternion);
}

//This is the function to call when calibrating the iPhone input:

//Get the 'calibrated' value from the iPhone Input
function FixAcceleration (acceleration : Vector3) {
    var fixedAcceleration : Vector3 = calibrationQuaternion * acceleration;
    return fixedAcceleration;
}

//This is a subsection of code to illustrate how it's used:

//    A sub-section of code from function Update()

function OnGUI()
	{
	GUI.skin=hideSkin;
	//GUI.Label(Rect(1,1,200,40),"Score:"+score);
	GUI.DrawTexture(Rect(Screen.width-100,Screen.height-200,90,90),buttonA);
	GUI.DrawTexture(Rect(Screen.width-150,Screen.height-100,90,90),buttonB);
	if(GUI.RepeatButton(Rect(Screen.width-100,Screen.height-200,90,90)," "))
		{
		updateScore();
		switch(trickType)
			{
			case 0:
				//iTween.ColorTo(mainMaterial,hColors[3],1);//highest
				fadeColor=3;
				animationComp.CrossFade("TwistLeftLookRight",0.2);
				score=score+400*Time.deltaTime;
				secObj.transform.eulerAngles.y+=210*Time.deltaTime;
				playing=false;
				  //secObj.rigidbody.AddTorque (Vector3.up * 160);
				 break;
				
			case 1:
				fadeColor=1;
		//	    mainMaterial.color=hColors[1];
				animationComp.CrossFade("SpreadEagle",0.2); 
				score=score+50*Time.deltaTime;
				playing=false;
				break;
				//transform.eulerAngles.y+=30*Time.deltaTime;
				
			case 2:
				fadeColor=1;
				//mainMaterial.color=hColors[2];
				animationComp.CrossFade("CrouchCross",0.3); 
				score=score+100*Time.deltaTime;
				playing=false;
				//secObj.transform.eulerAngles.y+=190*Time.deltaTime;
				break;
				//transform.eulerAngles.y
				
			case 4:
				
				animationComp.CrossFade("CrouchCross",1); break;
			default : break;
			}
		}
	else if(GUI.RepeatButton(Rect(Screen.width-150,Screen.height-100,90,90)," "))
		{
		updateScore();
		switch(trickType)
			{
			case 0:
				fadeColor=1;
			   // mainMaterial.color=hColors[1];
				animationComp.CrossFade("Daffy",0.2);
				score=score+100*Time.deltaTime;
				playing=false;
				//secObj.transform.eulerAngles.y+=-210*Time.deltaTime;
				 //secObj.rigidbody.AddTorque (Vector3.up * 160);
				 break;
			
			case 1:
				fadeColor=3;
			   // mainMaterial.color=hColors[3];
				animationComp.CrossFade("TwistRightLookLeft",0.2);
				score=score+400*Time.deltaTime;
				secObj.transform.eulerAngles.y+=-210*Time.deltaTime;
				playing=false;
				break;
				
			case 2:
				fadeColor=2;
			//	mainMaterial.color=hColors[2];
				animationComp.CrossFade("Pooling",0.2); 
				score=score+100*Time.deltaTime;
				//secObj.transform.eulerAngles.y+=-210*Time.deltaTime;
				playing=false;
				break;
				
			case 4:
				animationComp.CrossFade("CrouchCross",1); break;
			default : break	;
			}
		}
	else
		{
		fadeColor=0;
		//iTween.ColorTo(mainMaterial,hColors[0],1);
		if(processed==true)
			{
			secObj.transform.localRotation.eulerAngles=eulerAnglesX;
			}
		else
			{
			animationComp.CrossFade("idle",0.2);
			playing=true;
			}
		}
	}
	
	function doRagdoll()
		{
		radDollObj.switchX();
		healthBar.SendMessage("customHit");
		}
		
	function finishGame()
		{
		GetComponent.<Rigidbody>().isKinematic=true;
		}
	function stopIt()
		{
		needsFade=false;
		}
		
	function AddForce()
		{
		GetComponent.<Rigidbody>().AddForce(new Vector3(0,0,-25),ForceMode.Impulse);
		}
		
	function updateScore()
		{
		if(type==false)
		{
		var cacheScore:int=Mathf.RoundToInt(score) ;		
		var level:int=0;
		while(cacheScore!=0)
			{
			numberDisplay[level].mesh=numberArray[cacheScore%10];
			cacheScore/=10;
			level++;
			}
		}
		
		else
		{
		cacheScore=Mathf.Round(score/Time.timeSinceLevelLoad);
		//Debug.Log(Mathf.Round(score/Time.timeSinceLevelLoad));
		numberDisplay[4].mesh=numberArray[0];
		numberDisplay[3].mesh=numberArray[0];
		while(cacheScore!=0)
			{
			numberDisplay[level].mesh=numberArray[cacheScore%10];
			cacheScore/=10;
			level++;
			}
		}

		}
		
	function AddScore()
		{
		score+=10;
		}
/*TODO
*Progresive animation turn based on input
*/
