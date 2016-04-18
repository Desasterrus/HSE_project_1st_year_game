Shader "Two Sided" {
    Properties {
        _AmbientColor ("Ambient Color", Color) = (1, 1, 1, 1)
        _DiffuseColor ("Diffuse Color", Color) = (0, 0, 0, 0)
        _Emission ("Emmisive Color", Color) = (0,0,0,0)
        _SideOne ("Side 1", 2D) = "white" {}
        _SideTwo ("Side 2", 2D) = "white" {}
    }

    SubShader {
        Pass {
            Material {
                Diffuse [_DiffuseColor]              
                Ambient [_AmbientColor]
            }
            Cull Off
            Lighting On

            SetTexture [_SideOne] {
                Combine Primary * Texture
            }
        }

        Pass { 
            Material {
                Diffuse [_DiffuseColor]              
                Ambient [_AmbientColor]
            }
            Lighting On

            SetTexture [_SideTwo] {
                Combine Primary * Texture
            }
        }
    }
}