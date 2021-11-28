const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete()
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show New Quote
function newQuote()
{   
    loading();
    // Pick a random quote from apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if author field is blank and replace it with "Unknown"
    if (!quote.author)
    {
        authorText.textContent = 'Unknown';
    } else 
        {
            authorText.textContent = quote.author; 
        }
    
    // Check quote length to determine the styling
    if (quote.text.length > 50) 
    {
        quoteText.classList.add('long-quote');
    } else 
        {
            quoteText.classList.remove('long-quote'); 
        }
    
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Using an asynchronous fetch request within a try catch statement
// Get quotes from API
async function getQuotes() 
{   
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try 
    {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); // passing into apiQuotes what we fetch from the apiUrl repsonse
        newQuote();
    }
    catch (error) 
    {
        // Catch Error Here
    }
}

// Tweet a Quote
function tweetQuote()
{
    const twitterUrl = `https://twitter.com/intent/tweet?=${quoteText.textContent} - ${authorText.textContent}`; //using a template string in order to allow us to pass in a variable and it will be converted into a string
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
