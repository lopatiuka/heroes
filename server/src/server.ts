import 'dotenv/config';
import 'reflect-metadata';
import { HeroRoute } from './routes/hero.route';
import App from './app';
import { config } from './ormconfig';
 
(async () => {
  try {
    await config.initialize()
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App( [new HeroRoute],
    5000
  );
  app.listen();
})();

// "dev": "nodemon --exec \"ts-node\" ./src/server.ts"
