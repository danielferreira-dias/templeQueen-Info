let currentLanguage = "EN"
let currentCurrency = "EUR"
let gameHasBuyBonus = false
let gameHasBurningMode = true
let gameHasdoubleChance = true
let gameHasHunterMode = true
let mainColor = "#ff0096"

function closeInfo() {
    console.log("Closing info");
}

// ----------------------------------------------------

function startupInfoPage() {
    getRandomColor()
    setCurrency(currentCurrency)
    setLenguage(currentLanguage)
}

function createHeadingSection() {
    const headingSection = document.querySelector(".heading-section-div");

    // Create Heading Section
    const headingSectionTitle = document.createElement("h1");
    const versionDateWrapper = document.createElement("div"); // Create a wrapper for version and date
    headingSectionTitle.style.marginTop = "1.25rem";
    versionDateWrapper.style.textAlign = "center";
    const headingSectionVersion = document.createElement("h3");

    // Set text content
    headingSectionTitle.textContent = "Temple Queen";
    headingSectionVersion.textContent = "Game Version: v1.0.0";

    // Append elements
    headingSection.appendChild(headingSectionTitle);

    // Append version and date into wrapper
    versionDateWrapper.appendChild(headingSectionVersion);
    // versionDateWrapper.appendChild(headingSectionData);

    // Append wrapper to headingSection
    headingSection.appendChild(versionDateWrapper);

    // Append wrapper to headingSection
    headingSection.appendChild(versionDateWrapper);

}

