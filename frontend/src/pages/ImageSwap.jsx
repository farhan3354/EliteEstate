import React, { useEffect, useState } from "react";

const images = [
  "https://www.venn.com/wp-content/uploads/2025/05/step-inside-blue-border-2025-1737x2048.png",
  "https://www.venn.com/wp-content/uploads/2025/10/venn-hero-poster-20251015sm.png",
  "https://cdn.shopify.com/s/files/1/0803/1807/1063/files/Website_Banners_1_27_980x.jpg?v=1760789993",
  "https://cdn.shopify.com/s/files/1/0803/1807/1063/files/Premium_Fabrics2_688x.png?v=1744950677",
  "https://cdn.shopify.com/s/files/1/0803/1807/1063/files/Premium_Fabrics2_688x.png?v=1744950677",
];

export default function ImageSwapAnimation() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [positions, setPositions] = useState([1, 2, 3, 4]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPos = Math.floor(Math.random() * positions.length);
      const newPositions = [...positions];
      const temp = newPositions[randomPos];
      newPositions[randomPos] = centerIndex;
      setCenterIndex(temp);
      setPositions(newPositions);
    }, 3000);

    return () => clearInterval(interval);
  }, [centerIndex, positions]);

  return (
    <div className="relative mt-10 h-[80vw] sm:h-[600px] md:h-[700px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-800 via-purple-600 to-green-400">
      {/* Center Image */}
      <div
        className="absolute transition-all duration-700 ease-in-out"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={images[centerIndex]}
          alt="center"
          className="w-[40vw] sm:w-[35vw] md:w-[300px] lg:w-[360px] object-contain drop-shadow-2xl transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Upper Left (Slightly Larger) */}
      <div
        className="absolute transition-all duration-700 ease-in-out"
        style={{
          top: "15%",
          left: "22%",
          transform: "translate(-50%, -50%) rotate(-5deg)",
        }}
      >
        <img
          src={images[positions[0]]}
          alt="upper-left"
          className="w-[32vw] sm:w-[25vw] md:w-[200px] lg:w-[240px] h-auto object-contain rounded-xl drop-shadow-lg"
        />
      </div>

      {/* Upper Right (Smaller) */}
      <div
        className="absolute transition-all duration-700 ease-in-out"
        style={{
          top: "15%",
          right: "22%",
          transform: "translate(50%, -50%) rotate(5deg)",
        }}
      >
        <img
          src={images[positions[1]]}
          alt="upper-right"
          className="w-[26vw] sm:w-[20vw] md:w-[170px] lg:w-[200px] h-auto object-contain rounded-xl drop-shadow-md"
        />
      </div>

      {/* Bottom Left (Smaller) */}
      <div
        className="absolute transition-all duration-700 ease-in-out"
        style={{
          bottom: "10%",
          left: "22%",
          transform: "translate(-50%, 0%) rotate(-3deg)",
        }}
      >
        <img
          src={images[positions[2]]}
          alt="bottom-left"
          className="w-[26vw] sm:w-[20vw] md:w-[170px] lg:w-[200px] h-auto object-contain rounded-xl drop-shadow-md"
        />
      </div>

      {/* Bottom Right (Slightly Larger) */}
      <div
        className="absolute transition-all duration-700 ease-in-out"
        style={{
          bottom: "10%",
          right: "22%",
          transform: "translate(50%, 0%) rotate(3deg)",
        }}
      >
        <img
          src={images[positions[3]]}
          alt="bottom-right"
          className="w-[32vw] sm:w-[25vw] md:w-[200px] lg:w-[240px] h-auto object-contain rounded-xl drop-shadow-lg"
        />
      </div>
    </div>
  );
}
