const express = require("express"); 
const app = express(); 
const bodyParser = require("body-parser");
const cors = require('cors')
const portNumber = process.env.PORT || 5000;

const path = require("path");


process.stdin.setEncoding("utf8");


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");


app.use(express.static(__dirname + '/public'));

let status = "None";




app.post("/signUp", async (request, response) => {
    

    let {username, password} = request.body;

    try{
        result = await createUser(client, databaseAndCollection, username, password);
    }
    catch (err) {
        console.error(err);
    }
    

    response.redirect("/");
});




app.post("/login", async (request, response) => {
    let {username, password} = request.body;

   
    try {
        result = await loginUser(client, databaseAndCollection, username, password);
    }
    catch (err) {
        console.error(err);
    }

    if (result) {
        //process.stdout.write(JSON.stringify(result));
        status = result["username"];
        //status = "TEST";
    } else {
        process.stdout.write("\nUser Doesn't Exist\n");
        status = "User Doesn't Exist";
    }
    

    response.redirect("/");
});

process.stdout.write("\nApplication listening on port: " + portNumber + "\n");
app.listen(portNumber);





//////// Mongo Setup


require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') }) 

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION};

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${username}:${password}@cluster0.zsgbhxu.mongodb.net/?retryWrites=true&w=majority`

console.log(uri);
console.log("pass: " + password);
console.log("user: "+ username);


let client = null;

try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
}
catch (err) {
    let msg = err.message;
    process.stdout.write(msg);
    console.error(err);
    process.exit(1);
}




let launchData = "";

async function main() {
    await client.connect();
    let launchResponse = await fetch("https://api.spacexdata.com/v5/launches/latest");
    launchData = await launchResponse.json();
}


main().catch(console.error);





app.get("/", (request, response) => {
    let baseURL = "http://" + request.get('host');
    //let baseURL = request.url;
    //process.stdout.write(String(baseURL) + "\n");
    //console.log("hello world");

    let variables = {}

    try {
        variables = {
            'login': baseURL + "/login",
            'signUp': baseURL + "/signUp",
            'status': status,
            'launchData' : "SpaceX Crew Members: " + launchData["crew"].length
        }
    }

    catch (err) {
        variables = {
            'login': baseURL + "/login",
            'signUp': baseURL + "/signUp",
            'status': status,
            'launchData' : "SpaceX Crew Members: " + "API Error"
        }
    }
    

    process.stdout.write("\nSpaceX Raw Data:\n" + JSON.stringify(launchData));

    response.render("index", variables);
});




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
























