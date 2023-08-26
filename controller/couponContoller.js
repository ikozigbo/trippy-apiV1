const Coupon = require("../model/couponModel");
const asyncHandler = require("express-async-handler");

const createCoupon = async (req, res) => {
  try {
    //console.log(req);
    const newCoupon = await Coupon.create(req.body);
    res.status(200).json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
};

const getOneCoupon = async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const coupon = await Coupon.findById(id);
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
};

const updateCoupon = async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getOneCoupon,
  updateCoupon,
  deleteCoupon,
};
