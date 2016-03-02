using UnityEngine;
using System.Collections;

public class TargetExit : MonoBehaviour {
	public float minTime = 0f;
	public float maxTime = 10f;

	private float Lifetime = 0f;
	// Use this for initialization
	void Start () {
		Lifetime = Random.Range (minTime, maxTime);
	}
	
	// Update is called once per frame
	void Update () {
		Lifetime -= Time.deltaTime;
		if (Lifetime <= 0) {
			Destroy (gameObject);
		}
	}
}
