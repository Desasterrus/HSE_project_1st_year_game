var mainWheel : WheelCollider;

 
var steer_max = 20;
var motor_max = 10;
var brake_max = 100;
 
private var steer = 0;
private var motor = 0;
private var brake = 0;
 
function FixedUpdate () 
{ 
steer = Mathf.Clamp(Input.GetAxis("Horizontal"), -1, 1);
motor = Mathf.Clamp(Input.GetAxis("Vertical"), 0, 1);
brake = -1 * Mathf.Clamp(Input.GetAxis("Vertical"), -1, 0);
 
mainWheel.motorTorque = motor_max * motor;
mainWheel.brakeTorque = brake_max * brake;
mainWheel.steerAngle = steer_max * steer;
}