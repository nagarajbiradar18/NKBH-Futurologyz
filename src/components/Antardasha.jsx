import { useEffect, useState } from "react";
import { digital_root, compareWithToday, getYesterdayNextYear, getHalfYear, getYearBasedOnDate } from './AntarDashaHelper';

const Antardasha = ({ day, month, halfYear }) => {
    const [antarDashArr, setAntarDashArr] = useState([]);
    const [antarDasha, setAntarDasha] = useState('');
    const [currentYear, setCurrentYear] = useState('');

    const todayYear = new Date().getFullYear();
    const dayMapping = {
        0: 1, // Sunday
        1: 2, // Monday
        2: 9, // Tuesday
        3: 5, // Wednesday
        4: 3, // Thursday
        5: 6, // Friday
        6: 8  // Saturday
    };

    useEffect(() => {
        if (!day || !month || isNaN(day) || isNaN(month)) return; // Validate inputs
        setCurrentYear(getYearBasedOnDate(new Date(todayYear, month - 1, day)));
    }, [day, month, halfYear]);

    useEffect(() => {
        if (currentYear) {
            generateAntarDashaTable();
        }
    }, [currentYear]);

    const generateAntarDashaTable = () => {
        const newArr = [];
    
        for (let i = 0; i <= 5; i++) {
            const antarDashaObj = calculateAntarDasha(currentYear + i);
            if (antarDashaObj) {
                newArr.push(antarDashaObj);
            }
        }
    
        setAntarDashArr(newArr);
        setAntarDasha(newArr.length > 0 ? newArr[0].antarDashaValue : "");
    };

    const calculateAntarDasha = (year) => {
        if (!day || !month || isNaN(day) || isNaN(month)) return null;

        let birthday = new Date(year, month - 1, day);
        const weekDayValue = dayMapping[birthday.getDay()];
        console.log("????? weekDayValue ", weekDayValue);

        const antarDashaValue = digital_root(day + month + getHalfYear(birthday) + weekDayValue);

        // Get the Antar Dasha details (Yesterday of next year, etc.)
        const antarDashaObj = getYesterdayNextYear(antarDashaValue, birthday);

        if (!antarDashaObj) return null;

        return {
            antarDashaValue,
            antarDashaFromYear: antarDashaObj.antarDashaFromYear,
            antarDashaToYear: antarDashaObj.antarDashaToYear
        };
    };

    return (
        <div>
            <h3>Your Antar Dasha is {antarDasha}!</h3>
            <div>
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">AntaraDasha</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {antarDashArr.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.antarDashaValue}</td>
                                <td>{item.antarDashaFromYear}</td>
                                <td>{item.antarDashaToYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Antardasha;
