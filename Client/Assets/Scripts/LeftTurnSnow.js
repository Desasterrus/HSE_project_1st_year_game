var snow : GameObject; 

function Update () {

if (Input.GetKey("left"))
{
snow.GetComponent.<ParticleEmitter>().emit = true;
}
else {
snow.GetComponent.<ParticleEmitter>().emit = false;
}
}
