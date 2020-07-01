const express = require('express');
const router = express.Router();

const Book = require('../Models/book')

//get All books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//get a book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book)

    if(!book) {
      return res.status(404).json({ msg: 'book not found' });
    }

  } catch (err) {
    console.error(err.message);
    if(!err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'book not found' });
    }
    res.status(500).send('Server Error');
  }
});

//add a book
router.post('/add', (req, res) => {

  console.log("body: ", req.body);
   
    const newBook = new Book({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price
    })
    
    newBook.save((error) => {
      if(error) {
        console.error(error.message)
      } else {  
        console.log("data has been saved " + newBook)
      }
    });
})

//delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    await book.remove();

    res.json({ msg: "book removed" })

    if(!book) {
      return res.status(404).json({ msg: 'book not found' });
    }

  } catch (err) {
    console.error(err.message);
    if(!err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'book not found' });
    }
    res.status(500).send('Server Error');
  }
});

//edit a book page
router.put('/:id/edit', async (req, res) => {

  try {
    const book = await Book.findById(req.params.id);
    res.json(book)

    if(!book) {
      return res.status(404).json({ msg: 'book not found' });
    }

  } catch (err) {
    console.error(err.message);
    if(!err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'book not found' });
    }
    res.status(500).send('Server Error');
  }
});

//update a book request
router.put('/:id', async (req, res) => {

  let updatedBook
    
  try{

    updatedBook = await Book.findById(req.params.id);

    updatedBook.title = req.body.title;
    updatedBook.description = req.body.description;
    updatedBook.image = req.body.image;
    updatedBook.price = req.body.price;
    
    await updatedBook.save((error) => {
      if(error) {
        console.error(error.message)
      } else {  
        console.log("data has been saved " + updatedBook)
      }
    });
    console.log("book updated!")

  } catch (error) {

    if(updatedBook == null) {
      console.log('Book does not exist')
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }

})


module.exports = router;