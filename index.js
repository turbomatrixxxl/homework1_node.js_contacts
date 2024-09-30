const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

// const { Command } = require("commander");

// const program = new Command();

// program
//   .option("-a, --action <type>", "choose action")
//   .option("-i, --id <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);

// const argv = program.opts();

// // TODO: refactorizare
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       listContacts();
//       break;

//     case "get":
//       getContactById(id);
//       break;

//     case "add":
//       addContact(name, email, phone);
//       break;

//     case "remove":
//       removeContact(id);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);

const readline = require("readline");
require("colors");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Invoke action type (list , get , add , remove) :".bgMagenta,
  (action) => {
    switch (action) {
      case "list":
        listContacts();
        rl.close();
        break;

      case "get":
        rl.question("Please type user Id :".bgYellow, (id) => {
          getContactById(id);
          rl.close();
        });
        break;

      case "add":
        rl.question("Please type user name :".bgGreen, (name) => {
          rl.question("Please type user email :".bgGreen, (email) => {
            rl.question("Please type user phone number :".bgGreen, (phone) => {
              addContact(name, email, phone);
              rl.close();
            });
          });
        });
        break;

      case "remove":
        rl.question("Please type user Id you want to remove :".bgRed, (id) => {
          removeContact(id);
          rl.close();
        });
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
);
