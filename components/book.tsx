import React, { useState, useEffect } from 'react'
// import { fetchData } from './webSocket';

const Book = () => {
    const [book, setBook] = useState([]);
    const [bookSell, setbookSell] = useState([]);
    const [channel, setChannel] = useState([]);

    useEffect(() => {
        let channels = {};
        let symbol = 'tBTCUSD';

        let wss = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
        
        wss.onopen = () => {
            wss.send(JSON.stringify({
                "symbol": symbol,
                "event": "subscribe",
                "channel": "Book"
            }));
        };

        wss.onmessage = (event) => {

            let data = JSON.parse(event.data);
            console.log(data)
            if (data.event === 'subscribed') {
                channels[data.chanId] = data.channel;
            } else {
                if (data.shift) {
                    let chanId = data.shift();
                    if (data !== "hb") {
                        let ch = channels[chanId];
                        if ((ch === 'book') && (data[0][2] < 0)) {
                            ch = 'booksell';
                        }
                        let chData = channel

                        if (chData.length > 20) {
                            chData.shift();
                        }

                        else {
                            chData.push(data);
                        }

                        setChannel(chData);
                    }
                }

            }

        }
    },[])

    const tradeBook = () => {
        let table = [];
        book.forEach(elem => {
            let PRICE = elem[0][0];
            let COUNT = elem[0][1];
            let AMOUNT = elem[0][2];
            if (COUNT > 0) {
                table.push(<tr key={Math.random()}>
                    <td>{COUNT} </td>
                    <td>{AMOUNT.toFixed(4)} </td>
                    <td>{(COUNT * AMOUNT).toFixed(4)} </td>
                    <td>{PRICE} </td>
                </tr>)
            }

        });
        return table
    }

    const tradeBookSell = () => {
        let table = [];
        book.forEach(elem => {
            let PRICE = elem[0][0];
            let COUNT = elem[0][1];
            let AMOUNT = elem[0][2];
            if (COUNT > 0) {
                table.push(<tr key={Math.random()}>
                    <td>{PRICE} </td>
                    <td>{(COUNT * AMOUNT).toFixed(4)} </td>
                    <td>{AMOUNT.toFixed(4)} </td>
                    <td>{COUNT} </td>
                </tr>)
            }

        });
        return table
    }


    return (
        <div className="App">
            <div className="left">
                <div className="title">ORDER BOOK BTC/USD</div>
                <table className="tbl left" style={{width:'500px', height:'500px'}}>
                    <tbody>
                    <tr className='header'>
                        <td>COUNT</td>
                        <td>AMOUNT</td>
                        <td>TOTAL</td>
                        <td>PRICE</td>
                    </tr>
                    {tradeBook()}
                    </tbody>
                </table>

                <table className="tbl" style={{width:'500px', height:'500px'}}>
                    <tbody>
                    <tr className='header'>
                        <td>PRICE</td>
                        <td>TOTAL</td>
                        <td>AMOUNT</td>
                        <td>COUNT</td>
                    </tr>
                    {tradeBookSell()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Book