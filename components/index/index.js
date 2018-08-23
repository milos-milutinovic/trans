const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { errorPayload, getLanguages } = require('../../shared/util');
const { defaultLanguage } = require('../../config');

router.get('/', function(req, res, next) {

    let lang = req.query.lang || defaultLanguage;

    getLanguages((error, response, languages) => {
        if (!error && response.statusCode == 200) {

            let languagesParsed = JSON.parse(languages);

            let isLangSupported = _.includes(_.map(languagesParsed, 'CultureId'), lang);
            if (!isLangSupported) {
                res.status(404);
                res.send(errorPayload('Invalid language'));
                return;
            }

            let jsonFileContent = null;
            try {
                delete require.cache[require.resolve(`../../public/languages/${lang}.json`)]
                jsonFileContent = require(`../../public/languages/${lang}.json`);
            } catch (ex) {
                res.redirect(`/upload?lang=${lang}`);
                return;
            }

            res.render('index/index', {
                title: 'Dobrodosli u Trans-lation',
                translations: jsonFileContent,
                languages: languagesParsed,
                selectedLanguage: lang
            });
        } else {
            res.status(response.statusCode);
            res.send(errorPayload('Error reading languages'))
        }
    });
});

module.exports = router;
