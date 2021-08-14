import "../css/styles.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const getValueById = (id) => document.getElementById(id).value;
const calculatePNL = (
    priceOfPurchase,
    numberOfSharesPurchased,
    currentPrice
) => {
    if (!priceOfPurchase || !numberOfSharesPurchased || !currentPrice) {
        return;
    }
    const totalPriceOfPurchase = priceOfPurchase * numberOfSharesPurchased;
    const totalCurrentPrice = currentPrice * numberOfSharesPurchased;
    const profitOrLossAmount = totalCurrentPrice - totalPriceOfPurchase;
    if (!profitOrLossAmount) {
        Toastify({
            text: "Everything's under control! There's no loss or profit",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#415d43",
            stopOnFocus: true,
            onClick: function () {},
        }).showToast();
        return;
    }
    const profitOrLossPercentage =
        (profitOrLossAmount / totalPriceOfPurchase) * 100;
    return {
        profitOrLossAmount,
        profitOrLossPercentage: profitOrLossPercentage.toFixed(2),
    };
};
const removeClassNames = (elementAndClassNameList) => {
    elementAndClassNameList.forEach((e) => {
        console.log({ e });
        e.element.classList.remove(e.class);
    });
};
const addClassNames = (elementAndClassNameList) => {
    elementAndClassNameList.forEach((e) => {
        console.log({ e });
        e.element.classList.add(e.class);
    });
};

(() => {
    document.getElementById("submit-btn").addEventListener("click", () => {
        const priceOfPurchase = getValueById("price-of-purchase");
        const numberOfSharesPurchased = getValueById("number-of-shares");
        const currentPrice = getValueById("price-currently");
        const wrapper = document.getElementById("wrapper");
        const outputText = document.getElementById("output");
        removeClassNames([
            {
                element: wrapper,
                class: "success",
            },
            {
                element: wrapper,
                class: "failure",
            },
            {
                element: outputText,
                class: "success-text",
            },
            {
                element: outputText,
                class: "failure-text",
            },
        ]);

        outputText.innerText = "";
        // validations
        document.getElementById("error-price-of-purchase").innerText = "";
        document.getElementById("error-number-of-shares").innerText = "";
        document.getElementById("error-price-currently").innerText = "";
        if (!priceOfPurchase) {
            document.getElementById("error-price-of-purchase").innerText =
                "Please enter a valid purchase amount";
        }
        if (!numberOfSharesPurchased) {
            document.getElementById("error-number-of-shares").innerText =
                "Please enter valid number of shares";
        }
        if (!currentPrice) {
            document.getElementById("error-price-currently").innerText =
                "Please enter a valid amount";
        }

        const profitOrLoss = calculatePNL(
            priceOfPurchase,
            numberOfSharesPurchased,
            currentPrice
        );
        console.log(Math.sign(profitOrLoss.profitOrLossAmount));
        if (Math.sign(profitOrLoss.profitOrLossAmount) === 1) {
            addClassNames([
                {
                    element: wrapper,
                    class: "success",
                },
                {
                    element: outputText,
                    class: "success-text",
                },
            ]);
            outputText.innerText = `Woah! You made profit of ${Math.abs(
                profitOrLoss.profitOrLossAmount
            )} units i.e. ${Math.abs(
                profitOrLoss.profitOrLossPercentage
            )}% 🤑🤩`;
        } else {
            addClassNames([
                {
                    element: wrapper,
                    class: "failure",
                },
                {
                    element: outputText,
                    class: "failure-text",
                },
            ]);
            outputText.innerText = `Oh snap! You're in loss of ${Math.abs(
                profitOrLoss.profitOrLossAmount
            )} units i.e. ${Math.abs(
                profitOrLoss.profitOrLossPercentage
            )}% 😟😵‍💫`;
        }
    });
})();
