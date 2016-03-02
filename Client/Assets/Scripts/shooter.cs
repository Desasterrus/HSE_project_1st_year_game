using UnityEngine;
using System.Collections;

public class shooter : MonoBehaviour {

	public GameObject ShotPrefab;
	public float power = 10.0f;

	public AudioClip SFX;

	private int newAutoBulletDelay = 5;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if ((Input.GetButtonDown("Fire1") || Input.GetButtonDown ("Jump"))) {
			if (ShotPrefab) {
				GenerateBullet();
			}
		}
	}
			void GenerateBullet () {
	}
}

