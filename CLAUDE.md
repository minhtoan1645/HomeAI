# CLAUDE.md — V-Agent Landing Page

## Mô tả dự án
Landing page bán hàng cho sản phẩm V-Agent của Viettel Software.  
Theme: AI Workforce — bảng màu đỏ (#ee0033) / đen / trắng.  
File Figma gốc: https://www.figma.com/design/7Qe5Z3SEdeV9koDlAsfL9S/test?node-id=2002-32371

## Ràng buộc kỹ thuật (KHÔNG được vi phạm)
- HTML5 + CSS3 thuần. Không framework (no Bootstrap, Tailwind, Foundation).
- Không SASS/LESS, không build tool (no Webpack, Vite, PostCSS).
- TUYỆT ĐỐI không dùng JavaScript — kể cả inline `onclick`, `addEventListener`.
- Mọi tương tác phải dùng CSS-only (xem mục "Kỹ thuật CSS-only" bên dưới).
- Chỉ dùng Google Fonts qua `<link>` trong `<head>`.

## Quy ước đặt tên class
- Viết liền, dấu gạch ngang: `.hero-title`, `.nav-link`, `.btn-primary`
- Prefix theo section: `.pain-`, `.transform-`, `.features-`, `.howitworks-`,
  `.usecase-`, `.casestudy-`, `.metrics-`, `.cert-`, `.cta-`
- Layout utility ngắn: `.container`, `.section`, `.grid-2`, `.grid-3`, `.grid-4`
- Không dùng utility kiểu Tailwind (`flex-1`, `text-sm`, `mt-4`, v.v.)
- Không dùng BEM dài dòng với `__` và `--` trừ khi thật sự cần

## Quy ước code "kiểu người viết"
- Comment tiếng Việt đánh dấu mỗi section lớn: `/* ===== 02. Pain Point ===== */`
- Comment giải thích kỹ thuật CSS-only khi không hiển nhiên.
- Không comment những thứ tự giải thích (e.g. `color: #ee0033; /* màu đỏ */`).
- Thứ tự properties trong một rule:
  positioning → display/box-model → size → spacing → visual → typography → animation
- Dùng CSS custom properties (`--`) cho mọi design token lặp lại.
- Media query viết ngay cuối từng block section trong style.css.

## Breakpoints responsive
- Mobile first: styles mặc định = mobile (< 768px)
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1025px)`
- Container: `max-width: 1280px; margin: 0 auto; padding: 0 24px`

## Kỹ thuật CSS-only sẽ dùng

### 1. Menu mobile (hamburger)
```html
<input type="checkbox" id="nav-toggle" class="nav-toggle-input">
<label for="nav-toggle" class="nav-hamburger" aria-label="Menu">
  <span></span><span></span><span></span>
