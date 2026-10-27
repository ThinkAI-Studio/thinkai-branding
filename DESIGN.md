# ThinkAI Studio — Design Language & Engineering Specification (`DESIGN.md`)

> **Version:** 1.1 (Impeccable & Registry-First Specification)  
> **Author & Maintainer:** ThinkAI Studio / Nguyen Huu Binh Minh  
> **Repository:** `bnhminh1010/portfolio`  
> **Component Namespace:** `tai-ui` (`@/components/tai-ui/`)  
> **CLI Distribution:** `thinkai-ui` (`registry/registry.json`)  
> **Style Scope:** `tai-*` (`src/app/globals.css`)  

---

## 1. Triết Lý Thiết Kế & Bản Sắc Thương Hiệu (Brand Philosophy)

ThinkAI Studio được xây dựng dựa trên nguyên lý **"Infrastructure-Grade Craft & Technical Luxury"** — Mọi pixel và tương tác trên giao diện phải có độ chính xác, tin cậy và bền bỉ tương đương một hệ thống hạ tầng phân tán cao cấp.

### 4 Trụ Cột Cốt Lõi (The 4 Impeccable Pillars):

1. **Obsidian Monochromatic Depth (Chiều Sâu Đơn Sắc Hắc Thạch):**
   - Không dùng đen thuần `#000000` (tránh làm bẹp UI). Sử dụng nền xám hắc thạch sâu thẳm (`#08080a`, `#0d0d10`, `#131316`).
   - **Linear-Grade Top-Inset Highlights:** Mọi bề mặt nâng nổi (Card, Button, Dialog) đều có viền sáng mỏng 1px mép trên (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`).
   - **Dynamic Alpha Hairlines:** Dùng viền trong suốt `border-white/[0.07]` và `border-white/[0.18]` để thích ứng hoàn hảo trên mọi lớp nền.
   - **LED Status Glow:** Màu xanh danh nghĩa `#4ade80` đi kèm hiệu ứng quang học vi mô `drop-shadow-[0_0_6px_rgba(74,222,128,0.45)]`.

2. **10px Precision Geometric System (Hệ Thống Bo Góc Chính Xác 10px & 16px):**
   - **10px Precision Radius**: Toàn bộ buttons, cards, dialogs, inputs và tags sử dụng bo góc kỹ thuật 10px chuẩn xác (`rounded-[10px]`).
   - **16px Large Containers**: Khung mockup lớn, container modal và thẻ bao bọc sử dụng bán kính 16px (`rounded-[16px]`).
   - **Section Exit Tucks**: Hiệu ứng cuộn nén thẻ thoát phần sử dụng bo góc dưới `0 0 16px 16px`.
   - **Mathematical 4px Grid**: Mọi padding, margin đều là bội số nghiêm ngặt của 4.
   - **Crisp Focus Rings**: Khung focus bàn phím sắc nét, bo nhẹ theo hình khối (`outline: 2px solid rgba(255,255,255,0.85)`).
3. **Analog Micro-Grain Tactility (Chất Cảm Vật Lý Tương Tự):**
   - Phủ một lớp film micro-grain (`SVG feTurbulence baseFrequency 1.4, opacity 0.135, background-size: 80px`) lên toàn bộ màn hình.
   - Hiệu ứng kính mờ `backdrop-blur-xl bg-black/40` trên thanh điều hướng để tương phản với hình khối 0px phía dưới.

4. **Tectonic Motion Mechanics (Vật Lý Chuyển Động Kiến Trúc):**
   - Chuyển động cơ học kỹ thuật mượt mà với ngăn xếp kép **Motion 13 + GSAP 3.15 (ScrollTrigger & InertiaPlugin) + Lenis 1.3**.
   - **Spring Physics**: `{ damping: 32, stiffness: 280, mass: 1 }` và Easing Luxury `cubic-bezier(0.16, 1, 0.3, 1)`.
   - **Mechanical Click Feedback**: Nén cơ học `active:scale-[0.98]` trên mọi phần tử tương tác.
   - **Sora UI Registry Integration**: Tích hợp các module tương tác cao cấp từ `@soralabs` (magnetic-cards, text-reveal-mask, dual-wipe-reveal, tilt-card).

---

## 2. Bảng Token Thiết Kế (Design Tokens)

### 2.1. Bảng Màu (Color Tokens)

```css
@theme {
  --color-tai-bg: #08080a;             /* Nền canvas hắc thạch sâu */
  --color-tai-sheet: #0d0d10;          /* Tầng nội dung chính */
  --color-tai-card: #131316;           /* Bề mặt card, Bezel mockup */
  --color-tai-border: rgba(255, 255, 255, 0.07);        /* Viền hairline alpha */
  --color-tai-border-strong: rgba(255, 255, 255, 0.18); /* Viền hover / active */
  --color-tai-green: #4ade80;          /* Trạng thái danh nghĩa LED */
  --radius-card: 10px;                 /* Thẻ, nút bấm, input, tag */
  --radius-container: 16px;            /* Khung lớn, container */
  --radius-tuck: 0 0 16px 16px;        /* Nén thoát thẻ section */
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
}

### 2.2. Thang Typography (Typography Scale)

| Token / Class | Font Family | Size (Fluid Clamp) | Weight | Tracking | Line-Height | Transform | Ứng Dụng |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.tai-heading-hero` | Barlow Condensed | `clamp(2.6rem, 7.8vw, 7.2rem)` | 700 / 800 | `-0.026em` | `0.94` | UPPERCASE | Hero Headline ("RELIABLE DELIVERY") |
| `.tai-heading-xl` | Barlow Condensed | `clamp(2.4rem, 7.5vw, 7.0rem)` | 700 / 800 | `-0.028em` | `0.94` | UPPERCASE | Section Titles, Modern Tech Stack, CTA |
| `.tai-heading-lg` | Barlow Condensed | `clamp(2.0rem, 5.0vw, 4.8rem)` | 700 | `-0.024em` | `0.94` | UPPERCASE | Drawer Headlines, Sub-section Headers |
| `.tai-heading-statement` | Barlow Condensed | `clamp(1.5rem, 3.2vw, 2.6rem)` | 600 | `-0.020em` | `1.20` | Normal | Core Studio Statements |
| `.tai-label` | System Monospace | `11.5px` | 500 / 700 | `+0.160em` | `1.00` | UPPERCASE | HUD Labels, `● Products`, `01/03`, CLI tags |
| Body Regular | System Sans Stack | `14px - 16px` | 300 / 400 | `-0.010em` | `1.65` | Normal | Project summaries, Drawer bios |

---

## 3. Hệ Thống Chuyển Động & Tương Tác Đặc Trưng (Interactive Signatures)

### 3.1. Easing Curves Chuẩn của ThinkAI Studio

```ts
export const THINKAI_EASE = {
  luxury: [0.16, 1, 0.3, 1] as const,     // Easing trượt mượt mà cho reveal, dialog, sheet
  snappy: [0.19, 1, 0.22, 1] as const,    // Easing tức thì cho button hover, pill sweep
  entrance: [0.25, 1, 0.5, 1] as const,   // Easing tự nhiên cho element trượt vào viewport
};
```
#### Lớp 3: Scroll-Driven 3D Perspective Roll
- **Component:** `ScrollRollText`
- **Vị trí:** `RELIABLE / DELIVERY`, `MODERN / TECH STACK`, `RELIABLE SYSTEMS YOU OWN → SHIP`.
- **Cơ chế:** Tách mỗi dòng thành 2 nửa bằng `clipPath: inset(0 0 50% 0)` (nửa trên) và `clipPath: inset(50% 0 0 0)` (nửa dưới).
- **Interpolation:** Gắn với `scrollYProgress` qua `useTransform`:
  - Nửa trên xoay quanh trục `bottom center` từ `-90deg -> 0deg -> 90deg`.
  - Nửa dưới xoay quanh trục `top center` từ `90deg -> 0deg -> -90deg`.
  - Perspective: `1200px`. Độ sâu Z: `-200px -> 0px -> -200px`.
- **Reduced Motion:** Tắt biến đổi 3D, hiển thị text phẳng căn giữa.

#### Lớp 4: Scroll Progress Text Highlight (Đoạn Tuyên Ngôn)
- **Component:** `HighlightOnScroll`
- **Vị trí:** Large Statement Section.
- **Cơ chế:** Tách câu thành mảng từ. Tính toán dải cuộn từ `start: "80%"` đến `end: "40%"`.
- **Interpolation:** Mỗi từ `i` sáng từ `opacity: 0.2` lên `opacity: 1.0` khi tiến trình đạt khoảng `[i / total, (i + 1) / total]`.
- **Reduced Motion:** Toàn bộ từ có `opacity: 1.0` cố định.

#### Lớp 5: Sequence & Chapter Carousel (Product Showcase)
- **Component:** `ProjectSequence`
- **Vị trí:** Products Section.
- **Cơ chế:** State Transition giữa các chapter dự án.
- **Transitions:** `AnimatePresence mode="wait"` với animation `x: 20 -> 0`, `opacity: 0 -> 1` (Duration `0.5s`).
- **Tự động hóa:** Tích hợp bộ đếm `5s` tự chuyển slide; hiển thị thanh progress bar mượt mà chạy từ `0% -> 100%`; tạm dừng (Pause) ngay khi người dùng rê chuột vào vùng card.
- **Reduced Motion:** Bỏ slide X, dùng crossfade opacity `0 -> 1` trong `0.15s`.

#### Lớp 6: Media Mask & Parallax Inset (Khung Ảnh & Mockup)
- **Component:** `ProductMockup` / `MediaMask`
- **Vị trí:** Mockup laptop, hình ảnh minh họa case study.
- **Cơ chế:**
  - Container reveal: `clipPath: inset(20% 0 20% 0) -> inset(0% 0 0% 0)` (Duration `1.2s`, Ease `[0.16, 1, 0.3, 1]`).
  - Inner Parallax: Media bên trong scale `1.05` và di chuyển `y: -30px -> +30px` ngược chiều cuộn chuột.
- **Reduced Motion:** Bỏ parallax, container hiển thị ở `clipPath: inset(0)`.

#### Lớp 7: Interactive Micro-Gestures & Buttons
- **Component:** `WipeButton`, `TaiButton`, `TechLogos`
- **Nguyên tắc:** "Chuyển động là ý nghĩa của chính đối tượng tác động lên nó".
  - **WipeButton:** Lớp phủ nền quét từ trái sang phải (`-102% → 0% → 102%`).
  - **TaiButton:** Lớp phủ ánh sáng `mix-blend-overlay` quét từ dưới lên `y: 100% -> 0%`. Text nhấc nhẹ `y: -0.5px`.
  - **Directional Arrow:** Mũi tên tiến về trước `x: +4px` (Không rung lắc, không xoay góc giả tạo).
  - **Tech Stack Tiles:** Khi hover, màu nền đảo nghịch từ đen sang trắng rực (`bg-white text-black`), nâng nổi `y: -2px`, đổ bóng `shadow-xl`.

#### Lớp 8: Overlay / Modal State Transition (About Drawer & Architecture Modal)
- **Component:** `AboutDrawer`, `ArchitectureModal`, `ContactModal`
- **Cơ chế:**
  - Backdrop: Fade `opacity: 0 -> 0.85` kết hợp `backdrop-blur-md`.
  - Drawer Panel: Spring sliding `x: 100% -> 0%` (`damping: 28, stiffness: 260`).
  - Modal Window: Scale `0.97 -> 1.0` kết hợp `y: 12px -> 0px` (`duration: 0.22s`).
  - Phím bấm `ESC` và Click Outside tự động đóng; khoá cuộn màn hình nền.

---

## 4. Quy Chuẩn Tuân Thủ Reduced Motion (WCAG AAA)

Toàn bộ component phải triển khai đúng 4 chiến lược chuyển động tiếp cận:

| Chiến Lược | Áp Dụng Cho | Biểu Hiện Dưới Reduced Motion |
| :--- | :--- | :--- |
| **1. Bail** | Ambient Canvas, Parallax Layers, Glow Blurs | Hiệu ứng biến mất hoặc đứng yên, giải phóng tài nguyên GPU |
| **2. Snap to end state** | `ScrollRollText`, `HighlightOnScroll`, Typography Reveal | Văn bản hiển thị đầy đủ ở trạng thái cuối cùng, không lửng lơ |
| **3. Collapse transition** | `WipeButton`, `TaiButton`, Tab switches, `ProjectSequence` | Chuyển đổi trạng thái ngay lập tức (`duration: 0.01ms`) |
| **4. Reduce complexity** | `ThreeHalftoneCanvas`, `WaveHalftoneCanvas` | Giảm mật độ particle, tắt auto-drift |

---

## 5. Cấu Trúc Thành Phần `src/components/tai-ui/` (16 Active Production Components)

```
src/components/tai-ui/
├── AboutDrawer.tsx              # Drawer giới thiệu tiểu sử & kinh nghiệm
├── AiBrandIcons.tsx             # Bộ SVG icons cho các mô hình AI (Claude, Gemini, OpenAI, etc.)
├── ArchitectureModal.tsx        # Modal xem sơ đồ kiến trúc hệ thống đa tab
├── ArrowRoll.tsx                # Icon mũi tên lật mượt mà khi hover
├── ButtonTextRoll.tsx           # Hiệu ứng chữ cuộn 2 tầng trên nút bấm
├── ContactModal.tsx             # Modal liên hệ & sao chép thông tin
├── HalftoneBanner.tsx           # Banner WebGL halftone tích hợp LogoMark
├── MaskedTextReveal.tsx         # Reveal chữ mượt mà qua mặt nạ cắt (Clip-Path)
├── ProductMockup.tsx            # Khung laptop browser mockup chuẩn studio
├── SmoothScroll.tsx             # Bộ điều phối cuộn mượt mà Lenis 120Hz
├── TaiButton.tsx                # Nút bấm cơ bản ThinkAI Studio với sweep hover
├── TaiHeader.tsx                # Header điều hướng trong suốt & mobile drawer
├── TechLogos.tsx                # Bộ nhận diện công nghệ (Go, K8s, Linux, Podman...)
├── TextRoll.tsx                 # Slot-machine text tumbler roll cho headlines
├── ThreeHalftoneCanvas.tsx      # WebGL Ocean Shader Engine chính
└── WipeButton.tsx               # Nút bấm signature với hiệu ứng Forward Wipe
```

---

## 6. Kiến Trúc Phân Phối CLI Registry (`thinkai-ui`)

`thinkai-ui` hoạt động theo mô hình Registry-First (tương tự `shadcn/ui`):
- `registry/registry.json`: Mục lục toàn cục chứa danh sách dependencies và files.
- `registry/ui/*.json`: Manifest độc lập cho từng component chứa mã nguồn và metadata.
- **Tiêu chuẩn lập trình component:**
  1. `asChild` Polymorphism thông qua `@radix-ui/react-slot`.
  2. Variant Typed Control với `cva` (Class Variance Authority).
  3. Safe Tailwind merging với `cn()` (`clsx` + `tailwind-merge`).
  4. 0px Architectural Focus State & Tactility (`active:scale-[0.98]`).

---

## 7. Ghi Nhận Bản Quyền & Giấy Phép (Design Acknowledgment)

> **Design Acknowledgment & Attribution:**  
> Hệ thống thiết kế của ThinkAI Studio kế thừa và phát triển từ phong cách Dark-Mode Editorial đương đại được khởi xướng bởi các studio công nghệ hàng đầu (như SoraLabs, Linear, và Vercel).  
> Mọi thành phần UI trong `src/components/tai-ui/` được cài đặt độc lập bằng React, TypeScript, Tailwind CSS, Three.js và Motion (`motion/react`).  
> Bản quyền thuộc về **ThinkAI Studio / Nguyen Huu Binh Minh** (c) 2026.
