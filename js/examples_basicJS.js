var examplesBasicJS = {

    //https://stackoverflow.com/questions/881515/how-do-i-declare-a-namespace-in-javascript
    //https://stackoverflow.com/questions/418799/what-does-colon-do-in-javascript

    run: function()
    {
        examplesBasicJS.example_Objects();
        examplesBasicJS.example_Properties();
        examplesBasicJS.example_Methods();
        examplesBasicJS.example_Constructor();
        examplesBasicJS.example_Prototypes();

    },

    // ":" = examplesBasicJS.example_Objects = function(){...}
    example_Objects: function()
    {
        //https://www.w3schools.com/js/js_object_definition.asp
        //https://coderwall.com/p/p5cf5w/different-ways-of-creating-an-object-in-javascript

        //Default: via Object Literal
        var a = {};
        console.log("a:",a);

        //ES5 (2009): via Object keyword
        var b = new Object();
        var c = Object.create(null);
        console.log("b:",b,"c:",c);

        //ES6 (2015): class syntax (syntactic sugar )
        class Peach  {
            constructor(seeds) {
            this.seeds = seeds;
            }
        }
        var e = new Peach(1);
        console.log("e:",e);

    },

    example_Properties: function()
    {
        var a = {};

        //add properties afterwards
        a.name = "myname";
        a.seeds = 5;

        console.log("a:",a);

        //variable property name
        var propname = "newProp";
        a[propname] = "x";

        console.log("a:",a);

        delete a[propname];

        console.log("a:",a);

        //property iteration
        for(prop in a)
        {
            console.log(prop);
        }


    },

    example_Methods: function()
    {
        var a = {};
        a.value = 5;

        //add properties afterwards
        a.memberMethod = function(){return "hello, my vlaue is " + this.value + "!";};

        console.log(a.memberMethod());

        var copyOfMethod = a.memberMethod;

        console.log(copyOfMethod());

    },

    example_Constructor: function()
    {
        //constructor function
        function Peach(seeds)
        {
            this.name = "peach";
            this.seeds = seeds;
            this.method = function(){return name +": " + seeds;}
        }

        var p = new Peach(1);
        console.log("p:",p, p.method());
    },

    example_Prototypes: function ()
    {

        console.log("NOTE: Prototype properties are only visible in the log. Roll out the object to see them!");

        function Fruit()
        {
            this.color = "";
            this.taste = "";
        };

        var f = new Fruit();
        console.log("The property exist, but it got no value!");
        console.log("f:",f, f.myNewProperty);

        Fruit.prototype.myNewProperty = "new!";

        var e = new Fruit();

        console.log("e:",e, e.myNewProperty);
    },

    example_Modules: function()
    {
        //http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
    }

};

examplesBasicJS.run();