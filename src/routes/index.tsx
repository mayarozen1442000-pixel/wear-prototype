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
  Package,
  Ruler,
  Sun,
  Shirt,
  Sparkles,
  Luggage,
  Dumbbell,
  Activity,
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
import p3 from "@/assets/p3.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import prodTerracottaWrap from "@/assets/prod-terracotta-wrap.png";
import prodBlackSlip from "@/assets/prod-black-slip.png";
import prodGoldHoops from "@/assets/prod-gold-hoops.png";
import prodStrawHat from "@/assets/prod-straw-hat.png";
import prodWovenSandals from "@/assets/prod-woven-sandals.png";
import prodBlueFloralMaxi from "@/assets/prod-blue-floral-maxi.png";
import prodWhiteMidiDress from "@/assets/prod-white-midi-dress.png";
import prodSageRibbedDress from "@/assets/prod-sage-ribbed-dress.png";
import prodCreamOnepiece from "@/assets/prod-cream-onepiece.png";
import prodRedBikini from "@/assets/prod-red-bikini.png";
import prodBlackOnepiece from "@/assets/prod-black-onepiece.png";
import prodSageOnepiece from "@/assets/prod-sage-onepiece.png";
import prodBlueBikini from "@/assets/prod-blue-bikini.png";
import prodWhiteSneakers from "@/assets/prod-white-sneakers.png";
import prodTanBoots from "@/assets/prod-tan-boots.png";
import prodPennyLoafers from "@/assets/prod-penny-loafers.png";
import prodBalletFlats from "@/assets/prod-ballet-flats.png";
import prodBlackCrossbody from "@/assets/prod-black-crossbody.png";
import prodCelestialNecklace from "@/assets/prod-celestial-necklace.png";
import prodBlackTank from "@/assets/prod-black-tank.png";
import prodWhiteShirt from "@/assets/prod-white-shirt.png";
import prodRosePolo from "@/assets/prod-rose-polo.png";
import prodStripedCrop from "@/assets/prod-striped-crop.png";
import prodChampagneBlouse from "@/assets/prod-champagne-blouse.png";
import prodWhiteJeans from "@/assets/prod-white-jeans.png";
import prodBlackTrousers from "@/assets/prod-black-trousers.png";
import prodTanDrawstringPants from "@/assets/prod-tan-drawstring-pants.png";
import prodOliveCargo from "@/assets/prod-olive-cargo.png";
import prodBlueJeans from "@/assets/prod-blue-jeans.png";

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

type Screen =
  | "discover"
  | "browse"
  | "product"
  | "checkout"
  | "search"
  | "profile"
  | "filters"
  | "needs"
  | "categories"
  | "wishlist";
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

type ProductCategory = "dresses" | "shoes" | "accessories" | "tops" | "bottoms" | "swimwear";

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
  category: ProductCategory;
};

type ProductInput = Omit<Product, "category">;

function catalog(products: ProductInput[], category: ProductCategory): Product[] {
  return products.map((product) => ({ ...product, category }));
}

function getProductImage(product: Product): ProductImage {
  if (product.images?.[0]) return product.images[0];
  return { src: product.img, alt: `${product.name} — front view`, position: "object-[center_20%]" };
}

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"] as const;
const SHOE_SIZES = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"] as const;
const DEFAULT_APPAREL_SIZE = "M";
const DEFAULT_SHOE_SIZE = "8";

function sizesForProduct(product: Product): readonly string[] {
  return product.category === "shoes" ? SHOE_SIZES : APPAREL_SIZES;
}

function defaultSizeForProduct(product: Product): string {
  return product.category === "shoes" ? DEFAULT_SHOE_SIZE : DEFAULT_APPAREL_SIZE;
}

const PRODUCTS = catalog([
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
    name: "Terracotta wrap midi",
    price: 18.4,
    wasPrice: 26.99,
    img: prodTerracottaWrap,
    rating: 4.6,
    reviews: 1204,
    cue: "Best value under $20",
    tag: "Top rated",
    fabric: "Breathable linen-cotton",
    fitNote: "Wrap tie lets you adjust the waist. Runs true to size.",
    reviewSummary: "Color matches the photos. Ruffled hem adds movement without bulk.",
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
    id: "p5",
    name: "Black satin slip dress",
    price: 19.9,
    wasPrice: 27.99,
    img: prodBlackSlip,
    rating: 4.6,
    reviews: 978,
    cue: "Dressy, packs flat",
    tag: "Top rated",
    fabric: "Satin-touch polyester",
    fitNote: "Slim through the hips. Cowl neck sits best in size M.",
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
  {
    id: "p7",
    name: "Ocean stripe maxi",
    price: 26.5,
    wasPrice: 34.99,
    img: hero,
    rating: 4.5,
    reviews: 312,
    cue: "Vacation pick · Size M in stock",
    fabric: "Lightweight cotton blend",
    fitNote: "Relaxed through the hips with adjustable straps.",
    reviewSummary: "Beach photos look just like the listing—easy to dress up at night.",
  },
  {
    id: "p8",
    name: "Lemon smock mini",
    price: 21.0,
    wasPrice: 28.0,
    img: catDresses,
    rating: 4.4,
    reviews: 488,
    cue: "Arrives by Jul 20",
    fabric: "Soft cotton poplin",
    fitNote: "Smock bodice gives room through the chest.",
    reviewSummary: "Bright color without looking cheap—great for daytime plans.",
  },
  {
    id: "p9",
    name: "Blue floral smocked maxi",
    price: 27.9,
    wasPrice: 36.99,
    img: prodBlueFloralMaxi,
    rating: 4.7,
    reviews: 654,
    cue: "Most saved this week",
    tag: "Top rated",
    fabric: "Soft viscose",
    fitNote: "Smocked waist sits high. Tiered skirt has room through the hips.",
    reviewSummary: "Print looks like the photos and the puff sleeves feel romantic, not costume-y.",
  },
  {
    id: "p10",
    name: "White linen-look midi",
    price: 24.5,
    wasPrice: 32.0,
    img: prodWhiteMidiDress,
    rating: 4.5,
    reviews: 412,
    cue: "Arrives by Jul 19 · Size M in stock",
    fabric: "Lightweight cotton blend",
    fitNote: "Princess seams give shape without cling. Midi length on most heights.",
    reviewSummary: "Clean enough for weddings, easy enough for brunch. Straps stay put.",
  },
  {
    id: "p11",
    name: "Sage ribbed tank dress",
    price: 20.5,
    img: prodSageRibbedDress,
    rating: 4.4,
    reviews: 289,
    cue: "Easy throw-on · Ships today",
    fabric: "Stretch rib knit",
    fitNote: "Bodycon fit with stretch. Size up for a relaxed look.",
    reviewSummary: "Soft rib texture and a color that goes with everything in your bag.",
  },
], "dresses");

