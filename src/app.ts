import express from 'express';
import 'dotenv/config';

import helmet from 'helmet';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import sequelize from './config/database'; // Sequelize instance 
import userRoutes from './routes/userRoutes';
const app = express();

// Security and middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.use('/api', userRoutes);


// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for a Node.js app using Express, Sequelize, Redis, and PostgreSQL.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
      "schemas": {
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
               "description": "Primary key, auto-incrementing identifier"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string",
              "format": "email"
            },
            "username": {
              "type": "string"
            }
          }
        }
      }
    }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


sequelize.sync({ alter: true })
  .then(() => {
    const PORT = process.env.APP_PORT || 3000;
    console.log('Database connected and models synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
    process.exit(1);
  });

export default app;