const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");
const foreCast = require("../src/Utils/weather.js");
const geocode = require("../src/Utils/geocode.js");

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for Express Config
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");
const publicDirectoryPath = path.join(__dirname, "..", "/public");

console.log(viewsPath);
// Setup HandleBars Engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
// hbs.registerPartials(partialsPath);
hbs.registerPartials(partialsPath);

// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Location not found",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.render("404", {
            title: "Location Error",
            errorMessage: `Cannot Find ${req.query.address}`,
          });
        } else {
          foreCast(latitude, longitude, (error, { current }) => {
            res.send({
              weather: current,
              location: location,
            });
          });
        }
      }
    );
  }
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Adnan Ghzzaal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Adnan Ghzzaal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Adnan Ghzzaal",
    helpText: "Please email me at adnanghazzaal@gmail.com for any suggestions",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help Article Not Found",
    title: "404",
    name: "Adnan Ghazzaal",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404 Page Not Found",
    title: "404",
    name: "Adnan Ghazzaal",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
