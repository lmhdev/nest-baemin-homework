"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IRestaurant } from "@/types";

interface ScrollRestaurantProps {
  restaurants: IRestaurant[];
}

export const ScrollRestaurant: React.FC<ScrollRestaurantProps> = ({
  restaurants,
}) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNavigate = (restaurant_id: number) => {
    router.push(`/restaurant/${restaurant_id}`);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (containerRef.current) {
      if (restaurants.length - 1 > currentIndex)
        setCurrentIndex(currentIndex + 1);
      containerRef.current.scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      if (0 < currentIndex) setCurrentIndex(currentIndex - 1);
      containerRef.current.scrollBy({ left: -180, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full" style={{ height: "300px" }}>
      <div className="w-full h-full flex flex-col px-4 pt-4 pb-2">
        <div className="relative ml-3 text-xl font-bold mb-2">
          Popular Restaurants
        </div>
        <div className="w-full relative h-full">
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-20 w-8 h-8 rounded-full z-20"
            >
              <LeftOutlined />
            </button>
          )}
          <div
            ref={containerRef}
            className="scroll-container w-full h-full flex flex-row gap-3 overflow-x-auto"
          >
            {restaurants.map((restaurant) => (
              <div
                onClick={() => handleNavigate(restaurant.restaurant_id)}
                className="group w-48 h-full cursor-pointer"
                key={restaurant.restaurant_id}
              >
                <div className="w-full h-2/3">
                  <div
                    className="group-hover:brightness-75"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={"/images/default-restaurant.webp"}
                      // src={restaurant.img}
                      alt={restaurant.name}
                    />
                  </div>
                </div>
                <div className="group-hover:bg-slate-50 w-full h-1/3 flex flex-col pl-2 pr-2 border-solid border-2 border-beamin-50">
                  <div className="w-full truncate text-base font-semibold">
                    <span>{restaurant.name}</span>
                  </div>
                  {restaurant.location && (
                    <div
                      className="w-full truncate text-sm"
                      style={{ color: "#959595" }}
                    >
                      <span>{restaurant.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {currentIndex < restaurants.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-20 right-1 w-8 h-8 rounded-full z-20"
            >
              <RightOutlined />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
