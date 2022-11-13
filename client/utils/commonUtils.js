// navigate a page through window path chage
export const navigateWithLoadPage = (pathName) =>{
    window.location.pathname = pathName;
}

// get the day and name of month of a date
export const getDayAndMonth = (date) =>{
    const taskDate = new Date(date);
    const day = taskDate.getDate();
    const month = taskDate.toLocaleString('default',{month:"short"});
    return {day,month}
}