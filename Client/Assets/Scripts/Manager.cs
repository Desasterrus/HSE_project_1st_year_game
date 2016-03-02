using UnityEngine;
using System.Collections;

public class Manager : MonoBehaviour {



	private static Manager GM;

	protected Manager() {}


	public static Manager gm {
		get { 
			if (GM == null) {
				GM = new Manager ();
			}
			return GM;
		}
	}

	public int ScoreToWin = 50;

	public float GameTime = 30f;
	public int Score = 0;

	enum GameState{
		Play,
		Menu,
		Win,
		Lose
	}



	private GameState State = GameState.Play;

	public void ChangeTime(float delay) {
		GameTime += delay;
		if (GameTime <= 0) {
			State = GameState.Lose;
		}
	}

	public void ChangeScore (int Amoount) {
		Score += Amoount;
		if (Score >= ScoreToWin) {
			State = GameState.Win;
		}
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	


	}
}
