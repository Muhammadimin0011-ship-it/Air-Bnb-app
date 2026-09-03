import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useAuth } from '../store/useAuth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../style/listings.css'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from "react-router";

const LISTINGS_QUERY = gql`
    query Listings($limit: Int, $page: Int, $search: String) {
        listings(limit: $limit, page: $page, search: $search) {
            items {
                id
                title
                pricePerNight
                rating
                images
            }

            pagination {
                totalPages
            }
        }
    }
`;

const ADD_FAV = gql`
mutation Mutation($listingId: ID!) {
  addFavorite(listingId: $listingId) {
    address
  }
}`

function Listings({ search, setPage, page }) {


    const { accessToken } = useAuth();

    const { data, loading, error } = useQuery(LISTINGS_QUERY, {
        variables: {
            limit: 16,
            page: page,
            search: search,
        }
    });

    const [addFavorite] = useMutation(ADD_FAV)

    console.log(data);
    console.log(accessToken);

    const totalPages = data?.listings?.pagination?.totalPages || 0;

    return (
        <>
            <div>
                <h1>Popular apartments in the world  <ArrowRightAltIcon /> </h1>

            </div>
            <div>


                {error && (
                    <h1 style={{ color: 'red' }}>
                        Error: {error.message}
                    </h1>
                )}

                {loading && <h1>Loading...</h1>}


                <div className="wrapper">
                    {data?.listings?.items.map((listing) => (
                        <Link
                            key={listing.id}
                            to={`/listing/${listing.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="apartment-card">
                                <img
                                    src={listing.images?.[0]}
                                    alt={listing.title}
                                />

                                <h3>{listing.title}</h3>

                                <p>⭐ {listing.rating}</p>

                                <p>
                                    ${listing.pricePerNight} / night
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div>
                    {new Array(totalPages).fill('').map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Listings;
