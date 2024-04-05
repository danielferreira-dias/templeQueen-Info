let currentLanguage = "IT"
let currentCurrency = "EUR"
let gameHasBuyBonus = false
let mainColor = "#ff0096"

function closeInfo() {
    console.log("Closing info");
}

// ----------------------------------------------------

function createHeadingSection() {
    const headingSection = document.querySelector(".heading-section-div");

    // Create Heading Section
    const headingSectionTitle = document.createElement("h1");
    const versionDateWrapper = document.createElement("div"); // Create a wrapper for version and date
    versionDateWrapper.style.textAlign = "center";
    versionDateWrapper.style.display = "flex";
    versionDateWrapper.style.flexDirection = "row";
    versionDateWrapper.style.justifyContent = "center";
    const headingSectionVersion = document.createElement("h3");
    const headingSectionData = document.createElement("h3");

    // Set text content
    headingSectionTitle.textContent = "7Diamond";
    headingSectionVersion.textContent = "Game Version: v1.0.0";

    // Append elements
    headingSection.appendChild(headingSectionTitle);

    // Append version and date into wrapper
    versionDateWrapper.appendChild(headingSectionVersion);
    versionDateWrapper.appendChild(headingSectionData);

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
            document.title = "7Diamond";

            // Create Sections
            const main = document.querySelector(".symbol-section");


            data.Info.Section.forEach((section) => {

                // Create Section Container
                const container = document.createElement("div")
                container.classList.add("container")
                container.style.display = "flex";
                container.style.flexDirection = "column";
                container.style.alignItems = "center"

                // Section Title
                if (section.Type === "Title") {
                    if (section.Title[currentLanguage] == 'CRISTAL SHOP') {
                        if (gameHasBuyBonus == true) {
                            const title = document.createElement("h2");
                            if (section.sectionType != "symbolPayout") {
                                title.style.border = "groove"
                                title.style.borderWidth = "2px 0px 1px 0px"
                                title.style.borderColor = mainColor
                            } else {
                                title.style.border = "groove"
                                title.style.borderWidth = "0px 0px 1px 0px"
                                title.style.borderColor = mainColor
                            }

                            title.textContent = section.Title[currentLanguage];
                            container.appendChild(title);
                        }

                    } else {
                        const title = document.createElement("h2");
                        if (section.sectionType != "symbolPayout") {
                            title.style.border = "groove"
                            title.style.borderWidth = "2px 0px 1px 0px"
                            title.style.borderColor = mainColor
                        } else {
                            title.style.border = "groove"
                            title.style.borderWidth = "0px 0px 1px 0px"
                            title.style.borderColor = mainColor
                        }

                        title.textContent = section.Title[currentLanguage];
                        container.appendChild(title);
                    }

                    // border: inset;
                    // border - width: 0px 0px 1px 0px;
                    // border - color: #ff0096;

                }
                // Create a Sub-Section Container for each Container
                section.SubSection.forEach((subSection) => {
                    const subContainer = document.createElement("div")

                    // Display Type of each Sub-Section
                    subContainer.style.display = subSection.Layout;
                    if (section.sectionType != "Feature") {
                        if (subSection.Layout == "grid") {
                            if (section.sectionType == "lineLayout") {
                                subContainer.classList.add("sub-container-grid-line-layout")
                            } else {
                                subContainer.classList.add("sub-container-grid")
                            }
                        }
                        else if (subSection.Layout == "flex") {
                            subContainer.classList.add("sub-container-flex")
                        }

                    } else {

                    }
                    container.append(subContainer)


                    // Symbol Section
                    createSymbolSection(section, subSection, subContainer)

                    // Line Layout Section
                    createLineLayoutSection(container, section, subSection, subContainer)

                    // Features Section
                    createNewSections(section, subSection, subContainer)

                    // Rule Section
                    createRuleSection(section, subSection, subContainer)

                    // Button Page
                    createButtonSection(section, subSection, subContainer)

                    // Buy Bonus
                    if (gameHasBuyBonus == true) {
                        createbuyBonusSection(section, subSection, subContainer)
                    }

                })


                main.appendChild(container)
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

function setCurrency(serverSideCurrency) {
    currentCurrency = serverSideCurrency
}

function setCurrency(serverSideLanguage) {
    currentLanguage = serverSideLanguage
}

// Call The Function to create Symbol Section
function createSymbolSection(section, subSection, subContainer) {
    if (section.sectionType == 'symbolPayout') {
        if (subSection.displayContent && Array.isArray(subSection.displayContent)) {
            subSection.displayContent.forEach((contentDisplay) => {
                // Adds a Div to each Symbol
                for (let i = contentDisplay.symbols.length - 1; i >= 0; i--) {
                    const displayContent = document.createElement("div");
                    // Add Display Type to Each Symbol Section Div
                    if (contentDisplay.Layout == "grid") {
                        displayContent.classList.add("sub-container-content-grid");

                    }
                    else if (contentDisplay.Layout == "flex") {
                        displayContent.classList.add("sub-container-content-flex");
                    }
                    subContainer.appendChild(displayContent)

                    // Left Div contains Symbol Image
                    const leftDiv = document.createElement("div");
                    leftDiv.classList.add("image-container-symbol");
                    leftDiv.style.backgroundImage = `url("./images/Settings/Symbol/${i}.png")`;
                    const symbolImage = document.createElement("img")
                    leftDiv.appendChild(symbolImage)

                    displayContent.appendChild(leftDiv);

                    // Right Div Parent
                    const rightDivParent = document.createElement("div");
                    rightDivParent.style.display = "flex";
                    rightDivParent.style.flexDirection = "row";
                    rightDivParent.style.flex = 1;

                    // Right Div contains Multipliers
                    const rightDivMultiplierCol = document.createElement("div");
                    rightDivMultiplierCol.classList.add("list-container-left");

                    // Right Div contains Values
                    const rightDivValueCol = document.createElement("div");
                    rightDivValueCol.classList.add("list-container-right");


                    // Iterate over symbols and display multipliers, values, and special content
                    contentDisplay.symbols[i].data.forEach((dataInfo) => {
                        const listDiv = document.createElement("div");
                        listDiv.classList.add("list-div");

                        const multiplierText = document.createElement("p");
                        multiplierText.classList.add("multiplier-symbol-value-text");
                        multiplierText.innerText = dataInfo.multipliers;

                        // Apply CSS to control text overflow
                        multiplierText.style.overflow = "hidden";
                        multiplierText.style.textOverflow = "ellipsis"; // or any other desired style

                        listDiv.appendChild(multiplierText);
                        rightDivMultiplierCol.appendChild(listDiv);

                        const valueText = document.createElement("p");
                        valueText.classList.add("symbol-value-text");

                        var normalizedValue = dataInfo.value.replace(',', '.');
                        if (parseFloat(normalizedValue) > 0.0) {
                            valueText.innerText = normalizedValue + currentCurrency;
                        }

                        // Apply CSS to control text overflow
                        valueText.style.overflow = "hidden";
                        valueText.style.textOverflow = "ellipsis"; // or any other desired style

                        // Create a div to contain both value and special content
                        const valueSpecialContentDiv = document.createElement("div");
                        valueSpecialContentDiv.classList.add("value-special-content-div");

                        // Append value text to the div
                        valueSpecialContentDiv.appendChild(valueText);

                        // Check if special content exists
                        if (dataInfo.specialContent != null) {
                            const specialContentText = document.createElement("p");
                            specialContentText.classList.add("symbol-specialContent-text");
                            specialContentText.innerText = dataInfo.specialContent;

                            // Apply CSS to control text overflow
                            specialContentText.style.overflow = "hidden";
                            specialContentText.style.textOverflow = "ellipsis"; // or any other desired style

                            // Append special content text to the div
                            valueSpecialContentDiv.appendChild(specialContentText);
                        }

                        // Append the div containing both value and special content to the column
                        rightDivValueCol.appendChild(valueSpecialContentDiv);
                    });

                    // Append columns to parent
                    rightDivParent.appendChild(rightDivMultiplierCol);
                    rightDivParent.appendChild(rightDivValueCol);
                    displayContent.appendChild(rightDivParent);

                }
            });
        }
    }
};

// Call The Function to create Line Layout Section
function createLineLayoutSection(mainSection, section, subSection, subContainer) {
    if (section.sectionType == 'lineLayout') {
        if (subSection.displayContent && Array.isArray(subSection.displayContent)) {
            subSection.displayContent.forEach((contentDisplay) => {

                for (let n = 0; n < contentDisplay.lines.formation.length; n++) {
                    const displayContent = document.createElement("div");
                    const color = "#" + getRandomColor()
                    for (let i = 0; i < contentDisplay.lineRows; i++) {
                        const row = document.createElement('div');
                        row.classList.add('line-layout-row');

                        for (let j = 0; j < contentDisplay.lineCols; j++) {
                            const column = document.createElement('div');

                            column.classList.add('line-layout-column');

                            if (i == contentDisplay.lines.formation[n][j]) {
                                column.style.backgroundColor = color;
                                if (j == 0) {
                                    const number = document.createElement('p');
                                    column.classList.add('line-number');
                                    number.style.fontSize = "1.5rem"
                                    number.textContent = n + 1
                                    column.appendChild(number)
                                }

                            }

                            row.appendChild(column);
                        }

                        displayContent.appendChild(row);
                    }

                    // Add Display Type to Each Symbol Section Div
                    if (contentDisplay.Layout == "grid") {
                        displayContent.classList.add("sub-container-grid-line-layout");

                    }
                    else if (contentDisplay.Layout == "flex") {
                        displayContent.classList.add("sub-container-content-flex");
                        displayContent.style.borderRadius = "10px"
                        displayContent.style.borderStyle = "solid";
                        displayContent.style.borderWidth = "8px";
                        displayContent.style.borderColor = "#b72342"
                        displayContent.style.flexDirection = "column";
                    }
                    subContainer.appendChild(displayContent)
                }

            })
        }
        if (subSection.lineTextContent && Array.isArray(subSection.lineTextContent)) {
            subSection.lineTextContent.forEach((contentLineDisplay) => {
                const linetContent = document.createElement("div");
                linetContent.classList.add("line-layout-text")



                // Access the content for the specified language code
                const contentForLanguage = contentLineDisplay.content[currentLanguage];

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

                mainSection.appendChild(linetContent)
            })
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

                            // Format the text content based on valueType
                            switch (word.valueType) {
                                case "puntataMinima":
                                    typeOfListText.textContent = `${word.content[currentLanguage]} `;
                                    typeOfListValue.textContent = `${word.value} ${currentCurrency}`;

                                    containerRTP.appendChild(typeOfListText)
                                    containerRTP.appendChild(typeOfListValue)



                                    containerRTP.style.flexDirection = "row"
                                case "puntataMaxima":
                                    typeOfListText.textContent = `${word.content[currentLanguage]} `;
                                    typeOfListValue.textContent = `${word.value} ${currentCurrency}`;
                                    containerRTP.appendChild(typeOfListText)
                                    containerRTP.appendChild(typeOfListValue)
                                    containerRTP.style.flexDirection = "row"
                                    break;
                                case "maxWinValue":
                                    typeOfListText.textContent = `${word.content[currentLanguage]}`;
                                    subContainer.appendChild(typeOfListText);

                                    typeOfListText.textContent = `${word.content[currentLanguage]} `;
                                    typeOfListValue.textContent = `${word.value}x the bet`;
                                    containerRTP.appendChild(typeOfListText)
                                    containerRTP.appendChild(typeOfListValue)
                                    containerRTP.style.flexDirection = "row"

                                    break;
                                case "rtpValue":

                                    rtpValue = document.createElement("p");
                                    typeOfListText.textContent = `${word.content[currentLanguage]}`;
                                    rtpValue.textContent = `${word.value}`

                                    containerRTP.appendChild(typeOfListText)
                                    containerRTP.appendChild(rtpValue)

                                    rtpValue.style.textAlign = "center"
                                    rtpValue.style.fontSize = "3.0rem"
                                    rtpValue.style.color = mainColor
                                    containerRTP.style.flexDirection = "column"
                                    containerRTP.style.flexWrap = "wrap"

                                    break;
                                case "maxWinValueLimit":
                                    typeOfListText.textContent = `${word.content[currentLanguage]}`;
                                    containerRTP.appendChild(typeOfListText)
                                    containerRTP.style.flexDirection = "row"
                                    break;
                                default:
                                    typeOfListText.textContent = word.Text;
                                    containerRTP.appendChild(typeOfListText)
                                    containerRTP.style.flexDirection = "row"
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
                                    typeOfListText.innerHTML = typeOfListText.innerHTML.replace(regex, `<span style="color: ${mainColor};">${highlightWord.trim()}</span>`);

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



// Call to create New Sections
function createNewSections(mainSection, subSection, subContainer) {
    subContainer.style.display = subSection.typeDisplay;
    subContainer.style.flexDirection = subSection.direction;
    if (subSection.typeDisplay === "flex") {
        subContainer.style.justifyContent = subSection.justifyContent;
        subContainer.classList.add("sub-container-flex")
    }

    if (mainSection.sectionType === "Feature") {
        if (subSection.features && Array.isArray(subSection.features)) {
            subSection.features.forEach((contentDisplay) => {
                const singularDiv = document.createElement("div");
                singularDiv.style.display = contentDisplay.typeDisplay;

                if (contentDisplay.typeDisplay === "flex") {
                    singularDiv.style.maxWidth = "100%"
                    if (contentDisplay.direction == "row") {
                        singularDiv.classList.add("singular-div-row")
                    } else {
                        singularDiv.classList.add("singular-div-column")
                    }
                }

                for (let j = 0; j < contentDisplay.featureContent.length; j++) {
                    singularDiv.style.flexDirection = contentDisplay.featureContent[j].direction;

                    if (contentDisplay.featureContent[j].type === "img") {
                        singularDiv.classList.add("content-div-class-flex-img");
                        singularDiv.style.flexWrap = contentDisplay.featureContent[j].wrap;

                        for (let i = 0; i < contentDisplay.featureContent[j].url.length; i++) {
                            const contentDivImage = document.createElement("img");
                            contentDivImage.src = contentDisplay.featureContent[j].url[i];
                            let imageCount = contentDisplay.featureContent[j].url.length;
                            if (imageCount > 1) {
                                let imageWidth = `calc(100% / ${imageCount})`;
                                contentDivImage.style.width = imageWidth;
                            }
                            if (contentDisplay.featureContent[j].imageType == "big") {
                                contentDivImage.classList.add("big-image")
                            } else if (contentDisplay.featureContent[j].imageType == "small") {
                                contentDivImage.classList.add("small-image")
                            }
                            singularDiv.appendChild(contentDivImage);
                        }
                    } else if (contentDisplay.featureContent[j].type === "text") {
                        singularDiv.classList.add("content-div-class-flex-text");
                        const textParagraph = document.createElement("p");
                        textParagraph.textContent = contentDisplay.featureContent[j].content[currentLanguage];

                        singularDiv.appendChild(textParagraph);
                    } else if (contentDisplay.featureContent[j].type === "plural_text") {

                        for (let i = 0; i < contentDisplay.featureContent[j].content[currentLanguage].length; i++) {

                            singularDiv.classList.add("content-div-class-flex-text");

                            const textParagraph = document.createElement("p");
                            textParagraph.textContent = contentDisplay.featureContent[j].content[currentLanguage][i];

                            singularDiv.appendChild(textParagraph);
                        }
                    } else if (contentDisplay.featureContent[j].type === "img_text") {

                        contentDiv = document.createElement("div");

                        contentDiv.classList.add("content-div-class-flex-img");
                        contentDiv.style.flexWrap = contentDisplay.featureContent[j].wrap;

                        for (let i = 0; i < contentDisplay.featureContent[j].url.length; i++) {
                            const contentDivImage = document.createElement("img");
                            contentDivImage.src = contentDisplay.featureContent[j].url[i];
                            let imageCount = contentDisplay.featureContent[j].url.length;
                            if (imageCount > 1) {
                                let imageWidth = `calc(100% / ${imageCount})`;
                                contentDivImage.style.width = imageWidth;
                            }
                            if (contentDisplay.featureContent[j].imageType == "big") {
                                contentDivImage.classList.add("big-image")
                            } else if (contentDisplay.featureContent[j].imageType == "small") {
                                contentDivImage.classList.add("small-image")
                            }
                            contentDiv.appendChild(contentDivImage);
                        }

                        const numberOfTextsDiv = document.createElement("div");
                        numberOfTextsDiv.style.display = "flex"
                        numberOfTextsDiv.style.flexDirection = contentDisplay.featureContent[j].contentDirection

                        // Right Div Parent
                        const rightDivParent = document.createElement("div");
                        rightDivParent.style.display = "flex";
                        rightDivParent.style.flexDirection = "row";
                        rightDivParent.style.flex = 1;

                        // Right Div contains Multipliers
                        const rightDivMultiplierCol = document.createElement("div");
                        rightDivMultiplierCol.classList.add("list-container-left");

                        // Right Div contains Values
                        const rightDivValueCol = document.createElement("div");
                        rightDivValueCol.classList.add("list-container-right");


                        // Iterate over symbols and display multipliers, values, and special content
                        contentDisplay.featureContent[j].data.forEach((dataInfo) => {
                            const listDiv = document.createElement("div");
                            listDiv.classList.add("list-div");

                            const multiplierText = document.createElement("p");
                            multiplierText.classList.add("multiplier-symbol-value-text");
                            multiplierText.innerText = dataInfo.multipliers;

                            // Apply CSS to control text overflow
                            multiplierText.style.overflow = "hidden";
                            multiplierText.style.textOverflow = "ellipsis"; // or any other desired style

                            listDiv.appendChild(multiplierText);
                            rightDivMultiplierCol.appendChild(listDiv);

                            const valueText = document.createElement("p");
                            valueText.classList.add("symbol-value-text");
                            valueText.innerText = dataInfo.value + '' + currentCurrency;

                            // Apply CSS to control text overflow
                            valueText.style.overflow = "hidden";
                            valueText.style.textOverflow = "ellipsis"; // or any other desired style

                            // Create a div to contain both value and special content
                            const valueSpecialContentDiv = document.createElement("div");
                            valueSpecialContentDiv.classList.add("value-special-content-div");

                            // Append value text to the div
                            valueSpecialContentDiv.appendChild(valueText);

                            // Check if special content exists
                            if (dataInfo.specialContent != null) {
                                const specialContentText = document.createElement("p");
                                specialContentText.classList.add("symbol-specialContent-text");
                                specialContentText.innerText = dataInfo.specialContent;

                                // Apply CSS to control text overflow
                                specialContentText.style.overflow = "hidden";
                                specialContentText.style.textOverflow = "ellipsis"; // or any other desired style

                                // Append special content text to the div
                                valueSpecialContentDiv.appendChild(specialContentText);
                            }

                            // Append the div containing both value and special content to the column
                            rightDivValueCol.appendChild(valueSpecialContentDiv);
                        })
                        numberOfTextsDiv.appendChild(rightDivValueCol)

                        // Append columns to parent
                        rightDivParent.appendChild(rightDivMultiplierCol);
                        rightDivParent.appendChild(rightDivValueCol);

                        contentDiv.appendChild(rightDivParent)

                        singularDiv.appendChild(contentDiv);


                    } else if (contentDisplay.featureContent[j].type == "divContent") {
                        singularDiv.classList.add("content-div-class-flex-div");
                        // Check if numberOfDivsContent is defined
                        const numberOfDivsContent = contentDisplay.featureContent[j].numberOfDivs || 1;

                        for (let i = 0; i < numberOfDivsContent; i++) {
                            // Create a new div element for each iteration
                            const borderDiv = document.createElement("div");

                            // Apply CSS to the Borders
                            borderDiv.style.borderStyle = "solid";
                            borderDiv.style.margin = "10px";
                            borderDiv.style.height = "150px";
                            borderDiv.style.width = "150px";
                            borderDiv.style.borderWidth = "5px";
                            borderDiv.style.borderColor = "	#FFD700"

                            // Apply Flexbox to align text vertically
                            borderDiv.style.display = "flex";
                            borderDiv.style.justifyContent = "center"; // Align horizontally
                            borderDiv.style.alignItems = "center"; // Align vertically

                            // Append the new div to the main contentDiv
                            singularDiv.appendChild(borderDiv);

                            // Access the text array for the current border div
                            const textArray = contentDisplay.featureContent[j].divContentBorder[i];

                            // Inside The Border Divs, Apply Text
                            const borderText = document.createElement("p");
                            borderText.style.fontSize = "1.0rem";
                            borderText.style.textAlign = "center";

                            borderText.textContent = textArray.contentInside;

                            // Append the text to the current borderDiv
                            borderDiv.appendChild(borderText);
                        }
                    }

                    singularDiv.style.textAlign = contentDisplay.featureContent[j].textAlignment


                }

                subContainer.appendChild(singularDiv);

                // // Enter Words to Search based on current language
                if (currentLanguage === "EN") {
                    searchDynamicParagraphs(["FREE SPINS", "WILD"]);
                } else if (currentLanguage === "ZH") {
                    searchDynamicParagraphs(["FREE SPINS", "WILD"]);
                } else if (currentLanguage === "RUS") {
                    searchDynamicParagraphs(["FREE SPINS", "WILD"]);
                } else if (currentLanguage === "PT") {
                    searchDynamicParagraphs(["FREE SPINS", "WILD"]);
                } else if (currentLanguage === "FR") {
                    searchDynamicParagraphs(["FREE SPINS", "WILD"]);
                } else if (currentLanguage === "US") {
                    searchDynamicParagraphs(["FREE SPINS", "WILD"]);
                } else if (currentLanguage === "IT") {
                    searchDynamicParagraphs(["FREE SPINS", "WILD", "Minima", "Massima"]);
                }

            });
        }
    }
}

// Create Button Page
function createButtonSection(section, subSection, subContainer) {

    if (section.sectionType == 'Button') {
        if (subSection.displayContent && Array.isArray(subSection.displayContent)) {
            subSection.displayContent.forEach((contentDisplay) => {

                const buttonContainerDiv = document.createElement("div");
                buttonContainerDiv.classList.add('sub-container-grid-button-layout')

                if (contentDisplay.Buttons && Array.isArray(contentDisplay.Buttons)) {
                    contentDisplay.Buttons.forEach((button) => {

                        const mainDivButton = document.createElement("div");
                        mainDivButton.style.display = "flex"
                        mainDivButton.style.flexDirection = "row"

                        const buttonImage = document.createElement("img");
                        buttonImage.src = button.img;
                        buttonImage.style.width = '80%'

                        const buttonDesc = document.createElement("p");
                        buttonDesc.innerText = button.content[currentLanguage];

                        const buttonDiv = document.createElement("div");
                        buttonDiv.style.display = "flex"
                        buttonDiv.style.flexDirection = "column"
                        buttonDiv.style.justifyContent = "center"
                        buttonDiv.style.alignItems = "center"
                        buttonDiv.style.margin = " 10px 0px "
                        buttonDiv.style.flex = '0 0 30%'
                        buttonDesc.style.textAlign = 'left'
                        buttonDesc.style.fontSize = '1.7rem'

                        const buttonDivText = document.createElement("div");
                        buttonDivText.style.display = "flex"
                        buttonDivText.style.flexDirection = "column"
                        buttonDivText.style.justifyContent = "center"
                        buttonDivText.style.margin = " 10px 0px "
                        buttonDivText.style.flex = 1

                        buttonDiv.appendChild(buttonImage);
                        buttonDivText.appendChild(buttonDesc);

                        mainDivButton.appendChild(buttonDiv);
                        mainDivButton.appendChild(buttonDivText);

                        buttonContainerDiv.appendChild(mainDivButton)
                    });
                }

                subContainer.appendChild(buttonContainerDiv);
            });
        }
    }
}

// In case the game has buy bonus display the respective section
function createbuyBonusSection(mainSection, subSection, subContainer) {
    if (mainSection.sectionType === "BuyBonus" && gameHasBuyBonus == true) {
        if (subSection.features && Array.isArray(subSection.features)) {
            subSection.features.forEach((contentDisplay) => {
                const singularDiv = document.createElement("div");
                singularDiv.style.display = contentDisplay.typeDisplay;

                if (contentDisplay.typeDisplay === "flex") {
                    singularDiv.style.maxWidth = "100%"
                    if (contentDisplay.direction == "row") {
                        singularDiv.classList.add("singular-div-row")
                    } else {
                        singularDiv.classList.add("singular-div-column")
                    }
                }

                for (let j = 0; j < contentDisplay.featureContent.length; j++) {
                    const singularDiv = document.createElement("div");

                    singularDiv.style.flexDirection = contentDisplay.featureContent[j].direction;

                    if (contentDisplay.featureContent[j].type === "img") {
                        singularDiv.classList.add("content-div-class-flex-img");
                        singularDiv.style.flexWrap = contentDisplay.featureContent[j].wrap;

                        for (let i = 0; i < contentDisplay.featureContent[j].url.length; i++) {
                            const contentDivImage = document.createElement("img");
                            contentDivImage.src = contentDisplay.featureContent[j].url[i];
                            if (contentDisplay.featureContent[j].imageType == "big") {
                                contentDivImage.classList.add("big-image")
                            } else if (contentDisplay.featureContent[j].imageType == "small") {
                                contentDivImage.classList.add("small-image")
                            }
                            singularDiv.appendChild(contentDivImage);
                        }
                    } else if (contentDisplay.featureContent[j].type === "text") {
                        singularDiv.classList.add("content-div-class-flex-text");
                        const textParagraph = document.createElement("p");
                        textParagraph.textContent = contentDisplay.featureContent[j].content[currentLanguage];

                        singularDiv.appendChild(textParagraph);
                    } else if (contentDisplay.featureContent[j].type === "plural_text") {

                        for (let i = 0; i < contentDisplay.featureContent[j].content[currentLanguage].length; i++) {

                            singularDiv.classList.add("content-div-class-flex-text");

                            const textParagraph = document.createElement("p");
                            textParagraph.textContent = contentDisplay.featureContent[j].content[currentLanguage][i];

                            singularDiv.appendChild(textParagraph);
                        }
                    } else if (contentDisplay.featureContent[j].type === "img_text") {

                        singularDiv.classList.add("content-div-class-flex-img");
                        singularDiv.style.flexWrap = contentDisplay.featureContent[j].wrap;

                        for (let i = 0; i < contentDisplay.featureContent[j].url.length; i++) {
                            const contentDivImage = document.createElement("img");
                            contentDivImage.src = contentDisplay.featureContent[j].url[i];
                            if (contentDisplay.featureContent[j].imageType == "big") {
                                contentDivImage.classList.add("big-image")
                            } else if (contentDisplay.featureContent[j].imageType == "small") {
                                contentDivImage.classList.add("small-image")
                            }
                            singularDiv.appendChild(contentDivImage);
                        }

                        const numberOfTextsDiv = document.createElement("div");
                        numberOfTextsDiv.style.display = "flex"
                        numberOfTextsDiv.style.flexDirection = contentDisplay.featureContent[j].contentDirection

                        // Right Div Parent
                        const rightDivParent = document.createElement("div");
                        rightDivParent.style.display = "flex";
                        rightDivParent.style.flexDirection = "row";
                        rightDivParent.style.flex = 1;

                        // Right Div contains Multipliers
                        const rightDivMultiplierCol = document.createElement("div");
                        rightDivMultiplierCol.classList.add("list-container-left");

                        // Right Div contains Values
                        const rightDivValueCol = document.createElement("div");
                        rightDivValueCol.classList.add("list-container-right");


                        // Iterate over symbols and display multipliers, values, and special content
                        contentDisplay.featureContent[j].data.forEach((dataInfo) => {
                            const listDiv = document.createElement("div");
                            listDiv.classList.add("list-div");

                            const multiplierText = document.createElement("p");
                            multiplierText.classList.add("multiplier-symbol-value-text");
                            multiplierText.innerText = dataInfo.multipliers;

                            // Apply CSS to control text overflow
                            multiplierText.style.overflow = "hidden";
                            multiplierText.style.textOverflow = "ellipsis"; // or any other desired style

                            listDiv.appendChild(multiplierText);
                            rightDivMultiplierCol.appendChild(listDiv);

                            const valueText = document.createElement("p");
                            valueText.classList.add("symbol-value-text");
                            valueText.innerText = dataInfo.value + currentCurrency;

                            // Apply CSS to control text overflow
                            valueText.style.overflow = "hidden";
                            valueText.style.textOverflow = "ellipsis"; // or any other desired style

                            // Create a div to contain both value and special content
                            const valueSpecialContentDiv = document.createElement("div");
                            valueSpecialContentDiv.classList.add("value-special-content-div");

                            // Append value text to the div
                            valueSpecialContentDiv.appendChild(valueText);

                            // Check if special content exists
                            if (dataInfo.specialContent != null) {
                                const specialContentText = document.createElement("p");
                                specialContentText.classList.add("symbol-specialContent-text");
                                specialContentText.innerText = dataInfo.specialContent;

                                // Apply CSS to control text overflow
                                specialContentText.style.overflow = "hidden";
                                specialContentText.style.textOverflow = "ellipsis"; // or any other desired style

                                // Append special content text to the div
                                valueSpecialContentDiv.appendChild(specialContentText);
                            }

                            // Append the div containing both value and special content to the column
                            rightDivValueCol.appendChild(valueSpecialContentDiv);
                        })
                        numberOfTextsDiv.appendChild(rightDivValueCol)

                        // Append columns to parent
                        rightDivParent.appendChild(rightDivMultiplierCol);
                        rightDivParent.appendChild(rightDivValueCol);
                        singularDiv.appendChild(rightDivParent);

                    } else if (contentDisplay.featureContent[j].type == "divContent") {
                        singularDiv.classList.add("content-div-class-flex-div");
                        // Check if numberOfDivsContent is defined
                        const numberOfDivsContent = contentDisplay.featureContent[j].numberOfDivs || 1;

                        for (let i = 0; i < numberOfDivsContent; i++) {
                            // Create a new div element for each iteration
                            const borderDiv = document.createElement("div");

                            // Apply CSS to the Borders
                            borderDiv.style.borderStyle = "solid";
                            borderDiv.style.margin = "10px";
                            borderDiv.style.height = "150px";
                            borderDiv.style.width = "150px";
                            borderDiv.style.borderWidth = "5px";
                            borderDiv.style.borderColor = "	#FFD700"

                            // Apply Flexbox to align text vertically
                            borderDiv.style.display = "flex";
                            borderDiv.style.justifyContent = "center"; // Align horizontally
                            borderDiv.style.alignItems = "center"; // Align vertically

                            // Append the new div to the main contentDiv
                            singularDiv.appendChild(borderDiv);

                            // Access the text array for the current border div
                            const textArray = contentDisplay.featureContent[j].divContentBorder[i];

                            // Inside The Border Divs, Apply Text
                            const borderText = document.createElement("p");
                            borderText.style.fontSize = "1.0rem";
                            borderText.style.textAlign = "center";

                            borderText.textContent = textArray.contentInside;

                            // Append the text to the current borderDiv
                            borderDiv.appendChild(borderText);
                        }
                    }
                    singularDiv.style.textAlign = contentDisplay.featureContent[j].textAlignment


                }

                subContainer.appendChild(singularDiv);

            });
        }
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


