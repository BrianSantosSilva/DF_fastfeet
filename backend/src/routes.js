import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import DeliverysController from './app/controllers/DeliverysController';
import DeliverymansController from './app/controllers/DeliverymansController';

import FileController from './app/controllers/FileController';

import Delivery_problemsController from './app/controllers/Delivery_problemsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

// recipients

routes.get('/recipients/:id', RecipientsController.index);
routes.get('/recipients', RecipientsController.index);

routes.post('/recipients', RecipientsController.store);

routes.put('/recipients/:id', RecipientsController.update);

routes.delete('/recipients/:id', RecipientsController.delete);

// deliverys

routes.get('/deliverys/:id', DeliverysController.index);
routes.get('/deliverys', DeliverysController.index);

routes.post('/deliverys', DeliverysController.store);
routes.put('/deliverys/:id', DeliverysController.update);

routes.delete('/deliverys/:id', DeliverysController.delete);

// deliverymans

routes.get('/deliverymans/:id', DeliverymansController.index);
routes.get('/deliverymans', DeliverymansController.index);

routes.get('/deliverymans/:id/deliverys', DeliverymansController.indexD);
routes.get(
  '/deliverymans/:id/deliverys/pending',
  DeliverymansController.indexDPending
);
routes.get(
  '/deliverymans/:id/deliverys/delivered',
  DeliverymansController.indexDDelivered
);

routes.post('/deliverymans', DeliverymansController.store);

routes.put('/deliverymans/:id', DeliverymansController.update);

routes.put(
  '/deliverymans/:id/deliverys/:idDelivery/start',
  DeliverymansController.updateStart
);
routes.put(
  '/deliverymans/:id/deliverys/:idDelivery/end',
  DeliverymansController.updateEnd
);

routes.delete('/deliverymans/:id', DeliverymansController.delete);

// Delivery_problems

routes.get('/delivery/:idDelivery/problems', Delivery_problemsController.index);

routes.post(
  '/delivery/:idDelivery/problems',
  Delivery_problemsController.store
);

routes.get('/delivery/problems/:idProblem', Delivery_problemsController.index);
routes.get('/delivery/problems', Delivery_problemsController.index);

routes.delete(
  '/problems/:idProblem/cancel-delivery',
  Delivery_problemsController.cancel
);

export default routes;
