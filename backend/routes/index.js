const express = require("express");
const router = express.Router();
const buttonRoutes = require("./buttonRoutes");
// const listingRouter = require("./listing");
// const builderRouter = require("./builder");
// router.use("/listing", listingRouter);
// router.use("/builder", builderRouter);

router.use("/buttons", buttonRoutes);
module.exports = router;
