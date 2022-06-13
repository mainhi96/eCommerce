import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import Product1 from '../models/productd.js';
import User1 from '../userd.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    console.log("get /");
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { ID: -1 };
    // const count = await Product.count({
    //   ...sellerFilter,
    //   ...nameFilter,
    //   ...categoryFilter,
    //   ...priceFilter,
    //   ...ratingFilter,
    // });
    // const products = await Product.find({
    //   ...sellerFilter,
    //   ...nameFilter,
    //   ...categoryFilter,
    //   ...priceFilter,
    //   ...ratingFilter,
    // })

      // .populate('seller', 'seller.name seller.logo')
      // .sort(sortOrder)
      // .skip(pageSize * (page - 1))
      // .limit(pageSize);
   
      const products = await Product1.findList({category: category, name: name,seller: seller, price : max,rating: rating });
     //\\const count = await Product1.countList({category: categoryFilter});
     const count = await Product1.findList({category: category, name: name,seller: seller, price : max,rating: rating });;

    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
      console.log("get /");
    const categories = await Product1.findCategories();
    console.log(categories);
    res.send(categories);
  })
);

// productRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//     // await Product.remove({});
//     const seller = await User.findOne({ isSeller: true });
//     if (seller) {
//       const products = data.products.map((product) => ({
//         ...product,
//         seller: seller.ID,
//       }));
//       const createdProducts = await Product.insertMany(products);
//       res.send({ createdProducts });
//     } else {
//       res
//         .status(500)
//         .send({ message: 'No seller found. first run /api/users/seed' });
//     }
//   })
// );

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    var product = await Product1.findProduct(req.params.id);
    if (product) {
      console.log("FIND 222");
      console.log(product[0].brand);
      const seller = await User1.findSeller(product[0].brand);
      product[0].seller = seller[0];
      console.log("FIND 33");
      console.log(product[0]);

      res.send(product[0]);
      
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req);

    var product =
    {
      ID : req.user.ID,
      name : req.user.name,
     price : req.user.price,
      image : req.user.image,
      category : req.user.category,
      brand : req.user.brand,
     countInstock : req.user.countInstock,
      description : req.user.description
    }
      const createdProduct = await Product1.createProduct(product);
    res.send({ message: 'Product Created', product: createdProduct });
  })
);
productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
  
    console.log("AAAAAAA");
   // const productId = req.body.ID;
    const product = await Product1.findProduct(req.body.ID);
    console.log(product);
    if (product) {
      product.ID = req.body.ID
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInstock = req.body.countInstock;
      product.description = req.body.description;
      const updatedProduct = await Product1.updateProduct(product);
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product1.findProduct(req.params.id);
    if (product) {
      const deleteProduct = await Product1.deleteProduct(req.params.id);
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

// productRouter.post(
//   '/:id/reviews',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (product) {
//       if (product.reviews.find((x) => x.name === req.user.name)) {
//         return res
//           .status(400)
//           .send({ message: 'You already submitted a review' });
//       }
//       const review = {
//         name: req.user.name,
//         rating: Number(req.body.rating),
//         comment: req.body.comment,
//       };
//       product.reviews.push(review);
//       product.numReviews = product.reviews.length;
//       product.rating =
//         product.reviews.reduce((a, c) => c.rating + a, 0) /
//         product.reviews.length;
//       const updatedProduct = await product.save();
//       res.status(201).send({
//         message: 'Review Created',
//         review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//       });
//     } else {
//       res.status(404).send({ message: 'Product Not Found' });
//     }
//   })
// );

export default productRouter;