</label>
<nav class="nav-menu">...</nav>
```
```css
.nav-toggle-input:checked ~ .site-nav .nav-menu { display: flex; }
```

### 2. Tabs (Use Cases, Case Study)
```html
<input type="radio" name="usecase-tabs" id="tab-tuyen-dung" checked hidden>
<label for="tab-tuyen-dung" class="tab-label">Tuyển dụng</label>
<div class="tab-panel panel-tuyen-dung">...</div>
```
```css
#tab-tuyen-dung:checked ~ .tab-panels .panel-tuyen-dung { display: block; }
```

### 3. Certifications (scroll-snap carousel)
```css
.cert-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }
.cert-slide { scroll-snap-align: start; flex-shrink: 0; }
```

### 4. FAQs
Dùng `<details>/<summary>` native HTML — không cần hack.

### 5. Sticky nav
```css
.site-header { position: sticky; top: 0; z-index: 100; }
```

### 6. Gradient text (hero accent)
```css
.text-gradient {
  background: linear-gradient(90deg, #ee0033, #ff4d6d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Quy ước commit
- Tiếng Anh, lowercase, theo phase:
  - `feat(phase0): setup file structure, reset css, design tokens`
  - `feat(phase1): build nav and hero section`
  - `feat(phase2): add pain point and transformation sections`
- Mỗi section hoàn chỉnh = 1 commit.

## Quy tắc làm việc theo phase
1. DỪNG sau mỗi phase.
2. Báo cáo đầu ra: file đã tạo/sửa, screenshot/preview nếu có.
3. Chờ user duyệt trước khi sang phase tiếp theo.
4. Không tự ý thêm tính năng ngoài scope của phase.

## Quyết định thiết kế đã duyệt
- Hero background: SVG decorative tĩnh (không animation)
- Form submit: style-only, action rỗng
- Case Study tabs Pháp chế / Vận hành: placeholder
- Carousel navigation: scroll-snap + dots (không cần ← →)

---

## Trạng thái hoàn thành

### Phase 0 — Setup ✅
- `reset.css`: design tokens, base styles, layout helpers, grid utilities, button/text utilities
- `index.html`: skeleton HTML đầy đủ tất cả section (nav → footer)
- `css/style.css`: khởi tạo, import cấu trúc

### Phase 1 — Nav ✅
HTML: `index.html`
CSS: `style.css` lines 1–287

Hoàn chỉnh:
- Header pill với gradient `#ECEEF3 → #E9EBF0`, border-radius full, box-shadow nhẹ
- Logo bên trái, nav links căn giữa, button "Đăng nhập" bên phải
- Active state: pill đen + chữ trắng; hover: chữ đỏ + bg đỏ nhạt
- Sticky header: `position: sticky; top: 0`
- Scroll dissolve: `animation-timeline: scroll()` — nền `#ededed` tan dần thành transparent khi scroll 80px (dùng `@supports` để fallback an toàn)
- Mobile hamburger: CSS-only checkbox hack — `input:checked ~ .site-header .nav-mobile-panel`
- Mobile: bỏ pill, quay về full-width header trắng, ẩn desktop nav

### Phase 1 — Hero ✅
HTML: `index.html`
CSS: `style.css` lines 289–446

Hoàn chỉnh:
- Layer 0: `images/Rectangle.png` full-width background (`object-fit: cover`)
- Layer 1: `images/Rectangle1.png` bên trái đè lên background, dưới text (z-index 1)
- Layer 1: `images/8.png` badge AI chip, vị trí `top: 24.5%; right: 15.5%` (z-index 3)
- Layer 2: hero content — H1, info paragraph, CTA button
- H1: "XÂY DỰNG ĐỘI NGŨ / AI WORKFORCE / CHO DOANH NGHIỆP"
- "AI WORKFORCE": font-size 80px, font-weight 900, gradient đỏ `#ee0033 → #ff4d6d` qua `background-clip: text`
- Shadow "AI WORKFORCE": `filter: drop-shadow` 3 lớp (gray gradient `#C3C3C3 → #4A4A4A`) trên wrapper `.hero-ai-border` — KHÔNG dùng `text-shadow` trực tiếp
- CTA button: pill đỏ `#ee0033`, uppercase, SVG arrow icon

---

## Quyết định kỹ thuật quan trọng (Phase 1)

**1. `filter: drop-shadow` thay vì `text-shadow` cho "AI WORKFORCE"**
- `text-shadow` với `background-clip: text` bị bleed qua transparent fill → làm chữ đỏ bị nhạt thành hồng
- `filter: drop-shadow` trên wrapper cast shadow từ alpha của chữ ra ngoài, không ảnh hưởng fill → đỏ giữ nguyên

**2. Scroll dissolve dùng `animation-timeline: scroll()` + `@supports`**
- Không dùng JS để theo dõi scroll
- `@supports` bọc ngoài để trình duyệt cũ fallback về sticky header bình thường

**3. Mobile hamburger: checkbox đặt TRƯỚC `<header>` trong DOM**
- CSS sibling selector `~` chỉ chọn được phần tử theo sau trong DOM, không lên trên được
- Nếu checkbox nằm trong header thì không thể toggle mobile panel bằng `~`

**4. `white-space: nowrap` trên cả wrapper lẫn span "AI WORKFORCE"**
- Text 80px dễ xuống dòng ở breakpoint trung bình → cần lock cứng 1 dòng

**5. Positioning `images/8.png` bằng % thay vì px**
- Figma cho tọa độ px trên canvas 1920px → convert sang % để responsive đúng tỉ lệ

---

### Phase 2 — Pain Point ✅
HTML: `index.html` lines 152–215
CSS: `style.css` lines 450–559

Hoàn chỉnh:
- Background tối `#0d0d0d`, heading đỏ + trắng
- Grid 4 cột desktop / 2 cột tablet / 1 cột mobile
- 4 pain card: icon + tiêu đề + mô tả + ảnh minh họa
- `pain-section > .container` override `max-width: 1400px` để khớp Figma frame rộng

### Phase 2 — Transformation ✅
HTML: `index.html` lines 217–291 (viết lại hoàn toàn từ scaffold cũ)
CSS: `style.css` lines 561–700+

Hoàn chỉnh:
- Background: `images/Asset 1@4x 1.png`, `background-size: cover`
- Heading: Inter Bold 36px; "AI vận hành doanh nghiệp" tô đỏ qua `.text-red`
- Subtitle: Inter Regular 16px, `color: #000000`
- 2 bảng so sánh song song (flex row), `border-radius: 16px`, `border: 4px solid transparent`
- Header bảng trái: `linear-gradient(90deg, #454545, #000000)`
- Header bảng phải: `linear-gradient(90deg, #9D0611, #EF0039)`
- Rows body: `linear-gradient(to bottom, #DFE0E4, #FFFFFF)` đặt trên `<ul>`, `<li>` dùng `background: transparent`
- Border gradient: `linear-gradient(to top, #DFE0E4, #FFFFFF) border-box` + `padding-box` trắng
- Robot `images/chat.png`: `position: absolute`, `width: 240px`, `bottom: -80px`, `right: -135px`, `z-index: 10`
- Desktop: `padding-top: 50px; padding-bottom: 88px` (override `.section` 96px)
- Mobile: 2 bảng xếp dọc, robot ẩn

## Quyết định kỹ thuật quan trọng (Phase 2 — Transformation)

**1. Viết lại HTML scaffold thay vì giữ BEFORE/AFTER + badge/checkmark**
- Scaffold cũ dùng `.transform-col--before/.after` với icon ✕/✓ không khớp thiết kế Figma
- Thiết kế thực tế là bảng header + rows → rewrite toàn bộ sang `.transform-table` pattern

**2. Gradient border dùng `background-clip: padding-box / border-box`**
- CSS `border` không nhận gradient trực tiếp
- `border-image` với gradient không respect `border-radius` → góc vuông
- Giải pháp: `border: 4px solid transparent` + `background: ... padding-box, gradient border-box` → giữ border-radius tròn

**3. Gradient rows đặt trên `<ul>`, không đặt trên từng `<li>`**
- Nếu đặt gradient trên mỗi `<li>`, gradient restart từng hàng → không liên tục
- Đặt trên `<ul>` + `<li> { background: transparent }` → gradient chạy xuyên suốt toàn body bảng

**4. Robot dùng `position: absolute` trong `.transform-table-wrap` (position: relative)**
- Cần robot tràn ra ngoài bảng phải và đè lên background section
- `z-index: 10` đảm bảo robot nổi trên cả table và background image

---

### Phase 3 — V-Agent Features ✅
HTML: `index.html` lines 261–317
CSS: `style.css` block `/* ===== 04. V-Agent Features ===== */`

Hoàn chỉnh:
- Background trắng `#ffffff`, section `padding-top: 48px` (override `.section` 96px)
- Heading: "Vậy V-Agent là gì ?" — "V-Agent là gì ?" tô đỏ qua `.text-red`
- Subtitle: max-width 900px, căn giữa
- Grid 2 cột desktop/tablet / 1 cột mobile, `gap: 20px`
- 4 feature card: flex row, icon `<img>` bên trái + body text bên phải
- Icon files: `images/1.png`, `2.png`, `3.png`, `21.png` — width 60px desktop
- Card: `border: 4px solid transparent`, `border-radius: 16px`, gradient border kỹ thuật `padding-box / border-box`
- Card nền: `linear-gradient(to bottom, #DFE0E4, #FFFFFF) padding-box`
- Card border: `linear-gradient(to bottom, #FFFFFF, #DFE0E4) border-box`
- Equal height cards: `.howitworks-step` column flex + `.step-card flex: 1`

### Phase 3 — How It Works ✅
HTML: `index.html` lines 319–373
CSS: `style.css` block `/* ===== 05. How It Works ===== */`

Hoàn chỉnh:
- Background trắng, `padding-top: 0; margin-top: -10px`
- Heading: "Cách V-Agent vận hành" — "V-Agent vận hành" tô đỏ
- Timeline ngang 6 bước: đường kẻ gradient + arrow + 6 dot + 6 connector + 6 card
- Đường kẻ: `height: 7.5px`, `linear-gradient(to right, #9D0611, #EF0039)`
- Arrow head: border-trick CSS (`border-left: 14px solid #EF0039`)
- Dot: `16px × 16px`, `border: 3px solid #ffffff`, `background: #EF0039`
- Connector: `width: 2px; height: 34px`, màu đỏ, nối từ đáy dot xuống đầu card
- 6 card — cấu trúc 3 lớp lồng nhau:
  - `.step-card-red`: `linear-gradient(135deg, #9D0611, #EF0039)`, `border-radius: 20px`, `padding: 2px`
  - `.step-card-white`: `#F6F6F6`, `border-radius: 18px`, `padding: 2px`
  - `.step-card-inner`: gradient `transparent 50% → rgba(57,61,117,.2) 100%`, `padding: 18px 12px`
- Badge: `44px`, đỏ `#EF0039`, chữ trắng bold
- Text card: 20px bold `#000000`
- Desktop: `width: 195px` fixed per step, `justify-content: space-between`
- Responsive: mobile → dọc (line trái); tablet → scroll ngang; desktop → 6 cột ngang

## Quyết định kỹ thuật quan trọng (Phase 3 — How It Works)

**1. Card 3 lớp lồng nhau thay vì padding-box/border-box**
- Yêu cầu thiết kế: viền đỏ gradient chéo + nền trắng + nền xanh overlay
- `padding-box/border-box` không hỗ trợ gradient chéo trên border độc lập với nền
- Giải pháp: 3 div lồng nhau — `.step-card-red` (viền gradient 135°) → `.step-card-white` (#F6F6F6) → `.step-card-inner` (nền xanh)

**2. Dot + connector dùng `::before` / `::after` trên `.howitworks-step`**
- Tránh thêm phần tử HTML cho mỗi step
- `padding-top: 52px` trên step tạo vùng trắng phía trên card để dot + connector hiển thị bên ngoài card
- Tọa độ tính theo: line center = 10px từ track top → dot `top: 2px` (center = 10px) → connector `top: 18px, height: 34px` (kết thúc đúng tại padding-top = 52px)

**3. Equal height cards dùng flex column chain**
- `.howitworks-step`: `display: flex; flex-direction: column` → `.step-card-red/.white/.inner`: đều `flex: 1; display: flex; flex-direction: column`
- Tất cả card trong hàng bằng nhau theo chiều dọc nhờ `align-items: stretch` mặc định của flex

**4. Desktop: `flex: none; width: 195px` + `justify-content: space-between`**
- `flex: 1` chia đều làm card quá rộng ở 1280px
- Fixed width + space-between cho khoảng cách đều, card đúng kích thước thiết kế

---

## Bước tiếp theo — Phase 4: Use Cases

Section tiếp theo cần build (HTML scaffold đã có):

**06. Use Cases** (`.usecase-`)
- "Ứng dụng thực tế trong doanh nghiệp" — tabs CSS-only (radio button hack)
- 3 tab: Tuyển dụng / Pháp chế / Vận hành
- Mỗi tab: icon lớn + tiêu đề + mô tả ngắn
- Radio inputs đã đặt ngoài section (đúng vị trí cho sibling selector `~`)

Trước khi bắt đầu Phase 4: **xem lại Figma node use cases** để confirm layout từng tab, màu nền, icon style.
