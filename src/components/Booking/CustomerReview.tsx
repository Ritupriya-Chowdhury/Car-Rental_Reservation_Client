import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // For getting the car ID from the URL
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hook";
import { addCustomerReview, fetchCarDetails } from "../../redux/slices/carSlice";

const CustomerReview = () => {
  const { id } = useParams<{ id: string }>(); // Get car ID from the URL
  const dispatch = useAppDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { carDetails, loading, error } = useSelector((state: RootState) => state.cars);
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  
 
  // console.log(userProfile)

  const [reviewText, setReviewText] = useState("");

  // Fetch car details when the page loads
  useEffect(() => {
    if (id) {
      dispatch(fetchCarDetails(id));
    }
  }, [dispatch, id]);

  // Handle review submission
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim() && id) { // Ensure id is defined
      const review = `${userProfile?.name}: ${reviewText}`; // Format review with userProfile's name
      
      // Update the car listing with the new review
      await dispatch(addCustomerReview({ id, review })); // id is guaranteed to be a string
      setReviewText(""); // Clear the input field
    }
  };

  return (
    <div className={`${theme==='dark'?'bg-gray-700':'bg-white'}`}>
      <div className="p-6 md:pl-48 md:py-8 min-h-screen">
      <h1 className={`text-2xl font-bold mb-4 ${theme==='dark'?'text-yellow-400':'text-black'}`}>Customer Reviews for {carDetails?.name}</h1>

      {/* Display car details */}
      <div className="mb-6 border p-4 rounded-md shadow bg-white mx-4 my-12">
        <h2 className={`text-xl font-semibold my-4 `}>Car Details</h2>
        {loading && <p>Loading car details...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {carDetails ? (
          <div>
            <img src={carDetails.image} alt={carDetails.name} className="w-full h-9/12  my-8 mx-auto  rounded-lg border" />
            <p><strong>Description:</strong> {carDetails.description}</p>
            <p><strong>Color:</strong> {carDetails.color}</p>
            <p><strong>Type:</strong> {carDetails.carType}</p>
            <p><strong>Price Per Hour:</strong> ${carDetails.pricePerHour}</p>
            <p><strong>Status:</strong> {carDetails.status}</p>
            <p><strong>Location:</strong> {carDetails.location}</p>
            <p><strong>Electric:</strong> {carDetails.isElectric ? "Yes" : "No"}</p>
          </div>
        ) : (
          <p>No car details available.</p>
        )}
      </div>

      {/* Review submission form */}
      <form onSubmit={handleReviewSubmit} className="my-12 mx-4">
        <h2 className={`text-xl font-bold mb-8 ${theme==='dark'?'text-yellow-400':'text-black'}`}>Add Your Review:</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="Write your review here..."
          className="w-full p-2 border rounded-md mb-2"
          required
        />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-500 text-black font-bold p-2 rounded-md">Submit Review</button>
      </form>

      {/* Display existing reviews */}
      <div className="mb-12 mx-4">
        <h2 className={`text-xl font-bold mb-8 ${theme==='dark'?'text-yellow-400':'text-black'}`}>Customer Reviews:</h2>
        {loading && <p>Loading reviews...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {carDetails?.customerReviews.length ? (
          <ul className="space-y-2">
            {carDetails.customerReviews.map((review, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-md">
                {review}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default CustomerReview;
