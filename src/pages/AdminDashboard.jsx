// // src/pages/AdminDashboard.jsx
// import React from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";

// export default function AdminDashboard() {
//     // Dummy sales data
//     const salesData = [
//         { month: "Jan", sales: 4000 },
//         { month: "Feb", sales: 3000 },
//         { month: "Mar", sales: 5000 },
//         { month: "Apr", sales: 2500 },
//         { month: "May", sales: 6000 },
//         { month: "Jun", sales: 7000 },
//         { month: "Jul", sales: 8000 },
//     ];

//     return (
//         <div style={{textAlign: "center",}}>
//             <h1>Sales History</h1>
//             <ResponsiveContainer width="80%" height={300} style={{margin: "auto"}}>
//                 <LineChart data={salesData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }







// // src/pages/AdminDashboard.jsx
// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import "../styles/AdminDashboard.css";

// export default function AdminDashboard() {
//   const [timeRange, setTimeRange] = useState("today");
//   const [salesData, setSalesData] = useState([]);
//   const [totalSales, setTotalSales] = useState(0);
//   const [ordersCount, setOrdersCount] = useState(0);

//   // Generate sales data based on selected time range
//   useEffect(() => {
//     const generateSalesData = () => {
//       let data = [];
//       let total = 0;
//       let count = 0;

//       switch (timeRange) {
//         case "today":
//           // Generate data for today (last 12 hours)
//           data = Array.from({ length: 12 }, (_, i) => {
//             const sales = Math.floor(Math.random() * 1000) + 500;
//             total += sales;
//             count += Math.floor(sales / 100);
//             return {
//               hour: `${i + 1}H`,
//               sales,
//               orders: Math.floor(sales / 100),
//             };
//           });
//           break;

//         case "weekly":
//           // Generate data for the last 7 days
//           const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//           data = days.map(day => {
//             const sales = Math.floor(Math.random() * 3000) + 2000;
//             total += sales;
//             count += Math.floor(sales / 150);
//             return {
//               day,
//               sales,
//               orders: Math.floor(sales / 150),
//             };
//           });
//           break;

//         case "monthly":
//           // Generate data for the last 6 months
//           const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//           data = months.map(month => {
//             const sales = Math.floor(Math.random() * 15000) + 10000;
//             total += sales;
//             count += Math.floor(sales / 200);
//             return {
//               month,
//               sales,
//               orders: Math.floor(sales / 200),
//             };
//           });
//           break;

//         default:
//           break;
//       }

//       setSalesData(data);
//       setTotalSales(total);
//       setOrdersCount(count);
//     };

//     generateSalesData();
//   }, [timeRange]);

//   // Get the appropriate data key based on time range
//   const getDataKey = () => {
//     switch (timeRange) {
//       case "today":
//         return "hour";
//       case "weekly":
//         return "day";
//       case "monthly":
//         return "month";
//       default:
//         return "month";
//     }
//   };

//   // Format the total sales amount with commas
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1 className="dashboard-title">Sales Dashboard</h1>
      
//       <div className="filter-buttons">
//         <button 
//           className={timeRange === "today" ? "active" : ""}
//           onClick={() => setTimeRange("today")}
//         >
//           Today's Sales
//         </button>
//         <button 
//           className={timeRange === "weekly" ? "active" : ""}
//           onClick={() => setTimeRange("weekly")}
//         >
//           Weekly Sales
//         </button>
//         <button 
//           className={timeRange === "monthly" ? "active" : ""}
//           onClick={() => setTimeRange("monthly")}
//         >
//           Monthly Sales
//         </button>
//       </div>

//       <div className="sales-summary">
//         <div className="summary-card">
//           <h3>Total Sales</h3>
//           <p className="amount">{formatCurrency(totalSales)}</p>
//         </div>
//         <div className="summary-card">
//           <h3>Orders Count</h3>
//           <p className="count">{ordersCount}</p>
//         </div>
//         <div className="summary-card">
//           <h3>Average Order Value</h3>
//           <p className="amount">
//             {ordersCount > 0 ? formatCurrency(totalSales / ordersCount) : formatCurrency(0)}
//           </p>
//         </div>
//       </div>

