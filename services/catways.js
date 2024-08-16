const Catway = require('../models/catway');
const { body, validationResult } = require('express-validator')

exports.getAll = async (req, res, next) => {
    try {
        let catways = await Catway.find({});
        
        if (catways) {
            return res.render('catways', { title: 'Embarquadaires', catways: catways });
        }
    } catch (e) {
        return res.status(501).json(e);
    }
}

exports.getById = async (req, res, next) => {
    const id = req.params.id 

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('catway-not-found');
    } catch (e) {
        return res.status(501).json(e);
    }
}

exports.add = [
    // Définition des règles de validation
        body('catwayNumber').isInt().withMessage('Le numéro du catwyas doit être un nombre'),
        body('type').trim().isIn(["long", "short"]).withMessage('Le type doit être "long" ou "short"'),
        body('catwayState').trim().optional(),

    // Fonction de traitement de la requête
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const temp = ({
            catwayNumber: req.body.catwayNumber,
            type: req.body.type,
            catwayState: req.body.catwayState
        })

        try {
            let catway = await Catway.create(temp);

            return res.status(201).json(catway);
        } catch (e) {
            return res.status(501).json(e);
        }
    }
];


exports.update = [
    // Définition des règles de validation
    body('catwayNumber').optional().isInt().withMessage('Le numéro du catwyas doit être un nombre'),
    body('type').trim().optional().isIn(["long", "short"]).withMessage('Le type doit être "long" ou "short"'),
    body('catwayState').trim().optional(),

    // Fonction de traitement de la requête
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const temp = ({
            catwayNumber: req.body.catwayNumber,
            type: req.body.type,
            catwayState: req.body.catwayState
        })

        const id = req.params.id;

        try {
            let catway = await Catway.findOne({_id : id});

            if (catway) {
                Object.keys(temp).forEach((key) => {
                    if (!!temp[key]) {
                        catway[key] = temp[key];
                    }
                });

                await catway.save();
                return res.status(201).json(catway);
            }

            return res.status(404).json("catway_not_found");
        } catch (e) {
            return res.status(501).json(e);
        }
    }
];

exports.delete = async (req, res, next) => {
    const id = req.params.id 

    try {
        await Catway.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (e) {
        return res.status(501).json(e)
    }
}