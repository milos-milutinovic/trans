const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const router = express.Router();
const { errorPayload, getLanguages } = require('../shared/util');
const { defaultLanguage } = require('../config');

router.get('/', function(req, res, next) {
    let lang = req.query.lang || defaultLanguage;

    getLanguages((error, response, languages) => {
        let languagesParsed = JSON.parse(languages);

        let isLangSupported = _.includes(_.map(languagesParsed, 'CultureId'), lang);
        if (!isLangSupported) {
            res.status(404);
            res.send(errorPayload('Invalid language'));
            return;
        }

        res.render('upload', {
            languages: languagesParsed,
            selectedLanguage: lang
        });
    });
});

router.post('/translation', function(req, res, next) {

    let lang = req.body.language || defaultLanguage;

    //TODO: implement validation - if language is valid

    if (req.files.fileInput.mimetype !== 'application/json') {
        res.status(400);
        res.send('JSON please.');
    } else {
        let file = req.files.fileInput;

        file.mv(`public/languages/${lang}.json`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }

            jsonfile.readFile(`public/languages/${lang}.json`, (err, data) => {
                res.redirect(`/index?lang=${lang}`);
            });
        });
    }

});

module.exports = router;
