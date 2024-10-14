import { useRef, useState, useEffect } from "react";



const Driver = () => {

    const [data, setData] = useState([]);

    const dateRef = useRef();
    const numberRef = useRef();
    const [driver, setDriver] = useState('');
    const [conductor, setConductor] = useState('');
    const [fullDateStr, setFullDateStr] = useState('');
    const [characteristics, setCharacteristics] = useState({})
    const [numberSum, setNumberSum] = useState(0);
    const [fullNumberSum, setFullNumberSum] = useState(0);


    const dateChangeHandler = (event) => {

        //console.log(event.target.value);
        //console.log(dateRef.current.value);
        console.log(new Date(dateRef.current.value));
        let date = new Date(dateRef.current.value);
        // console.log(date.getDate(), date.getMonth(), date.getFullYear())
        // console.log("getDate", date.getDate());
        // console.log("getMonth", date.getMonth() + 1);
        // console.log("getFullYear", date.getFullYear());
        const day = (date.getDate()).toString();
        const month = (date.getMonth() + 1).toString();
        const year = (date.getFullYear()).toString();
        // console.log(day, month, year)
        setDriver(digital_root(day))
        setConductor(digital_root(day + month + year));
        setFullDateStr(sumOfDigit(day + month + year))
        let fullDateStr = date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString();
        // console.log("fullDateStr", fullDateStr);
        // console.log("sumOfDigit", sumOfDigit(fullDateStr));
        // console.log("digital_root", digital_root(fullDateStr));
    }


    const numberChangeHandler = (event) => {
        console.log(numberRef.current.value);
        let numberStr = (numberRef.current.value).replace(/[^0-9]/g, '');
        setFullNumberSum(sumOfDigit(numberStr));
        setNumberSum(digital_root(numberStr));
        console.log("sumOfDigit", sumOfDigit(numberStr));
        console.log("digital_root", digital_root(numberStr));
    }

    const sumOfDigit = (num) => {
        return num.toString().split("")
            .reduce((sum, digit) =>
                sum + parseInt(digit), 0);

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

    const fetchJson = () => {
        fetch('/data.json'
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            }
            )
              .then(function(response){
                // console.log(response)
                return response.json();
              })
              .then(function(myJson) {
                console.log("myJson", myJson);
                // setData(myJson)
                setCharacteristics(myJson)
debugger;
              });
      }
      useEffect(() => {
        fetchJson()
      },[])

    return (
        <div>


            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="container">
                            <form action="">
                                <div className="mb-3">
                                    <label className="form-label">Enter Date of Birth </label>
                                    <input className="form-control" type="date" ref={dateRef} onChange={dateChangeHandler}></input>
                                </div>
                            </form>
                            {driver && <h2>Driver {driver}</h2>}
                            {conductor && <h2>Conductor  : {fullDateStr} : {conductor}</h2>}

                        </div>
                    </div>
                    <div className="col-9">
                        <div className="container">
                        { driver ? <div>
                           <div> 
                           <table class="table table-success table-striped">
                            <thead> 
                                <tr>
                                    <th>Interpretation</th>
                                    <th>Strength</th>
                                </tr>
                                </thead> 
                                <tbody>
                                <tr>
                                    <td><div>{characteristics && characteristics.interpretation && characteristics.interpretation[driver-1][`${driver}`][conductor-1]['desc']}</div></td>
                                    <td><div>{characteristics && characteristics.interpretation && characteristics.interpretation[driver-1][`${driver}`][conductor-1]['star']}</div></td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                            
                            
                            <div><strong>Characteristics</strong></div>
                            
                            <div><strong>{`Driver ${driver} : ` }</strong> { driver && characteristics.characteristics && characteristics.characteristics[driver-1]['desc']}</div>
                            <div><strong>{`Conductor ${conductor} : ` }</strong> { conductor && characteristics.characteristics && characteristics.characteristics[conductor-1]['desc']}</div>
                            </div>:''}
                            

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Driver;