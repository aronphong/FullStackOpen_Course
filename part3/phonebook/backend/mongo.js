const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://aron:${password}@cluster0.i8t0v.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((contact) => {
      return console.log(contact.name, contact.number);
    });
    mongoose.connection.close();
  });
} else {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then((result) => {
    console.log("contact saved!");
    mongoose.connection.close();
  });
}
