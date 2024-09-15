import { uiActions } from "../../store/ui";

export function sendItemData(item){
    return async(dispatch) => {
        dispatch(uiActions.showNotification({
            status:'pending',
            title:'Sending...',
            message:"Sending cart data"
          }));

          const sendRequest = async() =>{
            const response = await fetch(
                'https://react-test1-8443f-default-rtdb.firebaseio.com/item.json'
            ,{
                method:"PUT",
                body: JSON.stringify({
                    item: item.items,
                    totalAmount:item.totalAmount,
                })
            });

            if(!response.ok){
                throw new Error('Sending cart data failed.');
            }

            try{
                await sendRequest();

                dispatch(
                    uiActions.showNotification({
                        status: 'success',
                        title: 'Success!',
                        message: 'Sent cart data successfully!',
                    })
                )
            }catch(e){
                dispatch(
                    uiActions.showNotification({
                      status: 'error',
                      title: 'Error!',
                      message: 'Sending cart data failed!',
                    })
                  );
            }
          }
    }
export function fetchItemData(){
    return async (dispatch) => {
        const response = fetch('https://react-test1-8443f-default-rtdb.firebaseio.com/item.json');

        if(!response.ok){
            throw new Error('Sending cart data failed.');
        }

        const data = (await response).json();

        return data;
    }
}