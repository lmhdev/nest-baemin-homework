"use client";
import { getAllMenuItems, getAllRestaurants, getAllCategories } from "@/api";
import ScrollBar from "@/components/scrollBar";
import { ScrollFoodItems } from "@/components/scrollFood";
import { ScrollRestaurant } from "@/components/scrollRestaurant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await getAllRestaurants(1, 10);
      setRestaurants(res.data);
    };
    const fetchFoodItems = async () => {
      const res = await getAllMenuItems(1, 10);
      setFoodItems(res.data);
    };
    const fetchCategories = async () => {
      const { data } = await getAllCategories();
      setCategories(data);
    };
    fetchRestaurant();
    fetchFoodItems();
    fetchCategories();
  }, []);

  const banneritems = [
    {
      id: "1",
      name: "anh 1",
      url: "/images/map1.png",
    },
    {
      id: "2",
      name: "anh 2",
      url: "/images/map2.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map3.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map4.png",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
          <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
            <span>Thực đơn </span>
            {categories.map((item, index) => (
              <div
                key={item.category_id}
                className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
              >
                <div className="flex flex-row items-center gap-1">
                  <Image
                    src={"/images/default-category.webp"}
                    width={30}
                    height={30}
                    alt={item.description}
                  />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems}></ScrollBar>
          <ScrollFoodItems items={foodItems}></ScrollFoodItems>
          <ScrollRestaurant restaurants={restaurants}></ScrollRestaurant>
        </div>
      </div>
    </>
  );
}
