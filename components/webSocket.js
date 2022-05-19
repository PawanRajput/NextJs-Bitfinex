
export const fetchData = () => {
        let finalData;

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
            finalData = data;
        }    
        return finalData;
}