let currentLanguage = "EN"


let currency = [
    {
        "EN": "EUR",
        "RU": "RUB",
        "FR": "EUR",
        "ZH": "CNY",
        "US": "USD",
        "PT": "EUR"
    }
];

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
                if (section.title != "Rules") {
                    if (section.Type === "Title") {
                        const title = document.createElement("h2");
                        if (section.sectionType != "symbolPayout") {
                            title.style.border = "inset"
                            title.style.borderWidth = "2px 0px 1px 0px"
                            title.style.borderColor = "#ff0096"
                        } else {
                            title.style.border = "inset"
                            title.style.borderWidth = "0px 0px 1px 0px"
                            title.style.borderColor = "#ff0096"
                        }

                        // border: inset;
                        // border - width: 0px 0px 1px 0px;
                        // border - color: #ff0096;
                        title.textContent = section.Title[currentLanguage];
                        container.appendChild(title);
                    }
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
                    createLineLayoutSection(container, subSection, subContainer)

                    // Features Section
                    createNewSections(section, subSection, subContainer)

                    // Rule Section
                    createRuleSection(subSection, subContainer)

                    // Button Page
                    createButtonSection(section, subSection, subContainer)

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

// Call the function to create Heading Section
createHeadingSection();
// Call the function to start populating content
createHTMLFromJSON();

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
                        valueText.innerText = dataInfo.value;

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
function createLineLayoutSection(mainSection, subSection, subContainer) {
    if (subSection.displayContent && Array.isArray(subSection.displayContent)) {
        subSection.displayContent.forEach((contentDisplay) => {

            // Adds a Div to each Line
            for (let n = 0; n < contentDisplay.lineQuantity; n++) {
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
                                number.textContent = n
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

// Call The Function to create Rules Section
function createRuleSection(subSection, subContainer) {
    if (subSection.displayContent && Array.isArray(subSection.displayContent)) {
        subSection.displayContent.forEach((contentDisplay) => {
            if (contentDisplay.wording && Array.isArray(contentDisplay.wording)) {
                contentDisplay.wording.forEach((word) => {
                    if (word.Type === "text" && word.content[currentLanguage]) {
                        let typeOfList;

                        if (contentDisplay.listType == "li") {
                            typeOfList = document.createElement("li");
                        } else {
                            typeOfList = document.createElement("p");
                        }

                        // Format the text content based on valueType
                        switch (word.valueType) {
                            case "puntataMinima":
                                typeOfList.textContent = `${word.content[currentLanguage]} ${word.value} ${currency[0][currentLanguage]}`;
                            case "puntataMaxima":
                                typeOfList.textContent = `${word.content[currentLanguage]} ${word.value} ${currency[0][currentLanguage]}`;
                                break;
                            case "maxWinValue":
                                typeOfList.textContent = `${word.content[currentLanguage]} ${word.value}x the bet`;
                                break;
                            case "rtpValue":
                                typeOfList.textContent = `${word.content[currentLanguage]} ${word.value}`;
                                break;
                            case "maxWinValueLimit":
                                typeOfList.textContent = `${word.content[currentLanguage]}`;
                                break;
                            default:
                                typeOfList.textContent = word.Text;
                        }

                        // Apply common styling and append to the container
                        subContainer.style.flexDirection = "column";
                        subContainer.classList.add("sub-container-flex");
                        subContainer.appendChild(typeOfList);
                    }
                });
            }
        });
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

                for (let j = 0; j < contentDisplay.quanitityContent; j++) {
                    const contentDiv = document.createElement("div");

                    contentDiv.style.flexDirection = contentDisplay.featureContent[j].direction;

                    if (contentDisplay.featureContent[j].type === "img") {
                        contentDiv.classList.add("content-div-class-flex-img");
                        // Check if numberOfImages is defined
                        const numberOfImages = contentDisplay.featureContent[j].numberOfImages || 1;

                        for (let i = 0; i < numberOfImages; i++) {
                            const contentDivImage = document.createElement("img");
                            contentDivImage.src = contentDisplay.featureContent[j].url[i];
                            if (contentDisplay.featureContent[j].imageType == "big") {
                                contentDivImage.classList.add("big-image")
                            } else if (contentDisplay.featureContent[j].imageType == "small") {
                                contentDivImage.classList.add("small-image")
                            }
                            contentDiv.appendChild(contentDivImage);
                        }
                    } else if (contentDisplay.featureContent[j].type === "text") {
                        contentDiv.classList.add("content-div-class-flex-text");
                        const textParagraph = document.createElement("p");
                        textParagraph.textContent = contentDisplay.featureContent[j].content[currentLanguage];

                        contentDiv.appendChild(textParagraph);
                    } else if (contentDisplay.featureContent[j].type === "plural_text") {
                        // Check if numberOfTexts is defined
                        const numberOfString = contentDisplay.featureContent[j].numberOfTexts || 1;

                        for (let i = 0; i < numberOfString; i++) {

                            contentDiv.classList.add("content-div-class-flex-text");

                            const textParagraph = document.createElement("p");
                            textParagraph.textContent = contentDisplay.featureContent[j].content[currentLanguage][i];

                            contentDiv.appendChild(textParagraph);
                        }
                    } else if (contentDisplay.featureContent[j].type === "img_text") {

                        contentDiv.classList.add("content-div-class-flex-img");
                        // Check if numberOfImages is defined
                        const numberOfImages = contentDisplay.featureContent[j].numberOfImages || 1;

                        for (let i = 0; i < numberOfImages; i++) {
                            const contentDivImage = document.createElement("img");
                            contentDivImage.src = contentDisplay.featureContent[j].url[i];
                            if (contentDisplay.featureContent[j].imageType == "big") {
                                contentDivImage.classList.add("big-image")
                            } else if (contentDisplay.featureContent[j].imageType == "small") {
                                contentDivImage.classList.add("small-image")
                            }
                            contentDiv.appendChild(contentDivImage);
                        }

                        // Check if numberOfTexts is defined
                        const numberOfString = contentDisplay.featureContent[j].numberOfTexts || 1;
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
                            valueText.innerText = dataInfo.value;

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
                        contentDiv.appendChild(rightDivParent);

                    } else if (contentDisplay.featureContent[j].type == "divContent") {
                        contentDiv.classList.add("content-div-class-flex-div");
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
                            contentDiv.appendChild(borderDiv);

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
                    if (contentDisplay.featureContent[j].divWith == "small") {
                        contentDiv.classList.add("div-small-type")
                    }
                    contentDiv.style.textAlign = contentDisplay.featureContent[j].textAlignment

                    singularDiv.appendChild(contentDiv);
                }

                subContainer.appendChild(singularDiv);

                // Enter Words to Search based on current language
                if (currentLanguage === "UK") {
                    searchDynamicParagraphs(["WILD", "FREE SPINS", "EXTRA SPINS"]);
                } else if (currentLanguage === "ZH") {
                    searchDynamicParagraphs(["野生", "免费旋转", "额外旋转"]);
                } else if (currentLanguage === "RUS") {
                    searchDynamicParagraphs(["ДИКИЙ", "БЕСПЛАТНЫЕ ВРАЩЕНИЯ", "ДОПОЛНИТЕЛЬНЫЕ ВРАЩЕНИЯ"]);
                } else if (currentLanguage === "PT") {
                    searchDynamicParagraphs(["WILD", "GIROS GRÁTIS", "GIROS EXTRA"]);
                } else if (currentLanguage === "FR") {
                    searchDynamicParagraphs(["SAUVAGE", "TOURS GRATUITS", "TOURS SUPPLÉMENTAIRES"]);
                } else if (currentLanguage === "US") {
                    searchDynamicParagraphs(["WILD", "FREE SPINS", "EXTRA SPINS"]);

                } else if (currentLanguage == "CHIN") {
                    searchDynamicParagraphs("")
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
                buttonContainerDiv.style.display = "flex"
                buttonContainerDiv.style.flexDirection = "column"

                if (contentDisplay.Buttons && Array.isArray(contentDisplay.Buttons)) {
                    contentDisplay.Buttons.forEach((button) => {

                        const buttonImage = document.createElement("img");
                        buttonImage.src = button.img;

                        const buttonDesc = document.createElement("p");
                        buttonDesc.innerText = button.content[currentLanguage];

                        const buttonDiv = document.createElement("div");
                        buttonDiv.style.display = "flex"
                        buttonDiv.style.flexDirection = "row"
                        buttonDiv.style.justifyContent = "center"
                        buttonDiv.style.alignItems = "center"
                        buttonDiv.style.margin = " 10px 0px "

                        buttonDiv.appendChild(buttonImage);
                        buttonDiv.appendChild(buttonDesc);

                        buttonContainerDiv.appendChild(buttonDiv);
                    });
                }

                subContainer.appendChild(buttonContainerDiv);
            });
        }
    }
}

// Function to search for the search terms within dynamically generated <p> elements
function searchDynamicParagraphs(keyWords) {
    // Get all <p> elements on the page
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
                        searchTermSpan.style.color = '#ff0096'; // Apply blue color
                        fragment.appendChild(searchTermSpan);
                    }
                });

                // Clear the paragraph's content and append the modified content
                paragraph.textContent = '';
                paragraph.appendChild(fragment);
            }
        });
    });
}

// Function to search for words in caps lock within dynamically generated <p> elements
function colorWordsInCapsLock() {
    // Get all <p> elements on the page
    const paragraphs = document.querySelectorAll('p');

    // Iterate over each <p> element
    paragraphs.forEach(paragraph => {
        // Split the paragraph's text content into words
        const words = paragraph.textContent.split(/\s+/);

        // Create a new fragment to hold the modified content
        const fragment = document.createDocumentFragment();

        // Iterate over the words
        words.forEach(word => {
            // Check if the word is in caps lock
            if (word === word.toUpperCase() && /[A-Z]/.test(word)) {
                // Create a new span element for the word
                const span = document.createElement('span');
                span.textContent = word;
                span.style.color = 'blue'; // Apply blue color

                // Append the span to the fragment
                fragment.appendChild(span);
            } else {
                // Create a new text node for the word
                const textNode = document.createTextNode(word + ' ');

                // Append the text node to the fragment
                fragment.appendChild(textNode);
            }
        });

        // Clear the paragraph's content and append the modified content
        paragraph.textContent = '';
        paragraph.appendChild(fragment);
    });
}




