const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "HackThisFall API",
            version: "1.0.0",
            description: "API documentation for HackThisFall project",
        },
        servers: [
            {
                url: "http://localhost:5000", // Update with your server URL
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
