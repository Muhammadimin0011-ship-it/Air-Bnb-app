import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";
import "../style/detail.css";

const LISTING_QUERY = gql`
  query Listing($listingId: ID!) {
    listing(id: $listingId) {
      address
      bathrooms
      bedrooms
      beds
      id
      guests
      images
      isFavorite
      title
      rating
      pricePerNight
      location
      category
    }
  }
`;

function Detail() {
    const { id } = useParams();

    const { data, loading, error } = useQuery(LISTING_QUERY, {
        variables: {
            listingId: id,
        },
    });

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error.message}</h2>;
    }

    const listing = data?.listing;

    return (
        <div className="detail">

            <div className="images">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="big-image"
                />

                <div className="small-images">
                    {listing.images.slice(1, 5).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={listing.title}
                        />
                    ))}
                </div>
            </div>

            <div className="detail-main">

                <div className="info">

                    <h1>{listing.title}</h1>

                    <p className="location">
                        📍 {listing.address}
                    </p>

                    <p>
                        {listing.guests} guests · {listing.bedrooms} bedrooms ·{" "}
                        {listing.beds} beds · {listing.bathrooms} bathrooms
                    </p>

                    <p>Rating {listing.rating}⭐</p>

                    <hr />

                    <h2>About apartment</h2>

                    <p>
                        Category: {listing.category}
                    </p>

                    <p>
                        Location: {listing.location}
                    </p>

                    <p>
                        Guests: {listing.guests}
                    </p>

                    <p>
                        Bedrooms: {listing.bedrooms}
                    </p>

                    <p>
                        Beds: {listing.beds}
                    </p>

                    <p>
                        Bathrooms: {listing.bathrooms}
                    </p>

                </div>

                <div className="price-box">

                    <h2>
                        ${listing.pricePerNight}
                        <span> / night</span>
                    </h2>


                    <div className="guest-box">
                        <p>GUESTS</p>
                        <b>{listing.guests} guests</b>
                    </div>

                    <button>Reserve</button>

                    <p className="pay">
                        You won't be charged yet
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Detail;