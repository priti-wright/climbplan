export const RECEIVE_QUERY = 'RECEIVE_QUERY';

export function receiveQuery(query) {
   return {
       type: RECEIVE_QUERY,
       query,
   };
}
