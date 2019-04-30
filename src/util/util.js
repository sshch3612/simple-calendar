 export function getFirstDay(_year,_month) {
    return new Date(_year, _month -1).getDay();
}
export function mGetDate(_year, _month){
    return  new Date(_year, _month, 0).getDate();
}

export  function GetCurrentDate(currentDate){
    console.log( currentDate, 888);
    const Year = currentDate.getFullYear();
    let Month = currentDate.getMonth()+1;
    let Day  =  currentDate.getDate();
    let Hour = currentDate.getHours();
    let Minute = currentDate.getMinutes();
    console.log(Year, Month, Day, Hour, 3349);
    Month = Month < 10 ? `0${Month}` : Month;
    Day = Day < 10 ? `0${Day}` : Day;
    Hour = Hour < 10 ? `0${Hour}` : Hour;
    Minute = Minute < 10 ? `0${Minute}` : Minute;
    return {Year, Month, Day, Hour, Minute}
}
