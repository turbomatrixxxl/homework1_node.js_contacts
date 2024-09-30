const fs = require("fs");
const path = require("path");

// const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

function listContacts() {
  return fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("The File could not be read !", err);
      return;
    }

    const dataParse = JSON.parse(data);
    // console.log(dataParse.length);

    console.table(dataParse);
  });
}

// listContacts();

function writeFile(data) {
  return fs.writeFile(contactsPath, data, "utf-8", (err, data) => {
    if (err) {
      console.error("The File could not be written !", err);
      return;
    }
    console.log("File modified successfully...!");
  });
}

function getContactById(contactId) {
  return fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("The file could not be found !", err);
      return;
    }

    const dataParse = JSON.parse(data);
    const contactById = dataParse.find((contact) => contactId === contact.id);
    if (contactById === undefined) {
      console.error(`The User with id ${contactId} does not  exists !`);
      return;
    }

    console.table(contactById);
  });
}

// getContactById("AeHIrLTr6JkxGE6SN-0Rw");
// getContactById("AeHIrLTr6JkxGE6SN-0");

function removeContact(contactId) {
  return fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("The File could not be read !", err);
      return;
    }

    const dataParse = JSON.parse(data);
    const contactsRemained = dataParse.filter(
      (contact) => contactId !== contact.id
    );
    if (contactsRemained.length === dataParse.length) {
      console.error(
        `The User with id ${contactId} does not exists and it cold not  be erased !`
      );
      return;
    }

    writeFile(JSON.stringify(contactsRemained));
    console.table(contactsRemained);
  });
}

// removeContact("AeHIrLTr6JkxGE6SN-0Rw");
// removeContact("1727716829710");

function addContact(name, email, phone) {
  return fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("The File could not be read !", err);
      return;
    }

    if (name === undefined || name === null || name.length === 0) {
      console.error("Please enter the name of the contact !");
      return;
    }
    if (email === undefined || email === null || email.length === 0) {
      console.error("Please enter the email address of the contact !");
      return;
    }
    if (phone === undefined || phone === null || phone.length === 0) {
      console.error("Please enter the phone number of the contact !");
      return;
    }

    const dataParse = JSON.parse(data);

    const newContact = {
      id: `${dataParse.length * 2}`,
      name: name,
      email: email,
      phone: phone,
    };

    const isName = (name) => {
      const is = dataParse.find((contact) => {
        return name === contact.name;
      });

      if (is) {
        return true;
      }
      return false;
    };

    const isEmail = (email) => {
      const is = dataParse.find((contact) => {
        return email === contact.email;
      });

      //   console.log(is);

      if (is) {
        return true;
      }
      return false;
    };

    // console.log(isEmail(email));

    const isPhone = (phone) => {
      const is = dataParse.find((contact) => {
        return phone === contact.phone;
      });

      if (is) {
        return true;
      }
      return false;
    };

    if (isName(name)) {
      console.error(`There is already a contact with the name : ${name} !`);
      return;
    }

    if (isEmail(email)) {
      console.error(
        `There is already a contact with the email address : ${email} !`
      );
      return;
    }

    if (isPhone(phone)) {
      console.error(
        `There is already a contact with the phone number: ${phone} !`
      );
      return;
    }

    dataParse.push(newContact);

    writeFile(JSON.stringify(dataParse));
    console.table(dataParse);
  });
}

// addContact("radu", "asd@asad.com", "245386");
// addContact("", "asd@asad.com", "245386");
// addContact("radu", "", "245386");
// addContact("radu", "asd@asad.com", "");
// addContact("radu", "asd@asad.com");
// addContact("Allen Raymond", "asd@asad.com", "245386");
// addContact("cucu", "nulla.ante@vestibul.co.uk", "245386");
// addContact("bau", "asd@asad.com", "(992) 914-3792");

module.exports = { listContacts, addContact, getContactById, removeContact };
