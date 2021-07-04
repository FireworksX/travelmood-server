process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import 'reflect-metadata';
import 'es6-shim';
import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import RequestsRoute from '@routes/requests.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new RequestsRoute()]);

app.listen();
