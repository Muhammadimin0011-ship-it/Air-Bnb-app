import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useAuth } from '../store/useAuth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../style/listings.css'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
                    {data?.listings?.items?.map((item) => (
                        <div className="apartment-card" key={item.id}>
                            <img
                                src={item.images?.[0]}
                                alt="apartments picture"
                            />

                            <h5>{item.title}</h5>

                            <p>
                                {item.pricePerNight}$ - {item.rating}⭐


                                <button onClick={() => addFavorite({
                                    variables: { listingId: item.id }
                                })}>
                                    <FavoriteBorderIcon />
                                </button>
                            </p>



                        </div>
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
