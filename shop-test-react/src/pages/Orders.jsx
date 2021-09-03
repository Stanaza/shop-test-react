import React, {useEffect, useState} from 'react';
import Card from "../components/card/Card";
import axios from "axios";


const Orders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=> {
        (async () => {
            try {
                const {data} = await axios.get('http://localhost:3000/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.error(error)
            }
        })()
    }, [])

    return (
        <div className="content  p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Mои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {
                    (isLoading ? [...Array(4)] : orders)
                    .map((item, index) =>
                            <Card
                                key={index}
                                favorited={true}
                                loading={isLoading}
                                {...item}
                            />
                        )
                }
            </div>
        </div>
    );
};

export default Orders;