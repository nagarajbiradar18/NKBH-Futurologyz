import { useEffect, useRef, useState } from "react";

const City = () => {

    const cityObj = {
        'A': 1,
        'B': 2,
        'C': 3,
        'D': 4,
        'E': 5,
        'F': 8,
        'G': 3,
        'H': 5,
        'I': 1,
        'J': 1,
        'K': 2,
        'L': 3,
        'M': 4,
        'N': 5,
        'O': 7,
        'P': 8,
        'Q': 1,
        'R': 2,
        'S': 3,
        'T': 4,
        'U': 6,
        'V': 6,
        'W': 6,
        'X': 5,
        'Y': 1,
        'Z': 7,
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,


    }
    const cityRef = useRef();
    const [cityCount, setCityCount] = useState();
    const [city, setCity] = useState();
    const [citySum, setCitySum] = useState();

    const cityChangeHandler = () => {
        //s console.log(cityRef.current.value);

    }

    const sumCity = (city) => {

        let sum = 0
        for (let char of city) {
            // console.log(cityObj[char.toUpperCase()])
            sum += cityObj[char.toUpperCase()]
        }

        return sum;

    }

    const digital_root = (n) => {
        // Base case: if the number is less than 10, return the number
        if (n < 10) {
            return n;
        }

        // Convert the number to a string to extract individual digits
        let digits = n.toString().split('').map(Number);

        // Calculate the sum of the digits
        let sum = digits.reduce((acc, curr) => acc + curr, 0);

        // Recursively call digital_root with the sum until it's a single-digit number
        return digital_root(sum);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let cityStr = (cityRef.current.value).replace(/[^a-zA-Z0-9]/g, '');
        setCity(cityStr)
    }

    useEffect(() => {
        city && setCityCount(sumCity(city));
    }, [city])


    useEffect(() => {
        cityCount && setCitySum(digital_root(cityCount))
    }, [cityCount])


    return (
        <div className="container">
            <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    <label className="form-label">Enter the Name </label>
                    <input className="form-control" type="text" ref={cityRef} onChange={onSubmitHandler}></input>
                </div>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
            {city && <h3> {city} : {cityCount} : {citySum}</h3>}
        </div>
    )
}

export default City;