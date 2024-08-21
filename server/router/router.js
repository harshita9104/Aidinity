const router = require("express").Router();
const authController = require("../controllers/user/auth");
const campController = require("../controllers/fcamps/campaigncontroller");
const expController = require("../controllers/anonexpressions/expressioncontroller");
const payController = require("../controllers/payments/paymentcontroller");
const authenticate = require("../middleware/authenticate");

// User authentication routes
router.post("/register", authController.register); // User registration
router.post("/login", authController.login); // User login
router.get("/logout", authenticate, authController.logout); // User logout

// Campaign routes
router.post("/newcampaign", authenticate, campController.createNewCampaign); // Create new campaign
router.get("/allcamps", campController.getAllCampaigns); // Get all campaigns
router.get("/findcamp/:id", campController.findCampaign); // Find a campaign by ID
router.get("/finishcamp/:id", authenticate, campController.finishCampaign); // Finish a campaign

// Expression routes
router.post("/newexpression", authenticate, expController.newExpression); // Create new expression
router.get("/allexps", expController.getAllExps); // Get all expressions
router.get("/findexpression/:id", expController.findExpression); // Find an expression by ID
router.get(
  "/deleteexpression/:id",
  authenticate,
  expController.deleteExpression
); // Delete an expression by ID
router.post("/addcomment", authenticate, expController.addComment); // Add a comment to an expression
router.post("/deletecomment", authenticate, expController.deleteComment); // Delete a comment from an expression

// Payment routes
router.post("/createpayment", payController.createPayment); // Create a payment
router.post("/paymentdetails", payController.payDetails); // Get payment details
router.post("/confirmpayment", campController.confirmPayment); // Confirm a payment

// User check route
router.get("/checkuser", authenticate, (req, res) => {
  res.send(req.rootUser);
});

module.exports = router;
