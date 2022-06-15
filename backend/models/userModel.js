import db from '../dbConnection.js';
const  User1 = {
	find:function(callback){
    return new Promise ((resolve, reject) => {
      var sql = "select * from users" ;
      return db.query(sql, function (error, results, fields) {
        if (error) throw error;
        resolve(results)
      });
      // ...  
    })
	},
	 findOne(email){
    return new Promise ((resolve, reject) => {
      var sql = "select * from users where email= '"+ [email] +"'" ;

      return db.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results[0]);
        resolve(results[0])
      });
      // ...  
    })

  },
  findSeller(name){
    return new Promise ((resolve, reject) => {
      console.log("FIND 444");
      console.log(name);
      var sql = "select * from sellers where name= '"+ name +"'" ;
      console.log("FIND 444");
      console.log(sql);
      return db.query(sql, function (error, results, fields) {
        if (error) throw error;
        const data = JSON.parse(JSON.stringify(results))
        resolve(data)
      });
      // ...  
    })

  },
  findByID(id){
    return new Promise ((resolve, reject) => {
      var sql = "select * from users where ID= '"+ [id] +"'" ;
      console.log(sql);
      return db.query(sql, function (error, results, fields) {
        if (error) throw error;
        resolve(results[0])
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
    findTopSeller(){
      return new Promise ((resolve, reject) => {
        var sql = "select * from sellers order by rating desc LIMIT 3" ;
        return db.query(sql, function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });
        // ...  
      })},
      resgister(user){
       var sql = "Insert into users(name,email,password) values('"+ user.name +"','"+ user.email +"','"+ user.password +"')" ;
        console.log("1111111111111111111");
          console.log(sql);
        return new Promise ((resolve, reject) => {
          
          return db.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
          });
          // ...  
        })
      },
      updateUser(user){
        var seller = 0;
           console.log(sql);
        if (user.ID) seller = 1;
        var sql = "update users set name= '"+ user.name +"',email='"+ user.email +"',isSeller='"+ seller +"' where ID='"+ user.ID +"'" ;
          console.log(sql);
        return new Promise ((resolve, reject) => {
          return db.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
          });
          });
          // ...  
        },
        updateProfile(user){
          console.log("LALAALA");
          console.log(user);
         
          var sql = "update users set name= '"+ user.name +"',email='"+ user.email +"',password='"+ user.password +"' where ID='"+ user.ID +"'" ;
            console.log(sql);
          return new Promise ((resolve, reject) => {
            return db.query(sql, function (error, results, fields) {
              if (error) throw error;
              resolve(results)
            });
            });
            // ...  
          },
        deleteUser(user){
          return new Promise ((resolve, reject) => {
            var sql = "delete from sinhvien where ID='" + user.ID +"'" ;
            return db.query(sql, function (error, results, fields) {
              if (error) throw error;
              resolve(results)
            });
            // ...  
          })}
};
export default User1
