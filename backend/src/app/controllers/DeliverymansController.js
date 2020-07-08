import * as Yup from 'yup';
import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  isWithinInterval,
} from 'date-fns';
import { Op } from 'sequelize';
import Deliverymans from '../models/Deliverymans';
import Deliverys from '../models/Deliverys';
import Recipients from '../models/Recipients';
import File from '../models/File';

class DeliverymansController {
  async index(req, res) {
    if (req.params.id) {
      const DeliverymanOne = await Deliverymans.findOne({
        include: [
          {
            model: File,
            as: 'File',
            attributes: ['path'],
          },
        ],
        where: { id: req.params.id },
      });

      return res.json(DeliverymanOne);
    }

    if (req.query.q) {
      const DeliverymanOneLike = await Deliverymans.findAll({
        include: [
          {
            model: File,
            as: 'File',
            attributes: ['path'],
          },
        ],
        where: {
          name: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        },
      });
      if (DeliverymanOneLike.length > 0) return res.json(DeliverymanOneLike);
    }

    const DeliverymanAll = await Deliverymans.findAll({
      include: [
        {
          model: File,
          as: 'File',
          attributes: ['path'],
        },
      ],
    });

    return res.json(DeliverymanAll);
  }

  async indexD(req, res) {
    const DeliverysAll = await Deliverys.findAll({
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
        },
      ],
      where: { deliveryman_id: req.params.id },
    });

    return res.json(DeliverysAll);
  }

  async indexDPending(req, res) {
    const DeliverysAll = await Deliverys.findAll({
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
      where: {
        deliveryman_id: req.params.id,
        end_date: null,
        canceled_at: null,
        start_date: {
          [Op.ne]: null,
        },
      },
    });

    return res.json(DeliverysAll);
  }

  async indexDDelivered(req, res) {
    const DeliverysAll = await Deliverys.findAll({
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
      where: {
        deliveryman_id: req.params.id,
        end_date: {
          [Op.ne]: null,
        },
      },
    });

    return res.json(DeliverysAll);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Preencher um email válido!' });
    }

    const deliverymanExists = await Deliverymans.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.json({ error: 'Entregador já existe.' });
    }

    const { id, name, email } = await Deliverymans.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async updateStart(req, res) {
    const { start_date } = req.body;

    if (!start_date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(start_date);

    // caso queira pegar o timestamp do nmomento
    // console.log(+new Date);

    const DeliverysCount = await Deliverys.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: null,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    if (DeliverysCount.length >= 5) {
      return res.json({
        Atenção: 'Não é permitido ter mais de 5 entregas!',
      });
    }

    // 08:00
    // 18:00

    const date1 = Number(setSeconds(setMinutes(setHours(new Date(), 8), 0), 0));
    const date2 = Number(
      setSeconds(setMinutes(setHours(new Date(), 18), 0), 0)
    );

    const DentroHorario = isWithinInterval(searchDate, {
      start: date1,
      end: date2,
    });

    if (!DentroHorario) {
      return res
        .status(400)
        .json({ error: 'Não é permitido começar entregas nesse horário.s' });
    }

    const DeliverysOne = await Deliverys.update(
      { start_date: searchDate },
      {
        where: { id: req.params.idDelivery },
      }
    );

    return res.json({
      DeliverysOne,
    });
  }

  async updateEnd(req, res) {
    const DeliverysOne = await Deliverys.update(
      {
        end_date: new Date(),
        signature_id: req.body.signature_id,
      },
      {
        where: { id: req.params.idDelivery },
      }
    );

    return res.json({
      DeliverysOne,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Preencher um email válido!' });
    }

    const deliveryman = await Deliverymans.findByPk(req.params.id);

    await deliveryman.update(req.body);

    const { id, name, email, avatar_id } = await Deliverymans.findByPk(
      req.params.id
    );

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    await Deliverymans.destroy({ where: { id: req.params.id } });

    const DeliverymanAll = await Deliverymans.findAll();

    return res.json(DeliverymanAll);
  }
}

export default new DeliverymansController();
