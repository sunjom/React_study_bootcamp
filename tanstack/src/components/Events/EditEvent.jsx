import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Client, fetchEvent, updateEvent } from '../../\butil/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
export default function EditEvent() {
  const navigate = useNavigate();

  const {id} = useParams();

  const {data,isPending,isError,error} = useQuery({
    queryFn:({signal}) => fetchEvent({id:id,signal}),
    queryKey:['events',id]
  })

  const {mutate} = useMutation({
    mutationFn:updateEvent,
    onMutate: async(data) =>{
      const newEvent = data.event


      await Client.cancelQueries({queryKey:['events',id]})
      const prevEvent = Client.getQueryData(['events',id])

      Client.setQueryData(['events',id],newEvent);

      return {prevEvent}
    },
    onError: (error,data,context) =>{
      Client.setQueryData(['events',id],context.prevEvent)
    },
    onSettled: () => {
      Client.invalidateQueries(['events',id])
    }
    
  })
  function handleSubmit(formData) {
    mutate({id:id,event:formData})
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if(isPending){
    content = (<div className='center'>
      <LoadingIndicator />
    </div>)
  }

  if(isError){
    content =
    <>
      <ErrorBlock title="이벤트 정보 못가져옴" message={error.info?.message || '에러!'}/>
      <div className='form-actions'>
        <Link to="../" className='button'>
          Okey
        </Link>
      </div>
    </>
  }
  if(data){
    content=(
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader(){
   
}