type BrowseContext = {
  title: string;
  resultNoun: string;
  meta: string;
  sortHint: string;
  subfilters: string[];
  products: Product[];
  shopCategory?: ShopCategory;
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

const SHOE_PRODUCTS = catalog([
  {
    id: "s3",
    name: "Woven strappy sandal",
    price: 16.4,
    img: prodWovenSandals,
    rating: 4.4,
    reviews: 291,
    cue: "Lightweight · Easy to pack",
  },
  {
    id: "s7",
    name: "Classic white sneakers",
    price: 23.5,
    wasPrice: 29.99,
    img: prodWhiteSneakers,
    rating: 4.6,
    reviews: 512,
    cue: "Everyday staple · Ships today",
    tag: "Top rated",
  },
  {
    id: "s8",
    name: "Suede block heel boot",
    price: 34.9,
    wasPrice: 44.99,
    img: prodTanBoots,
    rating: 4.7,
    reviews: 318,
    cue: "Office-to-weekend · Size 8 in stock",
    tag: "Top rated",
  },
  {
    id: "s9",
    name: "Leather penny loafer",
    price: 28.0,
    wasPrice: 36.0,
    img: prodPennyLoafers,
    rating: 4.5,
    reviews: 244,
    cue: "Polished slip-on · Arrives by Jul 18",
  },
  {
    id: "s10",
    name: "Bow detail ballet flat",
    price: 19.5,
    img: prodBalletFlats,
    rating: 4.6,
    reviews: 367,
    cue: "Soft lining · Best under $20",
    tag: "Top rated",
  },
], "shoes");

const ACCESSORY_PRODUCTS = catalog([
  {
    id: "a1",
    name: "Gold hoop set",
    price: 9.5,
    img: prodGoldHoops,
    rating: 4.8,
    reviews: 1102,
    cue: "Hypoallergenic · Top gift pick",
    tag: "Top rated",
  },
  {
    id: "a2",
    name: "Straw sun hat",
    price: 12.9,
    img: prodStrawHat,
    rating: 4.5,
    reviews: 534,
    cue: "Adjustable band · Packable",
  },
  {
    id: "a5",
    name: "Pearl hair claw",
    price: 8.5,
    img: catAccessories,
    rating: 4.7,
    reviews: 641,
    cue: "Secure hold · Lightweight",
    tag: "Top rated",
  },
  {
    id: "a8",
    name: "Black pebbled crossbody",
    price: 22.0,
    wasPrice: 29.99,
    img: prodBlackCrossbody,
    rating: 4.7,
    reviews: 356,
    cue: "Fits phone + wallet · Ships today",
    tag: "Top rated",
  },
  {
    id: "a9",
    name: "Celestial layered necklace",
    price: 11.5,
    img: prodCelestialNecklace,
    rating: 4.6,
    reviews: 428,
    cue: "Three layers · Tarnish-resistant",
    tag: "Top rated",
  },
], "accessories");

const TOP_PRODUCTS = catalog([
  {
    id: "t7",
    name: "Square neck tank",
    price: 11.5,
    img: prodBlackTank,
    rating: 4.5,
    reviews: 534,
    cue: "Layer-friendly · Size M in stock",
  },
  {
    id: "t8",
    name: "Oversized poplin shirt",
    price: 18.9,
    wasPrice: 24.99,
    img: prodWhiteShirt,
    rating: 4.6,
    reviews: 612,
    cue: "No-iron friendly · Ships today",
    tag: "Top rated",
    fabric: "Crisp cotton poplin",
    fitNote: "Relaxed fit with dropped shoulders. Size down for a closer fit.",
    reviewSummary: "Looks polished untucked or belted. Chest pocket sits flat.",
  },
  {
    id: "t9",
    name: "Ribbed knit polo",
    price: 16.5,
    img: prodRosePolo,
    rating: 4.5,
    reviews: 298,
    cue: "Soft stretch · Dusty rose",
    fabric: "Fine rib knit",
    fitNote: "Slim fit through the body. Buttons match the fabric.",
    reviewSummary: "Dressier than a tee but still easy to wash and wear.",
  },
  {
    id: "t10",
    name: "Striped ribbed crop top",
    price: 12.0,
    img: prodStripedCrop,
    rating: 4.4,
    reviews: 445,
    cue: "Best under $15 · Size M in stock",
    fabric: "Stretch rib knit",
    fitNote: "Cropped length hits above the waist on most heights.",
    reviewSummary: "Navy stripes look crisp and the ribbing keeps its shape.",
  },
  {
    id: "t11",
    name: "Champagne satin blouse",
    price: 21.0,
    wasPrice: 28.0,
    img: prodChampagneBlouse,
    rating: 4.7,
    reviews: 371,
    cue: "Office-to-evening · Top rated",
    tag: "Top rated",
    fabric: "Satin-touch polyester",
    fitNote: "Relaxed fit with gathered cuffs. Leave top button open for a soft V.",
    reviewSummary: "Subtle sheen reads expensive in photos and in person.",
  },
], "tops");

const BOTTOM_PRODUCTS = catalog([
  {
    id: "bo5",
    name: "White wide-leg jeans",
    price: 26.0,
    wasPrice: 34.99,
    img: prodWhiteJeans,
    rating: 4.5,
    reviews: 489,
    cue: "Summer staple · Size M in stock",
    fabric: "Rigid cotton denim",
    fitNote: "High rise with a wide leg. Size up if between sizes.",
    reviewSummary: "Bright white without looking see-through. Holds shape after washing.",
  },
  {
    id: "bo6",
    name: "Tailored wide-leg trouser",
    price: 29.5,
    wasPrice: 39.99,
    img: prodBlackTrousers,
    rating: 4.6,
    reviews: 322,
    cue: "Office-ready · Arrives by Jul 18",
    tag: "Top rated",
    fabric: "Structured twill blend",
    fitNote: "High rise with pressed creases. Hem hits at the ankle.",
    reviewSummary: "Looks tailored straight from the bag. Pair with flats or heels.",
  },
  {
    id: "bo7",
    name: "Linen drawstring pant",
    price: 23.0,
    img: prodTanDrawstringPants,
    rating: 4.5,
    reviews: 401,
    cue: "Travel-friendly · Easy care",
    fabric: "Lightweight linen blend",
    fitNote: "Elastic waist with side pockets. Relaxed wide leg.",
    reviewSummary: "Neutral tan goes with every top in your carry-on.",
  },
  {
    id: "bo8",
    name: "Wide-leg cargo pant",
    price: 27.5,
    wasPrice: 35.0,
    img: prodOliveCargo,
    rating: 4.4,
    reviews: 356,
    cue: "Utility pockets · Size M in stock",
    fabric: "Cotton twill",
    fitNote: "High rise with a roomy leg. Cargo flaps lay flat.",
    reviewSummary: "Olive green reads elevated, not overly military.",
  },
  {
    id: "bo9",
    name: "High-rise wide-leg jean",
    price: 28.0,
    wasPrice: 36.0,
    img: prodBlueJeans,
    rating: 4.6,
    reviews: 712,
    cue: "Most reviewed denim · Ships today",
    tag: "Top rated",
    fabric: "Non-stretch denim",
    fitNote: "High rise with a wide straight leg. Light whiskering at the hip.",
    reviewSummary: "Vintage wash and a leg line that balances sneakers and heels.",
  },
], "bottoms");

const SWIMWEAR_PRODUCTS = catalog([
  {
    id: "sw4",
    name: "Ruched plunge one-piece",
    price: 24.5,
    wasPrice: 32.0,
    img: prodCreamOnepiece,
    rating: 4.6,
    reviews: 418,
    cue: "Resort-ready · Free returns",
    fabric: "Matte swim jersey",
    fitNote: "Ruching across the waist is forgiving. Deep V sits secure on M.",
    reviewSummary: "Clean cream color and a neckline that looks good in vacation photos.",
  },
  {
    id: "sw5",
    name: "Ruched high-waist bikini",
    price: 22.0,
    img: prodRedBikini,
    rating: 4.5,
    reviews: 367,
    cue: "Mix-and-match fit · Under $25",
    fabric: "Stretch swim fabric",
    fitNote: "High-waist bottom with ruched front. Top runs true to size.",
    reviewSummary: "Red is bold but not orange—several reviews mention great pool-side photos.",
  },
  {
    id: "sw6",
    name: "Black ruched one-piece",
    price: 23.5,
    img: prodBlackOnepiece,
    rating: 4.6,
    reviews: 502,
    cue: "Slimming ruching · Size M in stock",
    tag: "Top rated",
    fabric: "Matte swim jersey",
    fitNote: "Plunge neckline with tummy ruching. High-cut leg.",
    reviewSummary: "Black stays opaque wet and the ruching feels secure when you move.",
  },
  {
    id: "sw7",
    name: "Sage ribbed one-piece",
    price: 25.0,
    wasPrice: 32.99,
    img: prodSageOnepiece,
    rating: 4.7,
    reviews: 289,
    cue: "Textured rib knit · Top rated",
    tag: "Top rated",
    fabric: "Ribbed swim knit",
    fitNote: "Square neck with waist ruching. Runs true to size.",
    reviewSummary: "Sage green is flattering and the rib texture feels more elevated than basic swim.",
  },
  {
    id: "sw8",
    name: "Blue floral bikini set",
    price: 20.5,
    img: prodBlueBikini,
    rating: 4.5,
    reviews: 441,
    cue: "Side-tie fit · Under $25",
    fabric: "Stretch swim fabric",
    fitNote: "Triangle top with center tie. Bottoms have adjustable side ties.",
    reviewSummary: "Toile print looks crisp in person and the tie details feel secure.",
  },
], "swimwear");

const ALL_CATALOG = [
  ...PRODUCTS,
  ...SHOE_PRODUCTS,
  ...ACCESSORY_PRODUCTS,
  ...TOP_PRODUCTS,
  ...BOTTOM_PRODUCTS,
  ...SWIMWEAR_PRODUCTS,
];

if (import.meta.env.DEV) {
  const imageOwners = new Map<string, string>();
  for (const product of ALL_CATALOG) {
    const existing = imageOwners.get(product.img);
    if (existing) {
      throw new Error(`Duplicate product image: ${product.id} shares img with ${existing}`);
    }
    imageOwners.set(product.img, product.id);
  }
}

const PRODUCT_BY_ID = Object.fromEntries(ALL_CATALOG.map((product) => [product.id, product])) as Record<
  string,
  Product
>;

function productById(id: string): Product {
  return PRODUCT_BY_ID[id];
}

const SHOP_CATEGORY_KEYS = ["dresses", "shoes", "accessories", "tops", "swimwear", "bottoms"] as const;
type ShopCategory = (typeof SHOP_CATEGORY_KEYS)[number];

const PRODUCTS_BY_CATEGORY = Object.fromEntries(
  SHOP_CATEGORY_KEYS.map((key) => [key, ALL_CATALOG.filter((product) => product.category === key)]),
) as Record<ShopCategory, Product[]>;

function isShopCategory(key: string): key is ShopCategory {
  return SHOP_CATEGORY_KEYS.includes(key as ShopCategory);
}

function productMatchesSubfilter(product: Product, subfilter: string): boolean {
  if (subfilter === "All") return true;

  const name = product.name.toLowerCase();
  const cue = product.cue.toLowerCase();

  switch (product.category) {
    case "dresses":
      if (subfilter === "Mini") return name.includes("mini");
      if (subfilter === "Midi") return name.includes("midi");
      if (subfilter === "Maxi") return name.includes("maxi");
      if (subfilter === "Beach") {
        return /vacation|beach|stripe|floral|pack|resort|linen|ocean/.test(`${name} ${cue}`);
      }
      if (subfilter === "Casual") return !name.includes("satin") && !name.includes("slip");
      return true;
    case "shoes":
      if (subfilter === "Sandals") {
        return /sandal|espadrille|fisherman|strappy|woven strappy|braided/.test(name);
      }
      if (subfilter === "Flats") return /flat|ballet|loafer|sneaker|penny/.test(name);
      if (subfilter === "Heels") return /wedge|heel|espadrille/.test(name);
      if (subfilter === "Slides") return /slide/.test(name);
      if (subfilter === "Boots") return /boot/.test(name);
      return true;
    case "bottoms":
      if (subfilter === "Pants") {
        return /pant|jean|trouser|cargo|drawstring|wide-leg jean|wide-leg pant|tailored/.test(name);
      }
      if (subfilter === "Shorts") return /short|bike/.test(name);
      if (subfilter === "Skirts") return /skirt/.test(name);
      return true;
    case "swimwear":
      if (subfilter === "One-piece") return /one-piece|swimsuit/.test(name) && !name.includes("bikini");
      if (subfilter === "Bikini") return name.includes("bikini");
      if (subfilter === "Cover-ups") return name.includes("cover-up") || name.includes("cover up");
      return true;
    case "accessories":
      if (subfilter === "Jewelry") return /hoop|necklace|chain|celestial/.test(name);
      if (subfilter === "Hats") return name.includes("hat");
      if (subfilter === "Hair") return /claw|hair/.test(name);
      if (subfilter === "Bags") return /bag|tote|bucket|crossbody/.test(name);
      return true;
    case "tops":
      if (subfilter === "Tank") return name.includes("tank");
      if (subfilter === "Blouse") return /blouse|off-shoulder|shirt/.test(name);
      if (subfilter === "Knit") return /knit|ribbed|polo|tee|jersey|mesh|crop/.test(name);
      if (subfilter === "Linen") return name.includes("linen");
      return true;
    default:
      return true;
  }
}

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

const SHOP_CATEGORY_META: Record<ShopCategory, { resultNoun: string; subfilters: string[] }> = {
  dresses: { resultNoun: "dresses", subfilters: ["All", "Mini", "Midi", "Maxi", "Beach", "Casual"] },
  shoes: { resultNoun: "shoes", subfilters: ["All", "Sandals", "Flats", "Heels", "Slides", "Boots"] },
  bottoms: { resultNoun: "bottoms", subfilters: ["All", "Pants", "Shorts", "Skirts"] },
  swimwear: { resultNoun: "items", subfilters: ["All", "One-piece", "Bikini", "Cover-ups"] },
  accessories: { resultNoun: "accessories", subfilters: ["All", "Jewelry", "Hats", "Hair", "Bags"] },
  tops: { resultNoun: "tops", subfilters: ["All", "Tank", "Blouse", "Knit", "Linen"] },
};

function applyProductFilters(products: Product[], filterIds: string[]): Product[] {
  if (filterIds.length === 0) return products;
  const options = FILTER_OPTIONS.filter((option) => filterIds.includes(option.id));
  return products.filter((product) => options.every((option) => option.match(product)));
}

function buildFilteredBrowseContext(
  filterIds: string[],
  scopeProducts: Product[] = ALL_CATALOG,
  shopCategory?: ShopCategory,
): BrowseContext {
  const products = applyProductFilters(scopeProducts, filterIds);
  const labels = FILTER_OPTIONS.filter((option) => filterIds.includes(option.id)).map(
    (option) => option.label,
  );
  const categoryMeta = shopCategory ? SHOP_CATEGORY_META[shopCategory] : null;

  return {
    title: labels.length === 1 ? labels[0] : "Filtered results",
    products,
    resultNoun: categoryMeta?.resultNoun ?? "items",
    meta: `${filterIds.length} active filter${filterIds.length === 1 ? "" : "s"} · Final prices`,
    sortHint: "Showing styles that match everything you selected.",
    subfilters: categoryMeta?.subfilters ?? ["All", "Dresses", "Tops", "Shoes", "Accessories"],
    shopCategory,
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
  subfilters = SHOP_CATEGORY_META.dresses.subfilters,
  shopCategory?: ShopCategory,
): BrowseContext {
  const scopedProducts = shopCategory ? PRODUCTS_BY_CATEGORY[shopCategory] : products;
  const categoryMeta = shopCategory ? SHOP_CATEGORY_META[shopCategory] : null;

  return {
    title,
    products: scopedProducts,
    resultNoun: categoryMeta?.resultNoun ?? resultNoun,
    meta,
    sortHint,
    subfilters: categoryMeta?.subfilters ?? subfilters,
    shopCategory,
  };
}

const BROWSE: Record<string, BrowseContext> = {
  summerEdit: makeBrowseContext(
    "Summer edit",
    PRODUCTS.filter((p) => p.price <= 35),
    "dresses",
    "Under $35 · Size M · Final prices",
    "Curated vacation picks—lightweight styles with delivery dates upfront.",
  ),
  dresses: makeBrowseContext(
    "Dresses",
    PRODUCTS_BY_CATEGORY.dresses,
    "dresses",
    "Size M · Final prices",
    "Sorted by relevance. Every price includes active discounts—no codes to hunt.",
    undefined,
    "dresses",
  ),
  shoes: makeBrowseContext(
    "Shoes",
    PRODUCTS_BY_CATEGORY.shoes,
    "shoes",
    "Size 8 · Final prices",
    "Sorted by popularity. Every price includes active discounts.",
    undefined,
    "shoes",
  ),
  bottoms: makeBrowseContext(
    "Bottoms",
    PRODUCTS_BY_CATEGORY.bottoms,
    "bottoms",
    "Size M · Final prices",
    "Pants, shorts, and skirts with fit notes upfront.",
    undefined,
    "bottoms",
  ),
  swimwear: makeBrowseContext(
    "Swimwear",
    PRODUCTS_BY_CATEGORY.swimwear,
    "items",
    "Size M · Final prices",
    "Swimsuits and cover-ups for pool days and getaways.",
    undefined,
    "swimwear",
  ),
  accessories: makeBrowseContext(
    "Accessories",
    PRODUCTS_BY_CATEGORY.accessories,
    "accessories",
    "Final prices",
    "Small add-ons that complete the look—most under $20.",
    undefined,
    "accessories",
  ),
  tops: makeBrowseContext(
    "Tops",
    PRODUCTS_BY_CATEGORY.tops,
    "tops",
    "Size M · Final prices",
    "Layer-friendly pieces for heat, travel, and nights out.",
    undefined,
    "tops",
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
    "Trending",
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
    [
      productById("p2"),
      productById("p3"),
      productById("sw4"),
      productById("p6"),
      productById("t7"),
      productById("t8"),
      productById("a2"),
      productById("s3"),
    ],
    "items",
    "Light fabrics · Final prices",
    "Breathable picks for heat—linen, viscose, and open knits.",
    ["All", "Dresses", "Tops", "Cover-ups"],
  ),
  noIron: makeBrowseContext(
    "No-iron",
    [
      productById("p2"),
      productById("p5"),
      productById("p7"),
      productById("t8"),
      productById("t11"),
      productById("sw6"),
    ],
    "items",
    "Easy-care fabrics · Final prices",
    "Wrinkle-resistant styles that look polished straight from the bag.",
    ["All", "Linen", "Knit", "Cotton"],
  ),
  dinnerPlans: makeBrowseContext(
    "Night out",
    [
      productById("p5"),
      productById("p6"),
      productById("p1"),
      productById("t11"),
      productById("s9"),
      productById("a1"),
    ],
    "items",
    "Dressy but comfy · Final prices",
    "Elevated looks that still feel easy to wear all evening.",
    ["All", "Midi", "Slip", "Shirt dress"],
  ),
  packLight: makeBrowseContext(
    "Pack light",
    [
      productById("sw4"),
      productById("p5"),
      productById("p2"),
      productById("p7"),
      productById("s3"),
      productById("s10"),
      productById("a2"),
      productById("sw6"),
    ],
    "items",
    "Wrinkle-friendly · Final prices",
    "Pieces that pack flat and still look great on arrival.",
    ["All", "Dresses", "Shoes", "Layers"],
  ),
  sporty: makeBrowseContext(
    "Sporty",
    [
      productById("sw4"),
      productById("t7"),
      productById("t9"),
      productById("t10"),
      productById("s10"),
      productById("s3"),
      productById("s7"),
    ],
    "items",
    "Move-ready · Final prices",
    "Stretchy, easy layers and flats built for long days out.",
    ["All", "Active", "Knit", "Sandals"],
  ),
  gym: makeBrowseContext(
    "Gym",
    [
      productById("t7"),
      productById("t9"),
      productById("t10"),
      productById("t11"),
      productById("sw6"),
      productById("s7"),
      productById("s10"),
      productById("s3"),
    ],
    "items",
    "Move-ready · Final prices",
    "Stretch-friendly tops, layers, and flats built for workouts and warm-ups.",
    ["All", "Tops", "Active", "Layers", "Sandals"],
  ),
  linenMini: makeBrowseContext("Linen mini dress", [productById("p2")], "dress", "1 result · Final price"),
  vacationCoverUp: makeBrowseContext("Vacation cover-up", [productById("sw4")], "item", "1 result · Final price"),
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

const SHOP_BY_NEED_ITEMS: { label: string; key: keyof typeof BROWSE; Icon: typeof Sun }[] = [
  { label: "Hot day", key: "hotDay", Icon: Sun },
  { label: "Gym", key: "gym", Icon: Dumbbell },
  { label: "No-iron", key: "noIron", Icon: Shirt },
  { label: "Night out", key: "dinnerPlans", Icon: Sparkles },
  { label: "Pack light", key: "packLight", Icon: Luggage },
  { label: "Sporty", key: "sporty", Icon: Activity },
];

const SHOP_BY_CATEGORY_ITEMS: { label: string; key: keyof typeof BROWSE; img: string }[] = [
  { label: "Tops", key: "tops", img: p6 },
  { label: "Bottoms", key: "bottoms", img: p3 },
  { label: "Dresses", key: "dresses", img: catDresses },
  { label: "Shoes", key: "shoes", img: catShoes },
  { label: "Swimwear", key: "swimwear", img: hero },
  { label: "Accessories", key: "accessories", img: catAccessories },
];

function Prototype() {
  const [screen, setScreen] = useState<Screen>("discover");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [activeProduct, setActiveProduct] = useState<Product>(productById("p2"));
  const [bagItems, setBagItems] = useState<{ p: Product; size: string }[]>([]);
  const [showAdded, setShowAdded] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [size, setSize] = useState("M");
  const [browseContext, setBrowseContext] = useState<BrowseContext>(DEFAULT_BROWSE);
  const [activeBrowseKey, setActiveBrowseKey] = useState<keyof typeof BROWSE>("dresses");
  const [browseSort, setBrowseSort] = useState<SortOption>("relevance");
  const [showSort, setShowSort] = useState(false);
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [pendingFilterIds, setPendingFilterIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<FilterCategoryId>("price");
  const [filterReturn, setFilterReturn] = useState<{ screen: Screen; tab: Tab } | null>(null);
  const [productReturn, setProductReturn] = useState<{ screen: Screen; tab: Tab } | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const mainRef = useRef<HTMLElement>(null);

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId],
    );
  };

  const wishlistProducts = useMemo(
    () => ALL_CATALOG.filter((product) => wishlistIds.includes(product.id)),
    [wishlistIds],
  );

  const openWishlist = () => {
    setScreen("wishlist");
  };

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
    setProductReturn({ screen, tab: activeTab });
    setActiveProduct(p);
    setSize(defaultSizeForProduct(p));
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

  const getFilterScopeProducts = () =>
    isShopCategory(activeBrowseKey) ? PRODUCTS_BY_CATEGORY[activeBrowseKey] : ALL_CATALOG;

  const restoreBrowseContext = () => {
    if (isShopCategory(activeBrowseKey)) {
      setBrowseContext(BROWSE[activeBrowseKey]);
      return;
    }
    setBrowseContext(BROWSE.trending);
  };

  const goToTab = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "trending") {
      setActiveFilterIds([]);
      setActiveBrowseKey("trending");
      setBrowseContext(BROWSE.trending);
    }
    setScreen(TAB_TO_SCREEN[tab]);
  };

  const openBrowse = (key: keyof typeof BROWSE) => {
    setActiveBrowseKey(key);
    setActiveFilterIds([]);
    setBrowseContext(BROWSE[key]);
    setBrowseSort("relevance");
    setShowSort(false);
    setActiveTab("trending");
    setScreen("browse");
  };

  const openNeedsIndex = () => {
    setActiveTab("home");
    setScreen("needs");
  };

  const openCategoriesIndex = () => {
    setActiveTab("home");
    setScreen("categories");
  };

  const openFilters = (category: FilterCategoryId, preselectOptionId?: string) => {
    setFilterReturn({ screen, tab: activeTab });
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
      restoreBrowseContext();
    } else {
      setBrowseContext(buildFilteredBrowseContext(pendingFilterIds, getFilterScopeProducts(), isShopCategory(activeBrowseKey) ? activeBrowseKey : undefined));
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
      restoreBrowseContext();
      return;
    }
    setBrowseContext(buildFilteredBrowseContext(filterIds, getFilterScopeProducts(), isShopCategory(activeBrowseKey) ? activeBrowseKey : undefined));
  };

  const goBack = () => {
    if (screen === "product" && productReturn) {
      setScreen(productReturn.screen);
      setActiveTab(productReturn.tab);
      setProductReturn(null);
      return;
    }
    if (screen === "product") {
      setScreen("browse");
      setActiveTab("trending");
      return;
    }
    if (screen === "wishlist") {
      setScreen("profile");
      setActiveTab("profile");
      return;
    }
    if (screen === "filters" && filterReturn) {
      setScreen(filterReturn.screen);
      setActiveTab(filterReturn.tab);
      setFilterReturn(null);
      return;
    }
    goToTab("home");
  };

  const bagSubtotal = bagItems.reduce((sum, item) => sum + item.p.price, 0);
  const showBottomNav = screen !== "product";
  const overlayOpen = showSort || showAdded;
  const pendingResultCount = applyProductFilters(getFilterScopeProducts(), pendingFilterIds).length;

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
          onBack={goBack}
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
              onOpenNeedsIndex={openNeedsIndex}
              onOpenCategoriesIndex={openCategoriesIndex}
              onOpenSearch={() => goToTab("search")}
              onProduct={goProduct}
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
              bottomPad={showBottomNav}
            />
          )}
          {screen === "needs" && (
            <NeedsIndexView bottomPad={showBottomNav} onOpenBrowse={openBrowse} />
          )}
          {screen === "categories" && (
            <CategoriesIndexView bottomPad={showBottomNav} onOpenBrowse={openBrowse} />
          )}
          {screen === "browse" && (
            <Browse
              context={browseContext}
              sort={browseSort}
              activeFilterIds={activeFilterIds}
              onProduct={goProduct}
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
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
            <ProductDetail
              product={activeProduct}
              size={size}
              setSize={setSize}
              saved={isWishlisted(activeProduct.id)}
              onToggleSave={() => toggleWishlist(activeProduct.id)}
              onAdd={addToBag}
            />
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
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
            />
          )}
          {screen === "profile" && (
            <ProfileView
              bottomPad={showBottomNav}
              wishlistCount={wishlistIds.length}
              onOpenWishlist={openWishlist}
            />
          )}
          {screen === "wishlist" && (
            <WishlistView
              products={wishlistProducts}
              bottomPad={showBottomNav}
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
              onProduct={goProduct}
            />
          )}
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
  const showBack = screen !== "discover";
  const titles: Record<Screen, string> = {
    discover: "",
    browse: browseTitle,
    product: "",
    checkout: "Your bag",
    search: "Search",
    profile: "Profile",
    filters: "Filters",
    needs: "Shop by need",
    categories: "Shop by category",
    wishlist: "Wishlist",
  };

  const pageTitle = titles[screen];

  return (
    <div className="relative z-50 shrink-0 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="relative flex h-14 items-center justify-between px-5">
        <div className="z-10 flex min-w-9 items-center justify-start">
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
        </div>

        {pageTitle && (
          <h1 className="pointer-events-none absolute inset-x-0 truncate px-16 text-center text-base font-semibold">
            {pageTitle}
          </h1>
        )}

        <div className="relative z-10 flex min-w-9 items-center justify-end gap-0.5">
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
  isWishlisted,
  onToggleWishlist,
}: {
  active: boolean;
  bottomPad: boolean;
  onOpenBrowse: (key: keyof typeof BROWSE) => void;
  onProduct: (p: Product) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const justForYou = [productById("p2"), productById("p5"), productById("p1"), ACCESSORY_PRODUCTS[0]];
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
        <SectionHeader title="Just for you" onAction={() => onOpenBrowse("trending")} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {justForYou.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              saved={isWishlisted(p.id)}
              onToggleSave={() => onToggleWishlist(p.id)}
              onClick={() => onProduct(p)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfileView({
  bottomPad,
  wishlistCount,
  onOpenWishlist,
}: {
  bottomPad: boolean;
  wishlistCount: number;
  onOpenWishlist: () => void;
}) {
  const links = [
    {
      label: "Orders & tracking",
      detail: "See delivery updates in one place",
      Icon: Package,
    },
    {
      label: "Saved items",
      detail:
        wishlistCount === 0
          ? "Save pieces you love with the heart icon"
          : `${wishlistCount} piece${wishlistCount === 1 ? "" : "s"} waiting for you`,
      Icon: Heart,
      onClick: onOpenWishlist,
    },
    { label: "Size profile", detail: "M · Updated from recent orders", Icon: Ruler },
    { label: "Returns & help", detail: "Free returns within 30 days", Icon: RotateCcw },
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
            type="button"
            onClick={link.onClick}
            className="flex w-full items-center gap-3 rounded-2xl border border-border px-4 py-3.5 text-left hover:bg-secondary/60"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
              <link.Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
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

function WishlistView({
  products,
  bottomPad,
  isWishlisted,
  onToggleWishlist,
  onProduct,
}: {
  products: Product[];
  bottomPad: boolean;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (id: string) => void;
  onProduct: (p: Product) => void;
}) {
  return (
    <div className={`px-5 pt-4 ${bottomPad ? "pb-6" : "pb-10"}`}>
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-14 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-semibold">Nothing saved yet</p>
          <p className="mt-1 px-6 text-xs leading-relaxed text-muted-foreground">
            Tap the heart on any product to save it here for later.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {products.length} saved item{products.length === 1 ? "" : "s"}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                saved={isWishlisted(p.id)}
                onToggleSave={() => onToggleWishlist(p.id)}
                onClick={() => onProduct(p)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ShopTileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 px-5 pb-2">
      <div className="grid grid-cols-6 justify-items-center gap-x-0.5">{children}</div>
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
    <button onClick={onClick} className="group flex w-full min-w-0 flex-col items-center">
      <div className="mx-auto flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-border/60 bg-card transition duration-200 group-hover:border-foreground/20 group-hover:bg-secondary/40 group-active:border-foreground/30 group-active:bg-secondary/70">
        <Icon
          className="h-4 w-4 shrink-0 text-foreground/75 transition duration-200 group-hover:text-foreground"
          strokeWidth={1.5}
        />
      </div>
      <p className="mt-1.5 w-full text-center text-[11px] font-medium leading-none text-muted-foreground whitespace-nowrap transition-colors group-hover:text-foreground">
        {label}
      </p>
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
    <button onClick={onClick} className="group flex w-full min-w-0 flex-col items-center">
      <div className="mx-auto h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full bg-secondary ring-1 ring-border/60 transition duration-200 group-hover:ring-foreground/30">
        <img src={img} alt={label} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <p className="mt-1.5 w-full text-center text-[11px] font-medium leading-none text-muted-foreground whitespace-nowrap transition-colors group-hover:text-foreground">
        {label}
      </p>
    </button>
  );
}

function Discover({
  onOpenBrowse,
  onOpenFilters,
  onOpenNeedsIndex,
  onOpenCategoriesIndex,
  onOpenSearch,
  onProduct,
  isWishlisted,
  onToggleWishlist,
  bottomPad,
}: {
  onOpenBrowse: (key: keyof typeof BROWSE) => void;
  onOpenFilters: (category: FilterCategoryId, preselectOptionId?: string) => void;
  onOpenNeedsIndex: () => void;
  onOpenCategoriesIndex: () => void;
  onOpenSearch: () => void;
  onProduct: (p: Product) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (id: string) => void;
  bottomPad: boolean;
}) {
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
        <SectionHeader title="Quick filters" />
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
          <SectionHeader title="Shop by need" onAction={onOpenNeedsIndex} />
        </div>
        <ShopTileGrid>
          {SHOP_BY_NEED_ITEMS.map((n) => (
            <NeedShopTile
              key={n.label}
              label={n.label}
              Icon={n.Icon}
              onClick={() => onOpenBrowse(n.key)}
            />
          ))}
        </ShopTileGrid>
      </section>

      <section className="mt-4">
        <div className="px-5">
          <SectionHeader title="Shop by category" onAction={onOpenCategoriesIndex} />
        </div>
        <ShopTileGrid>
          {SHOP_BY_CATEGORY_ITEMS.map((c) => (
            <CategoryShopTile
              key={c.label}
              label={c.label}
              img={c.img}
              onClick={() => onOpenBrowse(c.key)}
            />
          ))}
        </ShopTileGrid>
      </section>

      <section className="mt-3 px-5">
        <SectionHeader title="Recommended for you" onAction={() => onOpenBrowse("under25")} />
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              saved={isWishlisted(p.id)}
              onToggleSave={() => onToggleWishlist(p.id)}
              onClick={() => onProduct(p)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function NeedsIndexView({
  bottomPad,
  onOpenBrowse,
}: {
  bottomPad: boolean;
  onOpenBrowse: (key: keyof typeof BROWSE) => void;
}) {
  return (
    <div className={`px-5 pt-4 ${bottomPad ? "pb-6" : "pb-10"}`}>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Shop by what you're doing—not just what category it's in.
      </p>
      <div className="mt-6 grid grid-cols-3 justify-items-center gap-x-3 gap-y-6">
        {SHOP_BY_NEED_ITEMS.map((item) => (
          <NeedShopTile
            key={item.key}
            label={item.label}
            Icon={item.Icon}
            onClick={() => onOpenBrowse(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoriesIndexView({
  bottomPad,
  onOpenBrowse,
}: {
  bottomPad: boolean;
  onOpenBrowse: (key: keyof typeof BROWSE) => void;
}) {
  return (
    <div className={`px-5 pt-4 ${bottomPad ? "pb-6" : "pb-10"}`}>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Browse every category in one place.
      </p>
      <div className="mt-6 grid grid-cols-3 justify-items-center gap-x-3 gap-y-6">
        {SHOP_BY_CATEGORY_ITEMS.map((item) => (
          <CategoryShopTile
            key={item.key}
            label={item.label}
            img={item.img}
            onClick={() => onOpenBrowse(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  onAction,
}: {
  title: string;
  subtitle?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{subtitle}</p>}
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-foreground underline-offset-2 hover:underline"
        >
          See all <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function ProductCard({
  p,
  onClick,
  saved = false,
  onToggleSave,
}: {
  p: Product;
  onClick: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
}) {
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
          aria-label={saved ? `Remove ${p.name} from saved` : `Save ${p.name}`}
          aria-pressed={saved}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onToggleSave?.();
          }}
          className="absolute right-2.5 top-2.5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/92 shadow-sm ring-1 ring-border/40 transition active:scale-95"
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-foreground" : ""}`} />
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
  isWishlisted,
  onToggleWishlist,
  onOpenFilters,
  onRemoveFilter,
  onOpenSort,
  bottomPad,
}: {
  context: BrowseContext;
  sort: SortOption;
  activeFilterIds: string[];
  onProduct: (p: Product) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (id: string) => void;
  onOpenFilters: () => void;
  onRemoveFilter: (id: string) => void;
  onOpenSort: () => void;
  bottomPad: boolean;
}) {
  const [active, setActive] = useState(context.subfilters[0]);

  useEffect(() => {
    setActive(context.subfilters[0]);
  }, [context.title]);

  const sortedProducts = useMemo(() => {
    let items = context.shopCategory
      ? context.products.filter((product) => product.category === context.shopCategory)
      : context.products;
    if (active !== "All") {
      items = items.filter((product) => productMatchesSubfilter(product, active));
    }
    if (activeFilterIds.length > 0) {
      items = applyProductFilters(items, activeFilterIds);
    }
    return sortProducts(items, sort);
  }, [context.products, context.shopCategory, active, activeFilterIds, sort]);
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
              <ProductCard
                p={p}
                saved={isWishlisted(p.id)}
                onToggleSave={() => onToggleWishlist(p.id)}
                onClick={() => onProduct(p)}
              />
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
  saved,
  onToggleSave,
  onAdd,
}: {
  product: Product;
  size: string;
  setSize: (s: string) => void;
  saved: boolean;
  onToggleSave: () => void;
  onAdd: () => void;
}) {
  const sizes = sizesForProduct(product);
  const image = getProductImage(product);

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1">
        <div className="relative bg-secondary">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className={`h-full w-full object-cover ${image.position ?? "object-[center_20%]"}`}
              width={512}
              height={640}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
            <button
              type="button"
              aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
              aria-pressed={saved}
              onClick={onToggleSave}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/92 shadow-sm ring-1 ring-border/40"
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-foreground" : ""}`} />
            </button>
          </div>
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
          {product.category === "shoes" ? (
            <div className="-mx-5 mt-2.5 overflow-x-auto px-5 pb-1 scrollbar-none">
              <div className="flex w-max gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-12 min-w-12 rounded-xl border px-2.5 text-sm font-semibold transition ${
                      size === s
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-border bg-card hover:border-foreground/25"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
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
          )}
          {product.fitNote && (
            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{product.fitNote}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-bold text-primary-foreground transition active:scale-[0.99]"
        >
          Add to bag · ${product.price.toFixed(2)}
        </button>

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

      <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-4">
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
            { name: "Straw sun hat", price: 12.9, img: prodStrawHat },
            { name: "Gold hoop set", price: 9.5, img: prodGoldHoops },
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
