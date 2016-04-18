using UnityEngine;
using System;
using System.Collections;
using System.IO;
using System.Text;
public  class test001 : MonoBehaviour {

	// Use this for initialization

	
	 void Start () 
	{
	 byte[] bites=Encoding.ASCII.GetBytes ("thisIstheKey");
	WriteAll (bites);
	}
	
	public static byte[] FromHex()
	{
	    return File.ReadAllBytes("test1.txt");
	}
	
	public static void WriteAll(byte[] bits)
	{
		//"172-237-0-5-116-0-40"
		byte[] bytes=new byte[7+bits.Length];
		bytes[0]=172;
		bytes[1]=237;
		bytes[2]=0;
		bytes[3]=5;
		bytes[4]=116;
		bytes[5]=0;
		bytes[6]=40;
		for(int i=7;i<bits.Length+7;i++)
		{
		bytes[i]=bits[i-7];
		}
		Debug.Log ("done");
		File.WriteAllBytes("test2.txt",bytes);
		Debug.Log ("done");
	}

	// Update is called once per frame
}
