const { connect } = require("mongoose");

module.exports = async () => {
  try {
    const res = await connect(process.env.MONGO_URI);
    console.log(`Connected with DB : HOST ${res.connection.host}`.yellow.underline);
  } catch (err) {
    console.log(`Could not connect with DB  ${err.message}`.red);
  }
};
