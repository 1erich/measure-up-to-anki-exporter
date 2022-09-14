const express = require('express')
const app = express()
const port = 3010

app.use(express.json());

const fs = require('fs');
const AnkiExport = require('anki-apkg-export').default;
const apkg = new AnkiExport('deck-name');

app.post('/', (req, res) => {
    var row = [[req.body.question, joinAndReturn(req.body.answers), joinAndReturn(req.body.options), joinAndReturn(req.body.expl)]];

    var front = `
    ${req.body.question}
    ---
    ${joinAndReturn(req.body.options)}
    `;

    var back = `
    ${joinAndReturn(req.body.answers)}
    ---
    ${req.body.expl}
    `;

    apkg.addCard(front, back);
    res.send('ok!');
})

app.get('/export', (req, res) => {
    apkg
        .save()
        .then(zip => {
            fs.writeFileSync('./output.apkg', zip, 'binary');
            console.log(`Package has been generated: output.pkg`);
        })
        .catch(err => console.log(err.stack || err));
})

app.listen(port, () => {
    console.log(`Writer app listening on port ${port}`)
})

function joinAndReturn(array) {
    if (Array.isArray(array)) {
        array = array.join("\n");
    }

    return array
}