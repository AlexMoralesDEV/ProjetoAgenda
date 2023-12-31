const Contato = require('../Models/ContatoModel')

module.exports.index = (req, res, next) => {
    res.render('cadastrocontato', { contato: {} });
};

module.exports.register = async (req, res, next) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => { res.redirect('back'); });
            return;
        }

        req.flash('success', 'Contato registrado com sucesso!');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));

    } catch (err) {
        console.log(err);
        res.render('404');
    }
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contato = await Contato.buscaporid(req.params.id);

    if (!contato) {
        res.render('404');
        return;
    }

    res.render('cadastrocontato', { contato });
};

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => { res.redirect('back'); });
            return;
        }

        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => res.redirect(`/`));
        return;
    } catch (err) {
        console.log(err);
        res.render('404');
    }
};

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contato = await Contato.delete(req.params.id);

    if (!contato) {
        res.render('404');
        return;
    }

    req.flash('success', 'Seu contato foi apagado com sucesso!');
    req.session.save(() => res.redirect(`/`));
    return;
};