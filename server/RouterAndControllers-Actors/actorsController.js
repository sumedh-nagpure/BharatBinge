const jwt = require("jsonwebtoken");
let axios = require("axios");
const { ObjectId } = require("mongoose").Types;
const actorsController = {
  getAllActors: async (req, res) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/actors/list-most-popular-celebs",
      params: {
        homeCountry: "US",
        currentCountry: "US",
        purchaseCountry: "US",
      },
      headers: {
        "X-RapidAPI-Key": "f9fd236fb1mshfe7589a2df18cc7p1e0e74jsn33f548b8dec4",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        res.json({
          status: true,
          data: response.data,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  getInformation: async (req, res) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/actors/get-bio",
      params: { nconst: "nm0001667" },
      headers: {
        "X-RapidAPI-Key": "f9fd236fb1mshfe7589a2df18cc7p1e0e74jsn33f548b8dec4",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        res.json({
          status: true,
          data: response.data,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};

module.exports = actorsController;
