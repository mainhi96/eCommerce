import db from '../dbConnection.js';
const  Product1 = {

	 findList(con){
    return new Promise ((resolve, reject) => {
      console.log ("-----------------");
      console.log(con);
   var sql = "select * from products where 1 = 1 ";
 
   if (con.category) sql = sql + "and category = '" + con.category + "'";
   if (con.name) sql = sql + "and name like  '%" + con.name + "%'";
   if (con.seller) sql = sql + "and brand = '" + con.seller + "'";
   if (con.price) sql = sql + "and price < '" + con.price + "'";
   if (con.rating) sql = sql + "and rating > '" + con.rating + "'";
   console.log (sql);
      return db.query(sql, function (error, results, fields) {
        console.log ("------------rrr-----");
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
    findProduct(id){
      return new Promise ((resolve, reject) => {
        var sql = "select * from products where ID = '" + [id] + "'" ;

        return db.query(sql, function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });
        // ...  
      })},
      createProduct(product){
        product.name = req.body.name;
        product.price  = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInstock = req.body.countInstock;
        product.description = req.body.description;
        const seller = User1.findSeller(product.brand);
       var sql = "Insert into products(name,price,image,category,brand,countInstock,description,seller,rating,reviews,numReviews) values('"
       + product.name  +"','"+ product.name  +"','"+ product.price+"','"+  product.category+"','"+ product.brand+"','"+ product.countInstock+"','"+ product.description+"','"+ seller+"',null, null, null)" ;
        console.log ("INSERT");
        console.log(sql);
        return new Promise ((resolve, reject) => {
          
          return db.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log("ssssss");
            console.log(fields);
            resolve(results)
          });
          // ...  
        })
      },
      updateProduct(product){
       
        return new Promise ((resolve, reject) => {
        
            console.log(product);
          
          var sql = "update products set name= '"+ product.name+"',price='"+ product.price +"',image='"+ product.image+"',category='"+ product.category
          +"',brand='"+ product.brand +"',countInstock='"+ product.countInstock+"',description='"+ product.description +"' where ID='"+ product.ID +"'" ;
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
            var sql = "update products set countInstock = 0 where ID='" + product +"'" ;
            return db.query(sql, function (error, results, fields) {
              if (error) throw error;
              resolve(results)
            });
            // ...  
          })}
};
export default Product1

  