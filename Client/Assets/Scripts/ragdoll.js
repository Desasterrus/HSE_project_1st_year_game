var meshRenderers:GameObject[];
var gameObjMain:GameObject;
var gameObjRag:GameObject;
var x:GameObject;

PlayerPrefs.SetInt("ragdoll",1);

private var switching:boolean=false;
function switchX () 
{
if(switching==false)
	{
	switching=true;
	x=Instantiate(gameObjRag,gameObjMain.transform.position,gameObjMain.transform.rotation);
	var i:int=0;
	for(i=0;i<meshRenderers.length;i++)
		{
		meshRenderers[i].GetComponent.<Renderer>().enabled=false;
		}
	gameObjMain.GetComponent.<Rigidbody>().isKinematic=true;
	hide();
	}
}



function hide()
	{
	yield WaitForSeconds(8);
	Destroy(x);
	var i:int=0;
	for(i=0;i<meshRenderers.length;i++)
	{
	meshRenderers[i].GetComponent.<Renderer>().enabled=true;
	}
	gameObjMain.GetComponent.<Rigidbody>().isKinematic=false;
	switching=false;
	}