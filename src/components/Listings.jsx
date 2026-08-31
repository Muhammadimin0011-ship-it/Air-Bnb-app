import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useAuth } from '../store/useAuth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

function Listings() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { accessToken } = useAuth();

    const { data, loading, error } = useQuery(LISTINGS_QUERY, {
        variables: {
            limit: 10,
            page: page,
            search: search
        }
    });

    const [addFavorite] = useMutation(ADD_FAV)

    console.log(data);

    const totalPages = data?.listings?.pagination?.totalPages || 0;

    return (
        <div>
            <h1>{accessToken}</h1>

            {error && (
                <h1 style={{ color: 'red' }}>
                    Error: {error.message}
                </h1>
            )}

            {loading && <h1>Loading...</h1>}

            <input
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            {data?.listings?.items?.map((item) => (
                <div key={item.id}>
                    <img
                        src={item.images?.[0]}
                        alt="apartments picture"
                        width="200"
                    />

                    <h1>{item.title}</h1>

                    <button onClick={() => addFavorite({
                        variables: {
                            listingId: item.id
                        }
                    })}>
                        <FavoriteBorderIcon />
                    </button>

                    <p>{item.pricePerNight}</p>
                    <p>{item.rating}</p>
                </div>
            ))}

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
    );
}

export default Listings;