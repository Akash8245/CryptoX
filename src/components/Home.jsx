import React, { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [coin, setCoin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCoin(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coin.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  const indexOfLastCoin = currentPage * itemsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - itemsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columnHeaders = (
    <div className="text-center">
      <div className=" flex items-center px-3   bg-gray-800  text-white  ">
        <p className="px-8 p-3 min-w-[50px]  bg-gray-800 ">#</p>
        <div className="w-[50px] min-w-[50px]  bg-gray-800 ">Logo</div>
        <p className="px-8 p-3 min-w-[180px] bg-gray-800 ">Name</p>

        <p className="px-8 p-3 min-w-[150px] bg-gray-800">Symbole</p>
        <p className="px-8 p-3 min-w-[200px] bg-gray-800">Price</p>
        <p className="px-8 p-3 min-w-[180px] bg-gray-800">24hr Change</p>
        <p className="px-8 p-3 min-w-[180px] bg-gray-800">Market Cap</p>
        <p className="px-8 p-3 min-w-[180px] bg-gray-800">Volume</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-[#263238] border-b-4">
        <div className="h-[150px] text-center">
          <input
            type="text"
            className="bg-[whitesmoke] outline-none mt-8 md:mt-6 mb-2 w-[250px] md:w-[300px] rounded p-1"
            placeholder="Search for coin..."
            spellCheck="false"
            onChange={handleSearchChange}
          />
          <br />
          <button className="bg-[#14171c] hover:bg-[#202329] w-[100px] p-1.5 text-white rounded mt-3">
            Search
          </button>
        </div>
      </div>

      <div className="font-[Ubuntu] overflow-y-auto overflow-x-auto scrollbar-hide md:scrollbar-default text-white bg-[#263238] md:overflow-y-hidden min-h-[70vh] ">
        {columnHeaders}
        {currentCoins.length > 0 ? (
          currentCoins.map((currency, index) => {
            const coinName = currency.name.toLowerCase();
            return (
              <div key={index} className="text-center ">
                <div className="flex items-center px-3  ">
                  <p className="px-8 p-3 min-w-[50px] ">
                    {currency.market_cap_rank}
                  </p>

                  <div className="w-[50px] min-w-[50px] ">
                    {currency.image ? (
                      <img
                        src={currency.image}
                        alt="logo"
                        className="w-full h-full object-cover p-2"
                      />
                    ) : (
                      <p className="min-w-[50px] text-center ">Logo</p>
                    )}
                  </div>

                  <div className="min-w-[180px] pl-6  max-w-[180px] ">
                    <p className="p-3">{currency.name}</p>
                  </div>
                  <p className="px-8 p-3 min-w-[150px]  ">
                    {currency.symbol.toUpperCase()}
                  </p>
                  <p className="px-8 p-3 min-w-[200px]  ">
                    ₹ {currency.current_price}
                  </p>
                  <p
                    className={`px-8 p-3 min-w-[180px] ${
                      parseFloat(currency.price_change_percentage_24h) > 0
                        ? "text-[#81c784] "
                        : "text-red-500"
                    }`}
                  >
                    {currency.price_change_percentage_24h} %
                  </p>

                  <p className="px-8 p-3 min-w-[180px] ">
                    ₹ {formatLargeNumber(currency.market_cap)}
                  </p>
                  <p className="px-8 p-3 min-w-[180px] ">
                    ₹ {formatLargeNumber(currency.total_volume)}
                  </p>
                </div>
                <div className="bg-white h-0 lg:h-0.5  md:w-full"></div>
              </div>
            );
          })
        ) : (
          <p className="m-8 w-[400px] md:m-auto md:mt-36">
            Free API limitation( • ᴖ • ) Try a few minutes later
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <ul className="flex list-none">
          {Array.from(
            { length: Math.ceil(filteredCoins.length / itemsPerPage) },
            (_, i) => (
              <li key={i} className="mx-0.5">
                <button
                  onClick={() => paginate(i + 1)}
                  className={`bg-[#14171c] hover:bg-[#202329] text-white mb-3 py-1 px-3 rounded ${
                    i + 1 === currentPage ? "bg-[#202329]" : ""
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}

function formatLargeNumber(number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + "M";
  } else {
    return number.toString();
  }
}
