// Carousel Config
const config = {
  autoplay: true,
  showIndicators: true,
  useCrossFade: true,
  includeDownload: true,
  includeView: true,
  horizontalBlogDisplay: true,
};

document.addEventListener("DOMContentLoaded", initializePage);

function initializePage() {
  setupCarousel();
  generateBlogPosts();
}

function setupCarousel() {
  const carouselDiv = document.querySelector(".carousel");
  const carouselIndicators = document.querySelector(".carousel-indicators");

  if (config.autoplay) {
    carouselDiv.setAttribute("data-bs-ride", "carousel");
  }

  carouselIndicators.classList.toggle("d-none", !config.showIndicators);

  if (config.useCrossFade) {
    carouselDiv.classList.add("carousel-fade");
  }
}

function getBlogData() {
  const blogPostsContainer = document.getElementById("blogPosts");
  if (!blogPostsContainer) {
    console.error("Blog posts container not found");
    return [];
  }
  try {
    return JSON.parse(blogPostsContainer.dataset.blogPosts);
  } catch (error) {
    console.error("Error parsing blog data:", error);
    return [];
  }
}

function generateBlogPosts() {
  const blogData = getBlogData();
  const blogPostsContainer = document.getElementById("blogPosts");

  const createBlogCard = config.horizontalBlogDisplay
    ? createHorizontalBlogCard
    : createVerticalBlogCard;

  const blogPostsHTML = blogData
    .map(
      (post, index) => `
        <div class="${config.horizontalBlogDisplay ? "mb-4" : "col-md-4 mb-4"}">
            ${createBlogCard(post, index)}
        </div>
    `
    )
    .join("");

  blogPostsContainer.innerHTML = blogPostsHTML;
}

function createVerticalBlogCard(post, index) {
  return `
        <div class="card">
            <img src="${post.image}" class="card-img-top" alt="${post.title}">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.description}</p>
                <button class="btn-sm btn btn-outline-secondary mt-2" id="verFotos${index}" data-bs-toggle="modal" data-bs-target="#photoModal">View photos</button>
            </div>
        </div>
    `;
}

function createHorizontalBlogCard(post, index) {
  return `
        <div class="card w-100 rounded-3">
            <div class="row g-0">
                <div class="card-header">
                    <h1 class="card-title">${post.title}</h1>
                </div>
                <div class="col-md-3 ps-2 py-2">
                    <img src="${post.image}" loading="lazy" class="card-img-top align-self-center img-thumbnail" alt="${post.title}">
                </div>
                <div class="col-md-9">
                    <div class="card-body h-100 d-flex flex-wrap align-content-around">
                        <div class="w-100 text-justify">${post.description}</div>
                        <div>
                            <button class="btn-sm btn btn-outline-secondary mt-2" id="verFotos${index}" data-bs-toggle="modal" data-bs-target="#photoModal">View photos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateCarousel(photos) {
  const carouselInner = document.querySelector(
    "#photoCarousel .carousel-inner"
  );
  const carouselIndicators = document.querySelector(
    "#photoCarousel .carousel-indicators"
  );

  const carouselHTML = photos
    .map(
      (photo, index) => `
        <div class="carousel-item${index === 0 ? " active" : ""}">
            <img src="${photo.src}" loading="lazy" class="d-block w-100" alt="${
        photo.alt
      }">
        </div>
    `
    )
    .join("");

  const indicatorsHTML = photos
    .map(
      (_, index) => `
        <button type="button" data-bs-target="#photoCarousel" data-bs-slide-to="${index}"
            class="${index === 0 ? "active" : ""}" aria-current="${
        index === 0 ? "true" : "false"
      }"
            aria-label="Slide ${index + 1}"></button>
    `
    )
    .join("");

  carouselInner.innerHTML = carouselHTML;
  carouselIndicators.innerHTML = indicatorsHTML;

  updatePhotoDescription(photos[0].alt, photos[0].src);
}

function updatePhotoDescription(description, imgSrc) {
  const divVr =
    config.includeDownload || config.includeView
      ? '<div class="vr"></div>'
      : "";
  const btnDwld = config.includeDownload
    ? `<a class="setBtn btn btn-outline-secondary btn-sm" href="${imgSrc}" target="_blank" download=""><i class="bi bi-download"></i></a>`
    : "";
  const btnView = config.includeView
    ? `<a class="setBtn btn btn-outline-secondary btn-sm" href="${imgSrc}" target="_blank"><i class="bi bi-arrows-fullscreen"></i></a>`
    : "";

  document.getElementById(
    "photoDescription"
  ).innerHTML = `${description}${divVr}${btnView}${btnDwld}`;
}

document
  .getElementById("photoModal")
  .addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const postIndex = button.id.replace("verFotos", "");
    const blogData = getBlogData();
    const post = blogData[postIndex];

    document.getElementById("photoModalLabel").textContent = post.title;
    generateCarousel(post.photos);
  });

document
  .getElementById("photoCarousel")
  .addEventListener("slid.bs.carousel", function (event) {
    const activeItem = event.relatedTarget;
    const img = activeItem.querySelector("img");
    updatePhotoDescription(img.alt, img.src);
  });
