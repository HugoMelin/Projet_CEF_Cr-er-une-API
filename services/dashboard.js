exports.dashboard = (req, res, next) => {
    return res.render('dashboard', { title: 'Tableau de bord' })
}