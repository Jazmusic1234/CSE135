const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/api/static_perform").get(controllers.getAllStaticAndPerform).post(controllers.postStaticAndPerform);
router
 .route("/api/static_perform/:id")
 .get(controllers.getStaticAndPerform)
 .put(controllers.updateStaticAndPerform)
 .delete(controllers.deleteStaticAndPerform);

 router.route("/api/activity").get(controllers.getAllActivity).post(controllers.postActivity);
router
 .route("/api/activity/:id")
 .get(controllers.getActivity)
 .put(controllers.updateActivity)
 .delete(controllers.deleteActivity);
module.exports = router;
