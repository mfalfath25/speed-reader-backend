"use strict";

var _express = _interopRequireWildcard(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _routes = _interopRequireDefault(require("./routes"));
var _env = _interopRequireDefault(require("./config/env"));
var _mongoconnect = _interopRequireDefault(require("./config/mongoconnect"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const app = (0, _express.default)();
const isProduction = process.env.NODE_ENV === 'production';
app.use((0, _express.json)());
app.use((0, _morgan.default)('dev'));

// CORS config
app.use((0, _cors.default)({
  origin: _env.default.CLIENT_URL,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  credentials: true
}));

// Headers config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', _env.default.CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.get('/', async (req, res) => {
  res.json({
    status: true,
    message: 'Speed-Reader Backend API'
  });
});
app.use('/', _routes.default);
(0, _mongoconnect.default)();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on Production? ${isProduction}`);
  console.log(`Server is running on PORT ${PORT}`);
});