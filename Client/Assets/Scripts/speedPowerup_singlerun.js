var skierObj:GameObject;
var mainscript:skyer_Android_CrossiPhone_singleRun;


function Start()
	{
	skierObj=GameObject.FindWithTag("dude");
	}

function OnTriggerEnter (other:Collider) 
{
if (other.gameObject.CompareTag ("dude")) {
	skierObj.GetComponent.<Collider>().SendMessage("AddForce");
	//mainscript.AddForce();
	Destroy(gameObject);
	}
}

function Update()
	{
	//transform.RotateAround (transform.position, Vector3.up, 160 * Time.deltaTime);
	}