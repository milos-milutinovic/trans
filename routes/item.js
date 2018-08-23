const express = require('express');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const router = express.Router();
const { errorPayload, successPayload, jsonFormat } = require('../shared/util');

router.post('/edit', function(req, res, next) {
    let payload = req.body;

    jsonfile.readFile(`public/languages/${payload.language}.json`, (err, data) => {
        if (err) {
            res.status(400);
            res.send(errorPayload('Error reading main json file.'));
            return;
        };

        _.set(data, payload.key, payload.value);

        jsonfile.writeFile(`public/languages/${payload.language}.json`, data, jsonFormat, function (err) {
            if (err) {
                res.status(400);
                res.send(errorPayload('Error writing main json file.'));
                return;
            };

            res.status(200);
            res.send(successPayload(req.body.value));
        });
    });
});

module.exports = router;
