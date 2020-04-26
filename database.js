import mongoose from "mongoose";
mongoose.connect(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@ds111063.mlab.com:11063/covid-19`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", function () {
    console.log("Database is Opened");
    return db;
});