import React, {useContext} from 'react';
import Card from "../components/card/Card";
import AppContext from "../context";


const Favorites = ({onAddToFavorite, onAddToCart}) => {
    const {favorites} = useContext(AppContext)

    return (
        <div className="content  p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Mои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {
                    favorites.map(item =>
                            <Card
                                key={item.id}
                                onFavorite={(obj) => onAddToFavorite(obj)}
                                onPlus={(obj) => onAddToCart(obj)}
                                favorited={true}
                                {...item}
                            />
                        )
                }
            </div>
        </div>
    );
};

export default Favorites;