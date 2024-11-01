"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMenuItem } from "@/types";

interface ScrollFoodItemsProps {
  items: IMenuItem[];
}

export const ScrollFoodItems: React.FC<ScrollFoodItemsProps> = ({ items }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNavigate = (item_id: number) => {
    router.push(`/detailfood/${item_id}`);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (containerRef.current) {
      if (items.length - 1 > currentIndex) setCurrentIndex(currentIndex + 1);
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
          Featured Dishes
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
            className="scroll-container w-full h-full flex gap-3 overflow-x-auto"
          >
            {items.map((item) => (
              <div
                onClick={() => handleNavigate(item.item_id)}
                className="group w-48 flex-shrink-0 h-full cursor-pointer"
                key={item.item_id}
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
                    {item.image_url ? (
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src="/food/default-menu-item.webp"
                        // src={item.image_url}
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="group-hover:bg-slate-50 w-full h-1/3 flex flex-col pl-2 pr-2 border-solid border-2 border-beamin-50">
                  <div className="w-full truncate text-base font-semibold">
                    <span>{item.name}</span>
                  </div>
                  <div className="w-full text-sm mt-2 text-gray-700">
                    {item.price}đ
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentIndex < items.length - 1 && (
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
