import app from "./app";

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}!`),
);

export default server;