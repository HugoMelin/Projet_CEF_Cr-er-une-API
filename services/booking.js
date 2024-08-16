const Booking = require('../models/booking');
const Catway = require('../models/catway')
const { body, validationResult } = require('express-validator')

exports.getAll = async (req, res, next) => {
    try {
        const id = req.params.id
        let booking = await Booking.find({});
        let catway = await Catway.findById(id);
        
        if (booking) {
            return res.render('booking', { title: 'Réservations', booking: booking, catway: catway });
        }
    } catch (e) {
        return res.status(501).json(e);
    }
}

exports.getById = async (req, res, next) => {
    const id = req.params.id
    const idReservation = req.params.idReservation 

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            let booking = await Booking.findOne({"bookingId": idReservation})
                if (booking) {
                    //res.status(200).json(booking);
                    return res.render('bookingInfo', { title: 'Information réservation', booking: booking, catway: catway })
                }
            return res.status(404).json("Aucune réservation trouvé");
        }

        return res.status(404).json('catway-not-found');
    } catch (e) {
        return res.status(501).json(e);
    }
}

exports.add = [
    // Définition des règles de validation
        body('bookingId').isNumeric().withMessage("L'id de réservation doit être un nombre."),
        body('clientName').trim().isLength({ min: 3 }).withMessage('Le nom du client doit contenir au moins 3 caractères'),
        body('boatName').trim().isLength({ min: 3 }).withMessage('Le nom du bâteau doit contenir au moins 3 caractères'),
        body('checkIn').isDate().withMessage('checkIn doit être une date'),
        body('checkOut').isDate().withMessage('checkIn doit être une date'),

    // Fonction de traitement de la requête
    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        let catway = await Catway.findById(id);

        if (catway) {
            const temp = ({
                bookingId: req.body.bookingId,
                catwayNumber: catway.catwayNumber,
                clientName: req.body.clientName,
                boatName: req.body.boatName,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
            })
    
            try {
                let booking = await Booking.create(temp);
    
                return res.status(201).json(booking);
            } catch (e) {
                return res.status(501).json(e);
            }
        }
    }
];

exports.update = [
    // Définition des règles de validation
    body('bookingId').optional().isNumeric().withMessage("L'id de réservation doit être un nombre."),
    body('clientName').trim().optional().isLength({ min: 3 }).withMessage('Le nom du client doit contenir au moins 3 caractères'),
    body('boatName').trim().optional().isLength({ min: 3 }).withMessage('Le nom du bâteau doit contenir au moins 3 caractères'),
    body('checkIn').optional().isDate().withMessage('checkIn doit être une date'),
    body('checkOut').optional().isDate().withMessage('checkIn doit être une date'),

    // Fonction de traitement de la requête
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        let catway = await Catway.findById(id);

        if (catway) {
            const temp = ({
                bookingId: req.body.bookingId,
                catwayNumber: catway.catwayNumber,
                clientName: req.body.clientName,
                boatName: req.body.boatName,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
            })
    
            const idReservation = req.params.idReservation;
    
            try {
                let booking = await Booking.findOne({_id : idReservation});
    
                if (booking) {
                    Object.keys(temp).forEach((key) => {
                        if (!!temp[key]) {
                            booking[key] = temp[key];
                        }
                    });
    
                    await booking.save();
                    return res.status(201).json(booking);
                }
    
                return res.status(404).json("booking_not_found");
            } catch (e) {
                return res.status(501).json(e);
            }
        }
    }
];

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    let catway = await Catway.findById(id);

    if (catway) {
        const idReservation = req.params.idReservation;

        try {
            await Booking.deleteOne({ _id: idReservation });
    
            return res.status(204).json('delete_ok');
        } catch (e) {
            return res.status(501).json(e)
        }
    }
}
