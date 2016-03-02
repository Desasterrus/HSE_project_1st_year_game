using UnityEngine;
using System.Collections;

public class Target_behaviour : MonoBehaviour {

	public int ScoreUpdate = 0;
	public float TimeUpdate = 0f;

	void OnCollisionEnter (Collision newCollision) {
		if	(newCollision.gameObject.tag == "Shot") {
			Manager Mg = Manager.gm;
			Mg.ChangeTime (TimeUpdate);
			Mg.ChangeScore (ScoreUpdate);
			Destroy (gameObject);
			Destroy (newCollision.gameObject);
		}
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
