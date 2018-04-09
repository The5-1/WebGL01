const c_glCanvasID = "glCanvas"; //id is a unique identifier given to an html-element

var GL = null; //GL Context will be set here once active

const default_vs = `
attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}`;

const default_fs = `
void main() {
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}`;

function getGLContext(id = c_glCanvasID, version = 2) {
	var glVersion = "";

	if(version == 1) glVersion = "webgl";
	else glVersion = "webgl2";

	//search for first element: "." =  class, "#" = id
	var htmlCanvas = document.querySelector("#"+id);

	// Initialize the GL context
	var glContext = htmlCanvas.getContext(glVersion);
	if (!glContext) {
		alert("Unable to initialize " + glVersion + "! Your browser or machine may not support it.");
		return;
	}

	//this returns a object created with copies as members
	return {
		context:glContext,
		canvas:htmlCanvas
	};
}

function loadShader(type, source) {
	const shader = GL.createShader(type);
	GL.shaderSource(shader, source);
	GL.compileShader(shader);
	
	if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
	  alert('An error occurred compiling the shaders: ' + GL.getShaderInfoLog(shader));
	  GL.deleteShader(shader);
	  return null;
	}
	return shader;
}

function initShaderProgram(vsSource, fsSource) {
	const vertexShader = loadShader(GL.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(GL.FRAGMENT_SHADER, fsSource);
  
	const shaderProgram = GL.createProgram();
	GL.attachShader(shaderProgram, vertexShader);
	GL.attachShader(shaderProgram, fragmentShader);
	GL.linkProgram(shaderProgram);
  
	if (!GL.getProgramParameter(shaderProgram, GL.LINK_STATUS)) {
	  alert('Unable to initialize the shader program: ' + GL.getProgramInfoLog(shaderProgram));
	  return null;
	}
  
	return shaderProgram;
}

function getShaderInfo(shaderProgram)
{
	const programInfo = {
	program: shaderProgram,
		attribLocations: {
			vertexPosition: GL.getAttribLocation(shaderProgram, 'aVertexPosition'),
		},
		uniformLocations: {
			projectionMatrix: GL.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: GL.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		}
	}
	return programInfo;
}

function initBuffers() {
	const positionBuffer = GL.createBuffer(); 
	GL.bindBuffer(GL.ARRAY_BUFFER, positionBuffer);

	const positions = [
	   1.0,  1.0,
	  -1.0,  1.0,
	   1.0, -1.0,
	  -1.0, -1.0,
	];
  
	GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(positions), GL.STATIC_DRAW);
  
	return {
	  position: positionBuffer,
	};
}

function getProjectionMatrix()
{
	const projectionMatrix = mat4.create();

	const fieldOfView = 45 * Math.PI / 180;
	const aspect = GL.canvas.clientWidth / GL.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;

	mat4.perspective(
		projectionMatrix,
		fieldOfView,
		aspect,
		zNear,
		zFar);

	return 	projectionMatrix;
}


function main() {
	var object = {name:"i am object"};

	GL = getGLContext(c_glCanvasID,1).context;
	console.log(GL);

	GL.clearColor(0.25, 0.25, 0.25, 1.0);
	GL.clearDepth(1.0);
	GL.enable(GL.DEPTH_TEST);
	GL.depthFunc(GL.LEQUAL);
	GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

	const shader1 = initShaderProgram(default_vs,default_fs);
	const shader1_info = getShaderInfo(shader1);
	const verts = initBuffers();

	const matP = getProjectionMatrix();

	const matM = mat4.create();
	mat4.translate(matM,matM,[-0.0, 0.0, -6.0]);

	{
		const numComponents = 2;  // pull out 2 values per iteration
		const type = GL.FLOAT;    // the data in the buffer is 32bit floats
		const normalize = false;  // don't normalize
		const stride = 0;         // how many bytes to get from one set of values to the next
								  // 0 = use type and numComponents above
		const offset = 0;         // how many bytes inside the buffer to start from
		GL.bindBuffer(GL.ARRAY_BUFFER, verts.position);
		GL.vertexAttribPointer(
			shader1_info.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset);
		GL.enableVertexAttribArray(
			shader1_info.attribLocations.vertexPosition);
	  }

	GL.useProgram(shader1_info.program);

	GL.uniformMatrix4fv(
		shader1_info.uniformLocations.projectionMatrix,
		false,
		matP);
	GL.uniformMatrix4fv(
		shader1_info.uniformLocations.modelViewMatrix,
		false,
		matM);

		{
			const offset = 0;
			const vertexCount = 4;
			GL.drawArrays(GL.TRIANGLE_STRIP, offset, vertexCount);
		}

}


main(); //run main

//GL.getExtension('WEBGL_lose_context').loseContext();