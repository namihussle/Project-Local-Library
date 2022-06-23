function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
   // edit later
   let counter = 0;
   for (let book of books) {
     for (let i = 0; i < book.borrows.length; i++)
       if (book.borrows[i].returned === false) {
         counter++;
       }
   }
   return counter;
}

function getMostCommonGenres(books) {
  let commonGenres = [];

  for (let book of books) {
    const genre = commonGenres.find((currentGenre) => currentGenre.name === book.genre);
    
    if (genre) {
      genre.count++;
    } else {
      commonGenres.push({ name: book.genre, count: 1 });
    } 

  }

  let topGenres = commonGenres.sort((countA, countB) => countA.count < countB.count ? 1 : -1);
  return topGenres.slice(0, 5);
}

function getMostPopularBooks(books) { 
  let map = {};
  books.forEach(book => {
  map[book.title] = book.borrows.length
})
return Object.entries(map).map(([name, count]) => {return { name, count} }).sort((a,b) => b.count - a.count).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  let returnArr = [];
     authors.forEach(author => {
       returnArr.push({name: author.name.first + " " + author.name.last, count : 0 , id: author.id})
     })
     
     books.forEach((book) => {
       let foundAuthor = returnArr.find((author) => {return author.id === book.authorId} );
       foundAuthor.count += book.borrows.length;
     })
   
   return returnArr.sort((authorA, authorB) => authorB.count - authorA.count).slice(0,5).map(({id, ...rest}) => rest)
   }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
