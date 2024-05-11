document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelector(".gallery-images");
    const images = [
        {
            category: "concerts",
            img: "./assets/images/gallery/concerts/aaron-paul-wnX-fXzB6Cw-unsplash.webp",
            alt: "Atmosphere sur un concert"
        },
        {
            category: "business",
            img: "./assets/images/gallery/entreprise/ali-morshedlou-WMD64tMfc4k-unsplash.webp",
            alt: "Moniseur en costume"
        },
        {
            category: "business",
            img: "./assets/images/gallery/entreprise/jason-goodman-tHO1_OuKbg0-unsplash.webp",
            alt: "Une femme dans une reunion"
        },
        {
            category: "weddings",
            img: "./assets/images/gallery/mariage/hannah-busing-RvF2R_qMpRk-unsplash.webp",
            alt: "Les mains d'un couple"
        },
        {
            category: "portraits",
            img: "./assets/images/gallery/portraits/ade-tunji-rVkhWWZFAtQ-unsplash.webp",
            alt: "Un homme posant"
        },
        {
            category: "weddings",
            img: "./assets/images/gallery/mariage/image1.webp",
            alt: "Un couple heureux et marié"
        },
        {
            category: "portraits",
            img: "./assets/images/gallery/portraits/nino-van-prattenburg--443cl1uR_8-unsplash.webp",
            alt: "Une femme posant"
        },
        {
            category: "concerts",
            img: "./assets/images/gallery/concerts/austin-neill-hgO1wFPXl3I-unsplash.webp",
            alt: "Chanteur dans un concert"
        },
        {
            category: "business",
            img: "./assets/images/gallery/entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash.webp",
            alt: "Une femme qui aime son travail"
        },
    ];

    const modal = document.getElementById("modal");
    const overlay = document.querySelector(".overlay");
    const modalImg = document.getElementById("modal-image");

    function openModal(imageSrc, alt) {
        modal.style.display = "block";
        overlay.style.display = "block";
        modalImg.src = imageSrc;
        modal.style.height = 'auto';
        disableScroll();
    }

    overlay.addEventListener("click", () => {
        closeModal();
    })

    function closeModal() {
        modal.style.display = "none";
        overlay.style.display = "none";
        enableScroll();
    }

    galleryImages.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            openModal(event.target.src, event.target.alt);
            currentImageIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
        }
    });

    let currentImageIndex = 1;

    function showImage(images) {
        const image = images[currentImageIndex];
        openModal(image.img, image.category);
    }

    function showNextImage(images) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(images);
    }

    function showPreviousImage(images) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(images);
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
        const filterName = document.querySelector(".activeFilter").innerText;
        if(!filterName || filterName === "All") {
            showPreviousImage(images);
        } else {
            const filteredImages = images.filter(image => image.category === filterName.toLowerCase());
            console.log("Filter images", filteredImages);
            showPreviousImage(filteredImages);
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        const filterName = document.querySelector(".activeFilter").innerText || "All" ;
        if(filterName === "All") {
            showNextImage(images);
        } else {
            const filteredImages = images.filter(image => image.category === filterName.toLowerCase());
            showNextImage(filteredImages);
        }
    });

    function disableScroll() {
        const scrollPosition = [
            self.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.scrollY  || document.documentElement.scrollTop || document.body.scrollTop
        ];

        const body = document.getElementsByTagName("body")[0];
        body.style.overflow = "hidden";
        body.style.top = `-${scrollPosition[1]}px`;
    }
    
    function enableScroll() {
        const body = document.getElementsByTagName("body")[0];
        body.style.overflow = "initial";
        body.style.position = "initial";
        const scrollPosition = parseInt(body.style.top || "0");
        body.style.top = "";
        window.scrollTo(0, -scrollPosition);
    }

    function getImages(images) {
        images.forEach((image, index) => {
            const theImage = document.createElement("img");
            theImage.src = image.img;
            theImage.alt = image.alt;

            galleryImages.append(theImage);
        })
    }

    getImages(images);

    const filters = document.getElementById("filters");

    const all = document.createElement("button");
    const concerts = document.createElement("button");
    const business = document.createElement("button");
    const weddings = document.createElement("button");
    const portraits = document.createElement("button");

    all.innerText = "Tous";
    concerts.innerText = "Concerts";
    business.innerText = "Entreprises";
    weddings.innerText = "Marriages";
    portraits.innerText = "Portraits";

    filters.appendChild(all);
    filters.appendChild(concerts);
    filters.appendChild(business);
    filters.appendChild(weddings);
    filters.appendChild(portraits);

    all.classList.add("activeFilter");

    let prevClickedButton = null;

        filters.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") {
                const filterName = event.target.innerText;

                all.classList.remove("activeFilter");
                if (prevClickedButton) {
                    prevClickedButton.classList.remove("activeFilter");
                }
    
                event.target.classList.add("activeFilter");
                prevClickedButton = event.target;
    
                switch (filterName) {
                    case "Tous":
                        galleryImages.style.justifyContent = "center";
                        galleryImages.innerHTML = "";
                        getImages(images);
                        break;
                    case "Concerts":
                        const concerts = images.filter(image => image.category === "concerts");
                        if (window.innerWidth > 1100) {
                            galleryImages.style.justifyContent = "flex-start";
                        }
                        galleryImages.innerHTML = "";
                        getImages(concerts);
                        break;
                    case "Entreprises":
                        const business = images.filter(image => image.category === "business");
                        galleryImages.style.justifyContent = "center";
                        galleryImages.innerHTML = "";
                        getImages(business);
                        break;
                    case "Marriages":
                        const weddings = images.filter(image => image.category === "weddings");
                        if (window.innerWidth > 1100) {
                            galleryImages.style.justifyContent = "flex-start";
                        }
                        galleryImages.innerHTML = "";
                        getImages(weddings);
                        break;
                    case "Portraits":
                        const portraits = images.filter(image => image.category === "portraits");
                        if (window.innerWidth > 1100) {
                            galleryImages.style.justifyContent = "flex-start";
                        }
                        galleryImages.innerHTML = "";
                        getImages(portraits);
                        break;
                    default:
                        break;
                }
            }
        })
});
