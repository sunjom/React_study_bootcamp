import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import fetchEvents from '../../\butil/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [search,setSearch] = useState();

  const {data,isLoading,isError,error} =  useQuery({
    queryFn: ({signal,queryKey}) => fetchEvents({signal,...queryKey[1]}),
    queryKey:['events',{search:search}],
    enabled: search !== undefined
  })
  function handleSubmit(event) {
    event.preventDefault();
    setSearch(searchElement.current.value);
  }


  let content = <p>Please enter a search term and to find events.</p>

  if(isLoading){
    content = <LoadingIndicator/>
  }
  if(isError){
    content = <ErrorBlock title={"에러발생!!!"} message={error.info?.message || ' 에러바알생!!'} />
  }

  if(data){
    content = <ul className='events-list'>
      {data.map(event => <li key={event.id}><EventItem event={event}/></li>)}
    </ul>
  }
  console.log(content);
  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
