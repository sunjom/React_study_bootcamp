import { useEffect, useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

//한번만 실행해도 되는 변수들은 함수 밖에 배치한다 => 안에 배치하면 불필요하게 계산되기 때문임.
//JSON.parse를 안하면 문자열을 반환해줌. => 객체로써 값을 사용하기 위해 변환해줘야됨.
const storages = JSON.parse(localStorage.getItem('selectedPlaces')) || []
const picked = storages.map((storage) => AVAILABLE_PLACES.find((id) => storage === id.id ))

function App() {
  const selectedPlace = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(picked);

  //geolocation : 공간위치객체 , getCurrentPosition : 사용자 현재 위치
  //브라우저에서 positon값을 전달해줌 
  // navigator.geolocation.getCurrentPosition((positon)=>{
  //   const sortedPlaces = sortPlacesByDistance(
  //     AVAILABLE_PLACES,
  //     positon.coords.latitude,
  //     positon.coords.longitude
  //   )
  //   setAvaliablePlaces(sortedPlaces);
  // })

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((positon)=>{
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        positon.coords.latitude,
        positon.coords.longitude
      )
      setAvaliablePlaces(sortedPlaces);
    })
  },[])

  function handleStartRemovePlace(id) {
    setIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      //pickedPlaces안에 매개변수로 받은 id와 같은 값은 id가 있다면 새로운값 안받음.
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    // JSON.pares 후 || []를 해주는 이유 : 초기에 setItem을 안해주기 때문에 값이 없어 오류가 나기 때문
    //getItem(key값)
    const storages = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    //setItem(key값, string값)
    localStorage.setItem('selectedPlaces',JSON.stringify([id,...storages]));
    
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      // 배열 안에 값중 조건에 맞는 값들만 가져옴.
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    const storages = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    localStorage.setItem('selectedPlaces',
      JSON.stringify(
        storages.filter((storage) => storage !== selectedPlace.current))
      );
    
    setIsOpen(false);
  },[])

  return (
    <>
      <Modal open={isOpen} close={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={avaliablePlaces}
          fallbackText="ㄱㄷㄱㄷ"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
