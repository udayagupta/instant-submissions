const Submission = require("../models/model.submission");

exports.createSubmission = async (req, res) => {
    const formId = req.params.formId;
    const data = req.body;

    if (!formId || !data) return res.status(400).json({ message: "Form ID or Data is missing" });

    try {
        const newSubmission = new Submission({
            formId,
            data
        })

        await newSubmission.save();

        const io = req.app.get("io");

        io.emit(`new-submission-${formId}`, newSubmission);s

        res.status(200).json({ message: "Form data saved!" })

    } catch (error) {
        console.error("Submission Error: ", error);
        res.status(500).json({ message: "Submission error"});
    }

};

exports.getSubmissions = async (req, res) => {
    const formId = req.params.formId;
    const data = req.body;

    if (!data || !formId) return res.status(400).json({ message: "Form Id or Data is mission!" });

    try {
        const submissions = await Submission.find({ formId }).sort("-createdAt");
        res.status(200).json(submissions)

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch submissions." });
    }
}