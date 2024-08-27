const category = "happiness";
const apiKey = "WyOKp+JvxurJ8ZULsAOMww==mqSHtiYFnskvfR4c";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
async function getQuotes() {
  loading();
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data && data.length > 0) {
      const { quote, author: quoteAuthor } = data[0];
      //Check Quote Length to determine styling
      if (quote.length > 50) {
        quoteText.classList.add("long-quote");
      } else {
        quoteText.classList.remove("long-quote");
      }
      quoteText.textContent = quote;
      author.textContent = quoteAuthor || "Unknown";
    } else {
      throw new Error("No quotes found");
    }
  } catch (error) {
    console.error("Error:", error);
    quoteText.textContent = "An error occurred while fetching the quote.";
    author.textContent = "Error occured in author";
  }
  //Set quote ,hide Loader
  complete();
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${author.textContent}`;
  window.open(twitterUrl, "_blank");
}
//Event Listeners
twitterBtn.addEventListener("click", tweetQuote);

// Call getQuotes when the page loads
//  getQuotes();

// Add event listener to the new quote button
newQuoteBtn.addEventListener("click", getQuotes);
