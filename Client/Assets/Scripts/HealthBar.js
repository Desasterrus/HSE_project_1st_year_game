var dude: GameObject;
var emptyHealh:Texture2D;
var fillColorTex:Texture2D;
var health:float;
var maxTolerance:float;
//var deadText:GameObject;
var deadText_1:GUITexture;
var ouch:AudioClip;
var time4:float;
var newTime:float;
var bestTime:float;
var strike:int;
var rag:int;
var rHealth:int;
		
function OnCollisionEnter(collision : Collision) 
{
 

if (collision.relativeVelocity.magnitude > 2&&collision.gameObject.layer!=9) 
	{
AudioSource.PlayClipAtPoint(ouch, GetComponent.<Collider>().transform.position);
	var rHealth:int;
	rHealth=20+collision.relativeVelocity.magnitude/1;// increase from 20 to make health fall faster and ragdoll more easy to trigger 
	rag = PlayerPrefs.GetInt("ragdoll");
	if (rag==1){
RemoveHealth(rHealth);
PlayerPrefs.SetInt("ragdoll",0);
}	
	if(rHealth>health)
		{
				RemoveHealth(health);
		playerDie();
		}
	else
		{
		RemoveHealth(rHealth);
//		SendMessage("doRagdoll");  //this will cause ragdoll to appear after light collisions
		}
	}
}

function OnGUI()
	{
	GUI.DrawTexture(Rect(Screen.width-130,1,128,16),emptyHealh);
	GUI.DrawTexture(Rect(Screen.width-128,2,1.23*health,12),fillColorTex);
	}
	
function RemoveHealth(amount:int)
	{
	iTween.ValueTo(gameObject,{"OnUpdate":"updateHealth","from":health,"to":health-amount,"time":2});
	}
	
function updateHealth(cHealth:float)
	{
	health=cHealth;
	}
	
function playerDie()
	{

	GetComponent.<Rigidbody>().isKinematic=true;
	deadText_1.enabled=true;		
	
	yield WaitForSeconds(2);
	Application.LoadLevel("localscore");
	}

function customHit(strike:int)
	{
	if(health>30)
		RemoveHealth(30);
	else
	{
	RemoveHealth(health);
	playerDie();
	}
	}
	
