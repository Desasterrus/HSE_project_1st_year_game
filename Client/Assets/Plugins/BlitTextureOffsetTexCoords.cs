    using UnityEngine;
    using System.Collections;
     
    [RequireComponent (typeof (Camera))]
    public class BlitTextureOffsetTexCoords : MonoBehaviour {
        public Material mMaterial = null;
        public Vector2 offsets = Vector2.zero;
           
        void OnRenderImage( RenderTexture source, RenderTexture dest ) {
            if( !mMaterial )
            {
                //Just blit
                Graphics.Blit( source, dest );             
            }
            RenderTexture.active = dest;
           
            GL.PushMatrix ();
            GL.LoadOrtho ();
           
            // activate the first pass (in this case we know it is the only pass)
            mMaterial.SetPass (0);
            // draw a quad
            GL.Begin (GL.QUADS);
            GL.TexCoord2 (0 - offsets.x, 0 - offsets.y); GL.Vertex3 (0.0f, 0.0f, 0.1f);
            GL.TexCoord2 (1 + offsets.x, 0 - offsets.y); GL.Vertex3 (1.0f, 0.0f, 0.1f);
            GL.TexCoord2 (1 + offsets.x, 1 + offsets.y); GL.Vertex3 (1.0f, 1.0f, 0.1f);
            GL.TexCoord2 (0 - offsets.x, 1 + offsets.y); GL.Vertex3 (0.0f, 1.0f, 0.1f);
            GL.End ();
           
            GL.PopMatrix ();
        }
    }