export const RECEIVE_PLACE = 'RECEIVE_PLACE';

export function receivePlace(place) {
   return {
       type: RECEIVE_PLACE,
       place,
   };
}
