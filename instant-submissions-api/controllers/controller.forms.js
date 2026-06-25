const Form = require("../models/model.form");
const Submission = require("../models/model.submission");

exports.createForm = async (req, res) => {
    const { name, description, ownerId } = req.body;

    if (!name) return res.status(400).json({ message: "Name field is required!"});

    try {
        const newForm = new Form({ name, description, ownerId });

        await newForm.save();

        res.status(200).json(newForm);

    } catch (error) {
        console.error("Form creation error", error);
        res.status(500).json({ message: "Form creation error" });
    }
}

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find().sort("-createdAt");

        const counts = await Submission.aggregate([
            { $group: { _id: "$formId", count: { $sum: 1 } } }
        ])

        const countMap = Object.fromEntries(counts.map(c => [c._id.toString(), c.count]));

        const merged = forms.map(form => ({
            ...form.toObject(),
            submissionCount: countMap[form._id.toString()] || 0
        }));

        res.status(200).json(merged);

    } catch (error) {
        console.error("Get forms error", error);
        res.status(500).json({ message: "Failed to fetch forms" });
    }
}