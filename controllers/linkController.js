const Link = require('../models/Link');
const User = require('../models/User');

exports.createLink = async (req, res) => {
    const { originalUrl } = req.body;
    try {
        const newLink = new Link({ originalUrl });
        const savedLink = await newLink.save();
        const baseUrl = "https://mytinyurl.co.il";
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



exports.redirectLink = async (req, res) => {
    const { id } = req.params;
    try {
        const link = await Link.findById(id);
        console.log(link);
        if (!link) {
            return res.status(404).send({ message: 'Link not found' });
        }

        console.log("sdfghj");
        link.clicks.push({ ipAddress: req.ip });
        console.log("1111111111111");
        await link.save();
        console.log(link.originalUrl);

        // בדוק אם ה-URL המקורי כולל את הפרוטוקול, אם לא, הוסף אותו
        let originalUrl = link.originalUrl;
        if (!/^https?:\/\//i.test(originalUrl)) {
            originalUrl = 'http://' + originalUrl;
        }

        res.redirect(301, originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}

// exports.redirectLink = async (req, res) => {
//     const { id } = req.params;
//     const link = await Link.findById(id);
//     console.log(link);
//     if (!link) {
//         return res.status(404).send({ message: 'Link not found' });
//     }
//     // const targetParamName = link.targetParamName;
//     // const targetParamValue = req.query[targetParamName] || '';
//     console.log("sdfghj");
//     link.clicks.push({ ipAddress: req.ip });
//     console.log("1111111111111");
//     await link.save();
//     console.log(link.originalUrl);

//     res.redirect(301, link);
//     // res.send(link.originalUrl)
// }