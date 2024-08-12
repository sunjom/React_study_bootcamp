import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvaliable} from '../http.js'
export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [available, setAvailable] = useState([]);
  const [error, setError] = useState();
  useEffect(()=>{
    setIsFetching(true);
    //async를 사용하면 하단에 있는 소스코드를 간결하게 사용할 수 있다.
    async function fetchPlaces(){
      try{
        const places = await fetchAvaliable();

        navigator.geolocation.getCurrentPosition((position)=>{
        const sortedPlaces = sortPlacesByDistance(
          places, 
          position.coords.latitude, 
          position.coords.longitude
        )
        //try문에서 error가 발생하면 resData를 못받기 때문에 try안에 설정.
        setAvailable(sortedPlaces);
        //밖에서 설정하면 함수가 실행되기 전에 먼저 설정되기 때문에 안에서 설정. 
        setIsFetching(false);
        })
      }catch(error){
        setError({
          message:error.message || "에러발생했어용 ㅠㅠ"});
      }
    }

    fetchPlaces();

    // fetch('http://localhost:3000/places')
    // .then((res)=>{
    //   return res.json();
    // })
    // .then((resData) => {
    //   setAvailable(resData.places)
    // })
  },[])

  if(error){
    return <Error title={"에러 발생!!!!!!!!!!"} message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={available}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
 