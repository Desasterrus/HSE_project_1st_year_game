//import System;

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
var buttonA:Texture2D;
var buttonB:Texture2D;
var hideSkin:GUISkin;
var healthBar:GameObject;
var boulder:GameObject;
var finished:GUITexture;
var stop:boolean = false;
var time:float;
var scorestyle : GUIStyle;
var newTime:float;
var bestTime:float;
var cacheScore:int;
var time2: float;

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
private var type:boolean;

function Awake()
{
type=false;
}
 
function OnCollisionEnter()
	{
	canRotate=1;
	}
	
function OnCollisionExit()
	{
	canRotate=0;
	}

function OnTriggerEnter (other : Collider) {

if(other.transform.tag=="finish")
		{		
		stop=true;
		finishGame();
		}
	}


function Start()
	{
	if(type==true)
		{
		score=10000;
		}
	
	trailParticle.minEmission=0;
	trailParticle.maxEmission=0;
	CalibrateAccelerometer();
	// make rocks appear
yield WaitForSeconds(5);
boulder = GameObject.Find("rock");
Instantiate (boulder, Vector3(894,580,1940), Quaternion.identity);


	}
var fixedAcceleration : Vector3 ;
var rawTurn : float;
var rawThrust : float;

function Update () {		

if(stop == false){
    time += Time.deltaTime;
    time2=Math.Round(time, 2);
    }

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
		wheel.steerAngle =1/(cacheMagnitude/4)*fixedAcceleration.y*turnProgression*Time.deltaTime;
		GetComponent.<Rigidbody>().AddRelativeTorque (Vector3.up * fixedAcceleration.y*turnProgression*2*Time.deltaTime);
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
		GetComponent.<Rigidbody>().AddRelativeTorque (Vector3.up * fixedAcceleration.y*turnProgression*4*Time.deltaTime);
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

function FixAcceleration (acceleration : Vector3) {
    var fixedAcceleration : Vector3 = calibrationQuaternion * acceleration;
    return fixedAcceleration;
}

function OnGUI()
	{	
    GUI.Label(Rect(Screen.width / 2 - 25, 20, 200, 50), "" + time2,scorestyle);  
	if(type==false)
	{	
	GUI.skin=hideSkin;	
	}
	}
	
	function doRagdoll()
		{
		radDollObj.switchX();
		PlayerPrefs.SetFloat("time3",time2);
		healthBar.SendMessage("customHit",20);
		}
		
	function finishGame()
		{
	GetComponent.<Rigidbody>().isKinematic=true;
		var cacheScore:int=Mathf.RoundToInt(score) ;	
		finished.enabled=true;	
		
		bestTime = PlayerPrefs.GetFloat("bestTime");
		if(time2<=bestTime){
		PlayerPrefs.SetFloat("bestTime",time2);
		}
			
		PlayerPrefs.SetFloat("newTime",time2);		
		
		yield WaitForSeconds(3);
	Application.LoadLevel("localscore");
		}
	function stopIt()
		{
		needsFade=false;
		}
		
	function AddForce()
		{
		GetComponent.<Rigidbody>().AddForce(new Vector3(0,0,-30),ForceMode.Impulse);
		}
		
	function updateScore()
		{
		if(type==false)
		{
		var cacheScore:int=Mathf.RoundToInt(score) ;		
		var level:int=0;	
		}
		
		else
		{
		cacheScore=Mathf.Round(score/Time.timeSinceLevelLoad);		
		}
		}
		
	function AddScore()
		{
		score+=10;
		updateScore();
		}
