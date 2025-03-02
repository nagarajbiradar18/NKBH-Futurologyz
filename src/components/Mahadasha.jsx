import { useEffect, useState } from "react";

const Mahadasha = (props) => {
  const { propsD, propsY } = props;

  const [driver, setDriver] = useState(propsD);
  const [birthYear, setBirthYear] = useState(propsY);
  const [mahaDashaObject, setMahaDashaObject] = useState([]);
  const [currentYear, serCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update state whenever props change
    setDriver(propsD);
    setBirthYear(propsY);
    console.log("Updated driver:", propsD);
    console.log("Updated birthYear:", propsY, currentYear);

    // Create a new object to update the MahaDasha state

    // Call the helper function
    driver && createMahaDashaObject(propsD, propsY, currentYear);
  }, [propsD, propsY]); // Dependency array ensures effect runs on prop change

  useEffect(() => {
    console.log("Updated mahaDashaObject:", mahaDashaObject);
  }, [mahaDashaObject]);

  const createMahaDashaObject = (propsD, propsY, currentYear) => {
    let fromYear = Number(propsY);
    let dashaCounter = Number(propsD);
    let toYear = Number(fromYear) + Number(dashaCounter);

    // Start with the initial object
    const tempMDObj = [
      { dashaCounter: dashaCounter, fromYear: fromYear, toYear: toYear },
    ];
    console.log("Initial tempMDObj:", tempMDObj);

    // Iteratively add dasha objects until the current year is reached
    while (fromYear < currentYear + 20) {
      fromYear = toYear;
      dashaCounter = dashaCounter < 9 ? dashaCounter + 1 : 1; // Cycle dashaCounter from 1 to 9
      toYear = Number(fromYear) + Number(dashaCounter);

      // Add the new entry to the temporary array
      tempMDObj.push({
        dashaCounter: dashaCounter,
        fromYear: fromYear,
        toYear: toYear,
      });
    }

    console.log("Final tempMDObj:", tempMDObj);

    // Update the state after the loop completes
    setMahaDashaObject(tempMDObj);
  };

  const currentMahaDasha = () => {
    return mahaDashaObject.find((item) => {
      return item.fromYear <= currentYear && item.toYear > currentYear;
    });
  };

  const currentDasha = currentMahaDasha(); // Get the current Maha Dasha object once

  return (
    <div>
      <h3>
        <div>
          {" "}
          {currentDasha ? (
            <div>
              Maha Dasha {currentDasha.dashaCounter} == {currentDasha.fromYear}{" "}
              to {currentDasha.toYear}
            </div>
          ) : (
            <div>No current Maha Dasha found</div>
          )}
        </div>
      </h3>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">MahaDasha</th>
            <th scope="col">fromYear</th>
            <th scope="col">toYear</th>
          </tr>
        </thead>
        <tbody>
          {mahaDashaObject.map((item, index) => {
            // Check if the condition is satisfied
            const isCurrentYearInRange =
              item.fromYear <= currentYear && item.toYear > currentYear;

            return (
              <tr
                key={index}
                className={isCurrentYearInRange ? "table-warning" : ""}
              >
                <th scope="row">{index}</th>
                <td>{item.dashaCounter}</td>
                <td>{item.fromYear}</td>
                <td>{item.toYear}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Mahadasha;
