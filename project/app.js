const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { environment } = require('./config');
const indexRouter = require('./routes/index.js');
const projectRouter = require('./routes/projectList.js');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
app.use(projectRouter);
app.use(indexRouter);


//catch unhandled requests and forwawrd to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    next(err);
});

//generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
