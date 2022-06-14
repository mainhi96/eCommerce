// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
// import data from '../data.js';
// import User from '../models/userModel.js';
// import { generateToken, isAdmin, isAuth } from '../utils.js';

// const userRouter = express.Router();

// userRouter.get(
//   '/top-sellers',
//   expressAsyncHandler(async (req, res) => {
//     const topSellers = await User.find({ isSeller: true })
//       .sort({ 'seller.rating': -1 })
//       .limit(3);
//     res.send(topSellers);
//   })
// );

// userRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//     // await User.remove({});
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
//   })
// );

// userRouter.post(
//   '/signin',
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         res.send({
//           ID: user.ID,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           isSeller: user.isSeller,
//           token: generateToken(user),
//         });
//         return;
//       }
//     }
//     res.status(401).send({ message: 'Invalid email or password' });
//   })
// );

// userRouter.post(
//   '/register',
//   expressAsyncHandler(async (req, res) => {
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 8),
//     });
//     const createdUser = await user.save();
//     res.send({
//       ID: createdUser.ID,
//       name: createdUser.name,
//       email: createdUser.email,
//       isAdmin: createdUser.isAdmin,
//       isSeller: user.isSeller,
//       token: generateToken(createdUser),
//     });
//   })
// );

// userRouter.get(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       res.send(user);
//     } else {
//       res.status(404).send({ message: 'User Not Found' });
//     }
//   })
// );
// userRouter.put(
//   '/profile',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user.ID);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       if (user.isSeller) {
//         user.seller.name = req.body.sellerName || user.seller.name;
//         user.seller.logo = req.body.sellerLogo || user.seller.logo;
//         user.seller.description =
//           req.body.sellerDescription || user.seller.description;
//       }
//       if (req.body.password) {
//         user.password = bcrypt.hashSync(req.body.password, 8);
//       }
//       const updatedUser = await user.save();
//       res.send({
//         ID: updatedUser.ID,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//         isSeller: user.isSeller,
//         token: generateToken(updatedUser),
//       });
//     }
//   })
// );

// userRouter.get(
//   '/',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const users = await User.find({});
//     res.send(users);
//   })
// );

// userRouter.delete(
//   '/:id',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       if (user.email === 'admin@example.com') {
//         res.status(400).send({ message: 'Can Not Delete Admin User' });
//         return;
//       }
//       const deleteUser = await user.remove();
//       res.send({ message: 'User Deleted', user: deleteUser });
//     } else {
//       res.status(404).send({ message: 'User Not Found' });
//     }
//   })
// );

// userRouter.put(
//   '/:id',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.isSeller = Boolean(req.body.isSeller);
//       user.isAdmin = Boolean(req.body.isAdmin);
//       // user.isAdmin = req.body.isAdmin || user.isAdmin;
//       const updatedUser = await user.save();
//       res.send({ message: 'User Updated', user: updatedUser });
//     } else {
//       res.status(404).send({ message: 'User Not Found' });
//     }
//   })
// );

// export default userRouter;


import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import User1 from '../userd.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import { useDebugValue } from 'react';

const userRouter = express.Router();

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User1.findTopSeller()
    console.log('top ne',topSellers);
    res.send(topSellers);
  })
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });ç
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {


// const user = new Promise(function() {
//    return User1.findOne({ email: req.body.email })
// });
console.log(req.body.email);

var user = await User1.findOne(req.body.email );


    if (user.password == req.body.password) {
      console.log("FIND 444");
      console.log(user);
     
        res.send({
          ID: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      
  
    }
    res.status(401).send({ message: 'Invalid email or password' });
  
  })
);
 

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: bcrypt.hashSync(req.body.password, 8),
    // });
    // const createdUser = await user.save();
    // res.send({
    //   ID: createdUser.ID,
    //   name: createdUser.name,
    //   email: createdUser.email,
    //   isAdmin: createdUser.isAdmin,
    //   isSeller: user.isSeller,
    //   token: generateToken(createdUser),
    // });
   // var sql = "Insert into users(name,email,password values('"+ req.body.name +"','"+ req.body.email +"','"+ req.body.password +"'" ;
   // console.log("aaaaaaaaaaaaaaaaaa");
    //console.log(sql);
      console.log(req)
    //const save = await User1.resgister({ name: req.body.name,email: req.body.email, password: req.body.password });
    const user1 = await User1.resgister(req.body);
    if (user1)
    var user= await User1.findOne(req.body.email );
      console.log(user)


   
     
        res.send({
          ID: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });

      

 


  })
);

userRouter.get(
  '/:email',
  expressAsyncHandler(async (req, res) => {
    console.log("AAAAA")
      console.log(req.params);
     
     const user = await User1.findOne(req.params.email);

    if (user) {
      res.send({
        ID: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user),
      });

    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
  
);
userRouter.get(
  '/A/:userID',
  expressAsyncHandler(async (req, res) => {
    console.log("AAAAA2222222")
      console.log(req.params);
     
     const user = await User1.findByID(req.params.userID);

    if (user) {
      res.send({
        ID: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user),
      });

    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
  
);
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("USERRR2222");

    console.log(req.body);
    var user = await User1.findOne(req.body.email);
    console.log(user);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
    
      // if (user.isSeller) {
      //   user.seller.name = req.user.sellerName || user.seller.name;
      //   user.seller.logo = req.user.sellerLogo || user.seller.logo;
      //   user.seller.description =
      //     req.user.sellerDescription || user.seller.description;
      // }
      if (req.body.password) {
        user.password = req.body.password;
      }
      console.log("USERRR2222");

    console.log(user);
    const updatedUser = await User1.updateProfile(user);
      var user = await User1.findOne(req.body.email);
      
      var userRes = await User1.findOne(req.body.email);
      console.log("Updateed");
      console.log(userRes);
      res.send({
        ID: userRes.ID,
        name: userRes.name,
        email: userRes.email,
        isAdmin: userRes.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(userRes),
      });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User1.find({});
  
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User1.findByID(req.body.ID);
    console.log("-----------");

    console.log(req); 
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await User1.deleteUser(user.ID);
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log("-----------");
    console.log(req.body);
    const user = await User1.findByID(req.body.ID);
 

    console.log(user); 
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await User1.updateUser(user);
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
