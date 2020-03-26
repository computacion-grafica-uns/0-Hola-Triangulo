export const vertexShaderSourceCode = `#version 300 es

  in vec2 vertexPosition;
  in vec3 vertexColor;

  out vec3 color;

  void main() {
    color = vertexColor;
    gl_Position = vec4(vertexPosition, 0, 1);
  }
`

export const fragmentShaderSourceCode = `#version 300 es
  precision mediump float;

  in vec3 color;

  out vec4 fragmentColor;

  void main() {
    fragmentColor = vec4(color, 1);
  }
`