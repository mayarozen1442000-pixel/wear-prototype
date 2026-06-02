import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  ShoppingBag,
  ArrowLeft,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  Check,
  X,
  Truck,
  RotateCcw,
  Heart,
  ChevronRight,
  MapPin,
  Sun,
  Shirt,
  Sparkles,
  Luggage,
  Dumbbell,
  ShieldCheck,
  Home,
  User,
  TrendingUp,
  Trash2,
} from "lucide-react";
import hero from "@/assets/hero-vacation.jpg";
import catDresses from "@/assets/cat-dresses.jpg";
import catShoes from "@/assets/cat-shoes.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WEAR." },
      {
        name: "description",
        content:
          "A concept redesign exploring how UX writing can make affordable fashion shopping clearer, calmer, and more trustworthy.",
      },
    ],
  }),
  component: Prototype,
});

type Screen = "discover" | "browse" | "product" | "checkout" | "search" | "profile" | "filters";
type Tab = "home" | "search" | "trending" | "cart" | "profile";

const TAB_TO_SCREEN: Record<Tab, Screen> = {
  home: "discover",
  search: "search",
  trending: "browse",
  cart: "checkout",
  profile: "profile",
};

type ProductImage = {
  src: string;
  alt: string;
  position?: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  img: string;
  images?: ProductImage[];
  rating: number;
  reviews: number;
  cue: string;
  tag?: string;
  fabric?: string;
  fitNote?: string;
  reviewSummary?: string;
};

function gallery(name: string, views: { src: string; label: string; position?: string }[]): ProductImage[] {
  return views.map(({ src, label, position }) => ({
    src,
    alt: `${name} — ${label}`,
    position,
  }));
}

const PRODUCT_GALLERIES: Record<string, ProductImage[]> = {
  p1: gallery("Cream wrap midi", [
    { src: p1, label: "Front view", position: "object-[center_18%]" },
    { src: p2, label: "Side view", position: "object-[center_22%]" },
    { src: p3, label: "Back view", position: "object-[center_30%]" },
    { src: p4, label: "Fabric detail", position: "object-center" },
  ]),
  p2: gallery("Terracotta linen mini", [
    { src: p2, label: "Front view", position: "object-[center_20%]" },
    { src: p1, label: "Side view", position: "object-[center_15%]" },
    { src: p5, label: "Styled look", position: "object-[center_25%]" },
    { src: p6, label: "Fabric detail", position: "object-center" },
  ]),
  p3: gallery("Pink floral maxi", [
    { src: p3, label: "Front view", position: "object-[center_12%]" },
    { src: p1, label: "Side view", position: "object-[center_18%]" },
    { src: p2, label: "Back view", position: "object-[center_22%]" },
    { src: p4, label: "Print detail", position: "object-center" },
  ]),
  p4: gallery("Sage knit cover-up", [
    { src: p4, label: "Front view", position: "object-[center_20%]" },
    { src: p3, label: "Layered look", position: "object-[center_15%]" },
    { src: p1, label: "Side view", position: "object-[center_18%]" },
    { src: p6, label: "Knit detail", position: "object-center" },
  ]),
  p5: gallery("Black slip dress", [
    { src: p5, label: "Front view", position: "object-[center_22%]" },
    { src: p6, label: "Side view", position: "object-[center_20%]" },
    { src: p2, label: "Back view", position: "object-[center_18%]" },
    { src: p1, label: "Fabric detail", position: "object-center" },
  ]),
  p6: gallery("Ivory shirt dress", [
    { src: p6, label: "Front view", position: "object-[center_18%]" },
    { src: p5, label: "Side view", position: "object-[center_22%]" },
    { src: p4, label: "Back view", position: "object-[center_20%]" },
    { src: p3, label: "Collar detail", position: "object-center" },
  ]),
  s1: gallery("Woven slide sandal", [
    { src: catShoes, label: "Front view", position: "object-[center_55%]" },
    { src: hero, label: "Styled look", position: "object-[center_40%]" },
    { src: p4, label: "Side angle", position: "object-[center_30%]" },
    { src: catAccessories, label: "Weave detail", position: "object-center" },
  ]),
  s2: gallery("Espadrille wedge", [
    { src: p4, label: "Front view", position: "object-[center_25%]" },
    { src: catShoes, label: "Side view", position: "object-[center_50%]" },
    { src: hero, label: "Styled look", position: "object-[center_35%]" },
    { src: p5, label: "Heel detail", position: "object-center" },
  ]),
  s3: gallery("Strappy flat sandal", [
    { src: p5, label: "Front view", position: "object-[center_28%]" },
    { src: catShoes, label: "Side view", position: "object-[center_52%]" },
    { src: hero, label: "On foot", position: "object-[center_38%]" },
    { src: p2, label: "Strap detail", position: "object-center" },
  ]),
  s4: gallery("Platform slide", [
    { src: hero, label: "Front view", position: "object-[center_32%]" },
    { src: catShoes, label: "Side view", position: "object-[center_48%]" },
    { src: p4, label: "Styled look", position: "object-[center_22%]" },
    { src: p1, label: "Sole detail", position: "object-center" },
  ]),
  a1: gallery("Gold hoop set", [
    { src: catAccessories, label: "Front view", position: "object-[center_45%]" },
    { src: p2, label: "Styled look", position: "object-[center_20%]" },
    { src: p6, label: "Worn look", position: "object-[center_18%]" },
    { src: catShoes, label: "Close-up", position: "object-center" },
  ]),
  a2: gallery("Straw sun hat", [
    { src: hero, label: "Front view", position: "object-[center_28%]" },
    { src: catShoes, label: "Side view", position: "object-[center_42%]" },
    { src: catAccessories, label: "Styled look", position: "object-[center_50%]" },
    { src: p3, label: "Brim detail", position: "object-center" },
  ]),
  a3: gallery("Woven crossbody bag", [
    { src: catShoes, label: "Front view", position: "object-[center_45%]" },
    { src: catAccessories, label: "Side view", position: "object-[center_50%]" },
    { src: hero, label: "Styled look", position: "object-[center_35%]" },
    { src: p4, label: "Weave detail", position: "object-center" },
  ]),
  a4: gallery("Layered chain necklace", [
    { src: p2, label: "Front view", position: "object-[center_22%]" },
    { src: catAccessories, label: "Styled look", position: "object-[center_48%]" },
    { src: p6, label: "Layered look", position: "object-[center_18%]" },
    { src: p1, label: "Chain detail", position: "object-center" },
  ]),
  t1: gallery("Ribbed tank top", [
    { src: p1, label: "Front view", position: "object-[center_20%]" },
    { src: p6, label: "Side view", position: "object-[center_18%]" },
    { src: p3, label: "Back view", position: "object-[center_15%]" },
    { src: p4, label: "Rib detail", position: "object-center" },
  ]),
  t2: gallery("Linen button-down", [
    { src: p6, label: "Front view", position: "object-[center_18%]" },
    { src: p1, label: "Side view", position: "object-[center_20%]" },
    { src: p5, label: "Back view", position: "object-[center_22%]" },
    { src: p2, label: "Fabric detail", position: "object-center" },
  ]),
  t3: gallery("Crop knit tee", [
    { src: p3, label: "Front view", position: "object-[center_16%]" },
    { src: p2, label: "Side view", position: "object-[center_20%]" },
    { src: p1, label: "Back view", position: "object-[center_18%]" },
    { src: p5, label: "Knit detail", position: "object-center" },
  ]),
  t4: gallery("Off-shoulder blouse", [
    { src: p2, label: "Front view", position: "object-[center_20%]" },
    { src: p3, label: "Side view", position: "object-[center_15%]" },
    { src: p6, label: "Back view", position: "object-[center_18%]" },
    { src: p4, label: "Shoulder detail", position: "object-center" },
  ]),
};

