import React, {useState} from 'react';
import {useMutation} from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import {TOGGLE_FAVORITE} from '../gql/mutation';
import {GET_MY_FAVORITES} from '../gql/query';

const FavoriteNote = props => {
    const [count, setCount] = useState(props.favoriteCount);
    const [favorited, setFavorited] = useState(
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );

    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{query: GET_MY_FAVORITES}]
    });

    return (
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(false);
                        setCount(count - 1);
                    }}
                    data-cy="favorite"
                >
                    Remove Favorite
                </ButtonAsLink>
            ) : (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(true);
                        setCount(count + 1);
                    }}
                    data-cy="favorite"
                >
                    Add Favorite
                </ButtonAsLink>
            )}
            : {count}
        </React.Fragment>
    );
};

export default FavoriteNote;
