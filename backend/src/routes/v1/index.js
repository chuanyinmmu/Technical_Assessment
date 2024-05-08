const express = require("express");
const uploadRoute = require("./upload.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/upload",
    route: uploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
