import * as Yup from 'yup';
import { Op } from 'sequelize';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Deliverys from '../models/Deliverys';
import Deliverymans from '../models/Deliverymans';
import Delivery_problems from '../models/Delivery_problems';

import Mail from '../../lib/Mail';

class Delivery_problemsController {
  async index(req, res) {
    if (req.params.idDelivery) {
      const ProblemsDelivery = await Delivery_problems.findAll({
        where: { delivery_id: req.params.idDelivery },
      });

      return res.json(ProblemsDelivery);
    }

    if (req.params.idProblem) {
      const Problem = await Delivery_problems.findOne({
        where: { id: req.params.idProblem },
      });

      return res.json(Problem);
    }

    if (req.query.q) {
      const ProblemLike = await Delivery_problems.findAll({
        where: {
          description: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        },
      });
      if (ProblemLike.length > 0) return res.json(ProblemLike);
    }

    const ProblemAll = await Delivery_problems.findAll();

    return res.json(ProblemAll);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const novoProblema = {
      delivery_id: req.params.idDelivery,
      description: req.body.description,
    };

    const { id, description } = await Delivery_problems.create(novoProblema);

    return res.json({ id, description });
  }

  async cancel(req, res) {
    const Delivery_problemsOne = await Delivery_problems.findByPk(
      req.params.idProblem
    );

    const deliveryOne = await Deliverys.findOne({
      where: { id: Delivery_problemsOne.delivery_id },
    });

    const deliverymanOne = await Deliverymans.findOne({
      where: { id: deliveryOne.deliveryman_id },
    });

    await Deliverys.update(
      {
        canceled_at: new Date(),
      },
      {
        where: {
          id: deliveryOne.id,
        },
      }
    );

    await Mail.sendMail({
      to: `${deliverymanOne.name} <${deliverymanOne.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        deliveryman: deliverymanOne.name,
        product: deliveryOne.product,
        date: format(new Date(), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });

    const ProblemAll = await Delivery_problems.findAll({
      include: [
        {
          model: Deliverys,
          as: 'Deliverys',
          attributes: ['canceled_at'],
          where: {
            canceled_at: null,
          },
        },
      ],
    });

    return res.json(ProblemAll);
  }
}

export default new Delivery_problemsController();