function getProductImages(product: Product): ProductImage[] {
  if (product.images?.length) return product.images;
  if (PRODUCT_GALLERIES[product.id]) return PRODUCT_GALLERIES[product.id];
  return [{ src: product.img, alt: `${product.name} — front view`, position: "object-[center_20%]" }];
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Cream wrap midi",
    price: 22.4,
    wasPrice: 31.99,
    img: p1,
    rating: 4.7,
    reviews: 842,
    cue: "Arrives by Jul 18 · Size M in stock",
    tag: "Top rated",
    fabric: "Lightweight rayon blend",
    fitNote: "Runs true to size. Wrap tie lets you adjust the waist.",
    reviewSummary: "Shoppers love the drape—it photographs well and feels cool in heat.",
  },
  {
    id: "p2",
    name: "Terracotta linen mini",
    price: 18.4,
    wasPrice: 26.99,
    img: p2,
    rating: 4.6,
    reviews: 1204,
    cue: "Best value under $20",
    tag: "Top rated",
    fabric: "Breathable linen-cotton",
    fitNote: "Runs a little small. Size up if you're between sizes.",
    reviewSummary: "Color matches the photos. Fabric is slightly sheer in direct sun—layer if needed.",
  },
  {
    id: "p3",
    name: "Pink floral maxi",
    price: 29.9,
    wasPrice: 39.99,
    img: p3,
    rating: 4.5,
    reviews: 563,
    cue: "Most saved this week",
    fabric: "Soft viscose",
    fitNote: "Relaxed fit through the body. Tall-friendly length.",
    reviewSummary: "Customers say it moves beautifully and doesn't wrinkle in a carry-on.",
  },
  {
    id: "p4",
    name: "Sage knit cover-up",
    price: 24.0,
    wasPrice: 32.0,
    img: p4,
    rating: 4.8,
    reviews: 391,
    cue: "Free returns · Easy layer piece",
    tag: "Top rated",
    fabric: "Open-knit cotton blend",
    fitNote: "One-size fits XS–L comfortably.",
    reviewSummary: "Great over a swimsuit or with denim. Stretchy and forgiving.",
  },
  {
    id: "p5",
    name: "Black slip dress",
    price: 19.9,
    wasPrice: 27.99,
    img: p5,
    rating: 4.6,
    reviews: 978,
    cue: "Dressy, packs flat",
    tag: "Top rated",
    fabric: "Satin-touch polyester",
    fitNote: "Slim through the hips. Size up for a looser fit.",
    reviewSummary: "A go-to dinner dress. Several reviews mention wearing it with sneakers too.",
  },
  {
    id: "p6",
    name: "Ivory shirt dress",
    price: 27.5,
    wasPrice: 34.99,
    img: p6,
    rating: 4.4,
    reviews: 447,
    cue: "Arrives by Jul 19",
    fabric: "Crisp cotton poplin",
    fitNote: "Structured shoulders. Belt included.",
    reviewSummary: "Looks polished without ironing. Buttons are secure—no gaping.",
  },
];

type BrowseContext = {
  title: string;
  resultNoun: string;
  meta: string;
  sortHint: string;
  subfilters: string[];
  products: Product[];
};

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "reviews";

const SORT_OPTIONS: { id: SortOption; label: string; hint: string }[] = [
  {
    id: "relevance",
    label: "Relevance",
    hint: "Sorted by relevance. Every price includes active discounts—no codes to hunt.",
  },
  {
    id: "price-asc",
    label: "Price: low to high",
    hint: "Showing lowest prices first—all discounts already applied.",
  },
  {
    id: "price-desc",
    label: "Price: high to low",
    hint: "Showing highest prices first—all discounts already applied.",
  },
  {
    id: "rating",
    label: "Top rated",
    hint: "Highest customer ratings first.",
  },
  {
    id: "reviews",
    label: "Most reviewed",
    hint: "Styles with the most shopper reviews first.",
  },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const items = [...products];
  switch (sort) {
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    case "rating":
      return items.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "reviews":
      return items.sort((a, b) => b.reviews - a.reviews);
    default:
      return items;
  }
}

function sortLabel(sort: SortOption): string {
  if (sort === "relevance") return "Sort";
  return SORT_OPTIONS.find((o) => o.id === sort)?.label ?? "Sort";
}

const SHOE_PRODUCTS: Product[] = [
  {
    id: "s1",
    name: "Woven slide sandal",
    price: 14.9,
    wasPrice: 19.99,
    img: catShoes,
    rating: 4.5,
    reviews: 612,
    cue: "Runs true to size · Ships today",
  },
  {
    id: "s2",
    name: "Espadrille wedge",
    price: 21.5,
    wasPrice: 28.0,
    img: p4,
    rating: 4.7,
    reviews: 388,
    cue: "Vacation favorite",
    tag: "Top rated",
  },
  {
    id: "s3",
    name: "Strappy flat sandal",
    price: 16.4,
    img: p5,
    rating: 4.4,
    reviews: 291,
    cue: "Lightweight · Easy to pack",
  },
  {
    id: "s4",
    name: "Platform slide",
    price: 19.9,
    img: hero,
    rating: 4.6,
    reviews: 445,
    cue: "Best under $20",
    tag: "Top rated",
  },
];

const ACCESSORY_PRODUCTS: Product[] = [
  {
    id: "a1",
    name: "Gold hoop set",
    price: 9.5,
    img: catAccessories,
    rating: 4.8,
    reviews: 1102,
    cue: "Hypoallergenic · Top gift pick",
    tag: "Top rated",
  },
  {
    id: "a2",
    name: "Straw sun hat",
    price: 12.9,
    img: hero,
    rating: 4.5,
    reviews: 534,
    cue: "Adjustable band · Packable",
  },
  {
    id: "a3",
    name: "Woven crossbody bag",
    price: 18.0,
    wasPrice: 24.99,
    img: catShoes,
    rating: 4.6,
    reviews: 267,
    cue: "Fits phone + essentials",
    tag: "Top rated",
  },
  {
    id: "a4",
    name: "Layered chain necklace",
    price: 11.5,
    img: p2,
    rating: 4.4,
    reviews: 189,
    cue: "Tarnish-resistant finish",
  },
];

const TOP_PRODUCTS: Product[] = [
  {
    id: "t1",
    name: "Ribbed tank top",
    price: 11.9,
    img: p1,
    rating: 4.5,
    reviews: 720,
    cue: "Soft stretch · Size M in stock",
  },
  {
    id: "t2",
    name: "Linen button-down",
    price: 17.5,
    wasPrice: 23.99,
    img: p6,
    rating: 4.6,
    reviews: 403,
    cue: "Breathable · No-iron friendly",
    tag: "Top rated",
  },
  {
    id: "t3",
    name: "Crop knit tee",
    price: 13.4,
    img: p3,
    rating: 4.3,
    reviews: 256,
    cue: "Easy layer piece",
  },
  {
    id: "t4",
    name: "Off-shoulder blouse",
    price: 19.0,
    img: p2,
    rating: 4.7,
    reviews: 318,
    cue: "Dinner-ready style",
    tag: "Top rated",
  },
];

const ALL_CATALOG = [...PRODUCTS, ...SHOE_PRODUCTS, ...ACCESSORY_PRODUCTS, ...TOP_PRODUCTS];

type FilterCategoryId = "size" | "price" | "delivery" | "rating" | "returns" | "confidence";

type FilterOptionDef = {
  id: string;
  category: FilterCategoryId;
  label: string;
  match: (product: Product) => boolean;
};

const FILTER_CATEGORIES: { id: FilterCategoryId; label: string }[] = [
  { id: "size", label: "Size" },
  { id: "price", label: "Price" },
  { id: "delivery", label: "Delivery" },
  { id: "rating", label: "Rating" },
  { id: "returns", label: "Returns" },
  { id: "confidence", label: "Confidence" },
];

