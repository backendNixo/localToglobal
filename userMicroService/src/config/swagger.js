import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documents",
            version: "1.0.0",
            description: "API documentation for your project",
        },
        servers: [
            {
                url: "http://192.168.1.32:7001/",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [""],
            },
        ],
    },
    apis: [
        "./src/routes/auth.routes.js",
        "./src/routes/support.route.js"
    ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec }