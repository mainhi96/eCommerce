import db from '../dbConnection.js';
import User from './userModel.js';
const  Order1 = {

	 findList(con){
    return new Promise ((resolve, reject) => {
      console.log ("-----------------");
      console.log(con);
   var sql = "select  userInfo.name as userName, orders.* from users seller , orders , users userInfo  where seller.email = '" + con + "'  and seller.ID = orders.seller and userInfo.ID= orders.userID; ";
  // const products = await Product1.findList({category: category, name: name,seller: seller, price : max,rating: rating });
   console.log (sql);
      return db.query(sql, function (error, results, fields) {
        console.log ("------------rrr-----");
        console.log(results);
        if (error) throw error;
        resolve(results)
      });
      // ...  
    })

  },
  findHistory(userID){
    return new Promise ((resolve, reject) => {

   var sql = "select *  from orders where userID  = '" +userID+"'";
   console.log (sql);
      return db.query(sql, function (error, results, fields) {

        if (error) throw error;
        resolve(results)
      });
      // ...  
    })


  },
  reportUser(){
    return new Promise ((resolve, reject) => {

   var sql = "select count(*) as numUsers from users where isAdmin  = '0' and isSeller = '0'; ";
   console.log (sql);
      return db.query(sql, function (error, results, fields) {

        if (error) throw error;
        resolve(results)
      });
      // ...  
    })


  },
  reportOrder(){
    return new Promise ((resolve, reject) => {

   var sql = "SELECT count(*) as numOrders, sum(totalPrice) as totalSales from orders o";
   console.log (sql);
      return db.query(sql, function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        resolve(results)
      });
      // ...  
    })
  },

  dailyOrder(){
    return new Promise ((resolve, reject) => {

   var sql = "SELECT Date(createAt) as _id, count(*) as orders, sum(totalPrice) as sales from orders o group by createAt";
   console.log (sql);
      return db.query(sql, function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        resolve(results)
      });
      // ...  
    })
  },

  productCategory(){
    return new Promise ((resolve, reject) => {

   var sql = "SELECT category as _id, count(*) as count FROM orderItems oi LEFT JOIN products p ON oi.productID = p.ID group by category;";
   console.log (sql);
      return db.query(sql, function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        resolve(results)
      });
      // ...  
    })
  },


  countList(con){
    return new Promise ((resolve, reject) => {
      console.log ("-----------------");
      console.log(con);
   var sql = "select count(*) from products where 1 = 1 ";
  // const products = await Product1.findList({category: category, name: name,seller: seller, price : max,rating: rating });

   if (con.category) sql = sql + "and category = '" + con.category + "'";
   if (con.name) sql = sql + "and name = '" + con.name + "'";
   if (con.seller) sql = sql + "and brand = '" + con.seller + "'";
   if (con.price) sql = sql + "and price < '" + con.price + "'";
   if (con.rating) sql = sql + "and rating > '" + con.rating + "'";
 console.log ("------------rrr-----");
 console.log (sql);
      return db.query(sql, function (error, results, fields) {
        console.log ("------------rrr-----");
        if (error) throw error;
        resolve(results)
      });
      // ...  
    })

  },
  findCategories(){
    return new Promise ((resolve, reject) => {
      console.log("!!!!!!!!!");
      var sql = "select DISTINCT category from products" ;
      console.log(sql);
      return db.query(sql, function (error, results, fields) {
        if (error) throw error;

      const data = JSON.parse(JSON.stringify(results))
     //const data =  JSON.parse(results);
     //console.log(">> json: ", data);

     const array = [];

    data.forEach(function(element) {
      console.log(element.category);
      array.push(element.category)
    });
  
     
    //    console.log(data);

        resolve(array)
      });
      // ...  
    })
   

   // connection.release();

    // let data ;
    //  await db.connect(  async function(err) {
    //         if (err) ;
    //         var sql = "select * from user where email= '"+ [id.email] +"'" ;
           

    //        return  await db.query(sql, function(err, results) {
    //           if (err) ;
    //           console.log("aaaaa 2222");
    //           console.log(results);
    //           data = results;
    //           //return results;
    //         })
    //   });

    //   return {
    //     status : 999,
    //     data : data
    //   }
	//	return db.query("select * from user where email=?",[id.email],callback);
	// },
	// addSV:function(sinhvien,callback){
	// 	return db.query("Insert into sinhvien(name,class,dob) values(?,?,?)",[sinhvien.name,sinhvien.class,sinhvien.dob],callback);
	// },
	// deleteSV:function(id,callback){
	// 	return db.query("delete from sinhvien where Id=?",[id],callback);
	// },
	// updateSV:function(id,sinhvien,callback){
	// 	return db.query("update sinhvien set name=?,class=?,dob=? where Id=?",[sinhvien.name,sinhvien.class,sinhvien.dob,id],callback);
	// }
    },
    findOrder(id){
      return new Promise ((resolve, reject) => {
        var sql = "select * from orders where orderID = '" + [id] + "'" ;

        return db.query(sql, function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });
        // ...  
      })},

      findShippingAddress(id){
        return new Promise ((resolve, reject) => {
          var sql = "select * from shippingAddress where orderID = '" + [id] + "'" ;
  
          return db.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
          });
          // ...  
        })},

        findorderItems(id){
          return new Promise ((resolve, reject) => {
            var sql = "select * from orderItems where orderID = '" + [id] + "'" ;
    
            return db.query(sql, function (error, results, fields) {
              if (error) throw error;
              resolve(results)
            });
            // ...  
          })},
      createOrder(order){
  
       // const seller = User1.findSeller(product.brand);
       var sqlOrder = "Insert into orders(paymentMethod,totalPrice, userID,itemsPrice,shippingPrice ,taxPrice ,seller) values('"
       + order.paymentMethod  +"','"+ order.totalPrice  +"','"+ order.user+"','"+  order.itemsPrice+"','"+ order.shippingPrice+"','"+ order.taxPrice+"','"+ order.seller+"')" ;
        console.log ("INSERT");
        console.log(sqlOrder);
        return new Promise ((resolve, reject) => {
          
          return db.query(sqlOrder, function (error, results, fields) {
        
            if (error) throw error;
            resolve(results)
          });
          // ...  
        })
      },
      createShippingAddress(shippingAddress){
          console.log(shippingAddress);
        // const seller = User1.findSeller(product.brand);
        var sqlOrder = "Insert into shippingAddress (address,city,postalCode,country,orderID,fullName) values('"
        + shippingAddress.address  +"','"+ shippingAddress.city  +"','"+ shippingAddress.address+"','"+  shippingAddress.country+"','"+ shippingAddress.orderID+"','"+ shippingAddress.fullName+"')" ;

         return new Promise ((resolve, reject) => {
           
           return db.query(sqlOrder, function (error, results, fields) {
             if (error) throw error;
             resolve(results)
           });
           // ...  
         })
       },
       createOrderItems(orderItems){
        console.log ("INSERT");

        console.log(orderItems.product);
      // const seller = User1.findSeller(product.brand);
 
      var sqlOrder = "Insert into orderItems (orderID,productID,qty,price,name,image) values('"
      + orderItems.orderID  +"','"+ orderItems.product  +"','"+ orderItems.qty+"','"+  orderItems.price+"','"+ orderItems.name+"','"+ orderItems.image+"')" ;
       console.log ("INSERT");
       console.log(sqlOrder);
       return new Promise ((resolve, reject) => {
         
         return db.query(sqlOrder, function (error, results, fields) {
           if (error) throw error;
           resolve(results)
         });
         // ...  
       })
     },
       
      updateDelivery(order){
       
        return new Promise ((resolve, reject) => {
        
            console.log(order);
          
          var sql = "update orders set isDelivered = '1' , deliveredAt ='" + order.deliveredAt+ "' where orderID='"+ order[0].orderID +"'" ;
            console.log(sql);
          return db.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
          });
          });
          // ...  
        },
        updatePaid(order){
       
          return new Promise ((resolve, reject) => {
            console.log("-----------------");
          
              console.log(order);
            
            var sql = "update orders set isPaid = '1' , paidAt ='" + order.paidAt+ "' where orderID='"+ order[0].orderID +"'" ;
              console.log(sql);
            return db.query(sql, function (error, results, fields) {
              if (error) throw error;
              resolve(results)
            });
            });
            // ...  
          },
        deleteProduct(product){
          return new Promise ((resolve, reject) => {
            console.log("DELETE");
            console.log(product);
            var sql = "delete from products where ID='" + product +"'" ;
            return db.query(sql, function (error, results, fields) {
              if (error) throw error;
              resolve(results)
            });
            // ...  
          })}
};
export default Order1

  