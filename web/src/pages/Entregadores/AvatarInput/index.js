import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '../../../services/api';

import { Container } from './styles';

export default function AvatarInput({ avatarInicial }) {
  const ref = useRef(null);
  const { registerField, defaultValue, error } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    registerField({
      name: 'avatar_id',
      ref: ref.current,
      path: 'dataset.file',
    });
  }, [ref.current, preview]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, path } = response.data;

    setFile(id);

    setPreview(path);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={preview || (avatarInicial ? avatarInicial.path : '')}
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
        {error && <span>{error}</span>}
      </label>
    </Container>
  );
}
