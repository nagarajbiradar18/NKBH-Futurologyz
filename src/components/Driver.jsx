import { useRef, useState, useEffect } from "react";
import Mahadasha from './Mahadasha';
import Antardasha from './Antardasha';
import ReactStars from "react-rating-stars-component";

const firstExample = {
    size: 30,
    value: 2.5,
    edit: false,
    isHalf: true,
    color: '#adb5bd',
    activeColor: "#198754",
    char: "",
  };


const Driver = () => {

    const [data, setData] = useState([]);

    const dateRef = useRef();
    const numberRef = useRef();
    const [driver, setDriver] = useState('');
    const [conductor, setConductor] = useState('');
    const [fullDateStr, setFullDateStr] = useState('');
    const [halfDateStr, setHalfDateStr] = useState('');
    const [characteristics, setCharacteristics] = useState({})
    const [numberSum, setNumberSum] = useState(0);
    const [fullNumberSum, setFullNumberSum] = useState(0);
    const [ratingValue, setRatingValue] = useState({});
    const [birthYear, setBirthYear] = useState(0);
    const [birthMonth, setBirthMonth] = useState(0);
    const [birthDay, setBirthDay] = useState(0);
    const [halfBirthYear, setHalfBirthYear] = useState(0);


    const dateChangeHandler = (event) => {

        //console.log(event.target.value);
        //console.log(dateRef.current.value);
        // console.log(new Date(dateRef.current.value));
        let date = new Date(dateRef.current.value);
        // console.log(date.getDate(), date.getMonth(), date.getFullYear())
        // console.log("getDate", date.getDate());
        // console.log("getMonth", date.getMonth() + 1);
        // console.log("getFullYear", date.getFullYear());
        const day = (date.getDate()).toString();
        const month = (date.getMonth() + 1).toString();
        const year = (date.getFullYear()).toString();
        const halfYear = (date.getFullYear() > 1999) 
        ? (date.getFullYear() - 2000).toString().padStart(2, '0') 
        : (date.getFullYear() - 1900).toString().padStart(2, '0');
        setBirthYear(year);
        setHalfBirthYear(halfYear);
         console.log(day, month, halfYear, year);
         setBirthMonth(month);
         setBirthDay(day);
        setDriver(digital_root(day))
        setConductor(digital_root(day + month + year));
        setFullDateStr(sumOfDigit(day + month + year));
        setHalfDateStr(sumOfDigit(day + month + halfYear));
        //let fullDateStr = date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString();
        //  console.log("fullDateStr", fullDateStr);
        //  console.log("halfDateStr", halfDateStr);
        // console.log("sumOfDigit", sumOfDigit(fullDateStr));
        // console.log("digital_root", digital_root(fullDateStr));
    }


    const numberChangeHandler = (event) => {
       // console.log(numberRef.current.value);
        let numberStr = (numberRef.current.value).replace(/[^0-9]/g, '');
        setFullNumberSum(sumOfDigit(numberStr));
        setNumberSum(digital_root(numberStr));
       // console.log("sumOfDigit", sumOfDigit(numberStr));
       // console.log("digital_root", digital_root(numberStr));
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

            try {
                fetch('/data.json', {
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((myJson) => {
                    //console.log("myJson", myJson);
                    setCharacteristics(myJson);
                  });
              } catch (error) {
                console.log('That did not go well.');
                console.error(error);
              }
      }
      useEffect(() => {
        fetchJson();
        console.log("fullDateStr", fullDateStr);
         console.log("halfDateStr", halfDateStr);
      },[fullDateStr, halfDateStr])

      useEffect(() => {
        if (driver && conductor) {
          setRatingValue((prevRatingValue) => {
            const newValue = characteristics.interpretation[driver - 1][driver][conductor - 1]['star'];
            console.log({ ...prevRatingValue, value: newValue }, "Updated rating value"); // Log updated value here
            return { ...prevRatingValue, value: newValue };
          });
        }
      }, [driver, conductor, characteristics]);

      useEffect(() => {
        console.log("Updated ratingValue:", ratingValue);
      }, [ratingValue]);

      useEffect(() => {
        if (birthYear && driver) {
            console.log("Triggering Mahadasha birthYear, driver render", birthYear, driver);
        }
    }, [birthYear, driver]);

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="container">
                <form action="">
                  <div className="mb-3">
                    <label className="form-label">Enter Date of Birth </label>
                    <input
                      className="form-control"
                      type="date"
                      ref={dateRef}
                      onChange={dateChangeHandler}
                    ></input>
                  </div>
                </form>
                {driver && <h4>D : {driver}</h4>}
                {conductor && (
                  <h4>
                    C : {fullDateStr} : {conductor}
                  </h4>
                )}
              </div>
            </div>
            <div className="col-9">
              <div className="container">
                {driver ? (
                  <div>
                    <div>
                      <table className="table table-success table-striped">
                        <thead>
                          <tr>
                            <th>Interpretation</th>
                            <th>Strength</th>
                            {/* <th>Rating</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div>
                                {characteristics &&
                                  characteristics.interpretation &&
                                  characteristics.interpretation[driver - 1][
                                    `${driver}`
                                  ][conductor - 1]["desc"]}
                              </div>
                            </td>
                            {/* <td><div>{characteristics && characteristics.interpretation && characteristics.interpretation[driver-1][`${driver}`][conductor-1]['star']}</div></td> */}
                            <td>
                              <ReactStars
                                key={ratingValue.value}
                                {...firstExample}
                                value={ratingValue.value}
                              />
                              <span>{ratingValue.value}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <strong>Characteristics</strong>
                    </div>

                    <div>
                      <strong>{`Driver ${driver} : `}</strong>{" "}
                      {driver &&
                        characteristics.characteristics &&
                        characteristics.characteristics[driver - 1]["desc"]}
                    </div>
                    <div>
                      <strong>{`Conductor ${conductor} : `}</strong>{" "}
                      {conductor &&
                        characteristics.characteristics &&
                        characteristics.characteristics[conductor - 1]["desc"]}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
            <button className="accordion-button collapsed text-bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <div>Maha Dasha</div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {/* <Mahadasha propsY={birthYear} propsD={driver} /> */}
                {birthYear && driver && <Mahadasha propsY={birthYear} propsD={driver} />}
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                class="accordion-button collapsed text-bg-success"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <div>Antar Dasha</div>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
               <Antardasha day = {birthDay} month = {birthMonth} halfYear = {halfBirthYear}/>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    );

}

export default Driver;