const FILTER_OPTIONS: FilterOptionDef[] = [
  { id: "size-m", category: "size", label: "In my size (M)", match: () => true },
  { id: "size-s", category: "size", label: "Also in S", match: () => true },
  { id: "price-under-25", category: "price", label: "Under $25", match: (p) => p.price <= 25 },
  { id: "price-under-20", category: "price", label: "Under $20", match: (p) => p.price <= 20 },
  { id: "price-under-15", category: "price", label: "Under $15", match: (p) => p.price <= 15 },
  {
    id: "delivery-week",
    category: "delivery",
    label: "Arrives this week",
    match: (p) => p.cue.includes("Arrives") || p.cue.includes("Ships"),
  },
  {
    id: "delivery-fast",
    category: "delivery",
    label: "Ships today",
    match: (p) => p.cue.includes("Ships today") || p.cue.includes("Arrives by"),
  },
  { id: "rating-4", category: "rating", label: "4★ and up", match: (p) => p.rating >= 4.5 },
  { id: "rating-top", category: "rating", label: "Top rated (4.6+)", match: (p) => p.rating >= 4.6 },
  {
    id: "returns-free",
    category: "returns",
    label: "Free returns",
    match: (p) => p.cue.toLowerCase().includes("return") || p.reviews > 200,
  },
  {
    id: "returns-easy",
    category: "returns",
    label: "Easy to return",
    match: (p) => p.cue.toLowerCase().includes("return") || p.price <= 30,
  },
  {
    id: "photos",
    category: "confidence",
    label: "Has customer photos",
    match: (p) => p.reviews >= 400,
  },
  {
    id: "not-sheer",
    category: "confidence",
    label: "Not see-through",
    match: (p) => !p.reviewSummary?.toLowerCase().includes("sheer"),
  },
  {
    id: "no-iron",
    category: "confidence",
    label: "Easy care / no-iron",
    match: (p) =>
      p.fabric?.toLowerCase().includes("linen") ||
      p.fabric?.toLowerCase().includes("knit") ||
      p.cue.toLowerCase().includes("no-iron") ||
      p.name.toLowerCase().includes("linen"),
  },
  {
    id: "pack-light",
    category: "confidence",
    label: "Pack light",
    match: (p) =>
      p.cue.toLowerCase().includes("pack") || p.cue.toLowerCase().includes("layer") || p.price <= 22,
  },
  {
    id: "vacation",
    category: "confidence",
    label: "Vacation-friendly",
    match: (p) => p.price <= 35 || p.cue.toLowerCase().includes("vacation"),
  },
];

const QUICK_FILTER_PRESETS: { label: string; category: FilterCategoryId; optionId: string }[] = [
  { label: "In my size (M)", category: "size", optionId: "size-m" },
  { label: "Under $25", category: "price", optionId: "price-under-25" },
  { label: "Arrives this week", category: "delivery", optionId: "delivery-week" },
  { label: "4★ and up", category: "rating", optionId: "rating-4" },
  { label: "Has customer photos", category: "confidence", optionId: "photos" },
];

function applyProductFilters(products: Product[], filterIds: string[]): Product[] {
  if (filterIds.length === 0) return products;
  const options = FILTER_OPTIONS.filter((option) => filterIds.includes(option.id));
  return products.filter((product) => options.every((option) => option.match(product)));
}

function buildFilteredBrowseContext(filterIds: string[]): BrowseContext {
  const products = applyProductFilters(ALL_CATALOG, filterIds);
  const labels = FILTER_OPTIONS.filter((option) => filterIds.includes(option.id)).map(
    (option) => option.label,
  );

  return {
    title: labels.length === 1 ? labels[0] : "Filtered results",
    products,
    resultNoun: "items",
    meta: `${filterIds.length} active filter${filterIds.length === 1 ? "" : "s"} · Final prices`,
    sortHint: "Showing styles that match everything you selected.",
    subfilters: ["All", "Dresses", "Tops", "Shoes", "Accessories"],
  };
}

function filterOptionLabel(id: string): string {
  return FILTER_OPTIONS.find((option) => option.id === id)?.label ?? id;
}

function makeBrowseContext(
  title: string,
  products: Product[],
  resultNoun: string,
  meta = "Size M · Final prices",
  sortHint = "Sorted by relevance. Every price includes active discounts—no codes to hunt.",
  subfilters = ["All", "Mini", "Midi", "Maxi", "Beach", "Casual"],
): BrowseContext {
  return { title, products, resultNoun, meta, sortHint, subfilters };
}

const BROWSE: Record<string, BrowseContext> = {
  summerEdit: makeBrowseContext(
    "Summer edit",
    PRODUCTS.filter((p) => p.price <= 35),
    "dresses",
    "Under $35 · Size M · Final prices",
    "Curated vacation picks—lightweight styles with delivery dates upfront.",
  ),
  dresses: makeBrowseContext("Dresses", PRODUCTS, "dresses"),
  shoes: makeBrowseContext(
    "Shoes",
    SHOE_PRODUCTS,
    "shoes",
    "Size M · Final prices",
    "Sorted by popularity. Every price includes active discounts.",
    ["All", "Sandals", "Flats", "Heels", "Slides"],
  ),
  sandals: makeBrowseContext(
    "Sandals",
    SHOE_PRODUCTS,
    "sandals",
    "Size M · Final prices",
    "Light, packable styles for warm days and getaways.",
    ["All", "Flat", "Wedge", "Slide"],
  ),
  accessories: makeBrowseContext(
    "Accessories",
    ACCESSORY_PRODUCTS,
    "accessories",
    "Final prices",
    "Small add-ons that complete the look—most under $20.",
    ["All", "Jewelry", "Bags", "Hats"],
  ),
  bags: makeBrowseContext(
    "Bags",
    ACCESSORY_PRODUCTS.filter((p) => p.name.toLowerCase().includes("bag")),
    "bags",
    "Final prices",
    "Room for essentials without the bulk.",
    ["All", "Crossbody", "Tote", "Mini"],
  ),
  tops: makeBrowseContext(
    "Tops",
    TOP_PRODUCTS,
    "tops",
    "Size M · Final prices",
    "Layer-friendly pieces for heat, travel, and nights out.",
    ["All", "Tank", "Blouse", "Knit", "Linen"],
  ),
  under25: makeBrowseContext(
    "Under $25",
    ALL_CATALOG.filter((p) => p.price <= 25),
    "items",
    "Final prices · Best value first",
    "Low prices with the details you need before you tap.",
    ["All", "Dresses", "Tops", "Shoes", "Accessories"],
  ),
  trending: makeBrowseContext(
    "Trending now",
    [...PRODUCTS, ...SHOE_PRODUCTS.slice(0, 2), ...ACCESSORY_PRODUCTS.slice(0, 1)],
    "items",
    "Updated today · Final prices",
    "What shoppers are saving and buying most this week.",
    ["All", "Dresses", "Shoes", "Accessories"],
  ),
  inMySize: makeBrowseContext(
    "In my size (M)",
    ALL_CATALOG,
    "items",
    "Size M · In stock now",
    "Showing styles available in your size—no sold-out surprises.",
  ),
  arrivesThisWeek: makeBrowseContext(
    "Arrives this week",
    ALL_CATALOG.filter((p) => p.cue.includes("Arrives") || p.cue.includes("Ships")),
    "items",
    "Delivery by Jul 19 · Final prices",
    "Need it soon? These ship fast with tracked delivery.",
  ),
  fourStarUp: makeBrowseContext(
    "4★ and up",
    ALL_CATALOG.filter((p) => p.rating >= 4.5),
    "items",
    "Highly rated · Final prices",
    "Shoppers love these—sorted by rating and review count.",
  ),
  customerPhotos: makeBrowseContext(
    "Customer photos",
    ALL_CATALOG.filter((p) => p.reviews >= 400),
    "items",
    "Real shopper photos · Final prices",
    "See how these look on real people before you buy.",
  ),
  hotDay: makeBrowseContext(
    "Hot day",
    [PRODUCTS[1], PRODUCTS[2], PRODUCTS[3], TOP_PRODUCTS[0], TOP_PRODUCTS[1]],
    "items",
    "Light fabrics · Final prices",
    "Breathable picks for heat—linen, viscose, and open knits.",
    ["All", "Dresses", "Tops", "Cover-ups"],
  ),
  noIron: makeBrowseContext(
    "No-iron",
    [PRODUCTS[1], PRODUCTS[5], TOP_PRODUCTS[1], PRODUCTS[3]],
    "items",
    "Easy-care fabrics · Final prices",
    "Wrinkle-resistant styles that look polished straight from the bag.",
    ["All", "Linen", "Knit", "Cotton"],
  ),
  dinnerPlans: makeBrowseContext(
    "Dinner plans",
    [PRODUCTS[4], PRODUCTS[5], PRODUCTS[0], TOP_PRODUCTS[3]],
    "items",
    "Dressy but comfy · Final prices",
    "Elevated looks that still feel easy to wear all evening.",
    ["All", "Midi", "Slip", "Shirt dress"],
  ),
  packLight: makeBrowseContext(
    "Pack light",
    [PRODUCTS[3], PRODUCTS[4], PRODUCTS[1], SHOE_PRODUCTS[2], ACCESSORY_PRODUCTS[1]],
    "items",
    "Wrinkle-friendly · Final prices",
    "Pieces that pack flat and still look great on arrival.",
    ["All", "Dresses", "Shoes", "Layers"],
  ),
  sporty: makeBrowseContext(
    "Sporty",
    [PRODUCTS[3], TOP_PRODUCTS[0], TOP_PRODUCTS[2], SHOE_PRODUCTS[0], SHOE_PRODUCTS[2]],
    "items",
    "Move-ready · Final prices",
    "Stretchy, easy layers and flats built for long days out.",
    ["All", "Active", "Knit", "Sandals"],
  ),
  linenMini: makeBrowseContext("Linen mini dress", [PRODUCTS[1]], "dress", "1 result · Final price"),
  vacationCoverUp: makeBrowseContext("Vacation cover-up", [PRODUCTS[3]], "item", "1 result · Final price"),
  goldHoops: makeBrowseContext("Gold hoops under $15", [ACCESSORY_PRODUCTS[0]], "item", "1 result · Final price"),
  resortEdit: makeBrowseContext(
    "Resort edit",
    PRODUCTS.filter((p) => p.price <= 35),
    "dresses",
    "Under $35 · Final prices",
  ),
  photoPicks: makeBrowseContext(
    "Customer photo picks",
    ALL_CATALOG.filter((p) => p.tag === "Top rated"),
    "items",
    "Top rated · Final prices",
    "Best-reviewed styles with the most customer photos.",
  ),
};

