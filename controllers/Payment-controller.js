const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const fs = require("fs/promises");
const cloudinary = require("../config/cloudinary");
const path = require("path");

exports.paymentByQR = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bankData = await prisma.paymentMethod.findMany({});
    res.json(bankData);
  } catch (err) {
    next(err);
  }
};
exports.createPayment = async (req, res, next) => {
  try {
    const { profileData } = req.body;

    const { id, ...newProfileData } = JSON.parse(profileData);
    const { orderId } = req.params;
    const haveFile = !!req.file;

    let uploadResult = {};

    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name,
      });
      fs.unlink(req.file.path);
    }
    const data = {
      orderId: Number(orderId),
      slipUrl: uploadResult.secure_url || "",
    };

    const userId = req.user.id;

    console.log("orderId", orderId);
    console.log("userId", userId);

    const isAddress = await prisma.address.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!isAddress) {
      // const profileData = {...address,userId:userId}

      await prisma.address.create({
        data: newProfileData,
      });
    }
    const isPayment = await prisma.payment.findFirst({
      where: {
        orderId: +orderId,
      },
    });
    if (isPayment) {
      createError(400, "OrderId is already exist.");
      return
    }
    const rs = await prisma.payment.create({ data: data });

    res.status(200).json({ rs });
  } catch (err) {
    next(err);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const haveFile = !!req.file;

    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name,
      });
      fs.unlink(req.file.path);
    }
    const data = {
      slipUrl: uploadResult.secure_url || "",
    };
    const rs = await prisma.payment.update({
      where: {
        orderId: Number(orderId)
      },
      data: {
        slipUrl: data.slipUrl,
        statuspayment: "PENDING",
      },
    });
    res.status(200).json(rs)
  } catch (err) {
    next(err)
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { totalPrice, productSet } = req.body;
    const userId = req.user.id;

    const newOrder = await prisma.order.create({
      data: {
        totalPrice: totalPrice,
        userId: userId,
      },
    });
    const newOrderProduct = await prisma.orderProduct.createMany({
      data: productSet.map((product) => ({
        quantity: product.quantity,
        productId: product.productId,
        orderId: newOrder.id,
      })),
    });
    res.status(201).json({ newOrder });
  } catch (err) {
    next(err);
  }
};

exports.findOrderByID = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { orderid } = req.params;
    const getOrderId = await prisma.order.findUnique({
      where: {
        id: Number(orderid),
      },
    });
    if (userId !== getOrderId.userId) {
      return res.json({ message: "Unmatch userId" });
    }
    const getAddress = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        address: true,
      },
    });
    res.json({ getOrderId, getAddress });
  } catch (err) {
    next(err);
  }
};
