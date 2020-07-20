export const vertexShaderSourceCode = `#version 300 es

  in vec2 vertexPosition;

  void main() {
    gl_Position = vec4(vertexPosition, 0, 1);
  }
`

export const fragmentShaderSourceCode = `#version 300 es
  precision mediump float;

  out vec4 fragmentColor;

  void main() {
    fragmentColor = vec4(0.2, 0.4, 1, 1);
  }
`