const DEFAULT_BROWSE = BROWSE.dresses;

function Prototype() {
  const [screen, setScreen] = useState<Screen>("discover");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[1]);
  const [bagItems, setBagItems] = useState<{ p: Product; size: string }[]>([]);
  const [showAdded, setShowAdded] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [size, setSize] = useState("M");
  const [browseContext, setBrowseContext] = useState<BrowseContext>(DEFAULT_BROWSE);
  const [browseSort, setBrowseSort] = useState<SortOption>("relevance");
  const [showSort, setShowSort] = useState(false);
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [pendingFilterIds, setPendingFilterIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<FilterCategoryId>("price");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [screen]);

  useEffect(() => {
    setBrowseSort("relevance");
    setShowSort(false);
  }, [browseContext.title]);

  useEffect(() => {
    if (screen !== "browse") {
      setShowSort(false);
    }
  }, [screen]);

  const goProduct = (p: Product) => {
    setActiveProduct(p);
    setSize("M");
    setScreen("product");
  };

  const addToBag = () => {
    setBagItems((b) => [...b, { p: activeProduct, size }]);
    setShowAdded(true);
  };

  const removeFromBag = (index: number) => {
    setBagItems((items) => items.filter((_, i) => i !== index));
  };

  const bagCount = bagItems.length;

  const goToTab = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "trending") {
      setActiveFilterIds([]);
      setBrowseContext(BROWSE.trending);
    }
    setScreen(TAB_TO_SCREEN[tab]);
  };

  const openBrowse = (key: keyof typeof BROWSE) => {
    setActiveFilterIds([]);
    setBrowseContext(BROWSE[key]);
    setBrowseSort("relevance");
    setShowSort(false);
    setActiveTab("trending");
    setScreen("browse");
  };

  const openFilters = (category: FilterCategoryId, preselectOptionId?: string) => {
    setFilterCategory(category);
    setPendingFilterIds(() => {
      const base = [...activeFilterIds];
      if (preselectOptionId && !base.includes(preselectOptionId)) {
        base.push(preselectOptionId);
      }
      return base;
    });
    setScreen("filters");
  };

  const applyFilters = () => {
    setActiveFilterIds(pendingFilterIds);
    if (pendingFilterIds.length === 0) {
      setBrowseContext(BROWSE.trending);
    } else {
      setBrowseContext(buildFilteredBrowseContext(pendingFilterIds));
    }
    setBrowseSort("relevance");
    setShowSort(false);
    setActiveTab("trending");
    setScreen("browse");
  };

  const updateActiveFilters = (filterIds: string[]) => {
    setActiveFilterIds(filterIds);
    setPendingFilterIds(filterIds);
    if (filterIds.length === 0) {
      setBrowseContext(BROWSE.trending);
      return;
    }
    setBrowseContext(buildFilteredBrowseContext(filterIds));
  };

  const bagSubtotal = bagItems.reduce((sum, item) => sum + item.p.price, 0);
  const showBottomNav = screen !== "product";
  const overlayOpen = showSort || showAdded;
  const pendingResultCount = applyProductFilters(ALL_CATALOG, pendingFilterIds).length;

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    if (overlayOpen) {
      el.style.overflow = "hidden";
    } else {
      el.style.overflow = "";
    }
  }, [overlayOpen]);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center px-4 py-4 md:py-8">
      <div className="relative flex h-[min(100dvh,860px)] max-h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-background shadow-[var(--shadow-soft)]">
        <TopBar
          screen={screen}
          browseTitle={browseContext.title}
          bagCount={bagCount}
          showCart={showCartPopup}
          cartItems={bagItems}
          onToggleCart={() => setShowCartPopup((open) => !open)}
          onCloseCart={() => setShowCartPopup(false)}
          onRemoveCartItem={removeFromBag}
          onCartCheckout={() => {
            setShowCartPopup(false);
            goToTab("cart");
          }}
          onBack={() => {
            if (screen === "product") {
              setScreen("browse");
              setActiveTab("trending");
            } else if (screen === "browse") {
              goToTab("home");
            } else if (screen === "filters") {
              goToTab("home");
            }
          }}
          onSearch={() => goToTab("search")}
          onGoHome={() => goToTab("home")}
        />

        {showCartPopup && (
          <button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 top-14 z-40 bg-foreground/15 animate-in fade-in duration-200"
            onClick={() => setShowCartPopup(false)}
          />
        )}

        <main ref={mainRef} className="relative z-0 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
          {screen === "discover" && (
            <Discover
              onOpenBrowse={openBrowse}
              onOpenFilters={openFilters}
              onOpenSearch={() => goToTab("search")}
              onProduct={goProduct}
              bottomPad={showBottomNav}
            />
          )}
          {screen === "browse" && (
            <Browse
              context={browseContext}
              sort={browseSort}
              activeFilterIds={activeFilterIds}
              onProduct={goProduct}
              onOpenFilters={() => openFilters(filterCategory)}
              onRemoveFilter={(id) => updateActiveFilters(activeFilterIds.filter((f) => f !== id))}
              onOpenSort={() => setShowSort(true)}
              bottomPad={showBottomNav}
            />
          )}
          {screen === "filters" && (
            <FilterPage
              category={filterCategory}
              pendingFilterIds={pendingFilterIds}
              resultCount={pendingResultCount}
              bottomPad={showBottomNav}
              onCategoryChange={setFilterCategory}
              onToggleFilter={(id) =>
                setPendingFilterIds((current) =>
                  current.includes(id) ? current.filter((f) => f !== id) : [...current, id],
                )
              }
              onRemoveFilter={(id) => setPendingFilterIds((current) => current.filter((f) => f !== id))}
              onClearAll={() => setPendingFilterIds([])}
              onApply={applyFilters}
            />
          )}
          {screen === "product" && (
            <ProductDetail product={activeProduct} size={size} setSize={setSize} onAdd={addToBag} />
          )}
          {screen === "checkout" && (
            <Checkout
              items={bagItems}
              bottomPad={showBottomNav}
              onRemoveItem={removeFromBag}
            />
          )}
          {screen === "search" && (
            <SearchView
              active={activeTab === "search"}
              bottomPad={showBottomNav}
              onOpenBrowse={openBrowse}
              onProduct={goProduct}
            />
          )}
          {screen === "profile" && <ProfileView bottomPad={showBottomNav} />}
        </main>

        {showBottomNav && (
          <BottomNav activeTab={activeTab} bagCount={bagCount} onTabChange={goToTab} />
        )}

        {showSort && (
          <SortSheet
            sort={browseSort}
            onSelect={(option) => {
              setBrowseSort(option);
              setShowSort(false);
            }}
            onClose={() => setShowSort(false)}
          />
        )}
        {showAdded && (
          <AddedSheet
            product={activeProduct}
            size={size}
            bagSubtotal={bagSubtotal}
            onClose={() => setShowAdded(false)}
            onViewBag={() => {
              setShowAdded(false);
              goToTab("cart");
            }}
          />
        )}
      </div>
    </div>
  );
}

