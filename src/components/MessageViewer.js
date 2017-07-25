import React from 'react';

// This works:
const MessageViewer = (props) => {
  // console.log('debug. input to MessageViewer:', props);
  return (
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        <p>Hello! For now, ID is {props.id}</p>
      </div>
    </div>
  )
}

// const MessageViewer = (props) => {
//   console.log('debug. input to MessageViewer:', props);
//   fetch(`http://localhost:8181/api/messages/${props.id}`)
//   .then(response => {
//     console.log(response);
//     return response.json()
//   })
//   .then(json => {
//     console.log('json from server:', json);
//     return (
//       <div className="row message-body">
//         <div className="col-xs-11 col-xs-offset-1">
//           Hello! ID is {props.id}
//         </div>
//       </div>
//     )
//   })
// }

// OR
// const MessageViewer = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:8181/api/messages/${id}`);
//     const json = await response.json();
//   } catch(err) {
//     console.error('Error fetching message body:', err);
//   }
//   return (
//     <div className="row message-body">
//       <div className="col-xs-11 col-xs-offset-1">
//         {json.body}
//       </div>
//     </div>
//   )
// }

export default MessageViewer;
