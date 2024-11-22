const prisma = require("../config/prisma");
const createError = require("../utils/createError")
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});



exports.searchText = async (req, res, next) => {
  try {
    console.log(req.query);
    const { value } = req.query;
    console.log(value)
    if (!value) {
      return res.status(400).json({ message: 'Search text is required' });
    }

    const search = await prisma.product.findMany({
      where: {
        name: {
          contains: value,
        }
      },
      include: {
        productCategory: true,
        productImage: true,
      },
    });
    console.log(search)
    if (search.length === 0) {
      return res.status(204).json("product not found")
    }
    res.json(search);
  } catch (err) {
    next(err);
  }
};


exports.searchFilter = async (req, res, next) => {
  try {
    console.log(req.query, "search filter")
    const { price, playTime, playerMin, playerMax, productCategory } = req.query;
    console.log(typeof playTime)

    const products = await prisma.product.findMany({
      where: {

        productCategoryId: {
          in: productCategory.map((id) => Number(id))
        },
        time: {
          lte: +playTime
        },
        price: {
          lte: +price
        },
        player_min: {
          gte: +playerMin
        },
        player_max: {
          lte: +playerMax
        },

      },
      include: {
        productCategory: true,
        productImage: true,
      },
    });
    console.log("db", products)
    res.json(products);
  } catch (err) {
    next(err)
  }
}

exports.searchCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)

    if (id == "ALL") {
      const productCategory = await prisma.product.findMany({
        include: {
          productCategory: true,
          productImage: true,
        },
      })
      return res.json(productCategory)
    }

    const productCategory = await prisma.product.findMany({
      where: {
        productCategoryId: Number(id)
      },
      include: {
        productCategory: true,
        productImage: true,
      },
    })
    res.json(productCategory)
  } catch (err) {
    next(err)
  }
}

exports.productDetail = async (req, res, next) => {
  try {
    const { id } = req.params
    const productdetail = await prisma.product.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        productCategory: true,
        productImage: true,
      },
    });
    res.json(productdetail)
  } catch (err) {
    next(err)
  }
}

exports.getAllProducts = async (req, res, next) => {
  try {
    const getProductData = await prisma.product.findMany({
      include: {
        productCategory: true,
        productImage: true,
      },
    })
    res.json(getProductData)
  } catch (err) {
    next(err)
  }
}


exports.createImage = async (req, res, next) => {
  try {
    console.log("image", req.file)
    const imageData = await cloudinary.uploader.upload(req.file.path, {
      chunk_size: 6000000,
      public_id: Date.now(),
      resource_type: "auto",
      folder: "productDataSet"
    });

    res.json(imageData);
  } catch (err) {
    next(err);
  }
};

exports.removeImage = async (req, res, next) => {
  try {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (result) => {
      res.send(result);
    });

  } catch (err) {
    next(err)
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await prisma.productCategory.findMany()
    res.json({ category })
  } catch (err) {
    next(err)
  }
};

exports.searchByProductId = async (req, res, next) => {
  try {
    const { id } = req.params
    const productData = await prisma.product.findFirst({
      where: {
        id: Number(id)
      }, include: {
        productCategory: true,
        productImage: true,
      },
    })
    res.status(200).json(productData)
  } catch (err) {
    next(err)
  }
}