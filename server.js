const express = require('express')
const app = express()
const port = 3010

app.use(express.json());

var spread_sheet = require('spread_sheet');

var path = require('path')
var filePath = path.join(path.resolve(), 'data', 'db.xlsx');
var sheetName = "Sheet1";

app.post('/', (req, res) => {

    console.log(req.body);

    for (var i = 0; i < 2; i++) {
        var row = [[req.body.question, joinAndReturn(req.body.answers), joinAndReturn(req.body.options), joinAndReturn(req.body.expl)]];
        spread_sheet.addRow(row, filePath, sheetName, function (err, result) {
            console.log(err, result)
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function joinAndReturn(array) {
    if (Array.isArray(array)) {
        array = array.join("\n\n");
    }

    return array
}