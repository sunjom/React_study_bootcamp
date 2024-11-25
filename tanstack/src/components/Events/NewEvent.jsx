import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { Client, createNewEvent } from '../../\butil/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
  Client.query
  const {mutate,isPending,isError,error} = useMutation({
    mutationFn:createNewEvent,
    onSuccess:()=>{
      Client.invalidateQueries({queryKey:['events']})
      navigate('/events')
    }
  })
  

  function handleSubmit(formData) {
    mutate({event:formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Sending....</p>}
        {!isPending &&
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
        }
      </EventForm>
      {isError && <ErrorBlock title="에러발생!!!!!" message={error.info?.message || '에러가 발생해버림!!'}/>}
    </Modal>
  );
}
