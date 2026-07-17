import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {

    definition: {

        openapi: "3.0.3",

        info: {

            title: "Shop Sphere API",

            version: "1.0.0",

            description:
                "Production Ready E-commerce API"

        },

        servers: [

            {
                url: process.env.API_URL
            }

        ]

    },

    apis: [

        "./src/routes/*.ts",

        "./src/controllers/*.ts",

        "./src/docs/swagger/schemas/*.yaml"

    ],
    tags: [

        {

            name: "Authentication",

            description: "User Authentication APIs"

        }

    ]
};

export const swaggerSpec = swaggerJsdoc(options);