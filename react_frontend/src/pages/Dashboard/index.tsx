import React, { useState, useEffect } from 'react';
import { Content, Main } from './style'
import api from '../../services/api'

interface PropsEvento {
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  like: number;
  dislike: number;
}

export const Dashboard: React.FC = () => {
  const [evento, setEvento] = useState<PropsEvento[]>([]);
  const [nomeEvento, setNomeEvento] = useState('');
  const [local, setLocal] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    api.get('/events').then((response) => setEvento(response.data))
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { target } = e;
    const cadastroEvento = {
      nomeevento: target.nomeEvento.value,
      local: target.local.value,
      diasemana: target.diaSemana.value,
      horario: target.horario.value,
    };
    await api.post(`/events`, cadastroEvento);
    api.get('/events').then((response) => setEvento(response.data));

    setNomeEvento('');
    setLocal('');
    setDiaSemana('');
    setHorario('');
    target.reset();
  };
  const handleDelete = async (id: string) => {
    await api.delete(`/events/${id}`);
    api.get('/events').then((response) => setEvento(response.data));
  };
  const handleLike = async (id: string) => {
    await api.post(`/events/like/${id}`);
    api.get('/events').then((response) => setEvento(response.data));
  };
  const handleDislike = async (id: string) => {
    await api.post(`/events/dislike/${id}`);
    api.get('/events').then((response) => setEvento(response.data));
  };
  return (
    <>
    <Main>
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Eventos</h1>
        <input type='text' name='nomeEvento' value={nomeEvento} onChange={(e) => setNomeEvento(e.target.value)} required placeholder='Nome do Evento' />
        <input type='text' name='local' value={local} onChange={(e) => setLocal(e.target.value)} required placeholder='Local do Evento' />
        <input type='text' name='diaSemana' value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)} required placeholder='Dia da Semana' />
        <input type='text' name="horario" value={horario} onChange={(e) => setHorario(e.target.value)} required placeholder="Horário" />
        <button type="submit">Salvar</button>
      </form>
      </Main>
      <Content>
        <br/>
        <h3>Eventos cadastrados</h3>
        <hr/>
        <br/>
        {!evento && (
          <span className='noData'>Não há cadastros!</span>
        )}
        {evento.map((evento) => (
          <div>
            <div className='leftData' id={evento.id}>
              <div>
                <label>Nome do evento: </label>
                <span>{evento.nomeevento}</span>
              </div>
              <div>
                <label>Local: </label>
                <span>{evento.local}</span>
              </div>
              <div>
                <label>Dia da semana: </label>
                <span>{evento.diasemana}</span>
              </div>
              <div>
                <label>Horário do evento: </label>
                <span>{evento.horario}</span>
              </div>
              <div>
                <label>Likes: </label>
                <span>{evento.like}</span>
              </div>
              <div>
                <label>Dislikes: </label>
                <span>{evento.dislike}</span>
              </div>
            </div>
            <div className='rightData'>
              <button type='button' className = 'buttonRemove' onClick={() => handleDelete(evento.id)}>
                Remover
              </button>
              <button type='button' className = 'buttonLike' onClick={() => handleLike(evento.id)}>
                Like
              </button>
              <button type='button' className = 'buttonDislike' onClick={() => handleDislike(evento.id)}>
                Dislike
              </button>
            </div>
            <br/>
            <hr/>
            <br/>
          </div>
        ))}
      </Content>
    </>
      )
}

      export default Dashboard



