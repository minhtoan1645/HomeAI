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
