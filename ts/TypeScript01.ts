//TSC compiler
//1.) Download VS2017 package and install https://www.typescriptlang.org/#download-links
//2.) add C:\Program Files (x86)\Microsoft SDKs\TypeScript\2.8 to PATH so it finds tsc.exe
//3.) https://code.visualstudio.com/docs/languages/typescript


function greeter(person) {
    return "Hello, " + person;
}

let user = "User";
let test = 2;

document.body.innerHTML = greeter(user);

