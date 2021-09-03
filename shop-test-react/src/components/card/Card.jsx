import React, {useContext, useState} from 'react';
import classes from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from "../../context";


const Card = ({
                  id,
                  name,
                  price,
                  imgUrl,
                  onPlus,
                  onFavorite,
                  favorited = false,
                  loading = false
              }) => {

    const {isItemAdded} = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited)

    const onAdd = () => {
        onPlus({id, name, price, imgUrl})
    }

    const onClickFavorite = () => {
        onFavorite({id, name, price, imgUrl})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={classes.card}>
            {loading ?
                <ContentLoader
                    speed={2}
                    width={175}
                    height={265}
                    viewBox="0 0 175 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="0" rx="10" ry="10" width="175" height="155"/>
                    <rect x="0" y="167" rx="5" ry="5" width="175" height="15"/>
                    <rect x="0" y="187" rx="5" ry="5" width="120" height="15"/>
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
                    <rect x="140" y="230" rx="10" ry="10" width="32" height="32"/>
                </ContentLoader>
                :
                <>
                    { onFavorite &&
                        <div className={classes.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? "img/liked.svg" : "img/unliked.svg"} alt="unliked"/>
                        </div>
                    }
                    <img width="100%" height={130} src={imgUrl} alt="sneakers"/>
                    <h5>{name}</h5>
                    <div className='d-flex justify-between align-center'>
                        <div className='d-flex flex-column'>
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        { onPlus &&
                            <img className={classes.plus} onClick={onAdd}
                                 src={isItemAdded(id) ? 'img/check.svg' : 'img/button-plus.svg'}
                                 alt="Plus"/>
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default Card;