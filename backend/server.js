const app = require('./app');
const cors = require("cors");
require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
