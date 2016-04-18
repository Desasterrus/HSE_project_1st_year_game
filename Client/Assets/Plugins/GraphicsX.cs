using UnityEngine;
using System.Collections;

public class GraphicsX : MonoBehaviour {

	// Use this for initialization
	public static void Blit( Texture source, RenderTexture target, Material material )

    {

        GameObject pCamera = new GameObject( "Proxy Camera" );

        pCamera.AddComponent<Camera>();

        pCamera.GetComponent<Camera>().enabled = false;

        pCamera.hideFlags = HideFlags.HideAndDontSave;

        pCamera.AddComponent<BlitTextureOffsetTexCoords>();

       

        BlitTextureOffsetTexCoords blitter = pCamera.GetComponent<BlitTextureOffsetTexCoords>();

        material.SetTexture("_MainTex", source );

        blitter.mMaterial = material;

       

        pCamera.GetComponent<Camera>().targetTexture = target;

        pCamera.GetComponent<Camera>().Render();

 

        GameObject.Destroy( pCamera );

    }
}

