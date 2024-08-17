# ВАЖНО !!!

#### Для страницы забираем стили хранящиеся в файле - style.css

#### Файл - styles-from-site.css - не берем.

#### это стили скопированные с сайта для отображения корректной разметки при разработке

### Контент/скрипт страницы привязан к элементу &lt;section&gt; с &lt;id="catalog"&gt;

```javascript
<section id="catalog" class="sempling-list">
```

### Для отработки скрипта дублируем название в data атрибут &lt;data-text="Дротові"&gt;

```javascript
<span class="txt-decorator" data-text="Дротові">
  Дротові
</span>
```

# Секция с Карточкой продукта

```javascript
<div class="product-sampling-section with-catalog-redirect brand-style">
  <h2 class="section-title">Популярні бренди</h2>
  <!--  -->
  <div class="products-tile-grid">
    <!--  -->
    <div class="product-card">
      <div class="img-wrapper">
        <!--  -->
        <img src="./images/brand-logo.png" alt="Audio-Technica" width="40" class="brand-logo">
        <a href="https://soundmag.ua/uk/catalog/headphones/?manufacturer=221" title="Audio-Technica"
          rel="noopener" class="brand-link"><span class="brand-name">Audio-Technica</span></a>
        <!--  -->
        <picture>
          <source srcset media="(max-width:900px)">
          <img src="./images/brand-headph_1.png" alt="Product Image" class="product-image">
        </picture>
      </div>
      <div class="catalog-link-wrapper">
        <a href="javascript:void(0)" class="catalog-link" title rel="noopener">
          <span class="txt-decorator"></span>
          <span class="txt-underline"></span>
        </a>
      </div>
    </div>
    <!--  -->
  </div>
  <!--  -->
  <!-- set correect url -->
  <div class="catalog-btn-wrapper">
    <button class="btn-send btn-unstyled w-100 btn-catalog-redirect"
      onclick="window.location.href='https://soundmag.ua/uk/brands/headphones/'">Дивитись
      усі</button>
  </div>
</div>
```

<dl>
  <dt>Карточка продукта</dt>
  <dd>Для отображения карточки на странице используется блок с классом <code>class="product-sampling-section"</code>.<br/>
    Этот блок при помощи - добавления или удаления CSS классов - позволяет включать/отключать элементы карточки, а также элементы самой секции.<br/> В частности - кнопка "Дивитися Усі" <code>button class="btn-send btn-unstyled w-100 btn-catalog-redirect"</code>
  </dd>
  <dd>Внутри секции содержится</dd>
  <dd> - Заголовок секции (название) <code>&lt;h2 class="section-title"&gt;Популярні бренди&lt;/h2&gt;</code></dd>
  <dd> - Грид контейнер для карточек товара <code>&lt;div class="products-tile-grid"&gt;&lt;/div&gt;</code></dd>
  <dd> - Непосредственно сама карточка товара <code>&lt;div class="product-card"&gt;&lt;/div&gt;</code></dd>
  <dd> - Содержимое карточки - все элементы которые могут быть отображены внутри элемента</dd>

  <dt>Включение/отключение элементов секции или  карточки</dt>
  <dd>По умолчанию карточка товара отображается без дополнительных элементов поверх изображения, внизу с текстом названием/категории товара</dd>
</dl>

![image](https://github.com/user-attachments/assets/cea39e7b-aefe-4575-863a-4c5fcac07402)

<dl>
  <dt>Карточка в режиме БРЕНД</dt>
  <dd>ДЛя включения режима - БРЕНД используется класс <code>"brand-style"</code> устанавливаемый на верхнеуровневый блок <code><pre>&lt;div class="product-sampling-section brand-style"&gt;&lt;/div&gt;</pre></code></dd>
  <dd>Этот класс отключает:
  </dd>
  <dd>1.текст/ссылку внизу карточки </dd>
  <dd> и </dd>
  <dd>2. включает элементы над изображением товара </dd>
  <dd> ..*левй-верхний-угол - логотип бренда, </dd>
   <dd> ..* посредине изображения - элемент с белым фоном - ссылка на страницу товаров отсортированных по бренду </dd>
</dl>

<dl>
  <dt>кнопка "Дивитися Усі"</dt>
  <dd>включается добавлением класса <code>"with-catalog-redirect"</code> устанавливаемый на верхнеуровневый блок <code><pre>&lt;div class="product-sampling-section with-catalog-redirect"&gt;&lt;/div&gt;</pre></code></dd>
</dl>

![image](https://github.com/user-attachments/assets/449b4151-e152-4ff2-8c77-798fb90bedc0)
