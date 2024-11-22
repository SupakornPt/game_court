const prisma = require("../config/prisma")

exports.createProduct = async (req, res, next) => {
  console.log("re.body", req.body)
  try {
    const categoryId = await prisma.productCategory.findFirst({
      where: {
        id: Number(req.body.productCategoryId)
      }
    })
    console.log("categoryId", categoryId)
    delete req.body.category
    req.body.categoryId = categoryId.id
    console.log("product", req.body.categoryId)
    let data = {
      name: req.body.name,
      player_min: Number(req.body.player_min),
      player_max: Number(req.body.player_max),
      time: Number(req.body.time),
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      detail: req.body.detail,
      productCategoryId: Number(categoryId.id)
    }
    const product = await prisma.product.create({
      data
    })
    const { id } = product
    const productImage = await prisma.productImage.create({
      data: {
        url: req.body.imageUrl,
        productId: id
      }
    })
    res.json({ message: "Product already created" })
  } catch (err) {
    next(err)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    console.log("updateproduct", req.body)
    const { name, player_min, player_max, time, price, stock, detail, productCategoryId, imageUrl } = req.body

    const { id } = req.params
    console.log("id", id)

    const image = await prisma.productImage.findFirst({
      where: {
        url: imageUrl[0]
      }
    })
    if (!image) {
      const image = await prisma.productImage.findFirst({
        where: {
          productId: +id
        }
      })
      if (image) {
        await prisma.productImage.delete({
          where: {
            id: Number(image.id)
          }
        })
      }
    }
    const editData = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        player_min: Number(player_min),
        player_max: Number(player_max),
        time: Number(time),
        price: Number(price),
        stock: Number(stock),
        detail,
        productCategoryId: Number(productCategoryId),
        productImage: {
          create: {
            url: imageUrl[0]
          }
        }
      }
    })
    res.status(200).json({ mdessage: "Hello update" })
  } catch (err) {
    next(err)
  }
}


exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;


    await prisma.productImage.deleteMany({
      where: {
        productId: Number(id)
      }
    });


    await prisma.product.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};