const router = require("express").Router();
const {
  createCoupon,
  getOneCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponContoller");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");

router.post("/create", userAuth, isAdmin, createCoupon);
router.put("/update/:id", userAuth, isAdmin, updateCoupon);
router.get("/one/:id", userAuth, isAdmin, getOneCoupon);
router.get("/all", userAuth, isAdmin, getAllCoupons);
router.delete("/delete/:id", userAuth, isAdmin, deleteCoupon);

module.exports = router;
