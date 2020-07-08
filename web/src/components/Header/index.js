import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/images/logoHeader.svg';
import { Container, Content, Profile } from './styles';

import { signOut } from '../../store/modules/auth/actions';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  let history = useHistory();

  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={Logo} alt="FastFeet" />
          <Link to="/encomendas">ENCOMENDAS</Link>
          <Link to="/entregadores">ENTREGADORES</Link>
          <Link to="/destinatarios">DESTINATÁRIOS</Link>
          <Link to="/problemas">PROBLEMAS</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <Link to="/">{profile.name}</Link>
              <label onClick={handleSignOut}>sair do sistema</label>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