function createHTMLFromJSON() {
    fetch("config.json")
        .then((response) => response.json())
        .then((data) => {

            // Title of the Game
            document.title = "Temple Queen";

            // Create Sections
            const main = document.querySelector(".symbol-section");

            data.Info.Section.forEach((section) => {
                // Create Section Container
                const container = document.createElement("div");
                container.classList.add("container");
                container.style.display = "flex";
                container.style.flexDirection = "column";
                container.style.alignItems = "center";

                const title = document.createElement("h2");
                title.style.border = "groove";
                title.style.borderWidth = "2px 0px 1px 0px";
                title.style.borderColor = mainColor;
                title.style.padding = "5px 0";
                title.textContent = section.Title[currentLanguage];

                const isBuyBonusEnabled = section.sectionType === "BuyBonus" && gameHasBuyBonus;
                const isTripleChanceEnabled = section.sectionType === "tripleChance" && gameHasdoubleChance;
                const isBurningModeEnabled = section.sectionType === "burningMode" && gameHasBurningMode;
                const isHunterModeEnabled = section.sectionType === "hunterMode" && gameHasHunterMode;
                const isRuleSection = section.sectionType === "Rules"
                const isFeature = section.sectionType === "Feature"
                const isSymbolSection = section.sectionType === "lineLayout"
                const isLineSection = section.sectionType === "symbolPayout"
                const isButtonSection = section.sectionType === "Button"

                if (isBuyBonusEnabled || isTripleChanceEnabled || isBurningModeEnabled || isHunterModeEnabled) {
                    container.appendChild(title);
                } else if (isRuleSection || isFeature || isSymbolSection || isLineSection || isButtonSection) {
                    container.appendChild(title);
                }



                // Create a Sub-Section Container for each Container
                section.SubSection.forEach((subSection) => {
                    const subContainer = document.createElement("div");

                    // Display Type of each Sub-Section
                    subContainer.style.display = subSection.Layout;
                    if (section.sectionType != "Feature") {
                        if (subSection.Layout == "grid") {
                            if (section.sectionType == "lineLayout") {
                                subContainer.classList.add("sub-container-grid-line-layout");
                            } else {
                                subContainer.classList.add("sub-container-grid");
                                subContainer.style.width = "fit-content"
                            }
                        } else if (subSection.Layout == "flex") {
                            subContainer.classList.add("sub-container-flex");
                        }
                    } else {
                    }
                    container.append(subContainer);

                    // Symbol Section
                    createSymbolSection(section, subSection, subContainer);

                    // Line Layout Section
                    createLineLayoutSection(
                        container,
                        section,
                        subSection,
                        subContainer
                    );

                    // Rule Section
                    createRuleSection(section, subSection, subContainer);

                    // Features Section
                    createNewSections(section, subSection, subContainer);

                    // Button Page
                    createButtonSection(section, subSection, subContainer);

                    // Buy Bonus
                    createbuyBonusSection(section, subSection, subContainer);
                });

                if (section.sectionType === "BuyBonus") {
                    if (gameHasBuyBonus == true) {
                        main.appendChild(container);
                    }
                } else {
                    main.appendChild(container);
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Backbone Functions
function getRandomColor() {
    // Get the color at the random index
    const color = "ff0096"

    // Return the chosen color
    return color;
}

// Backbone Functions

function setCurrency(serverSideCurrency) {
    currentCurrency = serverSideCurrency;
}

function setLanguage(serverSideLanguage) {
    currentLanguage = serverSideLanguage;
    if (responseData) {
        const headContainer = document.getElementById("heading-section");
        headContainer.innerHTML = "";
        const symbolContainer = document.getElementById("symbol-section");
        symbolContainer.innerHTML = "";
        createHTMLFromJSON(responseData);
        createHeadingSection();
    }
}

// Call The Function to create Symbol Section
function createSymbolSection(section, subSection, subContainer) {
    if (section.sectionType == "symbolPayout") {
        if (
            subSection.displayContent &&
            Array.isArray(subSection.displayContent)
        ) {
            subSection.displayContent.forEach((contentDisplay) => {
                // Adds a Div to each Symbol
                for (let i = contentDisplay.symbols.length - 1; i >= 0; i--) {
                    const displayContent = document.createElement("div");
                    // Add Display Type to Each Symbol Section Div
                    if (contentDisplay.Layout == "grid") {
                        displayContent.classList.add("sub-container-content-grid");
                    } else if (contentDisplay.Layout == "flex") {
                        displayContent.classList.add("sub-container-content-flex");
                    }
                    subContainer.appendChild(displayContent);

                    // Left Div contains Symbol Image
                    const leftDiv = document.createElement("div");
                    leftDiv.classList.add("image-container-symbol");
                    leftDiv.style.backgroundImage = `url("./images/Settings/Symbol/${i}.png")`;
                    const symbolImage = document.createElement("img");
                    leftDiv.appendChild(symbolImage);

                    displayContent.appendChild(leftDiv);

                    // Right Div Parent
                    const rightDivParent = document.createElement("div");
                    rightDivParent.style.display = "flex";
                    rightDivParent.style.marginLeft = "1rem";
                    rightDivParent.style.flexDirection = "column"
                    rightDivParent.style.justifyContent = "center"
                    // rightDivParent.style.flexDirection = "row";
                    rightDivParent.style.flex = 1;

                    // Iterate over symbols and display multipliers, values, and special content
                    contentDisplay.symbols[i].data.forEach((dataInfo) => {
                        const symbolDivLine = document.createElement("div");
                        symbolDivLine.style.display = "flex"
                        symbolDivLine.style.flexDirection = "row"

                        const multiplierSymbol = document.createElement("p");
                        const valueSymbol = document.createElement("p");
                        const specialContentSymbol = document.createElement("p");
                        const currencySymbol = document.createElement("p");

                        multiplierSymbol.innerText = dataInfo.multipliers
                        multiplierSymbol.style.color = mainColor

                        valueSymbol.innerText = dataInfo.value
                        valueSymbol.style.marginLeft = "10px"
                        currencySymbol.style.marginLeft = "5px"

                        currencySymbol.innerText = currentCurrency

                        symbolDivLine.appendChild(multiplierSymbol)
                        symbolDivLine.appendChild(valueSymbol)
                        symbolDivLine.appendChild(currencySymbol)

                        // Check if special content exists
                        if (dataInfo.specialContent[0][currentLanguage] != null) {
                            specialContentSymbol.classList.add("symbol-specialContent-text");
                            specialContentSymbol.innerText = dataInfo.specialContent[0][currentLanguage];
                            specialContentSymbol.style.marginLeft = "10px"

                            // Append special content text to the div
                            symbolDivLine.appendChild(specialContentSymbol);
                        }

                        rightDivParent.appendChild(symbolDivLine)
                    });

                    // Append columns to parent
                    displayContent.appendChild(rightDivParent);
                }
            });
        }
    }
}


// Call The Function to create Line Layout Section
function createLineLayoutSection(mainSection, section, subSection, subContainer) {
    if (section.sectionType == "lineLayout") {
        if (
            subSection.displayContent &&
            Array.isArray(subSection.displayContent)
        ) {
            subSection.displayContent.forEach((contentDisplay) => {
                for (let n = 0; n < contentDisplay.lines.formation.length; n++) {
                    const displayContent = document.createElement("div");
                    const color = "#ff0096";
                    for (let i = 0; i < contentDisplay.lineRows; i++) {
                        const row = document.createElement("div");
                        row.classList.add("line-layout-row");

                        for (let j = 0; j < contentDisplay.lineCols; j++) {
                            const column = document.createElement("div");

                            column.classList.add("line-layout-column");

                            if (i == contentDisplay.lines.formation[n][j]) {
                                column.style.backgroundColor = color;
                                if (j == 0) {
                                    const number = document.createElement("p");
                                    column.classList.add("line-number");
                                    number.textContent = n + 1;
                                    column.appendChild(number);
                                }
                            }

                            row.appendChild(column);
                        }

                        displayContent.appendChild(row);
                    }

                    // Add Display Type to Each Symbol Section Div
                    if (contentDisplay.Layout == "grid") {
                        displayContent.classList.add("sub-container-grid-line-layout");
                    } else if (contentDisplay.Layout == "flex") {
                        displayContent.classList.add("sub-container-content-flex");
                        displayContent.style.borderRadius = "10px";
                        displayContent.style.borderStyle = "solid";
                        displayContent.style.borderWidth = "2px";
                        displayContent.style.borderColor = "#ff0096";
                        displayContent.style.flexDirection = "column";
                        displayContent.style.width = "fit-content";
                        displayContent.style.height = "fit-content";
                        displayContent.style.padding = "0.3rem";
                    }
                    subContainer.appendChild(displayContent);
                }
            });
        }
        if (
            subSection.lineTextContent &&
            Array.isArray(subSection.lineTextContent)
        ) {
            subSection.lineTextContent.forEach((contentLineDisplay) => {
                const linetContent = document.createElement("div");
                linetContent.classList.add("line-layout-text");

                // Access the content for the specified language code
                const contentForLanguage =
                    contentLineDisplay.content[currentLanguage];

                if (contentForLanguage && Array.isArray(contentForLanguage)) {
                    contentForLanguage.forEach((text) => {
                        let typeOfList;
                        if (contentLineDisplay.listType == "li") {
                            typeOfList = document.createElement("li");
                        } else {
                            typeOfList = document.createElement("p");
                        }

                        typeOfList.textContent = text;

                        linetContent.appendChild(typeOfList);
                    });
                }

                mainSection.appendChild(linetContent);
            });
        }
    }
}

function createRuleSection(mainSection, subSection, subContainer) {
    if (mainSection.sectionType == 'Rules') {

        if (subSection.displayContent && Array.isArray(subSection.displayContent)) {
            subSection.displayContent.forEach((contentDisplay) => {
                if (contentDisplay.wording && Array.isArray(contentDisplay.wording)) {
                    contentDisplay.wording.forEach((word) => {
                        if (word.Type === "text" && word.content[currentLanguage]) {
                            let typeOfListText;
                            let typeOfListValue;
                            let rtpValue;
                            let containerRTP;

                            if (contentDisplay.listType == "li") {
                                typeOfListText = document.createElement("li");
                                typeOfListValue = document.createElement("li");
                            } else {
                                typeOfListText = document.createElement("p");
                                typeOfListValue = document.createElement("p");
                            }

                            containerRTP = document.createElement("div")

                            containerRTP.style.display = "flex"
                            containerRTP.style.justifyContent = "center"
                            containerRTP.style.flexWrap = "wrap"

                            // Format the text content based on valueType
                            switch (word.valueType) {
                                case "puntataMinima":
                                case "puntataMaxima":
                                case "maxWinValue":
                                    typeOfListText.textContent = `${word.content[currentLanguage]} `;
                                    typeOfListValue.textContent = ` ${word.value}x the bet`;
                                    containerRTP.appendChild(typeOfListText);
                                    containerRTP.appendChild(typeOfListValue);
                                    containerRTP.style.flexDirection = "row";
                                    containerRTP.style.marginBottom = "10px";
                                    break;
                                case "rtpValue":
                                    typeOfListText.textContent = `${word.content[currentLanguage]}`;
                                    containerRTP.appendChild(typeOfListText);
                                    for (let i = 0; i < word.value[currentLanguage].length; i++) {
                                        rtpValue = document.createElement("p");
                                        rtpValue.textContent = ` ${word.value[currentLanguage][i]}`;
                                        containerRTP.appendChild(rtpValue);
                                        rtpValue.style.textAlign = "center";
                                        rtpValue.style.fontSize = "3.0rem"
                                        rtpValue.style.color = mainColor
                                    }
                                    containerRTP.style.flexDirection = "column";
                                    containerRTP.style.flexWrap = "wrap";
                                    containerRTP.style.marginBottom = "10px";
                                    break;
                                case "maxWinValueLimit":
                                    typeOfListText.textContent = ` ${word.content[currentLanguage]}`;
                                    containerRTP.appendChild(typeOfListText);
                                    containerRTP.style.flexDirection = "row";
                                    break;
                                default:
                                    typeOfListText.textContent = word.Text;
                                    containerRTP.appendChild(typeOfListText);
                                    containerRTP.style.flexDirection = "row";
                            }

                            if (currentLanguage == 'IT') {
                                highlightWords = ["Minima", "Massima", "valore massimo", "RTP", "FREE SPINS"]
                            } else if (currentLanguage == 'EN') {
                                highlightWords = ["Minimum", "Maximum value", "Max", "win", "RTP", "FREE SPINS"]
                            }

                            // Highlight specific words
                            if (highlightWords && Array.isArray(highlightWords)) {
                                highlightWords.forEach((highlightWord) => {
                                    const regex = new RegExp(highlightWord.trim(), "gi");
                                    typeOfListText.innerHTML = typeOfListText.innerHTML.replace(regex, `<span style="color: ${mainColor};">${highlightWord.trim()} </span>`);

                                });
                            }

                            // Apply common styling and append to the container
                            subContainer.style.flexDirection = "column";
                            subContainer.classList.add("sub-container-flex");
                            typeOfListText.style.textAlign = "center";
                            typeOfListValue.style.textAlign = "center";

                            subContainer.appendChild(containerRTP);

                        }
                    });
                }
            });
        }
    }
}


// create new sections
function createNewSections(mainSection, subSection, subContainer) {
    subContainer.style.display = subSection.typeDisplay;
    subContainer.style.flexDirection = subSection.direction;



    if (subSection.typeDisplay === "flex") {
        subContainer.style.justifyContent = subSection.justifyContent;
        subContainer.classList.add("sub-container-flex");
    }

    if (
        mainSection.sectionType === "Feature" &&
        subSection.features &&
        Array.isArray(subSection.features)

    ) {


        subSection.features.forEach((contentDisplay) => {



            const singularDiv = document.createElement("div");
            singularDiv.style.display = contentDisplay.typeDisplay;

            if (contentDisplay.typeDisplay === "flex") {
                singularDiv.style.maxWidth = "100%";
                singularDiv.style.width = "100%";
                singularDiv.classList.add(
                    contentDisplay.direction === "row"
                        ? "singular-div-row"
                        : "singular-div-column"
                );
            }

            contentDisplay.featureContent.forEach((feature) => {
                const contentDiv = document.createElement("div");
                contentDiv.style.flexDirection = feature.direction;

                switch (feature.type) {
                    case "img":
                    case "img_text":
                        contentDiv.classList.add("content-div-class-flex-img");
                        contentDiv.style.flexWrap = feature.wrap;
                        contentDiv.style.flex = 1;
                        contentDiv.style.gap = "40px";
                        contentDiv.style.width = "100%";

                        feature.url.forEach((url) => {
                            const contentDivImage = document.createElement("img");

                            contentDivImage.src = url;
                            if (feature.divMaxWidth != "")
                                contentDivImage.classList.add(feature.divMaxWidth);
                            contentDiv.appendChild(contentDivImage);
                        });

                        const numberOfTextsDiv = document.createElement("div");
                        numberOfTextsDiv.style.display = "flex";
                        numberOfTextsDiv.style.flexDirection = feature.contentDirection;

                        // Right Div Parent
                        const rightDivParent = document.createElement("div");
                        rightDivParent.style.display = "flex";
                        rightDivParent.style.flexDirection = feature.contentDirection;
                        rightDivParent.style.flex = 1;

                        if (feature.hasSpecialData == true) {
                            console.log(feature.data.length)
                            feature.data.forEach((dataInfo) => {
                                const rightDivChild = document.createElement("div");
                                rightDivChild.style.display = "flex"
                                rightDivChild.style.flexDirection = "row"

                                const multiplierValue = document.createElement("p");
                                const symbolValue = document.createElement("p");
                                const specialData = document.createElement("p");
                                const currencySymbol = document.createElement("p");

                                symbolValue.style.marginLeft = "5px"

                                multiplierValue.innerText = dataInfo.multipliers
                                symbolValue.innerText = dataInfo.value
                                currencySymbol.innerText = currentCurrency
                                specialData.innerText = dataInfo.specialContent[0][currentLanguage];

                                if (dataInfo.multipliers != "") rightDivChild.appendChild(multiplierValue)
                                if (dataInfo.value != "") rightDivChild.appendChild(symbolValue) && rightDivChild.appendChild(currencySymbol)
                                if (dataInfo.specialContent[0][currentLanguage] != "") rightDivChild.appendChild(specialData)

                                if (feature.data.length > 1) {
                                    rightDivParent.appendChild(rightDivChild)
                                } else {
                                    if (dataInfo.multipliers != "") rightDivParent.appendChild(multiplierValue)
                                    if (dataInfo.value != "") rightDivParent.appendChild(symbolValue) && rightDivParent.appendChild(currencySymbol)
                                    if (dataInfo.specialContent[0][currentLanguage] != "") rightDivParent.appendChild(specialData)
                                }

                            })

                            contentDiv.appendChild(rightDivParent)
                        }
                        break;

                    case "text":
                    case "plural_text":
                        contentDiv.classList.add("content-div-class-flex-text");
                        contentDiv.style.minWidth = "200px";
                        feature.content[currentLanguage].forEach((text, index) => {
                            const textParagraph = document.createElement("p");
                            textParagraph.textContent = text;
                            contentDiv.appendChild(textParagraph);

                            if (index < feature.content[currentLanguage].length - 1) {
                                contentDiv.appendChild(document.createElement("br"));
                            }
                        });
                        break;

                    case "divContent":
                        contentDiv.classList.add("content-div-class-flex-div");
                        const numberOfDivsContent = feature.numberOfDivs || 1;
                        for (let i = 0; i < numberOfDivsContent; i++) {
                            const borderDiv = document.createElement("div");

                            const textArray = feature.divContentBorder[i];
                            const borderText = document.createElement("p");

                            borderText.textContent =
                                textArray.contentInside[currentLanguage][0];
                            borderDiv.appendChild(borderText);
                            contentDiv.appendChild(borderDiv);
                        }
                        break;
                }

                contentDiv.style.textAlign = feature.textAlignment;
                singularDiv.appendChild(contentDiv);
            });

            subContainer.appendChild(singularDiv);
        });
    }

    // Enter Words to Search based on current language
    const wordsToSearch = ["FREE SPINS", "WILD"];
    if (currentLanguage === "IT") wordsToSearch.push("Minima", "Massima");
    searchDynamicParagraphs(wordsToSearch);
}


// Create Button Page
function createButtonSection(section, subSection, subContainer) {
    if (section.sectionType == "Button") {
        if (
            subSection.displayContent &&
            Array.isArray(subSection.displayContent)
        ) {

            subSection.displayContent.forEach((contentDisplay) => {
                const buttonContainerDiv = document.createElement("div");
                buttonContainerDiv.classList.add("sub-container-grid-button-layout");

                if (contentDisplay.Buttons && Array.isArray(contentDisplay.Buttons)) {
                    contentDisplay.Buttons.forEach((button) => {
                        const mainDivButton = document.createElement("div");
                        mainDivButton.style.display = "flex";
                        mainDivButton.style.flexDirection = "row";
                        mainDivButton.style.alignItems = "center";
                        mainDivButton.style.gap = "2rem";
                        mainDivButton.style.width = "fit-content";

                        const buttonImage = document.createElement("img");
                        buttonImage.src = button.img;

                        const buttonDesc = document.createElement("p");
                        buttonDesc.innerText = button.content[currentLanguage];

                        buttonDesc.style.textAlign = "left";

                        // mainDivButton.style.display = "flex";
                        // mainDivButton.style.flexDirection = "column";
                        // mainDivButton.style.justifyContent = "center";
                        // mainDivButton.style.gap = "10px";
                        // mainDivButton.style.flex = 1;
                        // mainDivButton.style.textAlign = "left";

                        mainDivButton.appendChild(buttonImage);
                        mainDivButton.appendChild(buttonDesc);

                        buttonContainerDiv.appendChild(mainDivButton);
                    });
                }

                subContainer.appendChild(buttonContainerDiv);
            });
        }
    }
}

function createbuyBonusSection(mainSection, subSection, subContainer) {
    const isBuyBonusEnabled = mainSection.sectionType === "BuyBonus" && gameHasBuyBonus;
    const isTripleChanceEnabled = mainSection.sectionType === "tripleChance" && gameHasdoubleChance;
    const isBurningModeEnabled = mainSection.sectionType === "burningMode" && gameHasBurningMode;
    const isHunterModeEnabled = mainSection.sectionType === "hunterMode" && gameHasHunterMode;

    if (isBuyBonusEnabled || isTripleChanceEnabled || isBurningModeEnabled || isHunterModeEnabled) {
        // Section Title

        subSection.features.forEach((feature) => {

            feature.featureContent.forEach((content) => {
                const featureDiv = document.createElement("div");
                featureDiv.style.margin = "10px 0";

                if (content.type === "img" || content.type === "img_text") {
                    featureDiv.classList.add("content-div-class-flex-img");
                    featureDiv.style.width = "100%";

                    content.url.forEach((url) => {
                        const img = document.createElement("img");
                        img.src = url;

                        if (content.divMaxWidth != "")
                            img.classList.add(content.divMaxWidth);
                        featureDiv.appendChild(img);
                    });

                } else if (content.type === "text" || content.type === "plural_text") {
                    featureDiv.classList.add("content-div-class-flex-text");
                    featureDiv.style.flexDirection = feature.direction

                    if (content.type === "plural_text") {
                        content.content[currentLanguage].forEach((paragraph, index) => {
                            const p = document.createElement("p");
                            p.textContent = paragraph;
                            featureDiv.appendChild(p);
                            if (index < content.content[currentLanguage].length - 1) {
                                featureDiv.appendChild(document.createElement("br"));
                                featureDiv.appendChild(document.createElement("br"));
                            }
                        });
                    } else {
                        const p = document.createElement("p");
                        p.textContent = content.content[currentLanguage];
                        featureDiv.appendChild(p);
                    }

                } else if (content.type === "divContent") {
                    featureDiv.classList.add("content-div-class-flex-div");

                    content.divContentBorder.forEach((border) => {
                        const borderDiv = document.createElement("div");
                        borderDiv.style.border = "5px solid #FFD700";
                        borderDiv.style.margin = "10px";
                        borderDiv.style.height = "150px";
                        borderDiv.style.width = "150px";
                        borderDiv.style.display = "flex";
                        borderDiv.style.justifyContent = "center";
                        borderDiv.style.alignItems = "center";

                        const p = document.createElement("p");
                        p.style.fontSize = "1.0rem";
                        p.style.textAlign = "center";
                        p.textContent = border.contentInside[currentLanguage][0];

                        borderDiv.appendChild(p);

                        featureDiv.appendChild(borderDiv);
                    });
                }
                subContainer.appendChild(featureDiv);
            });
        });
    }
}

function searchDynamicParagraphs(keyWords) {
    // Get all <p> elements within the section
    const paragraphs = document.querySelectorAll('p');

    // Iterate over each <p> element
    paragraphs.forEach(paragraph => {

        // Iterate over each search term
        keyWords.forEach(searchTerm => {
            // Check if the text content of the <p> element contains the search term

            if (paragraph.textContent.includes(searchTerm)) {
                // Split the paragraph's text content into parts based on the search term
                const parts = paragraph.textContent.split(searchTerm);

                // Create a new fragment to hold the modified content
                const fragment = document.createDocumentFragment();

                // Iterate over the parts of the text content
                parts.forEach((part, index) => {
                    // Create a new span element for the part
                    const span = document.createElement('span');
                    span.textContent = part;

                    // Append the span to the fragment
                    fragment.appendChild(span);

                    // If this is not the last part, append a span for the search term
                    if (index < parts.length - 1) {
                        const searchTermSpan = document.createElement('span');
                        searchTermSpan.textContent = searchTerm;
                        searchTermSpan.style.color = mainColor; // Apply blue color
                        fragment.appendChild(searchTermSpan);
                    }
                });

                // Clear the paragraph's content and append the modified content
                paragraph.innerHTML = '';
                paragraph.appendChild(fragment);
            }
        });
    });
}

// Call the function to create Heading Section
createHeadingSection();

// Call the function to start populating content
createHTMLFromJSON();


