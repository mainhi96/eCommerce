import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order1 from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  mailgun,
  payOrderEmailTemplate,
} from '../utils.js';


const orderRouter = express.Router();
orderRouter.get(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log("Aaaaaahgjghjgjghjghjgh");
    console.log(req.query);
    const seller = req.query.seller || '';

    console.log(req.query)

    const orders = await Order1.findList(seller )
    res.send(orders);
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
   
    const users1 = await Order1.reportUser();
    var users = {_id: null,numUsers: users1[0].numUsers };

    const orders1 = await Order1.reportOrder();
    var orders = {_id: null, numOrders: orders1[0].numOrders, totalSales: orders1[0].totalSales};
 
  
    var dailyOrders = await Order1.dailyOrder();
    console.log("ssssssssss");
    console.log(dailyOrders[1]._id);

    dailyOrders.map((x) => {
      x._id = x._id.getFullYear() +"-" + (x._id.getMonth()+1)+ "-"+ x._id.getDate();
    })

      console.log(dailyOrders[1]._id);
 

    const productCategories = await Order1.productCategory();
    console.log("ssssssssss");
    console.log(users);
    console.log(orders);
    console.log(dailyOrders);
    console.log(productCategories);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    const orders = await Order1.findHistory(req.user.ID );
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('ORDER!!!!');
   console.log(req);
   console.log("orderItems-----------------------------")
    console.log(req.body.orderItems);
    console.log("ShippingA-----------------------------")

    console.log(req.body.shippingAddress);
    console.log("payemnt-----------------------------");

    console.log(req.body.paymentMethod);

    console.log("itemP-----------------------------");

    console.log(req.body.itemsPrice);
    console.log("ShipPrice-----------------------------");

    console.log(req.body.shippingPrice,);
    console.log("TacPriceee-----------------------------");

    console.log(req.body.taxPrice);
    console.log("TotalPrrr-----------------------------");

    console.log(req.body.totalPrice);
    console.log("Userr-----------------------------");


   console.log(req.user);

  
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      
      const order = {
        seller: req.body.orderItems[0].seller.ID,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user.ID,
      };
      const createdOrder = await Order1.createOrder(order);
      const orderID = JSON.parse(JSON.stringify(createdOrder)).insertId;
      order.shippingAddress.orderID = orderID
     createdOrder.shippingAddress = await Order1.createShippingAddress(order.shippingAddress); 
  //    for (let index = 0; index < order.orderItems; ++index) {
  //     const element = orderItems[index];
     
  //     element.orderID = orderID;
  //     console.log(element);
  //     createdOrder.orderItems = await Order1.createOrderItems(element); 
  // }
  order.orderItems.forEach(async (element) => {
    element.orderID = orderID
    createdOrder.orderItems = await Order1.createOrderItems(element);
   
});
createdOrder._id = orderID
console.log("CREATED");
    console.log(createdOrder);
      
      
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {

    
    var order = await Order1.findOrder(req.params.id);
    order.shippingAddress = await Order1.findShippingAddress(req.params.id);
   order.orderItems = await Order1.findorderItems(req.params.id);
    // console.log("BEFORE");
    // console.log(order);
    // console.log("AFTER");
   var arrayToString = JSON.stringify(Object.assign({}, order));  // convert array to string
    var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
    
    console.log(stringToJsonObject);
    order = stringToJsonObject;
    if (order) {
        console.log("full box");

      console.log(order);
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  expressAsyncHandler(async (req, res) => {
      var order = await Order1.findOrder(req.params.id);
      console.log("-----------------");
      console.log(req.params);
      if (order) {
        order.isPaid = true;
  
  
  
        // current timestamp in milliseconds
  let ts = Date.now();
  
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  
  // prints date & time in YYYY-MM-DD format
  order.paidAt = year + "-" + month + "-" + date;

      const updatedOrder = await Order1.updatePaid(order);
      console.log(updatedOrder)
      try {
        mailgun()
          .messages()
          .send(
            {
              from: 'Amazona <amazona@mg.yourdomain.com>',
              to: `${order.user.name} <${order.user.email}>`,
              subject: `New order ${order.ID}`,
              html: payOrderEmailTemplate(order),
            },
            (error, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(body);
              }
            }
          );
      } catch (err) {
        console.log(err);
      }

      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  expressAsyncHandler(async (req, res) => {
    var order = await Order1.findOrder(req.params.id);
    console.log("-----------------");
    console.log(order);
    if (order) {
      order.isDelivered = true;



      // current timestamp in milliseconds
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
order.deliveredAt = year + "-" + month + "-" + date;
      const updatedOrder = await Order1.updateDelivery(order);
      var order = await Order1.findOrder(req.params.id);
      console.log("-----------------");
      console.log(order);
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
