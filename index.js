// #️⃣ Configuración base de WebGL

// Encontramos el canvas y obtenemos su contexto de WebGL
const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl2')

// Seteamos el color que vamos a usar para 'limpiar' el canvas (i.e. el color de fondo)
gl.clearColor(0, 0, 0, 1)

// #️⃣ Creamos los shaders, el programa que vamos a usar, y guardamos info de sus atributos

// Shader de vértices
const vertexShaderSourceCode = getVertexShaderSourceCode()
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexShaderSourceCode)
gl.compileShader(vertexShader)

// Shader de fragmentos
const fragmentShaderSourceCode = getFragmentShaderSourceCode()
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentShaderSourceCode)
gl.compileShader(fragmentShader)

// Combinamos los shaders en un programa
const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

// Obtenemos la ubicación de los atributos del programa
const vertexPositionLocation = gl.getAttribLocation(program, 'vertexPosition')

// #️⃣ Definimos la info de la geometría que vamos a dibujar (un triangulo)

const vertexCount = 3
const vertexPositions = [
  -0.5, -0.5, // coordenadas (x,y) del primer vértice
  0.5, -0.5,  // del 2do
  0.0, 0.5    // y del 3ro
]

/* 📝 El triangulo tiene 3 vértices, cada uno con su posición en coordenadas (x,y), recorridos en
 * sentido anti-horario 🔄 (el sentido anti-horario es una convención que por ahora no va a tener
 * ningún efecto, se podrían escribir los vértices en sentido horario y obtener el mismo triangulo,
 * pero más adelante vamos a ver el por qué de la convención y su importancia).
 */

// #️⃣ Guardamos la info del triangulo (i.e. la posición de sus vértices) en Vertex Buffer Objects (VBOs)

const vertexPositionsBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionsBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW)
gl.bindBuffer(gl.ARRAY_BUFFER, null)

// #️⃣ Asociamos los atributos del programa a los buffers creados

// Creamos un Vertex Array Object (VAO), encargado de tomar nota de cada conexión atributo-buffer
const vertexArray = gl.createVertexArray()

// A partir de aca, el VAO registra cada atributo habilitado y su conexión con un buffer
gl.bindVertexArray(vertexArray)

// Habilitamos el atributo 'vertexPosition' y lo conectamos a su buffer
gl.enableVertexAttribArray(vertexPositionLocation)
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionsBuffer)
gl.vertexAttribPointer(vertexPositionLocation, 2, gl.FLOAT, false, 0, 0)
gl.bindBuffer(gl.ARRAY_BUFFER, null)

// Dejamos de tomar nota en el VAO
gl.bindVertexArray(null)

/* 📝 Nuestro VAO ahora mantiene registro de que el atributo 'vertexPosition' de nuestro programa
 * (representado por su ubicación 'vertexPositionLocation') va a obtener su información del
 * 'vertexPositionsBuffer', y que cada cada vez que tenga que obtener un dato (i.e. la posición de
 * un vértice) tiene que leer de a 2 items del buffer (las coordenadas x e y de cada vértice).
 */

// #️⃣ Establecemos el programa a usar y sus conexiónes atributo-buffer (el VAO)

gl.useProgram(program)
gl.bindVertexArray(vertexArray)

// #️⃣ Dibujamos la escena (nuestro majestuoso triangulo)

// Limpiamos el canvas (con el color que seteamos al principio)
gl.clear(gl.COLOR_BUFFER_BIT)

// Y dibujamos 🎨 (al fin!)
gl.drawArrays(gl.TRIANGLES, 0, vertexCount)




// Funciones Auxiliares - Código Fuente de Shaders

function getVertexShaderSourceCode() {
  return `#version 300 es

    in vec2 vertexPosition;

    void main() {
      gl_Position = vec4(vertexPosition, 0, 1);
    }
  `
}

function getFragmentShaderSourceCode() {
  return `#version 300 es
    precision mediump float;

    out vec4 fragmentColor;

    void main() {
      fragmentColor = vec4(0.2, 0.4, 1, 1);
    }
  `
}
