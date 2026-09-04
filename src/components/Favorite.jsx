import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const FAVORITES_QUERY = gql`
    query MyFavorites {
        favorites {
            id
            title
            pricePerNight
            rating
            images
            address
        }
    }
`;

function Favorites() {
    const { data, loading, error } = useQuery(FAVORITES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="wrapper">
            {data?.favorites?.map((listing) => (
                <div className="apartment-card" key={listing.id}>
                    <img
                        src={listing.images?.[0]}
                        alt={listing.title}
                    />

                    <h3>{listing.title}</h3>
                    <p>{listing.address}</p>
                    <p>${listing.pricePerNight} / night</p>
                    <p>⭐ {listing.rating}</p>
                </div>
            ))}
        </div>
    );
}

export default Favorites;