const path = require("path");

module.exports.index = (req, res) => {
    res.sendFile(path.resolve("./static", "index.html"));
};

module.exports.login = (req, res) => {
    res.sendFile(path.resolve("./static", "login.html"));
};

module.exports.register = (req, res) => {
    res.sendFile(path.resolve("./static", "register.html"));
};

module.exports.authors = (req, res) => {
    res.sendFile(path.resolve("./routes/static/authors", "authors.html"));
};

module.exports.books = (req, res) => {
    res.sendFile(path.resolve("./routes/static/books", "books.html"));
};

module.exports.users = (req, res) => {
    res.sendFile(path.resolve("./routes/static/users", "users.html"));
};

module.exports.patrons = (req, res) => {
    res.sendFile(path.resolve("./routes/static/patrons", "patrons.html"));
};

module.exports.checkouts = (req, res) => {
    res.sendFile(path.resolve("./routes/static/checkouts", "checkouts.html"));
};

module.exports.holds = (req, res) => {
    res.sendFile(path.resolve("./routes/static/holds", "holds.html"));
};

module.exports.waitlists = (req, res) => {
    res.sendFile(path.resolve("./routes/static/waitlists", "waitlists.html"));
};

module.exports.notifications = (req, res) => {
    res.sendFile(path.resolve("./routes/static/notifications", "notifications.html"));
};

module.exports.categories = (req, res) => {
    res.sendFile(path.resolve("./routes/static/categories", "categories.html"));
};

module.exports.bookcopies = (req, res) => {
    res.sendFile(path.resolve("./routes/static/bookcopies", "bookcopies.html"));
};

module.exports.bookauthors = (req, res) => {
    res.sendFile(path.resolve("./routes/static/bookauthors", "bookauthors.html"));
};