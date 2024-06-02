const Link = require('../models/Link');

exports.createLink = async (req, res) => {
    const { originalUrl, targetParamName, targetValues } = req.body;
    try {
        const newLink = new Link({ originalUrl, targetParamName, targetValues });
        const savedLink = await newLink.save();
        const baseUrl = "//localhost:3000/mytinyurl";
        const identifier = savedLink._id;
        const fullUrl = `${baseUrl}/${identifier}`;
        res.status(201).json(fullUrl);
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