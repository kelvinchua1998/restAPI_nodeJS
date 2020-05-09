const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)

const testResultSchema = new Schema(
  [{
    // testId: Number,
    ssid: String,
    ping: String,
    download: String,
    upload: String,
    testServer: String,
    timeStamp: String
  }]
)

const apSchema = new Schema({
  ssid: String,
  site: String,
  location: String,
  wifiController: String,
  password: String,
  model: String,
  runtime: String,
  mac: String,
  IP: String,
  desc: String,
  lat: String,
  lon: String,
  testResult: [testResultSchema]
});

const ap_listSchema = new Schema([apSchema])

module.exports = {
  ap: mongoose.model("ap", apSchema),
  ap_list: mongoose.model("ap_list", ap_listSchema),
  testResult: mongoose.model("testResult", testResultSchema)
}

