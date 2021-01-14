export let markUpStyleList;

let cssColorClassList = [
    "lightGreen", //#66ff66
    "lightBlue", //#33ccff
    "lightPink", //#ff99ff
    "green", //#00cc00
    "blue", //#0000ff
    "pink", //#ff00ff
    "darkGreen", //#006600
    "darkBlue", //#000080
    "darkPink", //#cc00cc
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXY";
let index = 0;
let styleList = [];

for (let i = 0; i < cssColorClassList.length; i++) {
    let colorIndex = 0;

    for (let h = 0; h < alphabet.length; h++) {
        styleList.push({
            index: index,
            class: "markUp " + cssColorClassList[colorIndex],
            letter: alphabet[h],
        });

        colorIndex === 8 ? (colorIndex = 0) : colorIndex++;
        index++;
    }


    let firstValue = cssColorClassList[0];
    cssColorClassList.shift();
    cssColorClassList.push(firstValue);
}

markUpStyleList = styleList;