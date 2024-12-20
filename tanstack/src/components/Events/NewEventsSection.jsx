import { useEffect, useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import {useQuery} from '@tanstack/react-query'
import fetchEvents from '../../\butil/http.js';
export default function NewEventsSection() {
  const {data,isError,error, isLoading} = useQuery({
    queryFn: ({signal,queryKey}) => fetchEvents({signal, ...queryKey[1]}),
    queryKey: ['events', {max:3}],
    staleTime:5000,
  })
  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || '에러!!!'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
