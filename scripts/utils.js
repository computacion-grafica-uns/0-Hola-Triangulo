/**
 * @param {string} id
 * @returns {HTMLCanvasElement}
 */
export function getCanvasElement(id) {
  const canvas = document.getElementById(id)
  if (canvas === null) {
    throw new Error(`No canvas element found with '${id}' ID`)
  }

  return canvas
}

/**
 * @param {HTMLCanvasElement} canvas
 * @returns {WebGL2RenderingContext}
 */
export function getWebGL2Context(canvas) {
  const gl = canvas.getContext('webgl2')
  if (gl === null) {
    throw new Error(`No WebGL 2 context available. It may be an experimental feature that needs to be enabled.`)
  }

  return gl
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {number} type
 * @param {string} sourceCode
 * @returns {WebGLShader}
 */
export function createShader(gl, type, sourceCode) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)

  const hasCompiledSuccessfully = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!hasCompiledSuccessfully) {
    const shaderInfoLog = gl.getShaderInfoLog(shader)
    const shaderType = gl.VERTEX_SHADER ? 'Vertex Shader' : 'Fragment Shader'
    throw new Error(shaderType + '\n' + shaderInfoLog)
  }

  return shader
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 */
export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const hasLinkedSuccessfully = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!hasLinkedSuccessfully) {
    const programInfoLog = gl.getProgramInfoLog(program)
    throw new Error(programInfoLog)
  }

  return program
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {number[]} data
 * @returns {WebGLBuffer}
 */
export function createVertexBuffer(gl, data) {
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return buffer
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {number} attributeLocation
 * @param {number} attributeSize
 * @param {WebGLBuffer} buffer
 * @returns {void}
 */
export function bindAttributeToVertexBuffer(gl, attributeLocation, attributeSize, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.vertexAttribPointer(attributeLocation, attributeSize, gl.FLOAT, false, 0, 0)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
}