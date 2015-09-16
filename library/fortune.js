//output a random quote from a list of ten.

module.exports = {
  
    getFortune: randomQuote

};

var quotes = ["It is better to have a permanent income than to be fascinating. \n-Oscar Wilde",
    "I haven't the slightest idea how to change people, but I still keep a long list of prospective candidates just in case I should ever figure it out.  \n-David Sedaris",
    "Prosperity is only an instrument to be used, not a deity to be worshipped.  \n-Calvin Coolidge",
    "Be not extravagantly high in expression of thy commendations of men thou likest, it may make the hearer's stomach rise.  \n-Thomas Fuller",
    "The one function TV news performs very well is that when there is no news we give it to you with the same emphasis as if there were.  \n-David Brinkley" ,
    "The idea of perfect closes your mind to new standards. When you drive hard toward one ideal, you miss opportunities and paths, not to mention hurting your confidence. Believe in your potential and then go out and explore it; don't limit it. \n-John Eliot, Ph.D.",
    "None of us will ever accomplish anything excellent or commanding except when he listens to this whisper which is heard by him alone.  \n-Ralph Waldo Emerson (1803 - 1882)",
    "Every man is a damn fool for at least five minutes every day; wisdom consists of not exceeding the limit. \n-Elbert Hubbard (1856 - 1915)",
    "Silly things do cease to be silly if they are done by sensible people in an impudent way.  \n-Jane Austen",
    "Hate no one; hate their vices, not themselves. \n-J. G. C. Brainard",
    "To establish oneself in the world, one has to do all one can to appear established.  \n-Francois de La Rochefoucauld"]

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomQuote(){
    return quotes[ randomIntFromInterval( 0, 10 ) ];
}