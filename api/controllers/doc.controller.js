import Doc from '../models/doc.model.js'
import mammoth from 'mammoth'

export const uploaded = async (req, res) => {
  const file = req.file;
  console.log(file)

  const buffer = req.file.buffer;

mammoth.extractRawText({ buffer })
    .then(function(result){
        const doc = new Doc({
          filename: file.originalname,
          content: result.value.toString(),
        });
        console.log(doc)
        doc.save((err) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            return res.send("File uploaded successfully");
          }
        });
    })
    .done();
};