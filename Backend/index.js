const app = require('./app');
const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));