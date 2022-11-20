const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const cloudinary = require("cloudinary");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  try {
    const { img, ...others } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(img, {
      folder: "products",
    });
    const newProduct = new Product({
      img: { public_id: myCloud.public_id, url: myCloud.secure_url },
      ...others,
    });
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { img } = req.body;
    const product = await Product.findById(req.params.id);
    await cloudinary.v2.uploader.destroy(product.img.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(img, {
      folder: "products",
    });
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        img: { public_id: myCloud.public_id, url: myCloud.secure_url },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await cloudinary.v2.uploader.destroy(product.img.public_id);
    await product.remove();
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