//       <div className="chart-container">
//         <h2 className="chart-title">
//           {timeRange === "today" 
//             ? "Today's Sales (Last 12 Hours)" 
//             : timeRange === "weekly" 
//             ? "Weekly Sales" 
//             : "Monthly Sales (Last 6 Months)"}
//         </h2>
//         <ResponsiveContainer width="100%" height={350}>
//           <LineChart data={salesData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//             <XAxis 
//               dataKey={getDataKey()} 
//               tick={{ fill: '#555' }}
//               axisLine={false}
//             />
//             <YAxis 
//               tick={{ fill: '#555' }}
//               axisLine={false}
//               tickFormatter={(value) => `$${value}`}
//             />
//             <Tooltip 
//               formatter={(value) => [`$${value}`, "Sales"]}
//               contentStyle={{
//                 borderRadius: "8px",
//                 border: "none",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               }}
//             />
//             <Legend />
//             <Line 
//               type="monotone" 
//               dataKey="sales" 
//               stroke="#4f46e5" 
//               strokeWidth={3} 
//               activeDot={{ r: 8 }} 
//               name="Sales Amount"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }













// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("today");
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  // Fetch sales data from backend API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `http://localhost:5000/api/orders/sales?range=${timeRange}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          const data = response.data.data;
          setSalesData(data.salesData);
          setTotalSales(data.totalSales);
          setOrdersCount(data.ordersCount);
        } else {
          setError("Failed to fetch sales data");
        }
      } catch (err) {
        console.error("Error fetching sales data:", err);
        setError(err.response?.data?.message || "Failed to load sales data");
        // For demonstration, fall back to dummy data if API fails
        generateDummyData();
      } finally {
        setLoading(false);
      }
    };

    // Fallback function to generate dummy data if API is not ready
    const generateDummyData = () => {
      let data = [];
      let total = 0;
      let count = 0;

      switch (timeRange) {
        case "today":
          data = Array.from({ length: 12 }, (_, i) => {
            const sales = Math.floor(Math.random() * 1000) + 500;
            total += sales;
            count += Math.floor(sales / 100);
            return {
              hour: `${i + 1}H`,
              sales,
              orders: Math.floor(sales / 100),
            };
          });
          break;

        case "weekly":
          const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          data = days.map(day => {
            const sales = Math.floor(Math.random() * 3000) + 2000;
            total += sales;
            count += Math.floor(sales / 150);
            return {
              day,
              sales,
              orders: Math.floor(sales / 150),
            };
          });
          break;

        case "monthly":
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
          data = months.map(month => {
            const sales = Math.floor(Math.random() * 15000) + 10000;
            total += sales;
            count += Math.floor(sales / 200);
            return {
              month,
              sales,
              orders: Math.floor(sales / 200),
            };
          });
          break;

        default:
          break;
      }

      setSalesData(data);
      setTotalSales(total);
      setOrdersCount(count);
    };

    fetchSalesData();
  }, [timeRange, token]);

  // Get the appropriate data key based on time range
  const getDataKey = () => {
    switch (timeRange) {
      case "today":
        return "hour";
      case "weekly":
        return "day";
      case "monthly":
        return "month";
      default:
        return "month";
    }
  };

  // Format the total sales amount with commas
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading sales data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="try-again-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Sales Dashboard</h1>
      
      <div className="filter-buttons">
        <button 
          className={timeRange === "today" ? "active" : ""}
          onClick={() => setTimeRange("today")}
        >
          Today's Sales
        </button>
        <button 
          className={timeRange === "weekly" ? "active" : ""}
          onClick={() => setTimeRange("weekly")}
        >
          Weekly Sales
        </button>
        <button 
          className={timeRange === "monthly" ? "active" : ""}
          onClick={() => setTimeRange("monthly")}
        >
          Monthly Sales
        </button>
      </div>

      <div className="sales-summary">
        <div className="summary-card">
          <h3>Total Sales</h3>
          <p className="amount">{formatCurrency(totalSales)}</p>
        </div>
        <div className="summary-card">
          <h3>Orders Count</h3>
          <p className="count">{ordersCount}</p>
        </div>
        <div className="summary-card">
          <h3>Average Order Value</h3>
          <p className="amount">
            {ordersCount > 0 ? formatCurrency(totalSales / ordersCount) : formatCurrency(0)}
          </p>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">
          {timeRange === "today" 
            ? "Today's Sales (Last 12 Hours)" 
            : timeRange === "weekly" 
            ? "Weekly Sales" 
            : "Monthly Sales (Last 6 Months)"}
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey={getDataKey()} 
              tick={{ fill: '#555' }}
              axisLine={false}
            />
            <YAxis 
              tick={{ fill: '#555' }}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, "Sales"]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#4f46e5" 
              strokeWidth={3} 
              activeDot={{ r: 8 }} 
              name="Sales Amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}