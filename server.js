const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;
var books = [
  { id: 123, title: "A Tale of Two Cities", author: "Charles Dickens" },
];
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "2.0.0",
        title: "Book API",
        description: "Book API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis: ["server.js"]
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /book:
 *    post:
 *      description: Use to return all customers
 *    parameters:
 *      - name: id
 *        description: Id of the book
 *        required: true
 *        schema:
 *          type: integer
 *      - name: title
 *        description: title of the book
 *        required: true
 *        schema:
 *          type: string
 *      - name: author
 *        description: author of the book
 *        required: true
 *        schema:
 *          type: string    
 *    responses:
 *      '201':
 *        description: Successfully created user
 */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.post("/book", (req, res) => {
  const book = req.body;
  console.log(book);
  books.push(book);
  res.send("Book is added to the database");
});

/**
 * @swagger
 * /books:
 *  get:
 *    description: Use to get all the books
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/books", (req, res) => {
  res.json(books);
});

/**
 * @swagger
 * /book:
 *  get:
 *    description: Use to get the books
 *    parameters:
 *      - name: id
 *        description: Id of the book
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get("/book/:id", (req, res) => {
  let target;
  const id = parseInt(req.params.id);
  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      target = books[i];
    }
  }
  res.json(target);
});

app.delete("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);

  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books.splice(i, 1);
      // return true;
    }
  }
  res.send("Book is deleted");
});
/**
 * @swagger
 * /books:
 *  delete:
 *    description: Use to delete the book bt id
 *    responses:
 *      '200':
 *        description: A successful response
 */

server = app.listen(port, () => {
  console.log(`Hello world app listening on port ${port}!`);

});

var io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on('insert',(book) => {
        io.sockets.emit('notify',book)
    })
  });