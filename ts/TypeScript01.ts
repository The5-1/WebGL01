//TSC compiler
//1.) Download VS2017 package and install https://www.typescriptlang.org/#download-links
//2.) add C:\Program Files (x86)\Microsoft SDKs\TypeScript\2.8 to PATH so it finds tsc.exe
//3.) https://code.visualstudio.com/docs/languages/typescript
//4.) https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
//5.) [Ctrl]+[Shift]+[B] to build (remapped to [F5])


function greeter1(person: string) //": string" annotation
{
    return "Hello, " + person;
}

let user1 = "User";      //works!
//let user = [0,1,2];   // Argument of type 'number[]' is not assignable to parameter of type 'string'.

console.log(greeter1(user1));

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("James", "M.", "Willson");

console.log(user.fullName);
console.log(greeter(user));
