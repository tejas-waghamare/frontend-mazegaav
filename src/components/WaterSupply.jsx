import { useState, useEffect } from 'react';

const WaterSupply = () => {
  const [waterData, setWaterData] = useState({ status: '', schedule: [] });

  useEffect(() => {
    // Mock data (replace with API call: fetch('/api/water-supply'))
    const mockWaterSupply = {
      status: "उपलब्ध",
      schedule: [
        { day: "सोमवार", time: "सकाळी ६:०० - १०:००" },
        { day: "मंगळवार", time: "सकाळी ६:०० - १०:००" }
      ]
    };
    setWaterData(mockWaterSupply);
  }, []);

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold text-center mb-4">पाणी पुरवठा</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">स्थिती: {waterData.status}</h2>
        <h3 className="text-lg font-semibold mt-2">वेळापत्रक</h3>
        <ul className="list-disc pl-5">
          {waterData.schedule.map((slot, index) => (
            <li key={index}>{slot.day}: {slot.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WaterSupply;