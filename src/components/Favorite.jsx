import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { Button } from '@mui/material';

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

const REMOVE_FAV = gql`
    mutation RemoveFavorite($listingId: ID!) {
        removeFavorite(listingId: $listingId) {
            id
        }
    }
`;

function Favorites() {
    const { data, loading, error, refetch } = useQuery(FAVORITES_QUERY);

    const [removeFavorite] = useMutation(REMOVE_FAV);

    const handleRemoveFavorite = async (listingId) => {
        try {
            await removeFavorite({
                variables: {
                    listingId: listingId,
                },
            });

            await refetch();
        } catch (error) {
            console.log(error);
        }
    };

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

                    <p>
                        ${listing.pricePerNight} / night
                    </p>

                    <p>⭐ {listing.rating}</p>

                    <Button
                        onClick={() => handleRemoveFavorite(listing.id)}
                        sx={{
                            color: "white",
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            backgroundColor: "#ff0000",
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ))}
            {!data?.favorites ? 'favorite is not defined' : ''}
        </div>
    );
}

export default Favorites;