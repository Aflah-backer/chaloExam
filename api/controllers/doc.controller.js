import Doc from '../models/doc.model.js'


export const uploaded = (req, res) => {
  const file = req.file;

  // Store the file in MongoDB
  const doc = new Doc({
    filename: file.originalname,
    content: file.buffer.toString()
  });

  doc.save((err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send('File uploaded successfully');
    }
  });
};