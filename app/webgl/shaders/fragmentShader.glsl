uniform vec3 uDepthColour;
uniform vec3 uHeightColour;
uniform float uColourOffset;
uniform float uColourMultiplier;

varying vec2 vUv;
varying float vElevation;

void main ()
{
  // we use uColourOffset to increase vElevation so colours can be tweaked in alignment with vElevation.
  float mixStrength = (vElevation + uColourOffset) * uColourMultiplier;
  vec3 mixedColour = mix(uDepthColour, uHeightColour, mixStrength);
  gl_FragColor = vec4(mixedColour, 1.0);
}
