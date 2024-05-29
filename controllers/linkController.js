const Link = require('../models/Link');
const User = require('../models/User');

exports.createLink = async (req, res) => {
    const { originalUrl } = req.body;
    try {
        const newLink = new Link({ originalUrl });
        const savedLink = await newLink.save();

        res.status(201).json(savedLink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLink = async (req, res) => {
    links = await Link.find();
    res.send(links)
};
exports.updateLink = async (req, res) => {
    const { originalUrl } = req.body;
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        link.originalUrl = originalUrl || link.originalUrl;
        await link.save();
        res.json(link);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        await link.remove();
        res.json({ message: 'Link deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.redirectLink = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) {
        return res.status(404).send({ message: 'Link not found' });
    }
    const targetParamName = link.targetParamName;
    const targetParamValue = req.query[targetParamName] || '';

    link.clicks.push({ ipAddress: req.ip, targetParamValue });
    await link.save();
    // res.redirect(link.originalUrl);
    res.send(link.originalUrl)
}