import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipients from '../models/Recipients';

class RecipientsController {
  async index(req, res) {
    if (req.params.id) {
      const recipient = await Recipients.findOne({
        where: { id: req.params.id },
      });

      return res.json(recipient);
    }

    if (req.query.q) {
      const recipientLike = await Recipients.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        },
      });
      if (recipientLike.length > 0) return res.json(recipientLike);
    }

    const recipientAll = await Recipients.findAll();

    return res.json(recipientAll);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    await Recipients.create(req.body);

    return res.json({ sucess: 'Novo Destinatário criado' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    const recipient = await Recipients.findOne({
      where: { id: req.params.id },
    });

    if (!recipient) {
      return res.json({ error: 'Recipient not found' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    await Recipients.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json({ sucess: 'Dados do destinatário atualizado' });
  }

  async delete(req, res) {
    await Recipients.destroy({ where: { id: req.params.id } });

    const RecipientsAll = await Recipients.findAll();

    return res.json(RecipientsAll);
  }
}
export default new RecipientsController();
