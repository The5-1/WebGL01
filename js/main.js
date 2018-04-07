const c_glCanvasID = "glCanvas"; //id is a unique identifier given to an html-element

function getGLContext(id = c_glCanvasID,version = 2)
{
	var glVersion = "";

	if(version == 1) glVersion = "webgl";
	else glVersion = "webgl2";

	//search for first element: "." =  class, "#" = id
	var glCanvas = document.querySelector("#"+id);

	// Initialize the GL context
	var glContext = glCanvas.getContext(glVersion);
	if (!glContext) {
		alert("Unable to initialize " + glVersion + "! Your browser or machine may not support it.");
		return;
	}

	//this returns a object created with copies as members
	return {
		context:glContext,
		canvas:glCanvas
	};
}


function main() {
	var object = {name:"i am object"};

	const glContext = getGLContext(c_glCanvasID,2).context;

	// Set clear color to black, fully opaque
	glContext.clearColor(0.25, 0.25, 0.25, 1.0);
	// Clear the color buffer with specified clear color
	glContext.clear(glContext.COLOR_BUFFER_BIT);

}


main(); //run main