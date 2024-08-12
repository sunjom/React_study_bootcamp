export async function fetchAvaliable(){
    const response = await fetch('http://localhost:3000/places')
    const resData = await response.json();

    if(!response.ok){ // ok : 200 or 300 false : 400 or 500
        throw new Error('Fail to fetch places');
    }

    return resData.places;
}

export async function fetchUser(){
    const response = await fetch('http://localhost:3000/user-places')
    const resData = await response.json();

    if(!response.ok){ // ok : 200 or 300 false : 400 or 500
        throw new Error('Fail to fetch places');
    }

    return resData.places;
}

export async function updateUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places',{
        method:'PUT',
        //places값을 json으로 만듦.
        //app.js에서 body.places로 객체값을 가져오기 때문에 중괄호로 묶음.
        body: JSON.stringify({places: places}),
        //body에 들어갈 값이 json이라고 알림
        headers:{
            'Content-Type':'application/json'
        }
    });
    const resData = await response.json();
    if(!response.ok){
        throw new Error('Failed to update user data.');
    }

    return resData.message
}