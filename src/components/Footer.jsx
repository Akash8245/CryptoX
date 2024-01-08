import React from "react";

export default function Footer() {
  return (
    <div className="relative    w-full h-18 bg-[#14171c] text-white text-center font-[Ubuntu] text-[13px]  p-6 mb-0 ">
      <p className="p-0.5">
        Developed by <span className="font-bold">Akash</span>
      </p>
      <p className="p-0.5">
        Built with <span className="font-bold">React JS</span> and{" "}
        <span className="font-bold">Tailwind CSS</span>
      </p>
      <p className="p-0.5">
        Powered By <span className="font-bold">CoinGecko</span> API
      </p>
      <div className="flex justify-center items-center ">
        <a href="https://github.com/Akash8245" target="_blank">
          <img
            src="../github.svg"
            alt="github"
            className="w-[40px] m-auto p-2"
          />
        </a>
        <a href="https://www.instagram.com/akash__024/" target="_blank">
          <img src="../insta.svg" alt="insta" className="w-[40px] m-auto p-2" />
        </a>
      </div>
    </div>
  );
}