function TopBar({
  screen,
  browseTitle,
  bagCount,
  showCart,
  cartItems,
  onBack,
  onToggleCart,
  onCloseCart,
  onRemoveCartItem,
  onCartCheckout,
  onSearch,
  onGoHome,
}: {
  screen: Screen;
  browseTitle: string;
  bagCount: number;
  showCart: boolean;
  cartItems: { p: Product; size: string }[];
  onBack: () => void;
  onToggleCart: () => void;
  onCloseCart: () => void;
  onRemoveCartItem: (index: number) => void;
  onCartCheckout: () => void;
  onSearch: () => void;
  onGoHome: () => void;
}) {
  const showBack = screen === "browse" || screen === "product" || screen === "filters";
  const titles: Record<Screen, string> = {
    discover: "",
    browse: browseTitle,
    product: "",
    checkout: "Your bag",
    search: "Search",
    profile: "Profile",
    filters: "Filters",
  };

  return (
    <div className="relative z-50 shrink-0 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-5">
        <div className="flex min-w-0 items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack}
              aria-label="Back"
              className="-ml-1 rounded-full p-1.5 hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={onGoHome}
              aria-label="Go to home"
              className="text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
            >
              WEAR<span className="text-foreground">.</span>
            </button>
          )}
          {titles[screen] && (
            <h1 className="truncate text-base font-semibold">{titles[screen]}</h1>
          )}
        </div>
        <div className="relative flex items-center gap-0.5">
          {screen === "discover" && (
            <button
              onClick={onSearch}
              aria-label="Search"
              className="rounded-full p-2 hover:bg-secondary transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={onToggleCart}
            aria-label={`Bag${bagCount ? `, ${bagCount} items` : ""}`}
            aria-expanded={showCart}
            className={`relative rounded-full p-2 transition-colors ${
              showCart ? "bg-foreground text-primary-foreground shadow-sm" : "hover:bg-secondary"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {bagCount > 0 && (
              <span
                className={`absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                  showCart
                    ? "bg-background text-foreground"
                    : "bg-foreground text-primary-foreground"
                }`}
              >
                {bagCount}
              </span>
            )}
          </button>

          {showCart && (
            <CartPopover
              items={cartItems}
              onClose={onCloseCart}
              onRemoveItem={onRemoveCartItem}
              onCheckout={onCartCheckout}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function BottomNav({
  activeTab,
  bagCount,
  onTabChange,
}: {
  activeTab: Tab;
  bagCount: number;
  onTabChange: (tab: Tab) => void;
}) {
  const items: { tab: Tab; label: string; icon: typeof Home }[] = [
    { tab: "home", label: "Home", icon: Home },
    { tab: "search", label: "Search", icon: Search },
    { tab: "trending", label: "Trending", icon: TrendingUp },
    { tab: "cart", label: "Cart", icon: ShoppingBag },
    { tab: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="z-30 shrink-0 border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <div className="flex h-16 items-stretch justify-around px-1">
        {items.map(({ tab, label, icon: Icon }) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl transition-colors ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              <span className="relative">
                <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
                {tab === "cart" && bagCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-bold text-primary-foreground">
                    {bagCount}
                  </span>
                )}
              </span>
              <span className={`text-[10px] leading-none ${active ? "font-bold" : "font-medium"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function SearchView({
  active,
  bottomPad,
  onOpenBrowse,
  onProduct,
}: {
  active: boolean;
  bottomPad: boolean;
  onOpenBrowse: (key: keyof typeof BROWSE) => void;
  onProduct: (p: Product) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const justForYou = [PRODUCTS[1], PRODUCTS[4], PRODUCTS[0], ACCESSORY_PRODUCTS[0]];
  const recent: { label: string; key: keyof typeof BROWSE }[] = [
    { label: "Linen mini dress", key: "linenMini" },
    { label: "Vacation cover-up", key: "vacationCoverUp" },
    { label: "Gold hoops under $15", key: "goldHoops" },
  ];
  const trending: { label: string; key: keyof typeof BROWSE }[] = [
    { label: "Resort edit", key: "resortEdit" },
    { label: "Under $25 dresses", key: "under25" },
    { label: "Customer photo picks", key: "photoPicks" },
  ];

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(id);
  }, [active]);

  return (
    <div className={`px-5 pt-4 ${bottomPad ? "pb-6" : "pb-10"}`}>
      <div className="flex h-11 items-center gap-2.5 rounded-full border border-border/60 bg-secondary/80 px-4 ring-2 ring-transparent transition focus-within:border-foreground/25 focus-within:ring-foreground/10">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          placeholder="Search dresses, shoes, accessories…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Try “midi dress under $25” or “arrives this week.”
      </p>

      <section className="mt-6">
        <h2 className="text-sm font-bold">Recent searches</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {recent.map((term) => (
            <button
              key={term.label}
              onClick={() => onOpenBrowse(term.key)}
              className="rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium hover:bg-secondary"
            >
              {term.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold">Trending now</h2>
        <div className="mt-2 space-y-2">
          {trending.map((term) => (
            <button
              key={term.label}
              onClick={() => onOpenBrowse(term.key)}
              className="flex w-full items-center justify-between rounded-2xl border border-border px-4 py-3 text-left text-sm font-medium hover:bg-secondary/60"
            >
              {term.label}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionHeader title="Just for you" variant="lead" onAction={() => onOpenBrowse("trending")} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {justForYou.map((p) => (
            <ProductCard key={p.id} p={p} onClick={() => onProduct(p)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfileView({ bottomPad }: { bottomPad: boolean }) {
  const links = [
    { label: "Orders & tracking", detail: "See delivery updates in one place" },
    { label: "Saved items", detail: "12 pieces waiting for you" },
    { label: "Size profile", detail: "M · Updated from recent orders" },
    { label: "Returns & help", detail: "Free returns within 30 days" },
  ];

  return (
    <div className={`px-5 pt-4 ${bottomPad ? "pb-6" : "pb-10"}`}>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-lg font-bold">
          M
        </div>
        <div>
          <p className="text-base font-bold">Hi, Maya</p>
          <p className="text-xs text-muted-foreground">Member since 2024 · Free returns on every order</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {links.map((link) => (
          <button
            key={link.label}
            className="flex w-full items-center justify-between rounded-2xl border border-border px-4 py-3.5 text-left hover:bg-secondary/60"
          >
            <div>
              <p className="text-sm font-semibold">{link.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{link.detail}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ShopTileRow({
  children,
  compact,
  align,
  gap,
}: {
  children: React.ReactNode;
  compact?: boolean;
  align?: "start" | "stretch";
  gap?: "normal" | "wide";
}) {
  const gapClass = gap === "wide" ? "gap-2.5" : compact ? "gap-2" : "gap-3";
  return (
    <div className={`${compact ? "mt-1.5" : "mt-2"} overflow-x-auto px-5 pb-2 scrollbar-none`}>
      <div
        className={`flex w-max ${align === "stretch" ? "items-stretch" : "items-start"} ${gapClass}`}
      >
        {children}
      </div>
    </div>
  );
}

function NeedShopTile({
  label,
  Icon,
  onClick,
}: {
  label: string;
  Icon: typeof Sun;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group w-[84px] shrink-0 text-left">
      <div className="flex h-[78px] w-full flex-col items-center justify-between rounded-xl border border-border/60 bg-card px-2.5 py-2.5 transition duration-200 group-hover:border-foreground/20 group-hover:bg-secondary/40 group-active:border-foreground/30 group-active:bg-secondary/70">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/90">
          <Icon
            className="h-4 w-4 text-foreground/75 transition duration-200 group-hover:text-foreground"
            strokeWidth={1.5}
          />
        </div>
        <span className="flex h-8 w-full items-center justify-center text-center text-[11px] font-semibold leading-tight text-foreground line-clamp-2">
          {label}
        </span>
      </div>
    </button>
  );
}

function CategoryShopTile({
  label,
  img,
  onClick,
}: {
  label: string;
  img: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group w-[58px] shrink-0 text-left">
      <div className="mx-auto h-[52px] w-[52px] overflow-hidden rounded-full bg-secondary ring-1 ring-border/60 transition duration-200 group-hover:ring-foreground/30">
        <img src={img} alt={label} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <p className="mt-1.5 w-full truncate text-center text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {label}
      </p>
    </button>
  );
}

function Discover({
  onOpenBrowse,
  onOpenFilters,
  onOpenSearch,
  onProduct,
  bottomPad,
}: {
  onOpenBrowse: (key: keyof typeof BROWSE) => void;
  onOpenFilters: (category: FilterCategoryId, preselectOptionId?: string) => void;
  onOpenSearch: () => void;
  onProduct: (p: Product) => void;
  bottomPad: boolean;
}) {
  const needs: { label: string; key: keyof typeof BROWSE; Icon: typeof Sun }[] = [
    { label: "Hot day", key: "hotDay", Icon: Sun },
    { label: "No-iron", key: "noIron", Icon: Shirt },
    { label: "Dinner plans", key: "dinnerPlans", Icon: Sparkles },
    { label: "Pack light", key: "packLight", Icon: Luggage },
    { label: "Sporty", key: "sporty", Icon: Dumbbell },
  ];

  const categories: { label: string; key: keyof typeof BROWSE; img: string }[] = [
    { label: "Dresses", key: "dresses", img: catDresses },
    { label: "Shoes", key: "shoes", img: catShoes },
    { label: "Accessories", key: "accessories", img: catAccessories },
    { label: "Tops", key: "tops", img: catDresses },
    { label: "Bags", key: "bags", img: catAccessories },
    { label: "Sandals", key: "sandals", img: catShoes },
  ];

  return (
    <div className={bottomPad ? "pb-4" : "pb-10"}>
      <div className="px-5 pt-3">
        <button
          onClick={onOpenSearch}
          className="flex h-10 w-full items-center gap-2.5 rounded-full border border-border bg-secondary px-4 text-left"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search dresses, cover-ups, sandals…</span>
        </button>
      </div>

      <div className="px-5 py-3.5">
        <button
          onClick={() => onOpenBrowse("summerEdit")}
          className="group relative block w-full overflow-hidden rounded-2xl text-left"
        >
          <img
            src={hero}
            alt="Model wearing a lightweight vacation dress on a sunny boardwalk"
            className="h-36 w-full object-cover object-[center_30%] transition duration-700 group-hover:scale-[1.02]"
            width={832}
            height={576}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 flex max-w-[90%] flex-col items-start p-3.5 text-left text-white">
            <span className="mb-1.5 inline-block rounded-sm bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
              Summer edit
            </span>
            <h2 className="text-lg font-bold leading-tight tracking-tight">
              Pack light. Dress up nightly.
            </h2>
            <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold">
              Shop the edit <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </button>
      </div>

      <div className="border-t border-border/35 px-5 pt-3.5">
        <SectionHeader title="Quick filters" variant="standard" />
        <div className="-mx-5 mt-1.5 overflow-x-auto px-5 pb-1 scrollbar-none">
          <div className="flex w-max gap-2">
            {QUICK_FILTER_PRESETS.map((chip) => (
              <button
                key={chip.optionId}
                onClick={() => onOpenFilters(chip.category, chip.optionId)}
                className="h-8 shrink-0 rounded-full border border-border/70 bg-background px-3.5 text-xs font-medium text-foreground transition hover:border-foreground/20 hover:bg-secondary/80"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-5">
        <div className="px-5">
          <SectionHeader title="Shop by need" variant="lead" onAction={() => onOpenBrowse("hotDay")} />
        </div>
        <ShopTileRow align="stretch" gap="wide">
          {needs.map((n) => (
            <NeedShopTile
              key={n.label}
              label={n.label}
              Icon={n.Icon}
              onClick={() => onOpenBrowse(n.key)}
            />
          ))}
        </ShopTileRow>
      </section>

      <section className="mt-4">
        <div className="px-5">
          <SectionHeader title="Shop by category" variant="standard" onAction={() => onOpenBrowse("dresses")} />
        </div>
        <ShopTileRow compact>
          {categories.map((c) => (
            <CategoryShopTile
              key={c.label}
              label={c.label}
              img={c.img}
              onClick={() => onOpenBrowse(c.key)}
            />
          ))}
        </ShopTileRow>
      </section>

      <section className="mt-3 px-5">
        <SectionHeader title="Good finds under $25" variant="lead" onAction={() => onOpenBrowse("under25")} />
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} onClick={() => onProduct(p)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  variant = "standard",
  onAction,
}: {
  title: string;
  subtitle?: string;
  variant?: "lead" | "standard";
  onAction?: () => void;
}) {
  const titleClass =
    variant === "lead"
      ? "text-base font-bold tracking-tight text-foreground"
      : "text-sm font-semibold tracking-tight text-foreground";

  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h3 className={titleClass}>{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{subtitle}</p>}
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-foreground underline-offset-2 hover:underline"
        >
          See all <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function ProductCard({ p, onClick }: { p: Product; onClick: () => void }) {
  return (
    <div className="group relative text-left">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
        <button type="button" onClick={onClick} className="block h-full w-full text-left">
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </button>
        {p.tag && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
            {p.tag}
          </span>
        )}
        <button
          type="button"
          aria-label={`Save ${p.name}`}
          aria-pressed={false}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="absolute right-2.5 top-2.5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/92 shadow-sm ring-1 ring-border/40 transition active:scale-95"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <button onClick={onClick} className="mt-2.5 block w-full px-0.5 text-left">
        <p className="line-clamp-1 text-sm font-medium leading-tight">{p.name}</p>
        <div className="mt-1 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-foreground">${p.price.toFixed(2)}</span>
            {p.wasPrice && (
              <span className="text-[11px] text-muted-foreground line-through">
                ${p.wasPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-0.5 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-foreground text-foreground" /> {p.rating}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{p.cue}</p>
      </button>
    </div>
  );
}

function Browse({
  context,
  sort,
  activeFilterIds,
  onProduct,
  onOpenFilters,
  onRemoveFilter,
  onOpenSort,
  bottomPad,
}: {
  context: BrowseContext;
  sort: SortOption;
  activeFilterIds: string[];
  onProduct: (p: Product) => void;
  onOpenFilters: () => void;
  onRemoveFilter: (id: string) => void;
  onOpenSort: () => void;
  bottomPad: boolean;
}) {
  const [active, setActive] = useState(context.subfilters[0]);

  useEffect(() => {
    setActive(context.subfilters[0]);
  }, [context.title]);

  const sortedProducts = useMemo(
    () => sortProducts(context.products, sort),
    [context.products, sort],
  );
  const activeSortHint =
    sort === "relevance"
      ? context.sortHint
      : (SORT_OPTIONS.find((o) => o.id === sort)?.hint ?? context.sortHint);
  const count = sortedProducts.length;

  return (
    <div className={bottomPad ? "pb-4" : "pb-10"}>
      <div className="flex gap-2 overflow-x-auto px-5 pb-2 pt-3 scrollbar-none">
        {context.subfilters.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition ${
              active === c
                ? "bg-foreground text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {activeFilterIds.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-5 pb-2 pt-1 scrollbar-none">
          {activeFilterIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onRemoveFilter(id)}
              className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-foreground/20 bg-secondary px-3 text-xs font-semibold text-foreground"
            >
              {filterOptionLabel(id)}
              <X className="h-3 w-3 opacity-60" />
            </button>
          ))}
        </div>
      )}

      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-background/95 px-5 py-2.5 backdrop-blur-md">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {count} {context.resultNoun}
          </span>
          {" · "}
          {context.meta}
        </p>
        <div className="flex gap-1.5">
          <ControlBtn
            icon={<ArrowUpDown className="h-3.5 w-3.5" />}
            label={sortLabel(sort)}
            active={sort !== "relevance"}
            onClick={() => onOpenSort()}
          />
          <ControlBtn
            icon={<SlidersHorizontal className="h-3.5 w-3.5" />}
            label={activeFilterIds.length ? `Refine (${activeFilterIds.length})` : "Refine"}
            active={activeFilterIds.length > 0}
            onClick={onOpenFilters}
          />
        </div>
      </div>

      <p className="px-5 pt-3 text-xs text-muted-foreground">{activeSortHint}</p>

      {count === 0 ? (
        <div className="mx-5 mt-6 rounded-2xl border border-dashed border-border py-12 text-center">
          <p className="text-sm font-medium">No matches yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-3 px-5">
          {sortedProducts.map((p) => (
            <div key={p.id} className="relative">
              <ProductCard p={p} onClick={() => onProduct(p)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ControlBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-8 max-w-[9.5rem] items-center gap-1 truncate rounded-full px-3 text-xs font-semibold transition ${
        active ? "bg-foreground text-primary-foreground" : "bg-secondary hover:bg-muted"
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

function SortSheet({
  sort,
  onSelect,
  onClose,
}: {
  sort: SortOption;
  onSelect: (sort: SortOption) => void;
  onClose: () => void;
}) {
  return (
    <Sheet onClose={onClose} title="Sort by">
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        Choose how you'd like these results ordered.
      </p>
      <div className="space-y-2">
        {SORT_OPTIONS.map((option) => {
          const selected = sort === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                selected ? "border-foreground/40 bg-secondary" : "border-border hover:border-border/80"
              }`}
            >
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium">{option.label}</span>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{option.hint}</p>
              </div>
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  selected ? "border-foreground bg-foreground" : "border-border"
                }`}
              >
                {selected && <Check className="h-3 w-3 text-primary-foreground" />}
              </span>
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}

function FilterPage({
  category,
  pendingFilterIds,
  resultCount,
  bottomPad,
  onCategoryChange,
  onToggleFilter,
  onRemoveFilter,
  onClearAll,
  onApply,
}: {
  category: FilterCategoryId;
  pendingFilterIds: string[];
  resultCount: number;
  bottomPad: boolean;
  onCategoryChange: (category: FilterCategoryId) => void;
  onToggleFilter: (id: string) => void;
  onRemoveFilter: (id: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}) {
  const categoryOptions = FILTER_OPTIONS.filter((option) => option.category === category);
  const categoryCounts = FILTER_CATEGORIES.map((item) => ({
    ...item,
    count: pendingFilterIds.filter((id) =>
      FILTER_OPTIONS.find((option) => option.id === id)?.category === item.id,
    ).length,
  }));

  return (
    <div className={`flex min-h-full flex-col ${bottomPad ? "pb-4" : "pb-6"}`}>
      <div className="sticky top-0 z-20 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="flex gap-2 overflow-x-auto px-5 py-3 scrollbar-none">
          {categoryCounts.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onCategoryChange(item.id)}
                className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold transition ${
                  active
                    ? "bg-foreground text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
                {item.count > 0 && (
                  <span
                    className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                      active ? "bg-background text-foreground" : "bg-foreground text-primary-foreground"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {pendingFilterIds.length > 0 && (
        <div className="border-b border-border/40 px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-foreground">Selected</p>
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-foreground underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {pendingFilterIds.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onRemoveFilter(id)}
                className="inline-flex h-8 items-center gap-1 rounded-full border border-foreground/20 bg-secondary px-3 text-xs font-semibold text-foreground"
              >
                {filterOptionLabel(id)}
                <X className="h-3 w-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 px-5 pt-4">
        <p className="text-sm font-semibold text-foreground">
          {FILTER_CATEGORIES.find((item) => item.id === category)?.label}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Select all that apply. We'll match every filter you choose.</p>
        <div className="mt-3 space-y-2">
          {categoryOptions.map((option) => {
            const selected = pendingFilterIds.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onToggleFilter(option.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${
                  selected ? "border-foreground/40 bg-secondary" : "border-border hover:border-border/80"
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                    selected ? "border-foreground bg-foreground" : "border-border"
                  }`}
                >
                  {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`sticky z-20 border-t border-border/60 bg-background/95 px-5 pt-3 backdrop-blur-md ${
          bottomPad
            ? "bottom-16 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
            : "bottom-0 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
        }`}
      >
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClearAll}
            className="h-12 flex-1 rounded-full border border-border text-sm font-semibold text-foreground"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onApply}
            className="h-12 flex-[2] rounded-full bg-foreground text-sm font-semibold text-primary-foreground"
          >
            Show {resultCount} result{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({
  product,
  size,
  setSize,
  onAdd,
}: {
  product: Product;
  size: string;
  setSize: (s: string) => void;
  onAdd: () => void;
}) {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const images = getProductImages(product);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  const currentImage = images[activeImage] ?? images[0];

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1">
        <div className="relative bg-secondary">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              key={`${product.id}-${activeImage}`}
              src={currentImage.src}
              alt={currentImage.alt}
              className={`h-full w-full object-cover ${currentImage.position ?? "object-[center_20%]"}`}
              width={512}
              height={640}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
            <button
              type="button"
              aria-label={`Save ${product.name}`}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/92 shadow-sm ring-1 ring-border/40"
            >
              <Heart className="h-4 w-4" />
            </button>
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`View image ${index + 1} of ${images.length}`}
                    aria-current={index === activeImage}
                    onClick={() => setActiveImage(index)}
                    className={`rounded-full transition-all ${
                      index === activeImage
                        ? "h-1.5 w-5 bg-background"
                        : "h-1.5 w-1.5 bg-background/45 hover:bg-background/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-t border-border/40 px-4 py-2 scrollbar-none">
              {images.map((image, index) => (
                <button
                  key={`${product.id}-thumb-${index}`}
                  type="button"
                  aria-label={image.alt}
                  aria-current={index === activeImage}
                  onClick={() => setActiveImage(index)}
                  className={`h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-background ring-2 transition ${
                    index === activeImage ? "ring-foreground" : "ring-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt=""
                    className={`h-full w-full object-cover ${image.position ?? "object-[center_20%]"}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 pt-4 pb-4">
        {product.fabric && (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.fabric}
          </p>
        )}
        <h1 className={`${product.fabric ? "mt-1" : ""} text-xl font-bold tracking-tight`}>{product.name}</h1>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.wasPrice && (
            <span className="pb-0.5 text-sm text-muted-foreground line-through">
              ${product.wasPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Final price · discounts already applied</p>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold">
          <ShieldCheck className="h-3.5 w-3.5" />
          No coupon codes. What you see is what you pay.
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-medium">
            <Star className="h-3.5 w-3.5 fill-foreground" /> {product.rating}
          </span>
          <span className="text-muted-foreground">{product.reviews.toLocaleString()} reviews</span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Size</p>
            <button className="text-xs font-medium text-foreground underline-offset-2 hover:underline">
              Size guide & fit tips
            </button>
          </div>
          <div className="mt-2.5 flex gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-12 w-12 rounded-xl border text-sm font-semibold transition ${
                  size === s
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border bg-card hover:border-foreground/25"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {product.fitNote && (
            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{product.fitNote}</p>
          )}
        </div>

        <div className="mt-4 space-y-2.5 rounded-2xl border border-border bg-secondary/60 p-4">
          <div className="flex items-center gap-2.5 text-sm">
            <Truck className="h-4 w-4 shrink-0" />
            <span>
              <span className="font-medium">Arrives by Jul 18</span>
              <span className="text-muted-foreground"> · Standard shipping, tracked</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <RotateCcw className="h-4 w-4 shrink-0" />
            <span>
              <span className="font-medium">Free returns within 30 days</span>
              <span className="text-muted-foreground"> · Print label at home</span>
            </span>
          </div>
        </div>

        </div>
      </div>

      <div className="shrink-0 border-t border-border/60 bg-background px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
        <button
          onClick={onAdd}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-bold text-primary-foreground transition active:scale-[0.99]"
        >
          Add to bag · ${product.price.toFixed(2)}
        </button>
      </div>

      <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-2">
        <div className="rounded-2xl border border-border p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            What shoppers say
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            {product.reviewSummary ??
              "Shoppers say it feels light, fits close, and looks like the photos."}
          </p>
          <button className="mt-2 text-xs font-semibold text-foreground underline-offset-2 hover:underline">
            Read all reviews
          </button>
        </div>
      </div>
    </div>
  );
}

function BagItemRow({
  item,
  onRemove,
}: {
  item: { p: Product; size: string };
  onRemove?: () => void;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border p-3">
      <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
        <img src={item.p.img} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{item.p.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Size {item.size}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm font-bold">${item.p.price.toFixed(2)}</span>
          {onRemove ? (
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          ) : (
            <span className="text-xs text-muted-foreground">Qty 1</span>
          )}
        </div>
      </div>
    </div>
  );
}

function CartPopover({
  items,
  onClose,
  onRemoveItem,
  onCheckout,
}: {
  items: { p: Product; size: string }[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}) {
  const subtotal = items.reduce((sum, item) => sum + item.p.price, 0);
  const shipping = subtotal >= 25 ? 0 : 4.99;

  return (
    <div className="absolute right-0 top-[calc(100%+0.625rem)] z-50 w-[min(20rem,calc(100vw-2.5rem))] origin-top-right animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
      <div
        aria-hidden
        className="absolute -top-1.5 right-2.5 h-3 w-3 rotate-45 border-l border-t border-border bg-background"
      />
      <div className="max-h-[min(28rem,60dvh)] overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <h3 className="text-sm font-bold">Your bag</h3>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-1 hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[min(22rem,50dvh)] overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <div className="py-5 text-center">
              <ShoppingBag className="mx-auto h-9 w-9 text-muted-foreground/50" />
              <p className="mt-2.5 text-sm font-semibold">Your bag is empty</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add something you love—we'll keep it here.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-2.5 text-xs text-muted-foreground">
                {items.length} item{items.length !== 1 ? "s" : ""} · Final prices shown
              </p>
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <BagItemRow key={idx} item={item} onRemove={() => onRemoveItem(idx)} />
                ))}
              </div>

              <div className="mt-3 rounded-xl bg-secondary p-3 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <div className="mt-1.5">
                  <Row
                    label="Shipping"
                    value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    accent={shipping === 0}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-border/60 px-4 py-3">
          {items.length === 0 ? (
            <button
              onClick={onClose}
              className="h-10 w-full rounded-full bg-foreground text-sm font-semibold text-primary-foreground"
            >
              Start shopping
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="h-10 flex-1 rounded-full border border-border text-sm font-semibold"
              >
                Keep shopping
              </button>
              <button
                onClick={onCheckout}
                className="h-10 flex-[1.4] rounded-full bg-foreground text-sm font-semibold text-primary-foreground"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AddedSheet({
  product,
  size,
  bagSubtotal,
  onClose,
  onViewBag,
}: {
  product: Product;
  size: string;
  bagSubtotal: number;
  onClose: () => void;
  onViewBag: () => void;
}) {
  const freeShippingThreshold = 25;
  const away = Math.max(0, freeShippingThreshold - bagSubtotal);
  const progress = Math.min(100, (bagSubtotal / freeShippingThreshold) * 100);

  return (
    <Sheet onClose={onClose} title="Added to your bag">
      <div className="mt-1 flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
          <img src={product.img} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{product.name}</p>
          <p className="text-xs text-muted-foreground">
            Size {size} · ${product.price.toFixed(2)}
          </p>
        </div>
        <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
          <Check className="h-4 w-4" />
        </span>
      </div>

      {away > 0 ? (
        <div className="mt-3 rounded-2xl bg-secondary p-4">
          <p className="text-sm font-semibold">
            Add ${away.toFixed(2)} more for free shipping
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            You're almost there—most customers add a layer or accessory.
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-medium">
          <Truck className="h-4 w-4" />
          You've unlocked free shipping on this order.
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={onClose}
          className="h-12 flex-1 rounded-full border border-border text-sm font-semibold"
        >
          Keep shopping
        </button>
        <button
          onClick={onViewBag}
          className="h-12 flex-1 rounded-full bg-foreground text-sm font-semibold text-primary-foreground"
        >
          View bag
        </button>
      </div>

      <div className="mt-4">
        <p className="text-sm font-bold">Complete the look · under $20</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Pairs well with what you just added.</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { name: "Straw sun hat", price: 12.9, img: catShoes },
            { name: "Gold hoop set", price: 9.5, img: catAccessories },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-2.5 rounded-2xl bg-secondary p-2.5">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-background">
                <img src={a.img} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{a.name}</p>
                <p className="text-xs font-bold">${a.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

function Checkout({
  items,
  bottomPad,
  onRemoveItem,
}: {
  items: { p: Product; size: string }[];
  bottomPad: boolean;
  onRemoveItem: (index: number) => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.p.price, 0);
  const shipping = subtotal >= 25 ? 0 : 4.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  return (
    <div className={bottomPad ? "pb-4" : "pb-10"}>
      <CheckoutSteps step={1} />

      <div className="px-5 pt-2">
        <h2 className="text-sm font-bold">Bag summary</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {items.length === 0
            ? "Nothing in your bag yet"
            : `${items.length} item${items.length !== 1 ? "s" : ""} · Prices include all discounts`}
        </p>
        {items.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border py-10 text-center">
            <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm font-medium">Your bag is empty</p>
          </div>
        ) : (
          <div className="mt-3 space-y-2.5">
            {items.map((item, idx) => (
              <BagItemRow key={idx} item={item} onRemove={() => onRemoveItem(idx)} />
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="mt-4 px-5">
            <div className="space-y-2.5 rounded-2xl bg-secondary p-4 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row
                label="Shipping"
                value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                accent={shipping === 0}
              />
              <Row label="Estimated tax" value={`$${tax.toFixed(2)}`} />
              <div className="my-1 h-px bg-border" />
              <Row label="Order total" value={`$${total.toFixed(2)}`} bold />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Tax is an estimate. We'll confirm the final amount before you pay.
            </p>
          </div>

          <div className="mt-4 px-5">
            <h3 className="flex items-center gap-1.5 text-sm font-bold">
              <MapPin className="h-4 w-4" /> Delivery contact
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              We'll text tracking updates only—no marketing unless you opt in later.
            </p>
            <div className="mt-3 space-y-2.5">
              <Field
                label="Mobile number"
                placeholder="(555) 123-4567"
                help="Used for delivery updates and nothing else."
              />
            </div>
          </div>

          <div className="mt-4 px-5">
            <button className="h-14 w-full rounded-full bg-foreground text-sm font-bold text-primary-foreground transition active:scale-[0.99]">
              Continue to payment
            </button>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure checkout · 30-day free returns
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function CheckoutSteps({ step }: { step: number }) {
  const steps = ["Bag", "Details", "Payment"];
  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
      {steps.map((label, i) => {
        const active = i + 1 === step;
        const done = i + 1 < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                active || done
                  ? "bg-foreground text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            <span
              className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </span>
            {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground/50" />}
          </div>
        );
      })}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${bold ? "font-bold" : ""} ${accent ? "font-medium text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
      <span className={`${bold ? "text-base font-bold" : "font-semibold"}`}>{value}</span>
    </div>
  );
}

function Field({ label, placeholder, help }: { label: string; placeholder: string; help?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1.5 h-12 w-full rounded-xl border border-border bg-card px-4 text-sm transition focus:border-foreground focus:outline-none"
      />
      {help && <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">{help}</span>}
    </label>
  );
}

function Sheet({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end overflow-hidden">
      <button
        type="button"
        aria-label="Close sheet"
        className="absolute inset-0 animate-in fade-in bg-foreground/45"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="relative flex max-h-[72%] w-full min-h-0 flex-col overflow-hidden rounded-t-3xl bg-background shadow-[var(--shadow-sheet)] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 px-5 pb-3 pt-5">
          <div className="mb-1 flex items-center justify-center">
            <span className="h-1 w-10 rounded-full bg-border" />
          </div>
          <div className="flex items-center justify-between">
            <h3 id="sheet-title" className="text-base font-bold">
              {title}
            </h3>
            <button
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 rounded-full p-1.5 hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-7 [-webkit-overflow-scrolling:touch] [touch-action:pan-y]">
          {children}
        </div>
      </div>
    </div>
  );
}
