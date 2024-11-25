import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Client, deleteEvent, fetchEvent } from '../../\butil/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx'
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const {id} = useParams();
  const [modal,setModal] = useState(false);
  const navigate = useNavigate();

  const {data,isLoading,isError,error} =useQuery({
    queryFn:({signal}) => fetchEvent({id:id,signal}),
    queryKey:['events',id]
  })

  const {mutate, isPending:isPendingDelete, isError:isErrorDelete, error:errorDelete} = useMutation({
    mutationFn:() =>deleteEvent({id}),
    onSuccess:() =>{
      Client.invalidateQueries({queryKey:['events'], refetchType:'none'});
      navigate('/events')
    }
  })

  function onDelete(){
    mutate({id:id});
  }

  function OpenModal(){
    setModal(true);
  }

  function CloseModal(){
    setModal(false);
  }

  let content;

  if(isLoading){
    content = <p>Loading...</p>
  }

  if(isError){
    content = <ErrorBlock title={"에러바알생!"} message={error.info?.message || '에러에러!'}/>
  }

  if(data){
    const dateFormat = new Date(data.date).toLocaleDateString('en-US',{
      year:'numeric',
      month:'short',
      day:'numeric',
    })

    content = (<>
      <header>
        <h1>{data.title}</h1>
        <nav>
          <button onClick={OpenModal}>Delete</button>
          <Link to="edit">Edit</Link>
        </nav>
      </header>
      <div id="event-details-content">
        <img src={`http://localhost:3000/${data.image}`} alt="" />
        <div id="event-details-info">
          <div>
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{dateFormat} @ {data.time}</time>
          </div>
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
    </>)
  }
  return (
    <>
      {modal && 
        <Modal onClose={CloseModal}>
          <h2>정말 삭제하시겠습니까?</h2>
          <p>삭제하면 다음부턴 볼 수 없게 됩니다</p>
          <div className='form-actions'>
            {isPendingDelete && <p>Deleting, please wait...</p>}
            {!isPendingDelete && <>
              <button onClick={onDelete} className='button-text'>Yes</button>
              <button onClick={CloseModal} className='button'>No</button>
            </>}
          </div>
        {isErrorDelete && <ErrorBlock title="삭제 실패!" message={errorDelete.info?.message || '확인해주세요!'}/>}
        </Modal>
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
