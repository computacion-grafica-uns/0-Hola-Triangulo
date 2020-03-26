import { getCanvasElement, getWebGL2Context, createShader, createProgram, createVertexBuffer, bindAttributeToVertexBuffer } from "./utils.js"
import { vertexShaderSourceCode, fragmentShaderSourceCode } from "./shaders.js"

// #️⃣ Configuración base de WebGL

// Encontramos el canvas y obtenemos su contexto de WebGL
const canvas = getCanvasElement('canvas')
const gl = getWebGL2Context(canvas)

// Seteamos el color que vamos a usar para 'limpiar' el canvas (i.e. el color de fondo)
gl.clearColor(0, 0, 0, 1)

// #️⃣ Creamos los shaders, el programa que vamos a usar, y guardamos info de sus atributos

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSourceCode)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceCode)

const program = createProgram(gl, vertexShader, fragmentShader)

const vertexPositionLocation = gl.getAttribLocation(program, 'vertexPosition')
const vertexColorLocation = gl.getAttribLocation(program, 'vertexColor')

// #️⃣ Definimos la info de la geometría que vamos a dibujar (un triangulo)

const vertexCount = 3
const vertexPositions = [
  -0.5, -0.5, // coordenadas (x,y) del primer vértice
  0.5, -0.5,  // del 2do
  0.0, 0.5    // y del 3ro
]
const vertexColors = [
  1, 0, 0,    // color (en RGB) del primer vértice (rojo)
  0, 1, 0,    // del segundo (verde)
  0, 0, 1     // y del tercero (azul)
]

/* 📝 El triangulo tiene 3 vértices, cada uno con su posición en coordenadas (x,y), recorridos en
 * sentido anti-horario 🔄 (el sentido anti-horario es una convención que por ahora no va a tener
 * ningún efecto, se podrían escribir los vértices en sentido horario y obtener el mismo triangulo,
 * pero más adelante vamos a ver el por qué de la convención y su importancia).
 */

// #️⃣ Guardamos la info del triangulo (i.e. la posición y color de sus vértices) en Vertex Buffer Objects (VBOs)

const vertexPositionBuffer = createVertexBuffer(gl, vertexPositions)
const vertexColorBuffer = createVertexBuffer(gl, vertexColors)

// #️⃣ Asociamos los atributos del programa a los buffers creados

// Creamos un Vertex Array Object (VAO), encargado de tomar nota de cada conexión atributo-buffer
const vertexArray = gl.createVertexArray()

// A partir de aca, el VAO registra cada atributo habilitado y su conexión con un buffer
gl.bindVertexArray(vertexArray)

// Habilitamos cada atributo y lo conectamos a su buffer
gl.enableVertexAttribArray(vertexPositionLocation)
bindAttributeToVertexBuffer(gl, vertexPositionLocation, 2, vertexPositionBuffer)
gl.enableVertexAttribArray(vertexColorLocation)
bindAttributeToVertexBuffer(gl, vertexColorLocation, 3, vertexColorBuffer)

// Dejamos de tomar nota en el VAO
gl.bindVertexArray(null)

/* 📝 Nuestro VAO ahora mantiene registro de que los atributos 'vertexPosition' y 'vertexColor' de
 * nuestro programa (representados por sus ubicaciónes) van a obtener su información del
 * 'vertexPositionBuffer' y del 'vertexColorBuffer' respectivamente, y que cada cada vez que
 * tengan que obtener un dato, tienen que leer de a 2 items para las posiciones (las coordenadas x e
 * y), y de a 3 items para los colores (los tres valores R, G y B).
 */

// #️⃣ Establecemos el programa a usar y sus conexiónes atributo-buffer (el VAO)

gl.useProgram(program)
gl.bindVertexArray(vertexArray)

// #️⃣ Dibujamos la escena (nuestro majestuoso triangulo)

// Limpiamos el canvas (con el color que seteamos al principio)
gl.clear(gl.COLOR_BUFFER_BIT)

// Y dibujamos 🎨 (al fin!)
gl.drawArrays(gl.TRIANGLES, 0, vertexCount)
