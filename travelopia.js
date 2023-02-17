const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to database
mongoose.connect('mongodb://localhost/tourism', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define database schema
const Schema = mongoose.Schema;
const formSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  destination: { type: String, required: true },
  travelers: { type: Number, required: true },
  budget: { type: Number, required: true }
});

// Define database model
const Form = mongoose.model('Form', formSchema);

// Define API endpoints
app.post('/form', (req, res) => {
  const form = new Form(req.body);
  form.save()
    .then(form => {
      res.status(200).json({'form': 'form added successfully'});
    })
    .catch(err => {
      res.status(400).send('adding new form failed');
    });
});

app.get('/form', (req, res) => {
  Form.find((err, forms) => {
    if (err) {
      console.log(err);
    } else {
      res.json(forms);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
