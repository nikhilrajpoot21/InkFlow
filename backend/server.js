const app = require('./app');
require('dotenv').config();

PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port 5000'));