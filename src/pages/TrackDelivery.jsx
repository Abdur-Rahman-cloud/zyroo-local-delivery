// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import orders from "../data/orders";

// function TrackDelivery() {
//   const { id } = useParams();
//   const [searchId, setSearchId] = useState(id || "");
//   const [order, setOrder] = useState(
//     id ? orders.find((o) => o.id === id) : null
//   );
//   const [searched, setSearched] = useState(!!id);

//   function handleSearch(e) {
//     e.preventDefault();
//     setOrder(orders.find((o) => o.id === searchId.trim().toUpperCase()));
//     setSearched(true);
//   }

//   return (
//     <div className="track-delivery">
//       <h1>Track Delivery</h1>

//       <form className="track-form" onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Enter Order ID (e.g. DL001)"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//         />
//         <button type="submit" className="btn btn-primary">Track</button>
//       </form>

//       {searched && !order && <p>No order found with that ID.</p>}

//       {order && (
//         <div className="track-result">
//           <p><strong>Order:</strong> {order.id}</p>
//           <p><strong>Rider:</strong> {order.rider}</p>
//           <p><strong>Route:</strong> {order.pickup} → {order.delivery}</p>
//           <p><strong>Current Status:</strong> {order.status}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TrackDelivery;



import DeliveryTracking from "../components/DeliveryTracking";

export default function TrackDelivery() {
  return <DeliveryTracking />;
}