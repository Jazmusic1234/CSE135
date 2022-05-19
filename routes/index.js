const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/static_perform/posts").get(controllers.getAllStaticAndPerform).post(controllers.postStaticAndPerform);
router
 .route("/static_perform/posts/:id")
 .get(controllers.getStaticAndPerform)
 .delete(controllers.deleteStaticAndPerform);

 router.route("/activity/posts").get(controllers.getAllActivity).post(controllers.postActivity);
router
 .route("/activity/posts/:id")
 .get(controllers.getActivity)
 .delete(controllers.deleteActivity);
module.exports = router;
