const textarea1 = document.querySelector(".t1");
const textarea2 = document.querySelector(".t2");
const button = document.querySelector(".btn-js");
const status_Text = document.querySelector(".status");

button.addEventListener("click", () => {
    let similarity_percentage = getSimilarity(textarea1.value.split(" "), textarea2.value.split(" "));
    console.log(similarity_percentage);
    status_Text.innerText = `Similarity: ${similarity_percentage}%`;
});

function getSimilarity(value_1, value_2) {
    const a = value_1.length;
    const b = value_2.length;

    if (a === 0 || b === 0) {
        return 0;
    }

    if (a === 0 && b === 0) return 100;

    let cost = 0;

    let levenArr = [];

    for (let i = 0; i <= a; i++) {
        levenArr[i] = [];
        levenArr[i][0] =i;
    }

    for (let j = 0; j <= b; j++) {
        levenArr[0][j] = j;
    }

    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= b; j++) {
            if (value_1[i - 1] == value_2[j - 1]) {
                cost = 0.0;
            } else {
                cost = 1.0;
            }

            levenArr[i][j] = Math.min(
                levenArr[i - 1][j] + 1,
                levenArr[i][j - 1] + 1,
                levenArr[i - 1][j - 1] + cost
            );
        }
    }

    const distance = levenArr[a][b];
    const maxLen = Math.max(a, b);

    return ((1 - distance / maxLen) * 100).toFixed(2);
}