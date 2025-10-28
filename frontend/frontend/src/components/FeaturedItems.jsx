import React, { useEffect, useState } from "react";

function FeaturedItems() {
  const [bookList, setbookList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books/getallbooks")
      .then((res) => res.json())
      .then((data) => setbookList(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const Featurebooks = bookList.filter((book) => book.isFeatured === true);

  return (
    <>
      <h3 className='text-3xl mt-5 mb-5'>Featured Product</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {Featurebooks.map((book) => (
          <div className="border-gray-600 flex flex-col gap-4 border p-4 rounded">
            <div
              key={book._id}
              className=""
            >
              <img
                src={book.coverImage}
                alt={book.name}
                className="w-full h-64 object-cover"
              />
              <h6 className="font-semibold">{book.title} , <span>{book.author}</span></h6>
              
              <p className="text-[#f3595e]">{book.price} $</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FeaturedItems;
