


const express = require("express"); 
const app = express(); 
const bodyParser = require("body-parser");
const cors = require('cors')
const portNumber = process.env.PORT || 5000;


const path = require("path");


process.stdin.setEncoding("utf8");






//app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");


app.use(express.static(__dirname + '/public'));

let status = "None";


app.get("/", (request, response) => {
    let baseURL = "http://" + request.get('host');
    //let baseURL = request.url;
    //process.stdout.write(String(baseURL) + "\n");

    let variables = {
        'login': baseURL + "/login",
        'signUp': baseURL + "/signUp",
        'status': status,
        'launchData' : "SpaceX Crew Members: " //+ launchData["crew"].length
    }

    //process.stdout.write(JSON.stringify(launchData));

    response.render("index", variables);
});


app.get("/signUp", (request, response) => {
    

    let {username, password} = request.body;

    
    result = "hello";//await createUser(client, databaseAndCollection, username, password)

    //process.stdout.write(JSON.stringify(result));

    let variables = {
        
    }

    response.redirect("/");
});




app.get("/login", async (request, response) => {
    let {username, password} = request.body;

   
    
    result = "hello"; //await loginUser(client, databaseAndCollection, username, password);

    if (result) {
        //process.stdout.write(JSON.stringify(result));
        //status = result["username"];
        status = "TEST";
    } else {
        process.stdout.write("\nUser Doesn't Exist\n");
        status = "User Doesn't Exist";
    }
    

    response.redirect("/");
});


app.listen(portNumber);





//////// Mongo Setup


require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') }) 

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION};

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${username}:${password}@cluster0.zsgbhxu.mongodb.net/?retryWrites=true&w=majority`
   
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let launchData = "";
/*
async function main() {
    await client.connect();
    let launchResponse = await fetch("https://api.spacexdata.com/v5/launches/latest");
    launchData = await launchResponse.json();
}

main();





*/


/////////////////////////////////








/*













async function loginUser(client, databaseAndCollection, inputUsername, inputPassword) {
    let filter = {username: inputUsername, password: inputPassword};
    const result = await client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .findOne(filter);
    return result;
}






async function createUser(client, databaseAndCollection, username, password) {
    let newUser = {
        'username': username,
        'password': password
    }

    const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(newUser);

    return result;

    //process.stdout.write(`\nApplication entry created with id ${result.insertedId}\n`);
}








app.listen(portNumber);


//app.listen(portNumber);


//process.stdout.write(`Web server starting and running at port: ${portNumber}\n`);



const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);

process.stdin.on("readable", function () {
    let dataInput = process.stdin.read();

    if (dataInput !== null) {
        let command = dataInput.trim();

        if (command === "stop") {
            process.stdout.write("Shutting down the server\n");
            process.exit(0);

        } else {
            process.stdout.write(`Invalid command: ${command}\n`)
        }

        process.stdout.write(prompt);
        process.stdin.resume();
    }
});














*/

//exports.start = function start() {
//    app.listen(portNumber);
//}














