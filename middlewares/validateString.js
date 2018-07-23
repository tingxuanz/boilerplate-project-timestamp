module.exports = (req, res, next) => {
  const dateString = req.params.date_string;
  const reg = /\d+/g;
  
  const date = new Date(dateString);
  
  if (date.toString() === 'Invalid Date' && dateString.match(reg) && dateString.match(reg).length === 1) {
    //if date_string represents unix timestamp, parse to int
    req.unixTimestamp = parseInt(dateString);
    next();
  } else if (date.toString() === 'Invalid Date') {
    res.json({"error" : "Invalid Date" });
  } else {
    next();
  }

};