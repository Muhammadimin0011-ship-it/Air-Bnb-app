import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "../style/booking.css";

const BOOKINGS_QUERY = gql`
    query Bookings {
        bookings {
            id
            listing {
                id
                title
            }
            checkIn
            checkOut
            guests
            totalPrice
        }
    }
`;

function Booking() {
    const { data, loading, error } = useQuery(BOOKINGS_QUERY);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error.message}</h2>;
    }

    return (
        <div className="bookings-page">

            <h1>My Bookings</h1>

            <div className="bookings-wrapper">

                {data?.bookings?.map((booking) => (
                    <div
                        className="booking-card"
                        key={booking.id}
                    >
                        <h2>
                            Booking ID:{booking.id}
                        </h2>

                        <p>
                            <b>Listing:</b> {booking.listing?.title}
                        </p>

                        <p>
                            <b>Arrival:</b> {booking.checkIn}
                        </p>

                        <p>
                            <b>Departure:</b> {booking.checkOut}
                        </p>

                        <p>
                            <b>Guests:</b> {booking.guests}
                        </p>

                        <p>
                            <b>Total price:</b> ${booking.totalPrice}
                        </p>
                    </div>
                ))}

            </div>

            {data?.bookings?.length === 0 && (
                <h3>You don't have any bookings yet.</h3>
            )}

        </div>
    );
}

export default Booking;