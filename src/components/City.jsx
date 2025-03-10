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
    const [vowelCount, setVowelCount] = useState(0);  // New state for vowel count
    const [vowelSum, setVowelSum] = useState(0);  // New state for vowel sum
    const [consonantCount, setConsonantCount] = useState(0);  // New state for consonant count
    const [consonantSum, setConsonantSum] = useState(0);  // New state for consonant sum

    const vowels = ['A', 'E', 'I', 'O', 'U'];  // Define vowel characters

    const sumCity = (city) => {
        let sum = 0;
        let vowelSum = 0;
        let consonantSum = 0;
        let vowelChars = '';  // String to store vowel characters
        let consonantChars = '';  // String to store consonant characters

        for (let char of city) {
            const value = cityObj[char.toUpperCase()];

            sum += value;

            if (vowels.includes(char.toUpperCase())) {
                vowelSum += value;
                vowelChars += char;  // Append vowel to string
            } else if (/[A-Z]/.test(char.toUpperCase())) {  // Check for consonants
                consonantSum += value;
                consonantChars += char;  // Append consonant to string
            }
        }

        // Update states for vowel and consonant sums and characters
        setVowelCount(vowelSum);
        setVowelSum(digital_root(vowelSum));
        setConsonantCount(consonantSum);
        setConsonantSum(digital_root(consonantSum));

        return sum;
    }

    const digital_root = (n) => {
        if (n < 10) {
            return n;
        }

        let digits = n.toString().split('').map(Number);
        let sum = digits.reduce((acc, curr) => acc + curr, 0);

        return digital_root(sum);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let cityStr = (cityRef.current.value).replace(/[^a-zA-Z0-9]/g, '');
        setCity(cityStr);
    }

    useEffect(() => {
        city && setCityCount(sumCity(city));
    }, [city]);

    useEffect(() => {
        cityCount && setCitySum(digital_root(cityCount));
    }, [cityCount]);

    return (
        <div className="container">
            <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    <label className="form-label">Enter the Name </label>
                    <input className="form-control" type="text" ref={cityRef} onChange={onSubmitHandler}></input>
                </div>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
            <p>{city && <h3>Full Name : {city} : {cityCount} : {citySum}</h3>}</p>

            {/* Vowel information */}
            <p>{city && <h3>Mental Plane : {vowelCount} : {vowelSum}</h3>}</p>

            {/* Consonant information */}
            <p>{city && <h3>Personality Plane : {consonantCount} : {consonantSum}</h3>}</p>
        </div>
    )
}

export default City;
