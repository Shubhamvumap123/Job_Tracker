import React from "react";

const Dashboard = () => {

    const [count, setCount] = React.useState(0);
    const increament =()=>{
        if(count>=10){
            alert("should less than 10");
            return;
        }
        setCount(count + 1);
    }
const decrement =()=>{
    if(count<=0){        
        alert("should greater than 0");
        return;
    }
 setCount(count - 1);
       
}
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600">This is the dashboard page. You can add charts and stats here.</p>
            <p className="text-gray-600 mt-2">Count: {count}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" onClick={increament}>Increament</button>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" onClick={decrement}>Decrement</button>
        </div>
    );
}
export default Dashboard;