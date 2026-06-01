import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  Briefcase,
  Sparkles,
  Zap,
  ShieldCheck,
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

type Screen = "discover" | "browse" | "product" | "checkout";

type Product = {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  img: string;
  rating: number;
  reviews: number;
  cue: string;
  tag?: string;
  fabric?: string;
  fitNote?: string;
  reviewSummary?: string;
};

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
    tag: "Editor pick",
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

function Prototype() {
  const [screen, setScreen] = useState<Screen>("discover");
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[1]);
  const [bagCount, setBagCount] = useState(0);
  const [bagItems, setBagItems] = useState<{ p: Product; size: string }[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [size, setSize] = useState("M");
  const [showCaseStudy, setShowCaseStudy] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const goProduct = (p: Product) => {
    setActiveProduct(p);
    setSize("M");
    setScreen("product");
  };

  const addToBag = () => {
    setBagItems((b) => [...b, { p: activeProduct, size }]);
    setBagCount((c) => c + 1);
    setShowAdded(true);
  };

  const bagSubtotal = bagItems.reduce((sum, item) => sum + item.p.price, 0);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center px-4 py-4 md:py-8">
      {showCaseStudy && (
        <CaseStudyBanner onDismiss={() => setShowCaseStudy(false)} />
      )}

      <div className="w-full max-w-[430px] min-h-[min(100dvh,860px)] bg-background relative overflow-hidden rounded-[2rem] border border-border/80 shadow-[var(--shadow-soft)]">
        <TopBar
          screen={screen}
          bagCount={bagCount}
          onBack={() =>
            setScreen(
              screen === "product" ? "browse" : screen === "browse" ? "discover" : "discover",
            )
          }
          onBag={() => bagCount > 0 && setScreen("checkout")}
        />

        {screen === "discover" && (
          <Discover onCategory={() => setScreen("browse")} onProduct={goProduct} />
        )}
        {screen === "browse" && (
          <Browse onProduct={goProduct} onOpenFilters={() => setShowFilters(true)} />
        )}
        {screen === "product" && (
          <ProductDetail product={activeProduct} size={size} setSize={setSize} onAdd={addToBag} />
        )}
        {screen === "checkout" && <Checkout items={bagItems} />}

        {showFilters && <FilterSheet onClose={() => setShowFilters(false)} />}
        {showAdded && (
          <AddedSheet
            product={activeProduct}
            size={size}
            bagSubtotal={bagSubtotal}
            onClose={() => setShowAdded(false)}
            onViewBag={() => {
              setShowAdded(false);
              setScreen("checkout");
            }}
          />
        )}
      </div>

      <p className="mt-4 max-w-md text-center text-xs text-muted-foreground leading-relaxed">
        Portfolio prototype · Tap through Discover → Browse → Product → Checkout to see the UX writing
        system in context.
      </p>
    </div>
  );
}

function CaseStudyBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="mb-3 w-full max-w-2xl rounded-2xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
            UX writing case study
          </p>
          <h1 className="mt-1 text-base font-semibold tracking-tight text-foreground">
            WEAR. — a calmer take on fast-fashion mobile shopping
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            This concept redesign replaces coupon chaos and vague product pages with clear pricing,
            honest fit notes, and filters written in plain language.
          </p>
        </div>
        <button
          onClick={onDismiss}
          aria-label="Dismiss case study intro"
          className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TopBar({
  screen,
  bagCount,
  onBack,
  onBag,
}: {
  screen: Screen;
  bagCount: number;
  onBack: () => void;
  onBag: () => void;
}) {
  const showBack = screen !== "discover";
  const titles: Record<Screen, string> = {
    discover: "",
    browse: "Dresses",
    product: "",
    checkout: "Your bag",
  };

  return (
    <div className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur-md">
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
            <span className="text-2xl font-bold tracking-tight text-foreground">
              WEAR<span className="text-foreground">.</span>
            </span>
          )}
          {titles[screen] && (
            <h1 className="truncate text-base font-semibold">{titles[screen]}</h1>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          {screen === "discover" && (
            <button aria-label="Search" className="rounded-full p-2 hover:bg-secondary transition-colors">
              <Search className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={onBag}
            aria-label={`Bag${bagCount ? `, ${bagCount} items` : ""}`}
            className="relative rounded-full p-2 hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {bagCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-primary-foreground">
                {bagCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ShopTileRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 overflow-x-auto px-5 pb-1 scrollbar-none">
      <div className="flex w-max items-start gap-3">{children}</div>
    </div>
  );
}

function ShopTileButton({
  label,
  sublabel,
  wrapLabel,
  onClick,
  children,
}: {
  label: string;
  sublabel?: string;
  wrapLabel?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className="group w-[72px] shrink-0 p-0">
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-secondary ring-1 ring-border/50">
        {children}
      </div>
      <p
        className={`mt-2 w-full text-center text-xs font-medium ${
          wrapLabel ? "leading-snug break-words" : "leading-tight"
        }`}
      >
        {label}
      </p>
      {sublabel && (
        <p className="mt-0.5 w-full break-words text-center text-[11px] leading-snug text-muted-foreground">
          {sublabel}
        </p>
      )}
    </button>
  );
}

function Discover({
  onCategory,
  onProduct,
}: {
  onCategory: () => void;
  onProduct: (p: Product) => void;
}) {
  const chips = [
    "In my size (M)",
    "Under $25",
    "Arrives this week",
    "4★ and up",
    "Has customer photos",
  ];

  return (
    <div className="pb-10">
      <div className="px-5 pt-3">
        <div className="flex h-11 items-center gap-2.5 rounded-full border border-border bg-secondary px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search dresses, cover-ups, sandals…</span>
        </div>
      </div>

      <div className="mt-3 px-5">
        <button
          onClick={onCategory}
          className="group relative block w-full overflow-hidden rounded-3xl text-left"
        >
          <img
            src={hero}
            alt="Model wearing a lightweight vacation dress on a sunny boardwalk"
            className="h-60 w-full object-cover object-[center_30%] transition duration-700 group-hover:scale-[1.02]"
            width={832}
            height={576}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 flex max-w-[85%] flex-col items-start p-5 text-left text-white">
            <span className="mb-2 inline-block rounded-sm bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground">
              Summer edit
            </span>
            <h2 className="text-[1.65rem] font-bold leading-[1.15] tracking-tight">
              Pack light. Dress up nightly.
            </h2>
            <p className="mt-1.5 max-w-[28ch] text-sm leading-snug opacity-95">
              Vacation dresses under $35—with final prices, delivery dates, and fit notes upfront.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
              Shop the edit <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </button>
      </div>

      <div className="mt-3">
        <p className="px-5 text-xs font-medium text-muted-foreground">Quick filters</p>
        <div className="mt-2 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none">
          {chips.map((c) => (
            <button
              key={c}
              onClick={onCategory}
              className="h-9 shrink-0 rounded-full border border-border bg-card px-4 text-sm font-medium transition hover:border-foreground/30 hover:bg-secondary"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-5">
        <div className="px-5">
          <SectionHeader title="Shop by need" onAction={onCategory} />
        </div>
        <ShopTileRow>
          {[
            { label: "Hot day", Icon: Sun },
            { label: "Easy to pack", Icon: Briefcase },
            { label: "Dressy but comfy", Icon: Sparkles },
            { label: "Arrives this week", Icon: Zap },
          ].map((n) => (
            <ShopTileButton key={n.label} label={n.label} wrapLabel onClick={onCategory}>
              <div className="flex h-full w-full items-center justify-center">
                <n.Icon className="h-8 w-8 text-foreground/75" strokeWidth={1.5} />
              </div>
            </ShopTileButton>
          ))}
        </ShopTileRow>
      </section>

      <section className="mt-5">
        <div className="px-5">
          <SectionHeader title="Shop by category" onAction={onCategory} />
        </div>
        <ShopTileRow>
          {[
            { label: "Dresses", img: catDresses },
            { label: "Shoes", img: catShoes },
            { label: "Accessories", img: catAccessories },
            { label: "Tops", img: catDresses },
            { label: "Bags", img: catAccessories },
            { label: "Sandals", img: catShoes },
          ].map((c) => (
            <ShopTileButton key={c.label} label={c.label} onClick={onCategory}>
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </ShopTileButton>
          ))}
        </ShopTileRow>
      </section>

      <section className="mt-5 px-5">
        <SectionHeader
          title="Good finds under $25"
          subtitle="Low prices—with the details you need before you tap."
          onAction={onCategory}
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
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
  onAction,
}: {
  title: string;
  subtitle?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{subtitle}</p>}
      </div>
      <button
        onClick={onAction}
        className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-foreground underline-offset-2 hover:underline"
      >
        See all <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ProductCard({ p, onClick }: { p: Product; onClick: () => void }) {
  return (
    <div className="group relative text-left">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
        <button onClick={onClick} className="block h-full w-full text-left">
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
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-sm"
        >
          <Heart className="h-3.5 w-3.5" />
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
  onProduct,
  onOpenFilters,
}: {
  onProduct: (p: Product) => void;
  onOpenFilters: () => void;
}) {
  const [active, setActive] = useState("All");
  const cats = ["All", "Mini", "Midi", "Maxi", "Beach", "Casual"];

  return (
    <div className="pb-10">
      <div className="flex gap-2 overflow-x-auto px-5 pb-2 pt-3 scrollbar-none">
        {cats.map((c) => (
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

      <div className="sticky top-14 z-20 flex items-center justify-between border-b border-border/60 bg-background/95 px-5 py-2.5 backdrop-blur-md">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">42 dresses</span> · Size M · Final prices
        </p>
        <div className="flex gap-1.5">
          <ControlBtn icon={<ArrowUpDown className="h-3.5 w-3.5" />} label="Sort" />
          <ControlBtn
            icon={<SlidersHorizontal className="h-3.5 w-3.5" />}
            label="Refine"
            onClick={onOpenFilters}
          />
        </div>
      </div>

      <p className="px-5 pt-3 text-xs text-muted-foreground">
        Sorted by relevance. Every price includes active discounts—no codes to hunt.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3 px-5">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="relative">
            <ProductCard p={p} onClick={() => onProduct(p)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ControlBtn({
  icon,
  label,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-8 items-center gap-1 rounded-full bg-secondary px-3 text-xs font-semibold transition hover:bg-muted"
    >
      {icon}
      {label}
    </button>
  );
}

function FilterSheet({ onClose }: { onClose: () => void }) {
  const filters = [
    "Available in my size",
    "Under $25",
    "Highly rated with photos",
    "Not see-through",
    "Arrives before my trip",
    "Easy to return",
  ];
  const [picked, setPicked] = useState<string[]>(["Available in my size", "Under $25"]);
  const toggle = (f: string) =>
    setPicked((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));

  return (
    <Sheet onClose={onClose} title="Refine results">
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
        Tell us what matters. We'll hide the rest—no endless scrolling required.
      </p>
      <div className="space-y-2">
        {filters.map((f) => {
          const on = picked.includes(f);
          return (
            <button
              key={f}
              onClick={() => toggle(f)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${
                on ? "border-foreground/40 bg-secondary" : "border-border hover:border-border/80"
              }`}
            >
              <span className="text-sm font-medium">{f}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                  on ? "border-foreground bg-foreground" : "border-border"
                }`}
              >
                {on && <Check className="h-3 w-3 text-primary-foreground" />}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setPicked([])}
          className="h-12 flex-1 rounded-full border border-border text-sm font-semibold"
        >
          Clear all
        </button>
        <button
          onClick={onClose}
          className="h-12 flex-[2] rounded-full bg-foreground text-sm font-semibold text-primary-foreground"
        >
          Show 42 matching dresses
        </button>
      </div>
    </Sheet>
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

  return (
    <div className="pb-32">
      <div className="relative bg-secondary">
        <img
          src={product.img}
          alt={product.name}
          className="h-72 w-full object-cover"
          width={512}
          height={640}
        />
        <button
          aria-label={`Save ${product.name}`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/92 shadow-sm"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.fabric}
        </p>
        <h1 className="mt-1 text-xl font-bold tracking-tight">{product.name}</h1>

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

        <div className="mt-4 rounded-2xl border border-border p-4">
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

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-background via-background to-background/75 px-5 pb-5 pt-4">
        <button
          onClick={onAdd}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-bold text-primary-foreground transition active:scale-[0.99]"
        >
          Add to bag · ${product.price.toFixed(2)}
        </button>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Size {size} selected · Free returns if the fit isn't right
        </p>
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
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
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
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-background">
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

function Checkout({ items }: { items: { p: Product; size: string }[] }) {
  const list = items.length ? items : [{ p: PRODUCTS[1], size: "M" }];
  const subtotal = list.reduce((s, i) => s + i.p.price, 0);
  const shipping = subtotal >= 25 ? 0 : 4.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  return (
    <div className="pb-10">
      <CheckoutSteps step={1} />

      <div className="px-5 pt-2">
        <h2 className="text-sm font-bold">Bag summary</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {list.length} item{list.length !== 1 ? "s" : ""} · Prices include all discounts
        </p>
        <div className="mt-3 space-y-2.5">
          {list.map((i, idx) => (
            <div key={idx} className="flex gap-3 rounded-2xl border border-border p-3">
              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                <img src={i.p.img} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{i.p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Size {i.size}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold">${i.p.price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">Qty 1</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    <div className="fixed inset-0 z-40 flex justify-center">
      <div className="absolute inset-0 animate-in fade-in bg-foreground/45" onClick={onClose} />
      <div className="absolute bottom-0 max-h-[85vh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl bg-background p-5 pb-7 shadow-[var(--shadow-sheet)] animate-in slide-in-from-bottom duration-300">
        <div className="mb-1 flex items-center justify-center">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 rounded-full p-1.5 hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
