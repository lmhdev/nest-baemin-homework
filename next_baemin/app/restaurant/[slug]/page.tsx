"use client";
import {
  ClockCircleTwoTone,
  DollarTwoTone,
  DoubleRightOutlined,
  LikeFilled,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Input, Spin } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getRestaurantById, getMenuItemByRestaurantId } from "@/api";
import { IRestaurant, IMenuItem } from "@/types";
import { useCart } from "@/context/cartContext";

export default function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [menuItems, setmenuItems] = useState<IMenuItem[]>([]);

  const { addToCart } = useCart();

  const pathname = usePathname();
  const restaurant_id = pathname ? pathname.split("/").pop() : null;

  useEffect(() => {
    if (restaurant_id) {
      const fetchRestaurantById = async () => {
        const { data } = await getRestaurantById(restaurant_id);
        setRestaurant(data);
      };
      const fetchMenuItems = async () => {
        const { data } = await getMenuItemByRestaurantId(restaurant_id);
        setmenuItems(data);
      };
      fetchRestaurantById();
      fetchMenuItems();
    }
  }, [restaurant_id]);

  const handleAddToCart = (item: IMenuItem) => {
    addToCart({
      item_id: item.item_id,
      name: item.name,
      quantity: 1,
      price: item.price,
    });
  };

  return (
    <div className="flex flex-col w-full h-auto">
      {restaurant && restaurant_id ? (
        <>
          <div className="bg-white w-full h-80 flex">
            {/* Restaurant Image */}
            <div className="w-[60%] h-full py-4 px-10">
              <div className="w-full relative h-full">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={"/images/default-restaurant.webp"}
                  alt={restaurant.name}
                />
              </div>
            </div>

            {/* Restaurant Details */}
            <div className="w-[55%] h-full relative px-8 py-4">
              <span className="text-[13px] text-[#187CAA]">
                <a href="/">Home</a>{" "}
                <DoubleRightOutlined className="text-[10px]" />{" "}
                <a href="/">{restaurant.location}</a>
              </span>
              <div className="flex items-center mt-3 gap-2">
                <div className="bg-beamin text-white p-1 cursor-pointer tracking-wider flex items-center gap-1">
                  <LikeFilled />
                  <span>Favorite</span>
                </div>
                <span className="text-[#959595]">Restaurant - Branch</span>
              </div>
              <h2 className="text-[22px] font-bold mt-2">{restaurant.name}</h2>
              <p className="text-[13px] mt-1">{restaurant.location}</p>

              <div className="flex items-center text-[14px] mt-2">
                <ol className="flex text-[#FFC107] gap-1">
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarOutlined />
                </ol>
                <p className="bg-[#FFC107] text-white rounded-md py-[2px] px-1 ml-2 mr-1">
                  999+
                </p>
                <span>ratings on Baemin</span>
              </div>

              <div className="flex items-center gap-4 my-2">
                <div className="flex items-center gap-1 text-[#6CC942]">
                  <div className="w-2 h-2 bg-[#6CC942] rounded-full"></div>
                  <span>Open</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockCircleTwoTone twoToneColor="#3AC5C9" />
                  <span>
                    {restaurant.open_time} - {restaurant.close_time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#959595] text-[15px]">
                <DollarTwoTone twoToneColor="#c0c0c0" />
                <span>99.000 - 399.000</span>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="w-full">
            <div className="py-4 px-8 font-bold text-beamin text-[14px]">
              MENU
            </div>
            <div className="flex gap-3">
              {/* Menu Categories */}
              <div className="w-[20%] bg-white p-5">
                <ul>
                  <li className="cursor-pointer w-fit px-1">New Products</li>
                  <li className="mt-2 px-1 w-fit">Family Combo</li>
                  <li className="mt-2 px-1 w-fit">Fried Chicken</li>
                  <li className="mt-2 px-1 w-fit">Burger</li>
                </ul>
              </div>

              {/* Menu Items */}
              <div className="w-[50%] bg-white py-3 px-4">
                <Input
                  addonBefore={<SearchOutlined />}
                  placeholder="Search menu items..."
                />
                <div className="mt-4">
                  {menuItems.map((item) => (
                    <div
                      key={item.item_id}
                      className="flex items-center border-b py-2"
                    >
                      <div className="w-1/5 relative h-32">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={"/food/default-menu-item.webp"}
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 pl-4">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.description}
                        </div>
                      </div>
                      <div className="flex items-center text-base font-bold text-[#0288d1]">
                        {item.price}đ
                      </div>
                      <div className="ml-4 flex items-center">
                        <button
                          className="bg-beamin text-white rounded-md p-2 cursor-pointer hover:brightness-110"
                          onClick={() => handleAddToCart(item)}
                        >
                          <PlusOutlined />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="w-[30%] bg-white p-4 text-[13px] text-gray-500">
                <p>Service Fee</p>
                <p className="text-beamin font-bold">0.8% Service Fee</p>
                <div className="border-t mt-4 pt-4">
                  <p>Provided by</p>
                  <p className="text-beamin font-bold">Baemin</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
    </div>
  );
}
