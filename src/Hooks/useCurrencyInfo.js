import { useEffect , useState } from "react";


function useCurrencyInfo(currency){
    const [data , setData] = useState(null) // useState k andr hum ek empty object dal dete h ki agr fetch call ni aarhi h toh koi error na aaye 

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        .then((res) => res.json())   // convert into json form and hold it 
        .then((res) => setData(res[currency]))  // currency islie qki jo bhi url m doge (usd ya india ya koi bhi or toh uski hi value yaha ajygi ) isko .currency bhi kr skte h 
        console.log(data);
    },[currency])  // dependencies 

    return data 
}

export default useCurrencyInfo