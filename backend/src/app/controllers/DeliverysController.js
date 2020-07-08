import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliverys from '../models/Deliverys';
import Recipients from '../models/Recipients';
import Deliverymans from '../models/Deliverymans';
import File from '../models/File';

class DeliverysController {
  async index(req, res) {
    if (req.params.id) {
      const DeliveryOne = await Deliverys.findOne({
        include: [
          {
            model: Recipients,
            as: 'Recipients',
            attributes: ['name', 'cidade', 'estado', 'numero', 'cep', 'rua'],
          },
          {
            model: Deliverymans,
            as: 'Deliverymans',
            attributes: ['name'],
            include: [
              {
                model: File,
                as: 'File',
                attributes: ['path'],
              },
            ],
          },
        ],
        where: { id: req.params.id },
      });

      return res.json(DeliveryOne);
    }

    if (req.query.q) {
      const DeliveryLike = await Deliverys.findAll({
        include: [
          {
            model: Recipients,
            as: 'Recipients',
            attributes: ['name', 'cidade', 'estado'],
            where: {
              name: {
                [Op.iLike]: `%${req.query.q}%`,
              },
            },
          },
          {
            model: Deliverymans,
            as: 'Deliverymans',
            attributes: ['name'],
            include: [
              {
                model: File,
                as: 'File',
                attributes: ['path'],
              },
            ],
          },
        ],
      });
      if (DeliveryLike.length > 0) return res.json(DeliveryLike);
    }

    const DeliveryAll = await Deliverys.findAll({
      include: [
        {
          model: Recipients,
          as: 'Recipients',
          attributes: ['name', 'cidade', 'estado', 'numero', 'cep', 'rua'],
        },
        {
          model: Deliverymans,
          as: 'Deliverymans',
          attributes: ['name'],
          include: [
            {
              model: File,
              as: 'File',
              attributes: ['path'],
            },
          ],
        },
      ],
    });

    return res.json(DeliveryAll);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const dadosCad = {
      product: req.body.product,
      recipient_id: req.body.recipient_id,
      deliveryman_id: req.body.deliveryman_id,
      start_date: new Date(),
    };

    const { id, product } = await Deliverys.create(dadosCad);

    return res.json({ id, product });
  }

  async update(req, res) {
    const delivery = await Deliverys.findByPk(req.params.id);

    await delivery.update(req.body);

    const { id } = await Deliverys.findByPk(req.params.id);

    return res.json({ id });
  }

  async delete(req, res) {
    await Deliverys.destroy({ where: { id: req.params.id } });

    const DeliveryAll = await Deliverys.findAll({
      include: [
        {
          model: Recipients,
          as: 'Recipients',
          attributes: ['name', 'cidade', 'estado', 'numero', 'cep', 'rua'],
        },
        {
          model: Deliverymans,
          as: 'Deliverymans',
          attributes: ['name'],
          include: [
            {
              model: File,
              as: 'File',
              attributes: ['path'],
            },
          ],
        },
      ],
    });

    return res.json(DeliveryAll);
  }
}

export default new DeliverysController();
