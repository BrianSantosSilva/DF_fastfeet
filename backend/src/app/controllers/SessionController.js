import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Users from '../models/Users';
import Deliverymans from '../models/Deliverymans';
import File from '../models/File';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    if (req.body.id) {
      const Deliveryman = await Deliverymans.findOne({
        include: [
          {
            model: File,
            as: 'File',
            attributes: ['path'],
          },
        ],
        where: {
          id: req.body.id,
        },
      });

      const { id, name, email, avatar_id, createdAt } = Deliveryman;

      return res.json({
        user: {
          id,
          name,
          email,
          path: Deliveryman.File.path,
          avatar: avatar_id,
          createdAt,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }

    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return res.json({ error: 'Usuário não existe' });
    }

    if (!(await user.checkPassword(password))) {
      return res.json({ error: 'Senha incorreta' });
    }

    const { id, name, avatar, provider, createdAt } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
        createdAt,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
