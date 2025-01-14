const exchangeRate = 0.0024; // Example: 1 HUF = 0.0027 EUR

document.addEventListener("DOMContentLoaded", () => {
    const langHuBtn = document.getElementById("lang-hu");
    const langEnBtn = document.getElementById("lang-en");

    const title = document.getElementById("title");
    const intro = document.getElementById("intro");
    const contactBtn = document.getElementById("contact-btn");
    const referencesBtn = document.getElementById("references-btn");
    const serviceHeader = document.getElementById("service-header");
    const priceHeader = document.getElementById("price-header");

    const priceToggle = document.getElementById("price-toggle");
    const priceTable = document.getElementById("price-table");
    const priceRows = document.querySelectorAll("#price-table tbody tr");

    const translations = {
        hu: {
            title: "Designer - Megbízásokat vállalok",
            intro:
                "Demjén Sándor Levente vagyok, 23 éves motivált alkotó. Kreatív munkámat ajánlom azoknak, akik szeretnék ötleteiket és elképzeléseiket precíz, letisztult formában kézhez kapni!",
            contactBtn: "Kapcsolat",
            referencesBtn: "Referenciák",
            serviceHeader: "Szolgáltatás",
            priceHeader: "Ár",
            priceToggleShow: "Árlista",
            priceToggleHide: "Árlista elrejtése",
            services: {
                "Sticker": "Matrica",
                "Illustration": "Illusztráció",
                "Creative Design": "Kreatív dizájn",
                "Character Design (Front View)": "Karakter dizájn (Elölnézet)",
                "Character Design (Full Rotation)": "Karakter dizájn (Teljes körbeforgás)",
                "Pixel Art": "Pixel Art",
                "Pixel Art Animation": "Pixel Art animáció",
                "Poster Design": "Poszter dizájn",
                "Other Ideas": "Egyéb ötletek",
            },
            custom: "Egyedi megállapodás alapján",
            currency: (price) => `${price.toLocaleString()} Ft`,
        },
        en: {
            title: "Designer - Open for Commissions",
            intro:
                "I am Sandor Levente Demjen, a 23 years old motivated creator. I offer my creative work to those who want their ideas and concepts delivered in a precise, refined form!",
            contactBtn: "Contact Me",
            referencesBtn: "References",
            serviceHeader: "Service",
            priceHeader: "Price",
            priceToggleShow: "Prices",
            priceToggleHide: "Hide Prices",
            services: {
                "Sticker": "Sticker",
                "Illustration": "Illustration",
                "Creative Design": "Creative Design",
                "Character Design (Front View)": "Character Design (Front View)",
                "Character Design (Full Rotation)": "Character Design (Full Rotation)",
                "Pixel Art": "Pixel Art",
                "Pixel Art Animation": "Pixel Art Animation",
                "Poster Design": "Poster Design",
                "Other Ideas": "Other Ideas",
            },
            custom: "Custom Agreement",
            currency: (price) => `€${Math.ceil(price * exchangeRate).toLocaleString()}`,
        },
    };

    const applyTranslations = (lang) => {
        const langData = translations[lang];

        title.textContent = langData.title;
        intro.textContent = langData.intro;
        contactBtn.textContent = langData.contactBtn;
        referencesBtn.textContent = langData.referencesBtn;
        serviceHeader.textContent = langData.serviceHeader;
        priceHeader.textContent = langData.priceHeader;

        // Update the toggle text based on the language
        priceToggle.textContent = langData.priceToggleShow;

        priceRows.forEach((row) => {
            const serviceCell = row.cells[0]; // First column: Service name
            const priceCell = row.cells[2]; // Third column: Price
            const hufPrice = row.getAttribute("data-huf");
        
            const serviceName = Object.keys(translations.hu.services).find(
                (key) => translations.hu.services[key] === serviceCell.textContent || key === serviceCell.textContent
            );
        
            serviceCell.textContent = langData.services[serviceName] || langData.custom;
            priceCell.textContent = hufPrice ? langData.currency(parseInt(hufPrice)) : langData.custom;
        });
        
    };

    langHuBtn.addEventListener("click", () => applyTranslations("hu"));
    langEnBtn.addEventListener("click", () => applyTranslations("en"));

    // Smooth toggle for price table
    priceToggle.addEventListener("click", () => {
        if (priceTable.classList.contains("hidden")) {
            priceTable.classList.remove("hidden");
            priceTable.style.maxHeight = `${priceTable.scrollHeight}px`;
            priceToggle.textContent =
                priceToggle.textContent === translations.en.priceToggleShow
                    ? translations.en.priceToggleHide
                    : translations.hu.priceToggleHide;
        } else {
            priceTable.style.maxHeight = "0px";
            priceTable.addEventListener(
                "transitionend",
                () => {
                    if (priceTable.style.maxHeight === "0px") {
                        priceTable.classList.add("hidden");
                    }
                },
                { once: true }
            );
            priceToggle.textContent =
                priceToggle.textContent === translations.en.priceToggleHide
                    ? translations.en.priceToggleShow
                    : translations.hu.priceToggleShow;
        }
    });

    // Initialize with Hungarian translations
    applyTranslations("hu");
});

document.addEventListener("DOMContentLoaded", () => {
    const eyeIcons = document.querySelectorAll(".eye-icon");
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.getElementById("close-modal");

    // Show image in modal when eye icon is clicked
    eyeIcons.forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.preventDefault();
            const imgSrc = e.target.closest('a').parentNode.parentNode.getAttribute('data-img');
            modalImg.src = imgSrc; // Set the image source
            modal.style.display = "flex"; // Show the modal
        });
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
