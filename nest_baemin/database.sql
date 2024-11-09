-- -------------------------------------------------------------
-- TablePlus 6.1.8(574)
--
-- https://tableplus.com/
--
-- Database: db_baemin
-- Generation Time: 2024-11-10 01:24:44.6900
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS categories_category_id_seq;

-- Table Definition
CREATE TABLE "public"."categories" (
    "name" varchar(50) NOT NULL,
    "description" text,
    "category_id" int4 NOT NULL DEFAULT nextval('categories_category_id_seq'::regclass),
    PRIMARY KEY ("category_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS delivery_details_delivery_id_seq;

-- Table Definition
CREATE TABLE "public"."delivery_details" (
    "delivery_id" int4 NOT NULL DEFAULT nextval('delivery_details_delivery_id_seq'::regclass),
    "order_id" int4,
    "driver_id" int4,
    "status" varchar(20),
    "pickup_address" text,
    "delivery_address" text,
    "estimated_delivery_time" timestamptz,
    "actual_delivery_time" timestamptz,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("delivery_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."menu_item_categories" (
    "menu_item_id" int4 NOT NULL,
    "category_id" int4 NOT NULL,
    PRIMARY KEY ("menu_item_id","category_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS menu_items_item_id_seq;

-- Table Definition
CREATE TABLE "public"."menu_items" (
    "item_id" int4 NOT NULL DEFAULT nextval('menu_items_item_id_seq'::regclass),
    "menu_id" int4,
    "name" varchar(100) NOT NULL,
    "description" text,
    "price" numeric(10,2) NOT NULL,
    "image_url" varchar(255),
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("item_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS menus_menu_id_seq;

-- Table Definition
CREATE TABLE "public"."menus" (
    "name" varchar(100) NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "menu_id" int4 NOT NULL DEFAULT nextval('menus_menu_id_seq'::regclass),
    "restaurant_id" int4,
    PRIMARY KEY ("menu_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_items_order_item_id_seq;

-- Table Definition
CREATE TABLE "public"."order_items" (
    "order_item_id" int4 NOT NULL DEFAULT nextval('order_items_order_item_id_seq'::regclass),
    "order_id" int4,
    "item_id" int4,
    "quantity" int4 NOT NULL,
    "price" numeric(10,2) NOT NULL,
    PRIMARY KEY ("order_item_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_order_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "status" varchar(20) NOT NULL CHECK ((status)::text = ANY ((ARRAY['pending'::character varying, 'accepted'::character varying, 'preparing'::character varying, 'delivering'::character varying, 'completed'::character varying, 'cancelled'::character varying])::text[])),
    "total_price" numeric(10,2) CHECK (total_price >= (0)::numeric),
    "delivery_fee" numeric(10,2) CHECK (delivery_fee >= (0)::numeric),
    "created_at" timestamptz DEFAULT now(),
    "order_id" int4 NOT NULL DEFAULT nextval('orders_order_id_seq'::regclass),
    "customer_id" int4,
    "restaurant_id" int4,
    "driver_id" int4,
    PRIMARY KEY ("order_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS payments_payment_id_seq;

-- Table Definition
CREATE TABLE "public"."payments" (
    "amount" numeric(10,2) NOT NULL CHECK (amount >= (0)::numeric),
    "method" varchar(20) NOT NULL CHECK ((method)::text = ANY ((ARRAY['credit_card'::character varying, 'debit_card'::character varying, 'paypal'::character varying, 'cash_on_delivery'::character varying])::text[])),
    "status" varchar(20) NOT NULL CHECK ((status)::text = ANY ((ARRAY['paid'::character varying, 'pending'::character varying, 'failed'::character varying])::text[])),
    "created_at" timestamptz DEFAULT now(),
    "payment_id" int4 NOT NULL DEFAULT nextval('payments_payment_id_seq'::regclass),
    "order_id" int4,
    PRIMARY KEY ("payment_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS restaurants_restaurant_id_seq;

-- Table Definition
CREATE TABLE "public"."restaurants" (
    "name" varchar(100) NOT NULL,
    "description" text,
    "location" text,
    "phone" varchar(15),
    "created_at" timestamptz DEFAULT now(),
    "restaurant_id" int4 NOT NULL DEFAULT nextval('restaurants_restaurant_id_seq'::regclass),
    "owner_id" int4 NOT NULL,
    "open_time" varchar(5),
    "close_time" varchar(5),
    PRIMARY KEY ("restaurant_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS reviews_review_id_seq;

-- Table Definition
CREATE TABLE "public"."reviews" (
    "rating" int4 CHECK ((rating >= 1) AND (rating <= 5)),
    "comment" text,
    "created_at" timestamptz DEFAULT now(),
    "review_id" int4 NOT NULL DEFAULT nextval('reviews_review_id_seq'::regclass),
    "restaurant_id" int4,
    "user_id" int4,
    PRIMARY KEY ("review_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;
DROP TYPE IF EXISTS "public"."Role";
CREATE TYPE "public"."Role" AS ENUM ('customer', 'restaurant_owner', 'driver');

-- Table Definition
CREATE TABLE "public"."users" (
    "name" varchar(100) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "phone" varchar(15),
    "address" text,
    "created_at" timestamptz DEFAULT now(),
    "user_id" int4 NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    "role" "public"."Role" NOT NULL,
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."categories" ("name", "description", "category_id") VALUES
('Món Chính', 'Các món chính trong thực đơn như cơm, phở, mì.', 1),
('Món Khai Vị', 'Các món khai vị như gỏi cuốn, nem rán, súp.', 2),
('Món Tráng Miệng', 'Các món tráng miệng như chè, bánh flan, trái cây.', 3),
('Thức Uống', 'Nước giải khát, trà, cà phê và sinh tố.', 4),
('Bánh Mì', 'Các loại bánh mì như bánh mì thịt, bánh mì chả cá.', 5),
('Bún', 'Các món bún như bún chả, bún bò Huế, bún mắm.', 6),
('Salad', 'Các loại salad tươi ngon và bổ dưỡng.', 7),
('Pizza', 'Các loại pizza với nhiều hương vị khác nhau.', 8),
('Burger', 'Burger với các loại thịt và topping đa dạng.', 9),
('Món Ăn Chay', 'Các món ăn chay phong phú cho thực khách ăn chay.', 10);

INSERT INTO "public"."delivery_details" ("delivery_id", "order_id", "driver_id", "status", "pickup_address", "delivery_address", "estimated_delivery_time", "actual_delivery_time", "created_at") VALUES
(1, 7, 3, 'delivered', '123 Pickup St, Hanoi', '456 Delivery St, Hanoi', '2024-10-31 05:00:00+00', '2024-10-31 05:30:00+00', '2024-10-31 04:34:16.279256+00'),
(2, 8, 6, 'assigned', '789 Pickup Ave, Hanoi', '321 Delivery Ave, Hanoi', '2024-10-31 05:30:00+00', NULL, '2024-10-31 04:34:16.279256+00'),
(3, 9, 9, 'delivered', '159 Pickup Rd, Hanoi', '753 Delivery Rd, Hanoi', '2024-10-31 06:00:00+00', '2024-10-31 06:20:00+00', '2024-10-31 04:34:16.279256+00'),
(4, 10, 3, 'delivered', '852 Pickup Blvd, Hanoi', '654 Delivery Blvd, Hanoi', '2024-10-31 07:00:00+00', '2024-10-31 07:15:00+00', '2024-10-31 04:34:16.279256+00'),
(5, 11, 6, 'cancelled', '963 Pickup Pl, Hanoi', '852 Delivery Pl, Hanoi', NULL, NULL, '2024-10-31 04:34:16.279256+00'),
(6, 12, 9, 'delivered', '147 Pickup Cir, Hanoi', '258 Delivery Cir, Hanoi', '2024-10-31 08:00:00+00', '2024-10-31 08:45:00+00', '2024-10-31 04:34:16.279256+00');

INSERT INTO "public"."menu_item_categories" ("menu_item_id", "category_id") VALUES
(1, 1),
(2, 5),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 4),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 5),
(32, 5),
(33, 1),
(34, 1),
(35, 1),
(36, 1),
(37, 4),
(38, 5),
(39, 1),
(40, 4),
(41, 5),
(42, 5),
(43, 5),
(44, 5),
(45, 5),
(46, 5),
(47, 5),
(48, 5),
(49, 5),
(50, 5);

INSERT INTO "public"."menu_items" ("item_id", "menu_id", "name", "description", "price", "image_url", "created_at") VALUES
(1, 1, 'Phở Bò', 'Phở bò truyền thống với nước dùng đậm đà và thịt bò tươi ngon', 45000.00, 'https://example.com/images/pho_bo.jpg', '2024-10-31 02:45:55.567214+00'),
(2, 1, 'Bánh Mì Trứng', 'Bánh mì Việt Nam với trứng ốp la, rau sống và nước sốt đặc biệt', 25000.00, 'https://example.com/images/banh_mi_trung.jpg', '2024-10-31 02:45:55.567214+00'),
(3, 1, 'Xôi Gà', 'Xôi nếp dẻo ăn kèm gà xé, hành phi và đậu phộng', 30000.00, 'https://example.com/images/xoi_ga.jpg', '2024-10-31 02:45:55.567214+00'),
(4, 1, 'Bánh Cuốn', 'Bánh cuốn nhân thịt ăn kèm chả và nước mắm chua ngọt', 35000.00, 'https://example.com/images/banh_cuon.jpg', '2024-10-31 02:45:55.567214+00'),
(5, 1, 'Bún Thịt Nướng', 'Bún tươi ăn kèm thịt nướng và rau sống, nước mắm pha sẵn', 40000.00, 'https://example.com/images/bun_thit_nuong.jpg', '2024-10-31 02:45:55.567214+00'),
(6, 1, 'Cháo Lươn', 'Cháo nấu từ lươn tươi, bổ dưỡng và thơm ngon', 55000.00, 'https://example.com/images/chao_luon.jpg', '2024-10-31 02:45:55.567214+00'),
(7, 1, 'Bánh Bao', 'Bánh bao nhân thịt và trứng cút, hấp nóng hổi', 20000.00, 'https://example.com/images/banh_bao.jpg', '2024-10-31 02:45:55.567214+00'),
(8, 1, 'Mì Xào Bò', 'Mì xào cùng thịt bò và rau cải', 45000.00, 'https://example.com/images/mi_xao_bo.jpg', '2024-10-31 02:45:55.567214+00'),
(9, 1, 'Sữa Đậu Nành', 'Ly sữa đậu nành thơm mát và bổ dưỡng', 10000.00, 'https://example.com/images/sua_dau_nanh.jpg', '2024-10-31 02:45:55.567214+00'),
(10, 1, 'Bánh Rán', 'Bánh rán nhân đậu xanh ngọt ngào', 15000.00, 'https://example.com/images/banh_ran.jpg', '2024-10-31 02:45:55.567214+00'),
(11, 2, 'Cơm Tấm Sườn Nướng', 'Cơm tấm ăn kèm sườn nướng thơm lừng, bì, chả và nước mắm chua ngọt', 50000.00, 'https://example.com/images/com_tam_suon.jpg', '2024-10-31 02:50:12.172875+00'),
(12, 2, 'Canh Chua Cá Lóc', 'Canh chua nấu từ cá lóc, đậu bắp, giá và cà chua', 60000.00, 'https://example.com/images/canh_chua_ca_loc.jpg', '2024-10-31 02:50:12.172875+00'),
(13, 2, 'Cơm Gà Xối Mỡ', 'Cơm gà chiên giòn, ăn kèm dưa leo và rau sống', 55000.00, 'https://example.com/images/com_ga_xoi_mo.jpg', '2024-10-31 02:50:12.172875+00'),
(14, 2, 'Bún Chả Hà Nội', 'Bún chả ăn kèm nước mắm pha đậm đà và thịt nướng', 65000.00, 'https://example.com/images/bun_cha.jpg', '2024-10-31 02:50:12.172875+00'),
(15, 2, 'Gỏi Cuốn', 'Gỏi cuốn tôm thịt ăn kèm nước chấm đặc biệt', 30000.00, 'https://example.com/images/goi_cuon.jpg', '2024-10-31 02:50:12.172875+00'),
(16, 2, 'Cơm Chiên Dương Châu', 'Cơm chiên với tôm, trứng, và xúc xích kiểu Dương Châu', 45000.00, 'https://example.com/images/com_chien_duong_chau.jpg', '2024-10-31 02:50:12.172875+00'),
(17, 2, 'Bò Lúc Lắc', 'Bò lúc lắc xào với ớt chuông, hành tây, và tiêu xanh', 80000.00, 'https://example.com/images/bo_luc_lac.jpg', '2024-10-31 02:50:12.172875+00'),
(18, 2, 'Gà Kho Gừng', 'Gà kho gừng thơm cay, ăn kèm cơm nóng', 55000.00, 'https://example.com/images/ga_kho_gung.jpg', '2024-10-31 02:50:12.172875+00'),
(19, 2, 'Chả Cá Lã Vọng', 'Chả cá chiên vàng ăn kèm bún, rau thơm và mắm tôm', 90000.00, 'https://example.com/images/cha_ca_la_vong.jpg', '2024-10-31 02:50:12.172875+00'),
(20, 2, 'Lẩu Gà Lá Giang', 'Lẩu gà nấu với lá giang, chua cay đậm đà', 150000.00, 'https://example.com/images/lau_ga_la_giang.jpg', '2024-10-31 02:50:12.172875+00'),
(21, 3, 'Lẩu Thái', 'Lẩu Thái chua cay với tôm, mực, và rau', 180000.00, 'https://example.com/images/lau_thai.jpg', '2024-10-31 02:52:00.841644+00'),
(22, 3, 'Bò Nướng Lá Lốt', 'Thịt bò cuốn lá lốt, nướng thơm lừng', 70000.00, 'https://example.com/images/bo_nuong_la_lot.jpg', '2024-10-31 02:52:00.841644+00'),
(23, 3, 'Gà Nướng Muối Ớt', 'Gà nướng muối ớt cay nồng, đậm đà', 120000.00, 'https://example.com/images/ga_nuong_muoi_ot.jpg', '2024-10-31 02:52:00.841644+00'),
(24, 3, 'Cơm Tấm Bì Chả', 'Cơm tấm ăn kèm bì, chả và sườn nướng', 50000.00, 'https://example.com/images/com_tam_bi_cha.jpg', '2024-10-31 02:52:00.841644+00'),
(25, 3, 'Hủ Tiếu Nam Vang', 'Hủ tiếu Nam Vang với tôm, thịt heo và rau sống', 60000.00, 'https://example.com/images/hu_tieu_nam_vang.jpg', '2024-10-31 02:52:00.841644+00'),
(26, 3, 'Bún Mọc', 'Bún mọc thơm ngon với giò sống và nấm', 45000.00, 'https://example.com/images/bun_moc.jpg', '2024-10-31 02:52:00.841644+00'),
(27, 3, 'Cá Kho Tộ', 'Cá kho tộ đậm đà ăn kèm cơm trắng', 75000.00, 'https://example.com/images/ca_kho_to.jpg', '2024-10-31 02:52:00.841644+00'),
(28, 3, 'Canh Khổ Qua', 'Canh khổ qua nhồi thịt, thanh mát và bổ dưỡng', 50000.00, 'https://example.com/images/canh_kho_qua.jpg', '2024-10-31 02:52:00.841644+00'),
(29, 3, 'Tôm Rim Mặn', 'Tôm rim với gia vị mặn ngọt hài hòa', 65000.00, 'https://example.com/images/tom_rim_man.jpg', '2024-10-31 02:52:00.841644+00'),
(30, 3, 'Bún Bò Huế', 'Bún bò Huế với hương vị cay nồng và sả', 70000.00, 'https://example.com/images/bun_bo_hue.jpg', '2024-10-31 02:52:00.841644+00'),
(31, 4, 'Gỏi Ngó Sen', 'Gỏi ngó sen với tôm, thịt heo, rau thơm và nước mắm chua ngọt', 85000.00, 'https://example.com/images/goi_ngo_sen.jpg', '2024-10-31 03:13:56.086633+00'),
(32, 4, 'Sushi Tổng Hợp', 'Món sushi tổng hợp với cá hồi, cá ngừ, và các loại hải sản', 120000.00, 'https://example.com/images/sushi_tong_hop.jpg', '2024-10-31 03:13:56.086633+00'),
(33, 4, 'Bánh Cuốn Tôm', 'Bánh cuốn với nhân tôm, ăn kèm nước mắm và rau thơm', 70000.00, 'https://example.com/images/banh_cuon_tom.jpg', '2024-10-31 03:13:56.086633+00'),
(34, 4, 'Sườn Nướng BBQ', 'Sườn nướng BBQ đậm đà, hương vị ngọt cay', 100000.00, 'https://example.com/images/suon_nuong_bbq.jpg', '2024-10-31 03:13:56.086633+00'),
(35, 4, 'Cá Hồi Nướng', 'Cá hồi nướng thơm lừng, ăn kèm sốt chanh leo', 150000.00, 'https://example.com/images/ca_hoi_nuong.jpg', '2024-10-31 03:13:56.086633+00'),
(36, 4, 'Salad Caesar', 'Salad Caesar với rau xà lách, phô mai Parmesan và sốt Caesar', 65000.00, 'https://example.com/images/salad_caesar.jpg', '2024-10-31 03:13:56.086633+00'),
(37, 4, 'Tôm Hấp Nước Dừa', 'Tôm hấp nước dừa ngọt tự nhiên và mềm ngọt', 95000.00, 'https://example.com/images/tom_hap_nuoc_dua.jpg', '2024-10-31 03:13:56.086633+00'),
(38, 4, 'Chả Giò Hải Sản', 'Chả giò hải sản giòn rụm với tôm, cua và rau củ', 80000.00, 'https://example.com/images/cha_gio_hai_san.jpg', '2024-10-31 03:13:56.086633+00'),
(39, 4, 'Thịt Bò Nướng Lò', 'Thịt bò nướng lò với sốt tiêu đen đặc biệt', 140000.00, 'https://example.com/images/thit_bo_nuong_lo.jpg', '2024-10-31 03:13:56.086633+00'),
(40, 4, 'Hàu Sống Sashimi', 'Hàu sống sashimi tươi ngon, ăn kèm chanh và mù tạt', 130000.00, 'https://example.com/images/hau_song_sashimi.jpg', '2024-10-31 03:13:56.086633+00'),
(41, 8, 'Pizza Margherita', 'Pizza Margherita cổ điển với phô mai mozzarella và sốt cà chua', 120000.00, 'https://example.com/images/pizza_margherita.jpg', '2024-10-31 03:20:49.90043+00'),
(42, 8, 'Pizza Pepperoni', 'Pizza Pepperoni với xúc xích pepperoni cay nồng và phô mai', 140000.00, 'https://example.com/images/pizza_pepperoni.jpg', '2024-10-31 03:20:49.90043+00'),
(43, 8, 'Pizza Hải Sản', 'Pizza hải sản với tôm, mực và sốt kem tươi', 160000.00, 'https://example.com/images/pizza_hai_san.jpg', '2024-10-31 03:20:49.90043+00'),
(44, 8, 'Pizza Thịt Bò', 'Pizza với thịt bò, phô mai cheddar và hành tây', 150000.00, 'https://example.com/images/pizza_thit_bo.jpg', '2024-10-31 03:20:49.90043+00'),
(45, 8, 'Pizza Gà BBQ', 'Pizza gà nướng BBQ với ớt chuông và phô mai mozzarella', 135000.00, 'https://example.com/images/pizza_ga_bbq.jpg', '2024-10-31 03:20:49.90043+00'),
(46, 8, 'Pizza Nấm', 'Pizza với nấm tươi, sốt kem và phô mai béo ngậy', 125000.00, 'https://example.com/images/pizza_nam.jpg', '2024-10-31 03:20:49.90043+00'),
(47, 8, 'Pizza Bốn Phô Mai', 'Pizza với bốn loại phô mai đặc biệt: mozzarella, cheddar, parmesan, blue cheese', 170000.00, 'https://example.com/images/pizza_bon_pho_mai.jpg', '2024-10-31 03:20:49.90043+00'),
(48, 8, 'Pizza Thịt Xông Khói', 'Pizza thịt xông khói và hành tây giòn thơm', 145000.00, 'https://example.com/images/pizza_thit_xong_khoi.jpg', '2024-10-31 03:20:49.90043+00'),
(49, 8, 'Pizza Chay', 'Pizza chay với rau củ: ớt chuông, hành tây, cà chua và nấm', 110000.00, 'https://example.com/images/pizza_chay.jpg', '2024-10-31 03:20:49.90043+00'),
(50, 8, 'Pizza Hawaiian', 'Pizza với thịt giăm bông và dứa, hương vị ngọt mặn kết hợp', 130000.00, 'https://example.com/images/pizza_hawaiian.jpg', '2024-10-31 03:20:49.90043+00');

INSERT INTO "public"."menus" ("name", "created_at", "menu_id", "restaurant_id") VALUES
('Thực Đơn Bữa Sáng', '2024-10-31 02:44:16.125501+00', 1, 1),
('Thực Đơn Bữa Trưa', '2024-10-31 02:44:16.125501+00', 2, 2),
('Thực Đơn Đặc Biệt', '2024-10-31 02:44:16.125501+00', 3, 3),
('Thực Đơn Bữa Tối', '2024-10-31 02:44:16.125501+00', 4, 4),
('Thực Đơn Buffet', '2024-10-31 02:44:16.125501+00', 5, 5),
('Thực Đơn Cơm Tấm', '2024-10-31 02:44:16.125501+00', 6, 6),
('Thực Đơn Bún Đậu', '2024-10-31 02:44:16.125501+00', 7, 7),
('Thực Đơn Pizza', '2024-10-31 02:44:16.125501+00', 8, 8),
('Thực Đơn Nướng Hàn Quốc', '2024-10-31 02:44:16.125501+00', 9, 9),
('Thực Đơn Cơm Niêu', '2024-10-31 02:44:16.125501+00', 10, 10),
('Thực Đơn Mang Đi', '2024-10-31 03:23:08.626467+00', 11, 11);

INSERT INTO "public"."order_items" ("order_item_id", "order_id", "item_id", "quantity", "price") VALUES
(1, 1, 1, 2, 150.00),
(2, 1, 2, 1, 100.00),
(3, 2, 3, 3, 90.00),
(4, 2, 4, 2, 75.00),
(5, 3, 5, 1, 180.00),
(6, 3, 6, 2, 150.00),
(7, 4, 7, 4, 220.00),
(8, 5, 8, 1, 100.00),
(9, 6, 9, 2, 120.00);

INSERT INTO "public"."orders" ("status", "total_price", "delivery_fee", "created_at", "order_id", "customer_id", "restaurant_id", "driver_id") VALUES
('completed', 150.00, 10.00, '2024-10-31 03:57:56.545142+00', 7, 1, 1, 3),
('pending', 200.00, 15.00, '2024-10-31 03:57:56.545142+00', 8, 4, 2, 6),
('completed', 180.00, 12.00, '2024-10-31 03:57:56.545142+00', 9, 7, 3, 9),
('completed', 220.00, 8.00, '2024-10-31 03:57:56.545142+00', 10, 10, 4, 3),
('cancelled', 100.00, 5.00, '2024-10-31 03:57:56.545142+00', 11, 1, 5, 6),
('completed', 300.00, 20.00, '2024-10-31 03:57:56.545142+00', 12, 4, 6, 9);

INSERT INTO "public"."payments" ("amount", "method", "status", "created_at", "payment_id", "order_id") VALUES
(250.00, 'credit_card', 'paid', '2024-10-31 04:25:50.971237+00', 1, 1),
(165.00, 'cash_on_delivery', 'pending', '2024-10-31 04:25:50.971237+00', 2, 2),
(330.00, 'paypal', 'paid', '2024-10-31 04:25:50.971237+00', 3, 3),
(220.00, 'debit_card', 'failed', '2024-10-31 04:25:50.971237+00', 4, 4),
(100.00, 'cash_on_delivery', 'paid', '2024-10-31 04:25:50.971237+00', 5, 5),
(120.00, 'credit_card', 'pending', '2024-10-31 04:25:50.971237+00', 6, 6);

INSERT INTO "public"."restaurants" ("name", "description", "location", "phone", "created_at", "restaurant_id", "owner_id", "open_time", "close_time") VALUES
('Quán Ăn Ngon', 'Chuyên món ăn truyền thống Việt Nam', '18 Phan Bội Châu, Hoàn Kiếm, Hà Nội', '02437677777', '2024-10-30 15:27:30.661023+00', 1, 2, '08:00', '22:00'),
('Bún Chả Hương Liên', 'Nổi tiếng với món bún chả', '24 Lê Văn Hưu, Hai Bà Trưng, Hà Nội', '02439431234', '2024-10-30 15:27:30.661023+00', 2, 5, '08:00', '22:00'),
('Phở 10 Lý Quốc Sư', 'Món phở bò đặc trưng Hà Nội', '10 Lý Quốc Sư, Hoàn Kiếm, Hà Nội', '02438252929', '2024-10-30 15:27:30.661023+00', 3, 8, '08:00', '22:00'),
('Lẩu Đức Trọc', 'Nhà hàng lẩu nổi tiếng', '61 Trấn Vũ, Ba Đình, Hà Nội', '02462730303', '2024-10-30 15:27:30.661023+00', 4, 2, '08:00', '22:00'),
('Nhà Hàng Sen Tây Hồ', 'Buffet phong cách Việt', '614 Lạc Long Quân, Tây Hồ, Hà Nội', '02437199242', '2024-10-30 15:27:30.661023+00', 5, 5, '08:00', '22:00'),
('Cơm Tấm Sài Gòn', 'Cơm tấm và món ăn miền Nam', '2 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội', '02439368203', '2024-10-30 15:27:30.661023+00', 6, 8, '08:00', '22:00'),
('Bún Đậu Mắm Tôm Mẹt', 'Bún đậu truyền thống Hà Nội', '21 Phan Huy Ích, Ba Đình, Hà Nội', '02438280088', '2024-10-30 15:27:30.661023+00', 7, 2, '08:00', '22:00'),
('Pizza 4P’s', 'Pizza phong cách Nhật Bản', '24 Lý Quốc Sư, Hoàn Kiếm, Hà Nội', '02437179999', '2024-10-30 15:27:30.661023+00', 8, 5, '08:00', '22:00'),
('Gogi House', 'Nhà hàng nướng Hàn Quốc', '85 Xuân Diệu, Tây Hồ, Hà Nội', '02437199990', '2024-10-30 15:27:30.661023+00', 9, 8, '08:00', '22:00'),
('Nhà Hàng Cơm Niêu', 'Cơm niêu Việt Nam', '123 Hoàng Cầu, Đống Đa, Hà Nội', '02437876543', '2024-10-30 15:27:30.661023+00', 10, 2, '08:00', '22:00'),
('Nhà Hàng Takeaway Sài Gòn', 'Chuyên phục vụ các món ăn Việt Nam mang đi với hương vị đậm đà', '123 Phố Cổ, Hoàn Kiếm, Hà Nội', '0987654321', '2024-10-31 03:21:51.995634+00', 11, 2, '08:00', '22:00');

INSERT INTO "public"."reviews" ("rating", "comment", "created_at", "review_id", "restaurant_id", "user_id") VALUES
(5, 'Món ăn rất ngon và phục vụ tận tình!', '2024-10-31 05:00:00+00', 1, 1, 1),
(4, 'Thực phẩm tươi ngon, nhưng thời gian chờ hơi lâu.', '2024-10-31 05:15:00+00', 2, 2, 4),
(3, 'Bữa ăn bình thường, không có gì đặc sắc.', '2024-10-31 05:30:00+00', 3, 3, 7),
(5, 'Rất hài lòng với dịch vụ và chất lượng thức ăn!', '2024-10-31 05:45:00+00', 4, 4, 10),
(2, 'Không như kỳ vọng, món ăn hơi nguội.', '2024-10-31 06:00:00+00', 5, 5, 1),
(4, 'Pizza ngon, không gian thoải mái!', '2024-10-31 06:15:00+00', 6, 6, 4),
(3, 'Gà nướng vừa ăn nhưng không nhiều gia vị.', '2024-10-31 06:30:00+00', 7, 7, 7),
(5, 'Thực đơn đa dạng, chắc chắn sẽ quay lại!', '2024-10-31 06:45:00+00', 8, 8, 10);

INSERT INTO "public"."users" ("name", "email", "password", "phone", "address", "created_at", "user_id", "role") VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', 'password123', '0912345678', '123 Đường Lê Lợi, Hà Nội', '2024-10-30 15:20:56.267719+00', 1, 'customer'),
('Trần Thị B', 'tranthib@example.com', 'password123', '0938765432', '456 Đường Nguyễn Huệ, TP Hồ Chí Minh', '2024-10-30 15:20:56.267719+00', 2, 'restaurant_owner'),
('Lê Văn C', 'levanc@example.com', 'password123', '0923456789', '789 Đường Trần Phú, Đà Nẵng', '2024-10-30 15:20:56.267719+00', 3, 'driver'),
('Phạm Minh D', 'phamminhd@example.com', 'password123', '0945678123', '111 Đường Hùng Vương, Cần Thơ', '2024-10-30 15:20:56.267719+00', 4, 'customer'),
('Đỗ Thị E', 'dothie@example.com', 'password123', '0982345671', '222 Đường Phan Chu Trinh, Huế', '2024-10-30 15:20:56.267719+00', 5, 'restaurant_owner'),
('Ngô Thanh F', 'ngothanhf@example.com', 'password123', '0909876543', '333 Đường Điện Biên Phủ, Nha Trang', '2024-10-30 15:20:56.267719+00', 6, 'driver'),
('Đặng Quốc G', 'dangquocg@example.com', 'password123', '0971234568', '444 Đường Lý Thái Tổ, Vũng Tàu', '2024-10-30 15:20:56.267719+00', 7, 'customer'),
('Bùi Thị H', 'buithih@example.com', 'password123', '0964321789', '555 Đường Võ Thị Sáu, Biên Hòa', '2024-10-30 15:20:56.267719+00', 8, 'restaurant_owner'),
('Nguyễn Văn I', 'nguyenvani@example.com', 'password123', '0956784321', '666 Đường Quang Trung, Hải Phòng', '2024-10-30 15:20:56.267719+00', 9, 'driver'),
('Trần Minh J', 'tranminhj@example.com', 'password123', '0948761234', '777 Đường Hai Bà Trưng, Thủ Đức', '2024-10-30 15:20:56.267719+00', 10, 'customer'),
('Admin', 'admin@email.com', '$2b$10$wZcBIaWwgCNkboYbj5/t2eEcxozIkxIoQ8HFRGlaivn8RGNo0pvJO', NULL, NULL, '2024-10-31 07:45:33.351+00', 11, 'customer');



-- Indices
CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);


-- Indices
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
