import Doc from '../models/doc.model.js'

export const search = (req, res) => {
    const term = req.query.term;
  
    // Search for documents containing the term
    Doc.find({ content: { $regex: term, $options: 'i' } }, (err, docs) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(docs);
      }
    });
  };