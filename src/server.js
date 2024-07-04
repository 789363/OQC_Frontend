const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');  // 導入 bodyParser 中間件
const app = express();

app.use(cors());
app.use(bodyParser.json());  // 啟用 bodyParser 中間件來解析 JSON 資料

app.post('/proxy/api/JETAPI/OQCUpload', async (req, res) => {
    console.log("Received a POST request with data:", req.body);
    const url = 'http://10.7.21.251:5072/JETAPI/OQCUpload';
    const data = req.body;  // 使用前端傳過來的數據

    try {
        const apiResponse = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        }
        res.status(error.response ? error.response.status : 500).json({
            message: 'Internal Server Error',
            errorDetail: error.response ? error.response.data : 'No response data'
        });
    }
});

app.listen(3002, () => {
    console.log('Server running on http://localhost:3002');
});
