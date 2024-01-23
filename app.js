

function closeInfo() {
    console.log("Closing info");
}

// ----------------------------------------------------

function createHTMLFromJSON() {
    fetch("config.json")
        .then((response) => response.json())
        .then((data) => {

            // Title of the Game
            document.title = "Book of West";

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
                if (section.Title) {
                    if (section.Type === "Title") {
                        const title = document.createElement("h2");
                        title.textContent = section.Title;
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
                            subContainer.classList.add("sub-container-grid")
                        }
                        else if (subSection.Layout == "flex") {
                            subContainer.classList.add("sub-container-flex")
                        }

                    } else {

                    }
                    container.append(subContainer)


                    // Symbol Section
                    createSymbolSection(subSection, subContainer)

                    // Line Layout Section
                    createLineLayoutSection(container, subSection, subContainer)

                    // Rule Section
                    createRuleSection(subSection, subContainer)

                    // Features Section
                    // createFeatureSection(section, subSection, subContainer)
                    createNewSections(section, subSection, subContainer)

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
    return Math.floor(Math.random() * 16777215).toString(16);
}


// Call the function to start populating content
createHTMLFromJSON();

// Call The Function to create Symbol Section
function createSymbolSection(subSection, subContainer) {
    if (subSection.displayContent && Array.isArray(subSection.displayContent)) {
        subSection.displayContent.forEach((contentDisplay) => {
            // Adds a Div to each Symbol
            for (let i = contentDisplay.symbolQuantity - 1; i >= 0; i--) {

                const displayContent = document.createElement("div");
                // displayContent.classList.add("sub-container-content");

                // Add Display Type to Each Symbol Section Div
                if (contentDisplay.Layout == "grid") {
                    displayContent.classList.add("sub-container-content-grid");

                }
                else if (contentDisplay.Layout == "flex") {
                    displayContent.classList.add("sub-container-content-flex");
                }
                subContainer.appendChild(displayContent)


                contentDisplay.symbols.forEach((content) => {

                    // Symbol Div Config
                    const leftDiv = document.createElement("div");
                    leftDiv.classList.add("image-container-symbol");
                    leftDiv.style.backgroundImage = `url("./images/symbols/${i}.png")`;
                    const symbolImage = document.createElement("img")
                    leftDiv.appendChild(symbolImage)

                    // Symbol table Config
                    const rightDiv = document.createElement("div");
                    rightDiv.classList.add("list-container");

                    for (let index = 0; index < content.item2.multipliers.length; index++) {
                        // const element = array[index];
                        const listDiv = document.createElement("div")
                        listDiv.classList.add("list-div")
                        const simbolvalue = document.createElement("p")
                        simbolvalue.classList.add("symbol-value-text")
                        simbolvalue.innerText = content.item2.values[index]


                        const multiplierSimbolvalue = document.createElement("p")
                        multiplierSimbolvalue.classList.add("multiplier-symbol-value-text")
                        multiplierSimbolvalue.innerText = content.item2.multipliers[index]

                        listDiv.appendChild(multiplierSimbolvalue)
                        listDiv.appendChild(simbolvalue)

                        rightDiv.appendChild(listDiv)
                    }
                    displayContent.appendChild(leftDiv);
                    displayContent.appendChild(rightDiv);
                });
            }
        });
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
                    displayContent.classList.add("sub-container-content-grid");

                }
                else if (contentDisplay.Layout == "flex") {
                    displayContent.classList.add("sub-container-content-flex");
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


            for (let j = 0; j < contentLineDisplay.content.length; j++) {

                let typeOfList
                if (contentLineDisplay.listType == "li") {
                    typeOfList = document.createElement("li");
                } else {
                    typeOfList = document.createElement("p");
                }
                typeOfList.textContent = contentLineDisplay.content[j]

                linetContent.appendChild(typeOfList)
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
                    if (word.Type === "text" && word.Text) {
                        let typeOfList;

                        if (contentDisplay.listType == "li") {
                            typeOfList = document.createElement("li");
                        } else {
                            typeOfList = document.createElement("p");
                        }

                        // Format the text content based on valueType
                        switch (word.valueType) {
                            case "puntataMinima":
                            case "puntataMaxima":
                                typeOfList.textContent = `${word.Text} ${word.value} EUR`;
                                break;
                            case "maxWinValue":
                                typeOfList.textContent = `${word.Text} ${word.value}x the bet`;
                                break;
                            case "rtpValue":
                                typeOfList.textContent = `${word.Text} ${word.value}`;
                                break;
                            case "maxWinValueLimit":
                                typeOfList.textContent = `${word.Text}`;
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
                    const divWidthSize = 100 / subSection.numberFeatures;
                    singularDiv.style.flex = `${divWidthSize}%`;
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
                            const contentDivImage = document.createElement("div");
                            contentDivImage.style.backgroundImage = `url(${contentDisplay.featureContent[j].url[i]})`;
                            contentDivImage.style.width = contentDisplay.featureContent[j].imageWidth
                            contentDivImage.style.height = contentDisplay.featureContent[j].imageWidth
                            contentDivImage.classList.add("featureImagesContent"); // Optional: Add a class for styling
                            contentDiv.appendChild(contentDivImage);
                        }
                    } else if (contentDisplay.featureContent[j].type === "text") {
                        contentDiv.classList.add("content-div-class-flex-text");
                        const textParagraph = document.createElement("p");
                        textParagraph.textContent = contentDisplay.featureContent[j].content;

                        contentDiv.appendChild(textParagraph);
                    } else if (contentDisplay.featureContent[j].type === "plural_text") {
                        // Check if numberOfTexts is defined
                        const numberOfString = contentDisplay.featureContent[j].numberOfTexts || 1;

                        for (let i = 0; i < numberOfString; i++) {

                            contentDiv.classList.add("content-div-class-flex-text");
                            const textParagraph = document.createElement("p");
                            textParagraph.textContent = contentDisplay.featureContent[j].content[i];

                            contentDiv.appendChild(textParagraph);
                        }
                    }

                    contentDiv.style.textAlign = contentDisplay.featureContent[j].textAlignment

                    singularDiv.appendChild(contentDiv);
                }

                subContainer.appendChild(singularDiv);
            });
        }
    }
}





