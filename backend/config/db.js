const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Enable SSL if required
    },
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database successfully.");
  } catch (err) {
    console.error("Error connecting to PostgreSQL database:", err.message);
    process.exit(1); // Exit the process on failure
  }
}

module.exports = connectDB;
