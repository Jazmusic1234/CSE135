const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/static_perform").get(controllers.getAllStaticAndPerform).post(controllers.postStaticAndPerform);
router
 .route("/static_perform/:id")
 .get(controllers.getStaticAndPerform)
 .put(controllers.updateStaticAndPerform)
 .delete(controllers.deleteStaticAndPerform);

 router.route("/activity").get(controllers.getAllActivity).post(controllers.postActivity);
router
 .route("/activity/:id")
 .get(controllers.getActivity)
 .put(controllers.updateActivity)
 .delete(controllers.deleteActivity);
module.exports = router;
