import Link from 'next/link'
import { client } from './lib/db'

const getBooks = async () => {
  const result = await client.zRangeWithScores('books', 0, -1)
 const books = Promise.all(result.map((b)=>{
  return client.hGetAll(`book:${b.score}`)
 }))
  return books
}

export default async function Home() {

  const books = await getBooks()


  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>
      {books.map((book) => (
        <div key={book.title} className='card'>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.blurb}</p>
          <p>{book.rating}</p>
        </div>
      ))}
      <p>List of books here.</p>
    </main>
  )
}
