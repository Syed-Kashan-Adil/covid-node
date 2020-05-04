import mongoose from "mongoose";
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@covid-19-23xiy.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", function () {
    console.log("Database is Opened");
    return db;
});