const Joi = require("joi");

const Order = require("../model/order.model");

const orderSchema = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.string().required(),
  OrderedBy: Joi.string().required(),

});

const createOrder = async (req, res, next) => {
    req.body.OrderedBy=req.user._id
  try {
    const { error, value } = orderSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (!error) {
      await Order.create(value);
      res.status(200).send({ message: "orederd  created sucessfully" });
    } else {
      next(error);
    }
  } catch (err) {
    next(err);
  }
};
module.exports={
    createOrder,
    
}