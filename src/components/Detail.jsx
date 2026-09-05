import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";
import { useState } from "react";
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

    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [guests, setGuests] = useState(1);

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

    // Necha kecha
    let nights = 0;

    if (arrival && departure) {
        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);

        const difference = departureDate - arrivalDate;

        nights = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );
    }

    // Umumiy narx
    const totalPrice =
        nights > 0
            ? listing.pricePerNight * nights
            : 0;

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
                        {listing.guests} guests ·{" "}
                        {listing.bedrooms} bedrooms ·{" "}
                        {listing.beds} beds ·{" "}
                        {listing.bathrooms} bathrooms
                    </p>

                    <p>
                        Rating {listing.rating}⭐
                    </p>

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

                    <div className="booking-info">

                        <div className="date-box">

                            <div>
                                <label>ARRIVAL</label>

                                <input
                                    type="date"
                                    value={arrival}
                                    onChange={(e) =>
                                        setArrival(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label>DEPARTURE</label>

                                <input
                                    type="date"
                                    value={departure}
                                    onChange={(e) =>
                                        setDeparture(e.target.value)
                                    }
                                />
                            </div>

                        </div>

                        <div className="guest-box">

                            <label>FOR WHOM</label>

                            <input
                                type="number"
                                min="1"
                                max={listing.guests}
                                value={guests}
                                onChange={(e) =>
                                    setGuests(Number(e.target.value))
                                }
                            />

                            <span> guests</span>

                        </div>

                    </div>

                    {nights > 0 && (
                        <div className="nights-box">
                            <b>{nights}</b>{" "}
                            {nights === 1 ? "night" : "nights"}
                        </div>
                    )}

                    <div className="total-price">

                        <span>Total</span>

                        <b>
                            ${totalPrice}
                        </b>

                    </div>

                    <button className="reserve-btn">
                        Book now
                    </button>

                    <p className="pay">
                        For now you don't pay for anything
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Detail;