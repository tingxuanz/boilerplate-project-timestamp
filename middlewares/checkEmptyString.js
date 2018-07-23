module.exports = (req, res, next) => {
  const dateString = req.params.date_string;
  if (dateString) {
    next();
  } else {
    const date = new Date();
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }
}