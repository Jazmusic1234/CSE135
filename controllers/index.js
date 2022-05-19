const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllStaticAndPerform = (req, res, next) => {
 conn.query("SELECT * FROM static_perform", function (err, data, fields) {
   if(err) return next(new AppError(err))
   res.status(200).json({
     status: "success",
     length: data.length,
     data: data
   });
 });

};

exports.getAllActivity = (req, res, next) => {
 conn.query("SELECT * FROM activity", function (err, data, fields) {
   if(err) return next(new AppError(err))
   res.status(200).json({
     status: "success",
     length: data.length,
     data: data
   });
 });
};

exports.getStaticAndPerform = (req, res, next) => {
 if (!req.params.id) {
   return next(new AppError("Id not found", 404));
 }
 conn.query(
   "SELECT * FROM static_perform WHERE id = ?",
   [req.params.id],
   function (err, data, fields) {
     if (err) return next(new AppError(err, 500));
     res.status(200).json({
       status: "success",
       length: data.length,
       data: data
     });
   }
 );
};

exports.getActivity = (req, res, next) => {
 if (!req.params.id) {
   return next(new AppError("Id not found", 404));
 }
 conn.query(
   "SELECT * FROM activity WHERE id = ?",
   [req.params.id],
   function (err, data, fields) {
     if (err) return next(new AppError(err, 500));
     res.status(200).json({
       status: "success",
       length: data.length,
       data: data,
     });
   }
 );
};

exports.postStaticAndPerform = (req, res, next) => {
 if (!req.body) return next(new AppError("No form data found", 404));
 var values = [];
 for (var key in req.body) {
   values.push(req.body[key]);
 }
 console.log(values);
 conn.query(
   "INSERT INTO static_perform VALUES (NULL, ?)",
   [values],
   function (err, data, fields) {
     if (err) return next(new AppError(err, 500));
     res.status(201).json({
       status: "success",
       message: "static and performance data added!"
     });
   }
 );
};

exports.postActivity = (req, res, next) => {
 if (!req.body) return next(new AppError("No form data found", 404));
 var values = [];
 for (var key in req.body) {
   values.push(req.body[key]);
 }
 
 conn.query(
   "INSERT INTO activity VALUES(NULL, ?)",
   [values],
   function (err, data, fields) {
     if (err) return next(new AppError(err, 500));
     res.status(201).json({
       status: "success",
       message: "added activity data!",
     });
   }
 );
};

exports.deleteStaticAndPerform = (req, res, next) => {
 if (!req.params.id) {
   return next(new AppError("Id not found", 404));
 }
 conn.query(
   "DELETE FROM static_perform WHERE id=?",
   [req.params.id],
   function (err, fields) {
     if (err) return next(new AppError(err, 500));
     res.status(201).json({
       status: "success",
       message: "Static/performance info deleted!",
     });
   }
 );
}

exports.deleteActivity = (req, res, next) => {
 if (!req.params.id) {
   return next(new AppError("Id not found", 404));
 }
 conn.query(
   "DELETE FROM activity WHERE id=?",
   [req.params.id],
   function (err, fields) {
     if (err) return next(new AppError(err, 500));
     res.status(201).json({
       status: "success",
       message: "Activity info deleted!",
     });
   }
 );
}